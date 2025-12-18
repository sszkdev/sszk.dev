import { Hono } from "hono";
import { html, raw } from "hono/html";

const app = new Hono();

app.get("/", (c) => {
  return c.html(html`<h1>Hello, sszkdev</h1>`);
});

export default app;
