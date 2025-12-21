import { html, raw } from "hono/html";
import type { Post } from "../posts/posts";
import { layout } from "./layout";

export function renderPost(post: Post) {
  return layout(
    post.title,
    html`<div class="page">
      <main>
        <article>
          <p>${post.date}</p>
          ${raw(post.html)}
        </article>
        <p><a href="/">Back to home</a></p>
      </main>
    </div>`
  );
}
