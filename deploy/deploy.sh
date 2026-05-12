#!/usr/bin/env bash
# Aurum Gold_Buy deploy — idempotent.
# Pushes local source + frontend build to the target host, sets up venv,
# installs Hermes Agent (best-effort), registers cron jobs, and binds
# uvicorn directly to port 80 via systemd.
#
# Usage:
#   SSH_PASS='Xcom774632' bash deploy/deploy.sh
#   Optional env vars:
#     DEPLOY_HOST=root@1.2.3.4
#     DEPLOY_DIR=/opt/gold-buy
#     DASHSCOPE_API_KEY=sk-...           # injected into remote .env if set
#     DASHSCOPE_BASE_URL=https://...
#     MODEL_NAME=qwen3.6-plus
#     SKIP_HERMES=1                      # skip Hermes installation
#
# Requirements on the operator's machine:
#   - sshpass, rsync, npm

set -euo pipefail

DEPLOY_HOST="${DEPLOY_HOST:-root@119.91.112.133}"
DEPLOY_DIR="${DEPLOY_DIR:-/opt/gold-buy}"
SERVICE_NAME="${SERVICE_NAME:-gold-buy}"
SSH_PASS="${SSH_PASS:?SSH_PASS env var is required}"

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

if ! command -v sshpass >/dev/null 2>&1; then
    echo "[deploy] sshpass not found. Install via 'brew install hudochenkov/sshpass/sshpass'." >&2
    exit 1
fi
if ! command -v rsync >/dev/null 2>&1; then
    echo "[deploy] rsync not found." >&2
    exit 1
fi

ssh_run() {
    sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/dev/null \
        -o LogLevel=ERROR -o ConnectTimeout=20 "$DEPLOY_HOST" "$@"
}

rsync_push() {
    sshpass -p "$SSH_PASS" rsync -az --delete \
        --exclude=.git --exclude=__pycache__ --exclude=.venv --exclude=gold_records.db \
        --exclude=tests --exclude=.idea --exclude=.DS_Store \
        --exclude=.env --exclude='_local_*' --exclude='_remote_*' --exclude='_check*' \
        --exclude='frontend/node_modules' --exclude='frontend/dist' \
        -e "ssh -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/dev/null -o LogLevel=ERROR" \
        "$PROJECT_ROOT/" "$DEPLOY_HOST:$DEPLOY_DIR/"
}

echo "[deploy] target=$DEPLOY_HOST dir=$DEPLOY_DIR"

# Pre-step: ensure local Hermes clone exists (used to seed remote /opt/hermes-agent
# on first deploy — bypasses the GitHub raw connectivity issue from China VPS).
HERMES_LOCAL_CLONE="${HERMES_LOCAL_CLONE:-/tmp/hermes-agent}"
if [ ! -d "$HERMES_LOCAL_CLONE" ]; then
    echo "[deploy] cloning hermes-agent locally to $HERMES_LOCAL_CLONE"
    git clone --depth 1 https://github.com/NousResearch/hermes-agent.git "$HERMES_LOCAL_CLONE" >/dev/null 2>&1 || true
fi

# ---- 0. Build frontend locally -----------------------------------------
echo "[deploy] step 0/8 · build frontend"
if [ -d "$PROJECT_ROOT/frontend" ]; then
    pushd "$PROJECT_ROOT/frontend" >/dev/null
    if [ ! -d node_modules ]; then
        npm install --registry=https://registry.npmmirror.com
    fi
    npx vite build
    popd >/dev/null
fi

# ---- 1. Remote prereqs --------------------------------------------------
echo "[deploy] step 1/8 · ensure remote prerequisites"
ssh_run "bash -s" <<'REMOTE_PREP'
set -uo pipefail
export DEBIAN_FRONTEND=noninteractive
mkdir -p /opt/gold-buy

if ! command -v python3 >/dev/null 2>&1; then
    apt-get update -y
    apt-get install -y python3 python3-venv python3-dev
fi
apt-get install -y python3-venv python3-dev sqlite3 rsync curl ca-certificates jq >/dev/null 2>&1 || true
timedatectl set-timezone Asia/Shanghai 2>/dev/null || true
true
REMOTE_PREP

# ---- 2. Free port 80 ----------------------------------------------------
echo "[deploy] step 2/8 · free port 80"
ssh_run "bash -s" <<'REMOTE_FREE'
set -uo pipefail
for unit in nginx apache2 httpd caddy lighttpd; do
    if systemctl list-unit-files --type=service 2>/dev/null | grep -q "^${unit}.service"; then
        systemctl stop "$unit" 2>/dev/null || true
        systemctl disable "$unit" 2>/dev/null || true
        echo "[deploy:remote] stopped $unit"
    fi
done
if command -v fuser >/dev/null 2>&1; then
    fuser -k 80/tcp 2>/dev/null || true
fi
true
REMOTE_FREE

# ---- 3. Sync source -----------------------------------------------------
echo "[deploy] step 3/8 · rsync source"
rsync_push

# ---- 4. venv + dependencies --------------------------------------------
echo "[deploy] step 4/8 · venv + dependencies"
ssh_run "bash -s" <<REMOTE_VENV
set -euo pipefail
cd "$DEPLOY_DIR"
PY_BIN=\$(command -v python3.12 || command -v python3.11 || command -v python3)
if [ ! -d .venv ]; then
    "\$PY_BIN" -m venv .venv
fi
.venv/bin/pip install --upgrade pip >/dev/null
.venv/bin/pip install --no-cache-dir -r requirements.txt
REMOTE_VENV

# ---- 5. Write .env (with key injection if set) + systemd unit ---------
echo "[deploy] step 5/8 · write .env (only if missing) + systemd unit"
INJ_KEY="${DASHSCOPE_API_KEY:-}"
INJ_BASE="${DASHSCOPE_BASE_URL:-https://dashscope.aliyuncs.com/compatible-mode/v1}"
INJ_MODEL="${MODEL_NAME:-qwen3.6-plus}"
ssh_run "bash -s" <<REMOTE_CONFIG
set -euo pipefail
cd "$DEPLOY_DIR"
if [ ! -f .env ]; then
    cp deploy/env.template .env
    echo "[deploy:remote] wrote default .env"
fi
chmod 600 .env || true

# Patch in API key if operator provided one (idempotent — no-op if env unset).
# Use python instead of sed to avoid special-char interpretation in keys/URLs.
if [ -n "${INJ_KEY}" ]; then
    INJ_KEY="${INJ_KEY}" INJ_BASE="${INJ_BASE}" INJ_MODEL="${INJ_MODEL}" python3 - <<'PYEOF'
import os, sys
mapping = {
    'DASHSCOPE_API_KEY': os.environ.get('INJ_KEY', ''),
    'DASHSCOPE_BASE_URL': os.environ.get('INJ_BASE', ''),
    'MODEL_NAME': os.environ.get('INJ_MODEL', 'qwen3.6-plus'),
    'MOCK_LLM': '0',
}
path = '.env'
try:
    with open(path) as f:
        lines = f.readlines()
except FileNotFoundError:
    lines = []
seen = set()
out = []
for line in lines:
    key = line.split('=', 1)[0].strip()
    if key in mapping:
        out.append(f"{key}={mapping[key]}\n")
        seen.add(key)
    else:
        out.append(line)
for key, value in mapping.items():
    if key not in seen:
        out.append(f"{key}={value}\n")
with open(path, 'w') as f:
    f.writelines(out)
PYEOF
fi

install -m 0644 deploy/gold-buy.service /etc/systemd/system/${SERVICE_NAME}.service
systemctl daemon-reload
REMOTE_CONFIG

# ---- 6. Restart service + health check -------------------------------
echo "[deploy] step 6/8 · enable + restart service, health check"
ssh_run "bash -s" <<REMOTE_RUN
set -euo pipefail
systemctl enable "${SERVICE_NAME}" >/dev/null
systemctl restart "${SERVICE_NAME}"
sleep 3
systemctl is-active "${SERVICE_NAME}" >/dev/null

for i in 1 2 3 4 5 6 7 8 9 10; do
    if curl -fsS -m 4 http://127.0.0.1/api/price >/dev/null 2>&1; then
        echo "[deploy:remote] healthy"
        break
    fi
    sleep 1
done

curl -sS -m 6 http://127.0.0.1/api/predictions/today | head -c 300
echo
REMOTE_RUN

# ---- 7. Hermes Agent (real install — idempotent) ----------------------
echo "[deploy] step 7/8 · Hermes Agent provision"

# Sync hermes-agent source to /opt/hermes-agent if missing
if [ -d "$HERMES_LOCAL_CLONE" ]; then
    needs_upload=$(ssh_run "[ -f /opt/hermes-agent/run_agent.py ] && echo no || echo yes" 2>/dev/null || echo yes)
    if [ "$needs_upload" = "yes" ]; then
        echo "[deploy:hermes] uploading hermes source"
        sshpass -p "$SSH_PASS" rsync -az \
            --exclude=.git --exclude=tests --exclude=/environments --exclude=/website --exclude=__pycache__ \
            -e "ssh -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/dev/null -o LogLevel=ERROR" \
            "$HERMES_LOCAL_CLONE/" "$DEPLOY_HOST:/opt/hermes-agent/"
    fi
fi

INJ_KEY_FOR_HERMES="${DASHSCOPE_API_KEY:-}"
sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/dev/null -o LogLevel=ERROR -o ConnectTimeout=20 \
    "$DEPLOY_HOST" "INJ_KEY='$INJ_KEY_FOR_HERMES' INJ_MODEL='$INJ_MODEL' bash -s" <<'REMOTE_HERMES'
set -euo pipefail

# 7.1 Python 3.11 via deadsnakes (Ubuntu 24.04 default is 3.12)
if ! command -v python3.11 >/dev/null 2>&1; then
    export DEBIAN_FRONTEND=noninteractive
    apt-get install -y -qq software-properties-common
    add-apt-repository -y ppa:deadsnakes/ppa >/dev/null
    apt-get update -qq
    apt-get install -y -qq python3.11 python3.11-venv python3.11-dev
fi

# 7.2 venv + clone + install (only if not already there)
if [ ! -d /opt/hermes-agent/run_agent.py ] && [ ! -f /opt/hermes-agent/run_agent.py ]; then
    if [ ! -d /opt/hermes-agent ]; then
        echo "[deploy:hermes] /opt/hermes-agent missing; expected rsync to populate it from local clone"
        # rsync -az --exclude=.git --exclude=tests --exclude=/environments --exclude=/website /tmp/hermes-agent/ /opt/hermes-agent/
    fi
fi

if [ ! -d /opt/hermes_venv ]; then
    python3.11 -m venv /opt/hermes_venv
fi
source /opt/hermes_venv/bin/activate
if ! /opt/hermes_venv/bin/hermes --help >/dev/null 2>&1; then
    cd /opt/hermes-agent
    pip install --upgrade pip -q
    pip install -e . -q
fi

# 7.3 Config + skill link (only patch missing parts; never clobber existing)
mkdir -p /root/.hermes /root/.hermes/skills
if [ ! -f /root/.hermes/.env ]; then
    HERMES_BEARER=$(openssl rand -hex 32)
    cat > /root/.hermes/.env <<ENVEOF
OPENROUTER_API_KEY=__INJECT_KEY__
OPENAI_API_KEY=__INJECT_KEY__
API_SERVER_ENABLED=true
API_SERVER_PORT=8642
API_SERVER_KEY=${HERMES_BEARER}
ENVEOF
    chmod 600 /root/.hermes/.env
    # Mirror to Gold_Buy's .env so the FastAPI side knows the bearer
    if grep -q "^HERMES_API_KEY=" /opt/gold-buy/.env 2>/dev/null; then
        sed -i "s|^HERMES_API_KEY=.*|HERMES_API_KEY=${HERMES_BEARER}|" /opt/gold-buy/.env
    else
        echo "HERMES_API_KEY=${HERMES_BEARER}" >> /opt/gold-buy/.env
    fi
fi
# Always (re)write config.yaml — keeps platform_toolsets in sync with code.
# Model name is sourced from INJ_MODEL (originally from MODEL_NAME in .env), so
# changing MODEL_NAME in /opt/gold-buy/.env and re-running deploy keeps Hermes
# config in sync without further edits here.
cat > /root/.hermes/config.yaml <<'YAMLEOF'
model:
  default: "__MODEL_NAME__"
  provider: "custom"
  base_url: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  context_length: 131072

# Per-platform toolset whitelist — Hermes 0.13 schema.
# api_server (web chat) gets ZERO tools — pure conversation, no execution surface.
# cli (cron) gets only "skills" so gold_buy_predictor's HTTP-only workflow runs.
platform_toolsets:
  api_server: []
  cli: ["skills"]

# Disable internal MEMORY.md / USER.md to prevent cross-client memory leakage.
memory:
  memory_enabled: false
  user_profile_enabled: false

cron:
  wrap_response: true
  script_timeout_seconds: 180
YAMLEOF
sed -i "s|__MODEL_NAME__|${INJ_MODEL:-qwen3.6-plus}|g" /root/.hermes/config.yaml

# Inject DashScope key into .env if it still has the placeholder
if grep -q "__INJECT_KEY__" /root/.hermes/.env 2>/dev/null && [ -n "${INJ_KEY:-}" ]; then
    python3 - <<'PYEOF'
import os
path = "/root/.hermes/.env"
key = os.environ.get("INJ_KEY", "")
if key:
    txt = open(path).read().replace("__INJECT_KEY__", key)
    open(path, "w").write(txt)
PYEOF
fi

# 7.4 Skill softlink (idempotent)
SKILL_SRC="/opt/gold-buy/hermes_skills/gold_buy_predictor"
SKILL_DST="/root/.hermes/skills/gold_buy_predictor"
if [ -d "$SKILL_SRC" ]; then
    ln -sfn "$SKILL_SRC" "$SKILL_DST"
fi

# 7.5 systemd unit for hermes-gateway (idempotent)
if [ ! -f /etc/systemd/system/hermes-gateway.service ]; then
    cat > /etc/systemd/system/hermes-gateway.service <<'UNITEOF'
[Unit]
Description=Hermes Agent Gateway (Aurum bridge)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
WorkingDirectory=/root
Environment="PATH=/opt/hermes_venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ExecStart=/opt/hermes_venv/bin/hermes gateway run
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
UNITEOF
    systemctl daemon-reload
fi
systemctl enable hermes-gateway >/dev/null 2>&1 || true
systemctl restart hermes-gateway

# 7.6 Cron jobs (idempotent — only create if missing by name)
sleep 2
existing_crons=$(/opt/hermes_venv/bin/hermes cron list 2>&1 || true)
if ! echo "$existing_crons" | grep -q "daily_gold_prediction"; then
    /opt/hermes_venv/bin/hermes cron create \
        --name daily_gold_prediction \
        --skill gold_buy_predictor \
        --workdir /opt/gold-buy \
        "50 2 * * *" \
        "SOURCE=cron. POST daily/run today, verify yesterday, fetch accuracy, post commentary to /api/predictions/inbox." >/dev/null 2>&1 || true
fi
if ! echo "$existing_crons" | grep -q "daily_gold_verify"; then
    /opt/hermes_venv/bin/hermes cron create \
        --name daily_gold_verify \
        --skill gold_buy_predictor \
        --workdir /opt/gold-buy \
        "10 3 * * *" \
        "SOURCE=cron. POST /api/predictions/daily/verify for yesterday." >/dev/null 2>&1 || true
fi

# 7.7 Health check
sleep 3
if curl -fsS -m 4 http://127.0.0.1:8642/health >/dev/null 2>&1; then
    echo "[deploy:hermes] gateway healthy"
else
    echo "[deploy:hermes] WARN: gateway not responding on 8642 — check 'systemctl status hermes-gateway'"
fi
true
REMOTE_HERMES

# ---- 8. Final smoke test ----------------------------------------------
echo "[deploy] step 8/8 · final smoke test"
ssh_run "bash -s" <<'REMOTE_SMOKE'
set -uo pipefail
echo "----- service status -----"
systemctl status gold-buy --no-pager | head -10
echo
echo "----- /api/predictions/today -----"
curl -sS -m 5 http://127.0.0.1/api/predictions/today | head -c 600
echo
echo "----- /api/predictions/accuracy?window=30d -----"
curl -sS -m 5 "http://127.0.0.1/api/predictions/accuracy?window=30d" | head -c 400
echo
REMOTE_SMOKE

echo "[deploy] done · http://${DEPLOY_HOST#*@}/"
