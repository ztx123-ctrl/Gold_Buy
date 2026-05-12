import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("aurum-chat-bubble")
export class ChatBubble extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width: 100%;
      margin-bottom: 14px;
    }
    :host([variant="user"]) {
      justify-content: flex-end;
    }
    :host([variant="assistant"]) {
      justify-content: flex-start;
    }
    .bubble {
      max-width: min(720px, 88%);
      padding: 12px 16px;
      border-radius: 14px;
      line-height: 1.65;
      font-size: 15px;
      white-space: pre-wrap;
      word-break: break-word;
      box-shadow: var(--shadow-xs);
      border: 1px solid transparent;
    }
    :host([variant="user"]) .bubble {
      background: var(--c-text);
      color: var(--c-bg);
      border-bottom-right-radius: 4px;
    }
    :host([variant="assistant"]) .bubble {
      background: var(--c-surface);
      color: var(--c-text);
      border-color: var(--c-border);
      border-bottom-left-radius: 4px;
    }
    .meta {
      font-size: 11px;
      color: var(--c-text-mute);
      margin-top: 6px;
      letter-spacing: 0.04em;
    }
    :host([variant="user"]) .meta { text-align: right; }
    .typing {
      display: inline-flex;
      gap: 4px;
      vertical-align: middle;
      margin-left: 2px;
    }
    .typing span {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.5;
      animation: blink 1.2s infinite ease-in-out;
    }
    .typing span:nth-child(2) { animation-delay: 0.15s; }
    .typing span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes blink {
      0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
      40% { opacity: 0.95; transform: translateY(-1px); }
    }
    .stack {
      display: flex;
      flex-direction: column;
      max-width: 100%;
    }
  `;

  @property({ reflect: true }) variant: "user" | "assistant" = "assistant";
  @property() content = "";
  @property({ type: Boolean }) typing = false;
  @property() meta = "";

  render() {
    return html`
      <div class="stack">
        <div class="bubble">${this.content}${this.typing ? html`<span class="typing"><span></span><span></span><span></span></span>` : null}</div>
        ${this.meta ? html`<div class="meta">${this.meta}</div>` : null}
      </div>
    `;
  }
}
