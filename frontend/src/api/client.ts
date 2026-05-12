import type {
  AccuracyMetricsV2,
  AccuracySnapshot,
  AnalysisRecord,
  CalibrationBucket,
  ChannelStatus,
  ChatGreeting,
  ChatMessage,
  ChatSession,
  DailyPrediction,
  DistributionSnapshot,
  Envelope,
  KPISummary,
  TimeSeriesPoint,
} from "./schemas";

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

function _readAdminToken(): string | null {
  try {
    const value = localStorage.getItem("aurum.adminToken");
    return value && value.trim() ? value.trim() : null;
  } catch {
    return null;
  }
}

const ASSET_STORAGE_KEY = "aurum.asset";
const ASSET_KEY_RE = /^[a-z][a-z0-9_]{1,31}$/;
let _cachedAsset: string | null = null;
const _assetListeners = new Set<(asset: string) => void>();

export function getCurrentAsset(): string {
  if (_cachedAsset && ASSET_KEY_RE.test(_cachedAsset)) {
    return _cachedAsset;
  }
  try {
    const stored = localStorage.getItem(ASSET_STORAGE_KEY);
    if (stored && ASSET_KEY_RE.test(stored)) {
      _cachedAsset = stored;
      return stored;
    }
  } catch { /* localStorage disabled — fall through */ }
  _cachedAsset = "gold";
  return _cachedAsset;
}

export function setCurrentAsset(asset: string): void {
  if (!ASSET_KEY_RE.test(asset)) {
    throw new Error(`invalid asset key: ${asset}`);
  }
  if (_cachedAsset === asset) return;
  _cachedAsset = asset;
  try {
    localStorage.setItem(ASSET_STORAGE_KEY, asset);
  } catch { /* ignore */ }
  for (const fn of _assetListeners) {
    try { fn(asset); } catch { /* ignore listener errors */ }
  }
}

export function onAssetChange(fn: (asset: string) => void): () => void {
  _assetListeners.add(fn);
  return () => { _assetListeners.delete(fn); };
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  attempts = 1,
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...((init.headers || {}) as Record<string, string>),
      };
      const token = _readAdminToken();
      if (token && !headers["X-Admin-Token"]) {
        headers["X-Admin-Token"] = token;
      }
      if (!headers["X-Aurum-Asset"]) {
        headers["X-Aurum-Asset"] = getCurrentAsset();
      }
      const response = await fetch(path, {
        ...init,
        headers,
      });
      let body: Envelope<T> | null = null;
      try {
        body = (await response.json()) as Envelope<T>;
      } catch {
        body = null;
      }
      if (!response.ok) {
        const detail = body && "error" in body && body.error
          ? body.error
          : `HTTP ${response.status}`;
        throw new ApiError(detail, response.status);
      }
      if (!body || body.success === false) {
        throw new ApiError(
          body && "error" in body && body.error ? body.error : "请求失败",
          response.status,
        );
      }
      return body.data;
    } catch (error) {
      lastError = error;
      if (i === attempts - 1) break;
      await new Promise((r) => setTimeout(r, 200 * (i + 1)));
    }
  }
  throw lastError instanceof Error ? lastError : new ApiError("请求失败");
}

export interface AssetMeta {
  key: string;
  label_zh: string;
  markets: Array<{ id: string; label: string; unit: string }>;
  interval_analysis_enabled: boolean;
}

export const api = {
  // Registered instruments + default for the asset selector
  assets: () => request<{ default: string; items: AssetMeta[] }>("/api/assets"),

  // Live spot price + market state (huilvbiao mirror)
  price: () => request<{
    price_raw: string;
    price_value: number | null;
    data_timestamp: string | null;
    data_label: string | null;
    comex_open: boolean | null;
    sge_open: boolean | null;
    fetched_at: string;
  }>("/api/price"),

  // Analysis pipeline
  runAnalysis: () => request<AnalysisRecord>("/api/analysis/run", { method: "POST" }, 1),

  records: () => request<AnalysisRecord[]>("/api/records"),
  recordsLatest: (n = 30) => request<AnalysisRecord[]>(`/api/records/latest?n=${n}`),
  deleteRecord: (id: string) => request<{ message: string }>(`/api/records/${encodeURIComponent(id)}`, { method: "DELETE" }),

  // Analytics
  timeseries: (range = "24h") => request<{ range: string; points: TimeSeriesPoint[] }>(`/api/analytics/timeseries?range=${range}`),
  distribution: (range = "24h") => request<DistributionSnapshot>(`/api/analytics/distribution?range=${range}`),
  kpis: (range = "24h") => request<KPISummary>(`/api/analytics/kpis?range=${range}`),
  dashboard: (limit = 24) => request<any>(`/api/dashboard/summary?limit=${limit}`),

  // Predictions
  runDaily: (date?: string) => request<DailyPrediction>(`/api/predictions/daily/run${date ? `?date=${date}` : ""}`, { method: "POST" }),
  verifyDaily: (date?: string) => request<{ prediction: DailyPrediction; verified: boolean }>(`/api/predictions/daily/verify${date ? `?date=${date}` : ""}`, { method: "POST" }),
  todayPrediction: () => request<DailyPrediction | null>("/api/predictions/today"),
  dailyPredictions: (range = "30d") => request<{ range: string; items: DailyPrediction[] }>(`/api/predictions/daily?range=${range}`),
  accuracy: (window = "30d") => request<AccuracySnapshot>(`/api/predictions/accuracy?window=${window}`),
  calibration: (window = "30d", buckets = 5) => request<CalibrationBucket[]>(`/api/predictions/calibration?window=${window}&buckets=${buckets}`),
  metricsDetailed: (
    window = "90d",
    includeSynthetic = true,
    includeSyntheticV1 = false,
    includeReconstructed = false,
    includeRaw = false,
  ) =>
    request<AccuracyMetricsV2>(
      `/api/predictions/metrics/detailed?window=${window}` +
        `&include_synthetic=${includeSynthetic}` +
        `&include_synthetic_v1=${includeSyntheticV1}` +
        `&include_reconstructed=${includeReconstructed}` +
        `&include_raw=${includeRaw}`,
    ),

  // Notifications
  channels: () => request<ChannelStatus>("/api/notifications/channels"),
  testNotification: (token: string) => request<{ results: Record<string, boolean> }>("/api/notifications/test", {
    method: "POST",
    headers: { "X-Admin-Token": token },
  }),

  // Hermes chat
  chat: {
    greeting: () => request<ChatGreeting>("/api/chat/greeting"),
    listSessions: (clientId: string) =>
      request<ChatSession[]>("/api/chat/sessions", {
        headers: { "X-Aurum-Client-Id": clientId },
      }),
    createSession: (clientId: string, title?: string) =>
      request<ChatSession>("/api/chat/sessions", {
        method: "POST",
        headers: { "X-Aurum-Client-Id": clientId },
        body: JSON.stringify({ title }),
      }),
    deleteSession: (sessionId: string, clientId: string) =>
      request<{ archived: boolean; session_id: string }>(
        `/api/chat/sessions/${encodeURIComponent(sessionId)}`,
        {
          method: "DELETE",
          headers: { "X-Aurum-Client-Id": clientId },
        },
      ),
    listMessages: (sessionId: string, clientId: string) =>
      request<ChatMessage[]>(
        `/api/chat/sessions/${encodeURIComponent(sessionId)}/messages`,
        { headers: { "X-Aurum-Client-Id": clientId } },
      ),
    streamMessage: async function* (
      sessionId: string,
      clientId: string,
      content: string,
    ): AsyncGenerator<string, void, void> {
      const url = `/api/chat/sessions/${encodeURIComponent(sessionId)}/message`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Aurum-Client-Id": clientId,
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        let detail = `HTTP ${response.status}`;
        try {
          const body = await response.json();
          if (body && typeof body === "object" && "detail" in body) {
            detail = String((body as Record<string, unknown>).detail);
          } else if (body && typeof body === "object" && "error" in body) {
            detail = String((body as Record<string, unknown>).error);
          }
        } catch { /* ignore */ }
        throw new ApiError(detail, response.status);
      }
      const reader = response.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          const text = decoder.decode(value, { stream: true });
          if (text) yield text;
        }
      }
      const tail = decoder.decode();
      if (tail) yield tail;
    },
  },
};

let _cachedClientId: string | null = null;

// Must match the server-side check in app.py:_CLIENT_ID_RE.
const CLIENT_ID_RE = /^[A-Za-z0-9_-]{16,128}$/;

function _isValidClientId(s: string | null | undefined): s is string {
  return typeof s === "string" && CLIENT_ID_RE.test(s);
}

function _generateClientId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch { /* ignore */ }
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getOrCreateClientId(): string {
  if (_isValidClientId(_cachedClientId)) {
    return _cachedClientId;
  }
  try {
    const stored = localStorage.getItem("aurum.clientId");
    if (_isValidClientId(stored)) {
      _cachedClientId = stored;
      return stored;
    }
  } catch { /* localStorage disabled — proceed to generation */ }

  const fresh = _generateClientId();
  _cachedClientId = fresh;
  try {
    localStorage.setItem("aurum.clientId", fresh);
  } catch { /* ignore — keep in-memory */ }
  return fresh;
}

// Server-Sent Events helper
export function subscribeStream(handlers: Partial<Record<string, (payload: unknown) => void>>): () => void {
  if (typeof EventSource === "undefined") return () => undefined;
  const source = new EventSource("/api/stream");
  for (const [type, handler] of Object.entries(handlers)) {
    if (!handler) continue;
    source.addEventListener(type, (ev: MessageEvent) => {
      try {
        const payload = ev.data ? JSON.parse(ev.data) : null;
        handler(payload);
      } catch (err) {
        // ignore malformed
      }
    });
  }
  source.onerror = () => {
    // EventSource auto-reconnects with backoff; nothing to do.
  };
  return () => source.close();
}

export { ApiError };
