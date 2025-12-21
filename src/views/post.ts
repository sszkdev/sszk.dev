import { html, raw } from "hono/html";
import type { Post } from "../posts/posts";
import { layout } from "./layout";

export function renderPost(post: Post) {
  const displayTitle = post.title;

  return layout(
    displayTitle,
    html`<main>
      <article>
        <h1>${displayTitle}</h1>
        <p>Published: ${post.date}</p>
        ${raw(post.html)}
      </article>
      <p><a href="/">Back to home</a></p>
    </main>`
  );
}
