## このプロジェクトについて

[English version here](#about-this-project)

- Hono を使ったシンプルなブログ/個人サイト構成。
- Markdown を `src/posts/md/` に置くことで記事を管理し、一覧/詳細ページをサーバー側で HTML 化して返却（変換は `marked` を使用）
- ルーティングは `/`（一覧）、`/posts/:date/:slug`（詳細）、`/font`（Google Fonts の CSS 配信）の構成
- URL: https://sszk.dev

## 主要な構造

- `src/index.ts`：Hono のエントリポイント。ルートの定義と 404 を設定。
- `src/routes/`：各ルートのハンドラ
- `src/views/`：HTML 生成ロジック。`layout` で共通 HTML と CSS を組み立てる。
- `src/posts/`：記事の読み込み/パース/HTML 変換の中心。
- `src/posts/md/`：記事 Markdown の実体。
- `types/`：`*.md` と `*.css` を TypeScript で扱うための型定義。

## ディレクトリ構成イメージ

```
.
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── wrangler.jsonc
├── types/
│   ├── css.d.ts
│   └── md.d.ts
└── src/
    ├── index.ts
    ├── routes/
    │   ├── font.ts
    │   ├── home.ts
    │   └── posts.ts
    ├── views/
    │   ├── home.ts
    │   ├── notFound.ts
    │   ├── post.ts
    │   └── layout/
    │       ├── index.ts
    │       ├── layout.css
    │       └── layout.ts
    └── posts/
        ├── README.md
        ├── posts.ts
        ├── services/
        │   ├── markdownConversionService.ts
        │   └── postService.ts
        └── md/
            ├── index.ts
            ├── 2024-01-01-hello-world.md
            └── 2024-02-10-second-post.md
```

## ざっくりしたロジックの流れ

- `src/index.ts` が各ルートに振り分け。
- `/` は `listPosts()` で全記事を取得し、`src/views/home.ts` で一覧 HTML に変換。
- `/posts/:date/:slug` は `findPost()` で該当記事を探し、`src/views/post.ts` で詳細 HTML に変換。
- 記事パースは `src/posts/services/markdownConversionService.ts` が担当。ファイル名から日付/slug を抽出し、本文からタイトル/抜粋/HTML を生成（Markdown 変換は `marked`）。

## Post のルール（ファイル命名や Markdown 制約）

- 詳細は `src/posts/README.md` を参照。
- 記事ファイルは `src/posts/md/` に置き、`YYYY-MM-DD-slug.md` の命名規則に従う。
- タイトルは本文の最初の非空行が `# ` の見出しであることが前提。

## 型定義ファイルの取り扱いについて

このプロジェクトは `*.md` や `*.css` をモジュールとして読み込む構成のため、TypeScript がそれらの拡張子を型として認識できない問題が起きます。そこで `types/` に `*.md` と `*.css` の型宣言をまとめ、拡張子の扱いを明示的にしてビルド時の型エラーを避けています。

## About This Project

- A simple blog/personal site built with Hono.
- Posts are managed as Markdown files in `src/posts/md/`, rendered to HTML on the server for list/detail pages (conversion uses `marked`).
- Routing includes `/` (list), `/posts/:date/:slug` (detail), and `/font` (Google Fonts CSS).
- URL: https://sszk.dev

## Key Structure

- `src/index.ts`: Hono entry point with route definitions and 404 handling.
- `src/routes/`: Route handlers
- `src/views/`: HTML rendering logic; `layout` builds shared HTML and CSS.
- `src/posts/`: Core logic for loading/parsing/rendering posts.
- `src/posts/md/`: Markdown post files.
- `types/`: Type declarations for `*.md` and `*.css`.

## High-Level Logic

- `src/index.ts` routes incoming requests.
- `/` uses `listPosts()` and `src/views/home.ts` to render the list page.
- `/posts/:date/:slug` uses `findPost()` and `src/views/post.ts` to render the detail page.
- Parsing/rendering is handled by `src/posts/services/markdownConversionService.ts`, extracting date/slug from filenames and generating title/excerpt/HTML from content (Markdown conversion uses `marked`).

## Post Rules (Naming and Markdown Constraints)

- See `src/posts/README.md` for details.
- Post files live in `src/posts/md/` and must be named `YYYY-MM-DD-slug.md`.
- The title should be the first non-empty line starting with `# `.
