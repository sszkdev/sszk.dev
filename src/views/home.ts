import { html } from "hono/html";
import type { PostSummary } from "../posts/posts";
import { layout } from "./layout";

export function renderHome(posts: PostSummary[]) {
  return layout(
    "Home",
    html`<div class="page">
      <main>
        <h1>sszkdev</h1>
        <div class="post-list">
          ${posts.map(
            (post) => html`<article class="post-item">
              <p class="post-date">${post.date}</p>
              <a class="post-title" href="/posts/${post.date}/${post.slug}"
                >${post.title}</a
              >
              <p class="post-excerpt">${post.excerpt}</p>
            </article>`
          )}
        </div>
      </main>
    </div>`
  );
}
