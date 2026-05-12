import os
import sqlite3
import unittest
from contextlib import closing
from datetime import datetime, timedelta
from pathlib import Path
from tempfile import TemporaryDirectory

os.environ.setdefault("MOCK_LLM", "1")
os.environ.setdefault("DASHSCOPE_API_KEY", "mock")
os.environ.setdefault("DASHSCOPE_BASE_URL", "mock")
os.environ.setdefault("SCHEDULER_ENABLED", "0")
os.environ.setdefault("SCHEDULER_DAILY_ENABLED", "0")

from storage.backup import (
    backup_database,
    latest_backup_date,
    list_backups,
    rotate_backups,
)


def _make_db(path: Path, rows: int = 3) -> None:
    with closing(sqlite3.connect(path)) as conn:
        conn.execute("CREATE TABLE t (id INTEGER PRIMARY KEY, name TEXT)")
        conn.executemany(
            "INSERT INTO t (name) VALUES (?)", [(f"row-{i}",) for i in range(rows)]
        )
        conn.commit()


class BackupTests(unittest.TestCase):
    def setUp(self):
        self.tmp = TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.src = self.root / "gold_records.db"
        self.backup_dir = self.root / "backups"
        _make_db(self.src, rows=5)

    def tearDown(self):
        self.tmp.cleanup()

    def test_backup_produces_consistent_copy(self):
        target = backup_database(self.backup_dir, source_db=self.src)
        self.assertTrue(target.exists())
        self.assertTrue(target.name.startswith("gold_records-"))
        self.assertTrue(target.name.endswith(".db"))

        with closing(sqlite3.connect(target)) as conn:
            count = conn.execute("SELECT COUNT(*) FROM t").fetchone()[0]
        self.assertEqual(count, 5)

    def test_backup_creates_backup_dir(self):
        # backup_dir doesn't exist yet — backup_database should mkdir it.
        self.assertFalse(self.backup_dir.exists())
        backup_database(self.backup_dir, source_db=self.src)
        self.assertTrue(self.backup_dir.is_dir())

    def test_backup_raises_when_source_missing(self):
        missing = self.root / "does_not_exist.db"
        with self.assertRaises(FileNotFoundError):
            backup_database(self.backup_dir, source_db=missing)

    def test_list_backups_orders_newest_first(self):
        base = datetime(2026, 5, 10, 4, 0, 0)
        paths = [
            backup_database(self.backup_dir, source_db=self.src, now=base + timedelta(days=i))
            for i in range(3)
        ]
        listed = list_backups(self.backup_dir)
        self.assertEqual([p.name for p in listed], [p.name for p in reversed(paths)])

    def test_list_backups_ignores_unrelated_files(self):
        backup_database(self.backup_dir, source_db=self.src)
        # Drop a stray file that doesn't match the pattern.
        (self.backup_dir / "manual_copy.db").write_bytes(b"x")
        (self.backup_dir / "notes.txt").write_text("hi")
        listed = list_backups(self.backup_dir)
        self.assertEqual(len(listed), 1)

    def test_rotate_keeps_n_newest(self):
        base = datetime(2026, 5, 10, 4, 0, 0)
        for i in range(5):
            backup_database(self.backup_dir, source_db=self.src, now=base + timedelta(days=i))
        deleted = rotate_backups(self.backup_dir, keep=2)
        self.assertEqual(len(deleted), 3)
        self.assertEqual(len(list_backups(self.backup_dir)), 2)

    def test_rotate_keep_clamped_to_minimum_one(self):
        backup_database(self.backup_dir, source_db=self.src)
        # keep=0 must not wipe everything.
        deleted = rotate_backups(self.backup_dir, keep=0)
        self.assertEqual(deleted, [])
        self.assertEqual(len(list_backups(self.backup_dir)), 1)

    def test_rotate_noop_when_below_keep(self):
        backup_database(self.backup_dir, source_db=self.src)
        deleted = rotate_backups(self.backup_dir, keep=10)
        self.assertEqual(deleted, [])

    def test_latest_backup_date_none_when_empty(self):
        self.assertIsNone(latest_backup_date(self.backup_dir))
        # Non-existent dir is also None, not a crash.
        self.assertIsNone(latest_backup_date(self.root / "no_such_dir"))

    def test_latest_backup_date_returns_iso_date(self):
        backup_database(
            self.backup_dir,
            source_db=self.src,
            now=datetime(2026, 5, 12, 4, 0, 0),
        )
        self.assertEqual(latest_backup_date(self.backup_dir), "2026-05-12")


if __name__ == "__main__":
    unittest.main()
