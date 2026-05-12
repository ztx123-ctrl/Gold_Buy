import asyncio
import os
import time
import unittest
from unittest.mock import MagicMock, patch

os.environ.setdefault("MOCK_LLM", "1")
os.environ.setdefault("DASHSCOPE_API_KEY", "mock")
os.environ.setdefault("DASHSCOPE_BASE_URL", "mock")

from chains.broadcast import (
    BroadcastManager,
    EmailBroadcaster,
    FeishuBroadcaster,
    RETRY_MAX_ATTEMPTS,
    TelegramBroadcaster,
    WeComBroadcaster,
    WebhookBroadcaster,
    _send_with_retry,
)
from schemas import BroadcastEvent


class BroadcastTests(unittest.TestCase):
    def _event(self) -> BroadcastEvent:
        return BroadcastEvent(type="test", title="T", body="B")

    def test_no_channels_configured_dispatch_silent(self):
        manager = BroadcastManager()
        with patch.dict(os.environ, {
            "WEBHOOK_URLS": "",
            "TELEGRAM_BOT_TOKEN": "",
            "TELEGRAM_CHAT_ID": "",
            "FEISHU_WEBHOOK_URL": "",
            "WECOM_KEY": "",
            "EMAIL_SMTP_HOST": "",
        }, clear=False):
            results = manager.dispatch(self._event())
        self.assertEqual(results, {})

    def test_webhook_configured_sends(self):
        with patch.dict(os.environ, {"WEBHOOK_URLS": "https://example.test/hook"}, clear=False):
            broadcaster = WebhookBroadcaster()
            self.assertTrue(broadcaster.is_configured())
            with patch("chains.broadcast.requests.post") as mock_post:
                mock_post.return_value = MagicMock(status_code=200)
                ok = broadcaster.send(self._event())
        self.assertTrue(ok)
        mock_post.assert_called_once()

    def test_webhook_failure_returns_false_but_does_not_raise(self):
        with patch.dict(os.environ, {"WEBHOOK_URLS": "https://example.test/hook"}, clear=False):
            broadcaster = WebhookBroadcaster()
            with patch("chains.broadcast.requests.post", side_effect=ConnectionError("nope")):
                ok = broadcaster.send(self._event())
        self.assertFalse(ok)

    def test_telegram_requires_token_and_chat(self):
        with patch.dict(os.environ, {"TELEGRAM_BOT_TOKEN": "abc", "TELEGRAM_CHAT_ID": ""}, clear=False):
            self.assertFalse(TelegramBroadcaster().is_configured())
        with patch.dict(os.environ, {"TELEGRAM_BOT_TOKEN": "abc", "TELEGRAM_CHAT_ID": "1"}, clear=False):
            self.assertTrue(TelegramBroadcaster().is_configured())

    def test_email_requires_all_keys(self):
        partial = {
            "EMAIL_SMTP_HOST": "smtp.example.com",
            "EMAIL_SMTP_USER": "u",
            "EMAIL_SMTP_PASS": "p",
        }
        with patch.dict(os.environ, partial, clear=False):
            self.assertFalse(EmailBroadcaster().is_configured())
        full = {**partial, "EMAIL_FROM": "f@x", "EMAIL_TO": "t@x"}
        with patch.dict(os.environ, full, clear=False):
            self.assertTrue(EmailBroadcaster().is_configured())


class _FakeChannel:
    """Programmable fake channel for retry / parallel / async tests."""
    def __init__(self, name: str, *, results: list[bool] | None = None, sleep: float = 0.0):
        self.name = name
        self._results = list(results or [True])
        self._sleep = sleep
        self.call_count = 0

    def is_configured(self) -> bool:
        return True

    def send(self, event: BroadcastEvent) -> bool:
        self.call_count += 1
        if self._sleep:
            time.sleep(self._sleep)
        if not self._results:
            return False
        return self._results.pop(0)


class RetryAndDispatchTests(unittest.TestCase):
    def _event(self) -> BroadcastEvent:
        return BroadcastEvent(type="test", title="T", body="B")

    def test_send_with_retry_succeeds_on_first_attempt(self):
        ch = _FakeChannel("ok", results=[True])
        # No sleep should be hit on first-attempt success.
        with patch("chains.broadcast.time.sleep") as mock_sleep:
            ok = _send_with_retry(ch, self._event())
        self.assertTrue(ok)
        self.assertEqual(ch.call_count, 1)
        mock_sleep.assert_not_called()

    def test_send_with_retry_recovers_after_transient_failure(self):
        ch = _FakeChannel("flaky", results=[False, False, True])
        with patch("chains.broadcast.time.sleep") as mock_sleep:
            ok = _send_with_retry(ch, self._event())
        self.assertTrue(ok)
        self.assertEqual(ch.call_count, 3)
        # Two backoff sleeps before the eventual third-attempt success.
        self.assertEqual(mock_sleep.call_count, 2)

    def test_send_with_retry_exhausts_and_returns_false(self):
        ch = _FakeChannel("dead", results=[False] * RETRY_MAX_ATTEMPTS)
        with patch("chains.broadcast.time.sleep"):
            ok = _send_with_retry(ch, self._event())
        self.assertFalse(ok)
        self.assertEqual(ch.call_count, RETRY_MAX_ATTEMPTS)

    def test_dispatch_runs_channels_in_parallel(self):
        # Three channels each sleep 200ms. Serial = 600ms; parallel ≈ 200ms.
        chans = [_FakeChannel(f"c{i}", results=[True], sleep=0.2) for i in range(3)]
        manager = BroadcastManager(chans)
        started = time.perf_counter()
        results = manager.dispatch(self._event())
        elapsed = time.perf_counter() - started
        self.assertEqual(results, {"c0": True, "c1": True, "c2": True})
        # Allow generous headroom for thread scheduling on a busy CI box; the
        # parallel ceiling is well below the serial floor (0.6s).
        self.assertLess(elapsed, 0.55)

    def test_dispatch_async_returns_same_results(self):
        chans = [_FakeChannel("a", results=[True]), _FakeChannel("b", results=[False] * RETRY_MAX_ATTEMPTS)]
        manager = BroadcastManager(chans)
        with patch("chains.broadcast.time.sleep"):
            results = asyncio.run(manager.dispatch_async(self._event()))
        self.assertEqual(results, {"a": True, "b": False})

    def test_dispatch_skips_unconfigured_channels(self):
        ok_chan = _FakeChannel("ok", results=[True])
        skipped = _FakeChannel("skipped", results=[True])
        skipped.is_configured = lambda: False  # type: ignore[assignment]
        manager = BroadcastManager([ok_chan, skipped])
        results = manager.dispatch(self._event())
        self.assertEqual(results, {"ok": True})
        self.assertEqual(skipped.call_count, 0)


if __name__ == "__main__":
    unittest.main()
