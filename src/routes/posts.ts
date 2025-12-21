import { Hono } from "hono";
import { findPost } from "../posts";
import { renderNotFound } from "../views/notFound";
import { renderPost } from "../views/post";

const app = new Hono();

app.get("/:date/:slug", (c) => {
  const { date, slug } = c.req.param();
  const post = findPost(date, slug);

  if (!post) {
    return c.html(renderNotFound(), 404);
  }

  return c.html(renderPost(post));
});

export default app;
