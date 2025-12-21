import { html } from "hono/html";
import layoutCss from "./layout.css";

export function layout(title: string, body: unknown) {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <link rel="stylesheet" href="/font" />
        <style>
          ${layoutCss}
        </style>
      </head>
      <body>
        ${body}
      </body>
    </html>`;
}
