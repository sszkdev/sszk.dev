import { html } from "hono/html";
import { layout } from "./layout";

export function renderNotFound() {
  return layout(
    "Not Found",
    html`<main>
      <h1>Not Found</h1>
      <p>The post you requested does not exist.</p>
      <p><a href="/">Back to home</a></p>
    </main>`
  );
}
