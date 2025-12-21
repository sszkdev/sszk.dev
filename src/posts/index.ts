import { parseFrontmatter } from "../lib/parseFrontmatter";
import { slugToTitle } from "../lib/format";
import postHelloWorld from "./2024-01-01-hello-world.md";
import postSecond from "./2024-02-10-second-post.md";

export type Post = {
  date: string;
  slug: string;
  title: string;
  body: string;
};

const rawPosts = [postHelloWorld, postSecond];

const posts: Post[] = rawPosts.map((raw) => {
  const { data, content } = parseFrontmatter(raw);
  const slug = data.slug ?? "";
  const title = data.title ?? (slug ? slugToTitle(slug) : "Untitled");
  const date = data.date ?? "";

  return {
    date,
    slug,
    title,
    body: content,
  };
});

export function listPosts(): Post[] {
  return posts;
}

export function findPost(date: string, slug: string): Post | undefined {
  return posts.find((post) => post.date === date && post.slug === slug);
}
