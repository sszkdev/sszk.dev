import { html } from "hono/html";
import type { PostSummary } from "../posts/posts";
import { layout } from "./layout";

export function renderHome(posts: PostSummary[]) {
  return layout(
    "Home",
    html`<main>
      <h1>sszkdev</h1>
      <ul>
        ${posts.map(
          (post) => html`<li>
            <a href="/posts/${post.date}/${post.slug}">${post.title}</a>
            <p>${post.excerpt}</p>
          </li>`
        )}
      </ul>
    </main>`
  );
}
