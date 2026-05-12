import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { api, type AssetMeta, getCurrentAsset, setCurrentAsset } from "../api/client";

const NAV = [
  { href: "/app", label: "看板" },
  { href: "/app/predictions", label: "预测中心" },
  { href: "/app/chat", label: "Hermes" },
  { href: "/app/records", label: "历史记录" },
  { href: "/app/insights", label: "洞察" },
  { href: "/app/settings", label: "设置" },
];

@customElement("aurum-shell")
export class AppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }
    .topbar {
      position: sticky;
      top: 0;
      z-index: 30;
      background: color-mix(in srgb, var(--c-bg) 86%, transparent);
      backdrop-filter: saturate(160%) blur(14px);
      -webkit-backdrop-filter: saturate(160%) blur(14px);
      border-bottom: 1px solid var(--c-border);
    }
    .inner {
      width: min(1240px, calc(100% - 48px));
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 0;
      gap: 16px;
    }
    a.brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      color: inherit;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .mark {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: var(--gradient-mark);
      box-shadow: var(--shadow-xs), inset 0 1px 0 rgba(255, 255, 255, 0.18);
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0;
    }
    .mark::after {
      content: "";
      position: absolute;
      inset: 6px;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.34);
      border-bottom-color: transparent;
      border-left-color: transparent;
      pointer-events: none;
    }
    .brand-name { font-size: 15px; }
    .brand-tag {
      font-size: 12px;
      color: var(--c-text-mute);
      letter-spacing: 0.04em;
    }
    nav {
      display: flex;
      gap: 4px;
    }
    nav a {
      padding: 8px 12px;
      font-size: 14px;
      color: var(--c-text-soft);
      border-radius: 6px;
      transition: background var(--dur-fast) var(--ease-out),
                  color var(--dur-fast) var(--ease-out);
    }
    nav a:hover { color: var(--c-text); background: var(--c-accent-soft); }
    nav a.active { color: var(--c-text); background: var(--c-accent-soft); }
    .right {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .icon-btn {
      width: 34px; height: 34px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      color: var(--c-text-soft);
      border: 1px solid transparent;
      transition: background var(--dur-fast) var(--ease-out),
                  border-color var(--dur-fast) var(--ease-out),
                  color var(--dur-fast) var(--ease-out);
    }
    .icon-btn:hover {
      color: var(--c-text);
      background: var(--c-surface);
      border-color: var(--c-border);
    }
    select.asset-picker {
      height: 34px;
      padding: 0 28px 0 10px;
      border-radius: 8px;
      border: 1px solid var(--c-border);
      background: var(--c-surface);
      color: var(--c-text);
      font-size: 13px;
      font-family: var(--font-sans);
      cursor: pointer;
      appearance: none;
      background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
                        linear-gradient(135deg, currentColor 50%, transparent 50%);
      background-position: calc(100% - 14px) 14px, calc(100% - 10px) 14px;
      background-size: 4px 4px;
      background-repeat: no-repeat;
    }
    select.asset-picker:hover {
      border-color: color-mix(in srgb, var(--c-border) 60%, var(--c-text));
    }
    @media (max-width: 760px) {
      .inner { flex-wrap: wrap; padding: 10px 0; }
      nav { order: 3; width: 100%; overflow-x: auto; padding-bottom: 4px; }
      .brand-tag { display: none; }
    }
  `;

  @property() current = "/";
  @state() private theme = "auto";
  @state() private assets: AssetMeta[] = [];
  @state() private currentAsset = "gold";

  connectedCallback(): void {
    super.connectedCallback();
    this.theme = document.documentElement.getAttribute("data-theme") || "auto";
    window.addEventListener("popstate", this._onNav);
    this.current = window.location.pathname || "/";
    this.currentAsset = getCurrentAsset();
    void this._loadAssets();
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this._onNav);
  }

  private async _loadAssets() {
    try {
      const res = await api.assets();
      this.assets = res.items;
      const valid = res.items.some((it) => it.key === this.currentAsset);
      if (!valid && res.items.length) {
        this._onAssetChange(res.items[0].key);
      }
    } catch {
      // Asset registry unreachable — leave the selector empty; default routing
      // still falls back to "gold" on the backend.
    }
  }

  private _onAssetChange(asset: string) {
    if (asset === this.currentAsset) return;
    setCurrentAsset(asset);
    this.currentAsset = asset;
    // Reload so every page re-fetches data under the new asset context. Simpler
    // than threading the change through every Lit page reactive system.
    window.location.reload();
  }
  protected updated(_props: PropertyValues): void {
    this.current = window.location.pathname || "/";
  }
  private _onNav = () => { this.current = window.location.pathname || "/"; };
  private _toggleTheme = () => {
    const next = this.theme === "dark" ? "light" : this.theme === "light" ? "auto" : "dark";
    this.theme = next;
    if (next === "auto") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", next);
    }
    try { localStorage.setItem("aurum.theme", next); } catch { /* noop */ }
    this.dispatchEvent(new CustomEvent("theme-change", { bubbles: true, composed: true, detail: { theme: next } }));
  };

  render() {
    const themeIcon = this.theme === "dark" ? "🌙" : this.theme === "light" ? "☀️" : "⚙️";
    return html`
      <header class="topbar">
        <div class="inner">
          <a class="brand" href="/" data-route>
            <span class="mark">Au</span>
            <span class="brand-name">Aurum</span>
            <span class="brand-tag">· 大宗商品结构化预测</span>
          </a>
          <nav>
            ${NAV.map((item) => html`
              <a
                data-route
                href="${item.href}"
                class="${this.current === item.href || (item.href !== "/app" && this.current.startsWith(item.href)) ? "active" : ""}"
              >${item.label}</a>
            `)}
          </nav>
          <div class="right">
            ${this.assets.length > 1 ? html`
              <select
                class="asset-picker"
                title="切换分析资产"
                .value=${this.currentAsset}
                @change=${(e: Event) => this._onAssetChange((e.target as HTMLSelectElement).value)}
              >
                ${this.assets.map((a) => html`
                  <option value="${a.key}" ?selected=${a.key === this.currentAsset}>${a.label_zh}</option>
                `)}
              </select>
            ` : ""}
            <button class="icon-btn" @click=${this._toggleTheme} title="切换主题（auto / light / dark）">${themeIcon}</button>
          </div>
        </div>
      </header>
      <main>
        <slot></slot>
      </main>
    `;
  }
}
