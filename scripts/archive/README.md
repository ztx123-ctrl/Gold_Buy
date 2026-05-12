# Archived migration scripts

One-off scripts kept for historical reference. Not part of any live code path.

- `backfill_probs.py` — Reconstructed (prob_up, prob_down, prob_flat) for legacy
  `daily_predictions` rows that pre-date the three-probability vector. Migration
  complete; all live rows now carry the columns natively.
