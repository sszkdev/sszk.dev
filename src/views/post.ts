import { html, raw } from "hono/html";
import type { Post } from "../posts";
import { slugToTitle } from "../lib/format";
import { markdownToHtml } from "../lib/markdown";
import { layout } from "./layout";

export function renderPost(post: Post) {
  const displayTitle = post.title || slugToTitle(post.slug);
  const renderedBody = markdownToHtml(post.body);

  return layout(
    displayTitle,
    html`<main>
      <article>
        <h1>${displayTitle}</h1>
        <p>Published: ${post.date}</p>
        ${raw(renderedBody)}
      </article>
      <p><a href="/">Back to home</a></p>
    </main>`
  );
}
