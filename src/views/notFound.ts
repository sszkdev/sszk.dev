import { html } from "hono/html";
import { layout } from "./layout";

export function renderNotFound() {
  return layout(
    "Not Found",
    html`<main
      style="min-height: 100vh; display: grid; place-items: start center; padding: 12vh 2rem 2rem; background: radial-gradient(circle at top, #f9f2e7, var(--bg-color));"
    >
      <section
        style="text-align: center; max-width: 36rem; padding: 2.5rem 2rem; border: 1px solid var(--bg-color); border-radius: 16px; box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08); background: #fff;"
      >
        <p
          style="font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--secondary-color); margin: 0 0 0.75rem;"
        >
          404
        </p>
        <h1 style="margin: 0 0 0.5rem; font-size: 2.25rem;">
          Not Found / 見つかりません
        </h1>
        <p style="margin: 0 0 0.5rem; color: var(--text-color);">
          The page you requested does not exist or cannot be accessed.
        </p>
        <p style="margin: 0 0 1.5rem; color: var(--text-color);">
          お探しのページは見つからないか、アクセスできませんでした。
        </p>
        <p style="margin: 0;">
          <a
            href="/"
            style="text-decoration: none; border-bottom: 1px solid currentColor;"
            >Back to home / ホームへ戻る</a
          >
        </p>
      </section>
    </main>`
  );
}
