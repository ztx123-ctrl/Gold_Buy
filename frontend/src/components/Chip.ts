import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const STYLE_MAP: Record<string, string> = {
  上涨: "chip-up",
  下跌: "chip-down",
  震荡: "chip-flat",
  未知: "chip-unknown",
  success: "chip-up",
  partial: "chip-flat",
  failed: "chip-down",
};

@customElement("aurum-chip")
export class Chip extends LitElement {
  static styles = css`
    :host { display: inline-flex; }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid transparent;
      letter-spacing: 0.01em;
      line-height: 1.2;
    }
    .chip::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.85;
    }
    .chip-up      { color: var(--c-up);      background: var(--c-up-soft);      border-color: var(--c-up-soft); }
    .chip-down    { color: var(--c-down);    background: var(--c-down-soft);    border-color: var(--c-down-soft); }
    .chip-flat    { color: var(--c-flat);    background: var(--c-flat-soft);    border-color: var(--c-flat-soft); }
    .chip-unknown { color: var(--c-unknown); background: var(--c-unknown-soft); border-color: var(--c-unknown-soft); }
    .chip-accent  { color: var(--c-accent);  background: var(--c-accent-soft);  border-color: var(--c-accent-line); }
    .chip-strong  { color: #fff; background: var(--c-text); border-color: var(--c-text); }
  `;

  @property() label = "";
  @property() variant = "";

  render() {
    const cls = STYLE_MAP[this.label] || (this.variant ? `chip-${this.variant}` : "chip-unknown");
    return html`<span class="chip ${cls}">${this.label || "—"}</span>`;
  }
}
