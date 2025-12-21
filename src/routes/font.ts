import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const css = `@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&display=swap");

body {
  font-family: "Noto Serif JP", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.noto-serif-jp-default {
  font-family: "Noto Serif JP", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
`;

  return c.text(css, 200, {
    "Content-Type": "text/css; charset=utf-8",
  });
});

export default app;
