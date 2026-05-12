import os
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch

os.environ.setdefault("MOCK_LLM", "1")
os.environ.setdefault("DASHSCOPE_API_KEY", "mock")
os.environ.setdefault("DASHSCOPE_BASE_URL", "mock")
os.environ.setdefault("SCHEDULER_ENABLED", "0")
os.environ.setdefault("SCHEDULER_DAILY_ENABLED", "0")


class ChatApiTests(unittest.TestCase):
    def setUp(self):
        from fastapi.testclient import TestClient
        import storage.record_manager as record_manager

        self.temp_dir = TemporaryDirectory()
        self.db_path = Path(self.temp_dir.name) / "chat.db"
        self.original_db = record_manager.DB_PATH
        record_manager.DB_PATH = self.db_path
        record_manager.init_storage()
        self.record_manager = record_manager

        import app as app_module
        self.app_module = app_module
        # Reset module-global rate-limit buckets so tests don't leak into each other.
        app_module._chat_rate_buckets.clear()

        from app import app
        self.client = TestClient(app)
        self.client_id = "client-aaaa-bbbb-cccc-dddd-eeee"

    def tearDown(self):
        self.app_module._chat_rate_buckets.clear()
        self.record_manager.DB_PATH = self.original_db
        self.temp_dir.cleanup()

    def test_greeting_returns_payload(self):
        with patch("chains.daily_runner.get_gold_news", return_value=[]):
            res = self.client.get("/api/chat/greeting").json()
        self.assertTrue(res["success"], res.get("error"))
        self.assertIn("opening_message", res["data"])
        self.assertIn("suggested_questions", res["data"])

    def test_create_list_session(self):
        create_res = self.client.post("/api/chat/sessions", json={"client_id": self.client_id}).json()
        self.assertTrue(create_res["success"])
        session_id = create_res["data"]["id"]
        self.assertEqual(create_res["data"]["client_id"], self.client_id)

        list_res = self.client.get(f"/api/chat/sessions?client_id={self.client_id}").json()
        self.assertTrue(list_res["success"])
        self.assertEqual(len(list_res["data"]), 1)
        self.assertEqual(list_res["data"][0]["id"], session_id)

    def test_session_idor_blocked(self):
        # Create session under client A
        a = self.client.post("/api/chat/sessions", json={"client_id": "client-aaaa-bbbb-cccc-dddd-eeee"}).json()
        session_id = a["data"]["id"]
        # Client B tries to read messages — must 404
        res = self.client.get(
            f"/api/chat/sessions/{session_id}/messages?client_id=client-XXXX-YYYY-ZZZZ-1111-2222"
        )
        self.assertEqual(res.status_code, 404)
        # Client B tries to delete — must 404
        del_res = self.client.delete(
            f"/api/chat/sessions/{session_id}?client_id=client-XXXX-YYYY-ZZZZ-1111-2222"
        )
        body = del_res.json()
        self.assertFalse(body["success"])

    def test_message_too_long_rejected(self):
        sid = self.client.post("/api/chat/sessions", json={"client_id": self.client_id}).json()["data"]["id"]
        big = "x" * 4001
        res = self.client.post(
            f"/api/chat/sessions/{sid}/message?client_id={self.client_id}",
            json={"content": big},
        )
        self.assertEqual(res.status_code, 413)

    def test_empty_message_rejected(self):
        sid = self.client.post("/api/chat/sessions", json={"client_id": self.client_id}).json()["data"]["id"]
        res = self.client.post(
            f"/api/chat/sessions/{sid}/message?client_id={self.client_id}",
            json={"content": "   "},
        )
        self.assertEqual(res.status_code, 400)

    def test_streaming_persists_messages(self):
        with patch("chains.daily_runner.get_gold_news", return_value=[]):
            sid = self.client.post(
                "/api/chat/sessions",
                json={"client_id": self.client_id},
            ).json()["data"]["id"]
            with self.client.stream(
                "POST",
                f"/api/chat/sessions/{sid}/message?client_id={self.client_id}",
                json={"content": "金价怎么看？"},
            ) as response:
                self.assertEqual(response.status_code, 200)
                body = ""
                for chunk in response.iter_text():
                    body += chunk
            self.assertGreater(len(body), 0)

        msgs = self.client.get(f"/api/chat/sessions/{sid}/messages?client_id={self.client_id}").json()
        self.assertTrue(msgs["success"])
        self.assertEqual(len(msgs["data"]), 2)
        self.assertEqual(msgs["data"][0]["role"], "user")
        self.assertEqual(msgs["data"][0]["content"], "金价怎么看？")
        self.assertEqual(msgs["data"][1]["role"], "assistant")
        self.assertGreater(len(msgs["data"][1]["content"]), 0)

    def test_delete_archives_session(self):
        sid = self.client.post("/api/chat/sessions", json={"client_id": self.client_id}).json()["data"]["id"]
        del_res = self.client.delete(f"/api/chat/sessions/{sid}?client_id={self.client_id}").json()
        self.assertTrue(del_res["success"])
        listed = self.client.get(f"/api/chat/sessions?client_id={self.client_id}").json()
        self.assertEqual(len(listed["data"]), 0)

    def test_invalid_client_id_rejected(self):
        res = self.client.get("/api/chat/sessions?client_id=short")
        self.assertEqual(res.status_code, 400)
        # Header path also rejects short id
        res2 = self.client.get(
            "/api/chat/sessions",
            headers={"X-Aurum-Client-Id": "x"},
        )
        self.assertEqual(res2.status_code, 400)
        # Header takes precedence — valid header should win even if query is short
        res3 = self.client.get(
            "/api/chat/sessions?client_id=short",
            headers={"X-Aurum-Client-Id": self.client_id},
        )
        self.assertEqual(res3.status_code, 200)

    def test_client_id_below_min_length_rejected(self):
        # 15 chars — passes old length check (>=8) but fails the new {16,128} regex.
        res = self.client.get("/api/chat/sessions?client_id=abcdef0123456_x")
        self.assertEqual(res.status_code, 400)

    def test_client_id_bad_chars_rejected(self):
        # Length OK but contains @/space/!: shape regex must reject.
        res = self.client.get(
            "/api/chat/sessions",
            headers={"X-Aurum-Client-Id": "client@with space!!#@#@"},
        )
        self.assertEqual(res.status_code, 400)

    def test_session_cap_enforced(self):
        original = self.app_module.CHAT_MAX_SESSIONS_PER_CLIENT
        self.app_module.CHAT_MAX_SESSIONS_PER_CLIENT = 3
        try:
            for _ in range(3):
                r = self.client.post(
                    "/api/chat/sessions", json={"client_id": self.client_id}
                )
                self.assertEqual(r.status_code, 200)
            over = self.client.post(
                "/api/chat/sessions", json={"client_id": self.client_id}
            )
            self.assertEqual(over.status_code, 409)
            # A different client is not affected by the first client's cap.
            other_cid = "client-bbbb-cccc-dddd-eeee-ffff"
            ok = self.client.post(
                "/api/chat/sessions", json={"client_id": other_cid}
            )
            self.assertEqual(ok.status_code, 200)
        finally:
            self.app_module.CHAT_MAX_SESSIONS_PER_CLIENT = original

    def test_rate_limit_triggers_after_count(self):
        original = self.app_module.CHAT_RATE_LIMIT_COUNT
        self.app_module.CHAT_RATE_LIMIT_COUNT = 2
        try:
            sid = self.client.post(
                "/api/chat/sessions", json={"client_id": self.client_id}
            ).json()["data"]["id"]
            # Rate is checked BEFORE content validation, so even failed bodies count
            # toward the bucket — that's the intended behaviour (prevents flooding via
            # validation-failing requests).
            for _ in range(2):
                r = self.client.post(
                    f"/api/chat/sessions/{sid}/message?client_id={self.client_id}",
                    json={"content": "  "},
                )
                self.assertEqual(r.status_code, 400)
            over = self.client.post(
                f"/api/chat/sessions/{sid}/message?client_id={self.client_id}",
                json={"content": "real message"},
            )
            self.assertEqual(over.status_code, 429)
            self.assertIn("Retry-After", over.headers)
        finally:
            self.app_module.CHAT_RATE_LIMIT_COUNT = original

    def test_rate_limit_isolated_per_client(self):
        original = self.app_module.CHAT_RATE_LIMIT_COUNT
        self.app_module.CHAT_RATE_LIMIT_COUNT = 1
        try:
            cid_a = "client-aaaa-1111-2222-3333-4444"
            cid_b = "client-bbbb-1111-2222-3333-4444"
            sid_a = self.client.post(
                "/api/chat/sessions", json={"client_id": cid_a}
            ).json()["data"]["id"]
            sid_b = self.client.post(
                "/api/chat/sessions", json={"client_id": cid_b}
            ).json()["data"]["id"]

            r_a1 = self.client.post(
                f"/api/chat/sessions/{sid_a}/message?client_id={cid_a}",
                json={"content": " "},
            )
            self.assertEqual(r_a1.status_code, 400)
            r_a2 = self.client.post(
                f"/api/chat/sessions/{sid_a}/message?client_id={cid_a}",
                json={"content": " "},
            )
            self.assertEqual(r_a2.status_code, 429)

            # Client B's bucket is independent — first hit still allowed.
            r_b1 = self.client.post(
                f"/api/chat/sessions/{sid_b}/message?client_id={cid_b}",
                json={"content": " "},
            )
            self.assertEqual(r_b1.status_code, 400)
        finally:
            self.app_module.CHAT_RATE_LIMIT_COUNT = original


if __name__ == "__main__":
    unittest.main()
