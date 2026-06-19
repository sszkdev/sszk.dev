import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const css = `body {
  font-family: system-ui, -apple-system, "Segoe UI", "Hiragino Sans",
    "Noto Sans JP", "Yu Gothic UI", Meiryo, sans-serif;
  font-weight: 400;
  font-style: normal;
}

.font-default {
  font-family: system-ui, -apple-system, "Segoe UI", "Hiragino Sans",
    "Noto Sans JP", "Yu Gothic UI", Meiryo, sans-serif;
  font-weight: 400;
  font-style: normal;
}
`;

  return c.text(css, 200, {
    "Content-Type": "text/css; charset=utf-8",
  });
});

export default app;
