import { Hono } from "hono";
import { listPosts } from "../posts";
import { renderHome } from "../views/home";

const app = new Hono();

app.get("/", (c) => {
  const posts = listPosts();
  return c.html(renderHome(posts));
});

export default app;
