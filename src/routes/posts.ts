import { Hono } from "hono";
import { findPost } from "../posts";
import { renderPost } from "../views/post";

const app = new Hono();

app.get("/:date/:slug", (c) => {
  const { date, slug } = c.req.param();
  const post = findPost(date, slug);

  if (!post) {
    return c.notFound();
  }

  return c.html(renderPost(post));
});

export default app;
