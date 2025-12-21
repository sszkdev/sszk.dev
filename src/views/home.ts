import { html } from "hono/html";
import type { Post } from "../posts";
import { layout } from "./layout";

export function renderHome(posts: Post[]) {
  return layout(
    "Home",
    html`<main>
      <h1>sszkdev</h1>
      <ul>
        ${posts.map(
          (post) => html`<li>
            <a href="/posts/${post.date}/${post.slug}">${post.title}</a>
          </li>`
        )}
      </ul>
    </main>`
  );
}
