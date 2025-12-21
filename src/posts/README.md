# Posts

[English version here](#posts-1)

## ファイル命名

- Markdown ファイルは `src/posts/md/` に置く。
- ファイル名は `YYYY-MM-DD-slug.md`（例: `2024-01-01-hello-world.md`）。
- `date` と `slug` はファイル名から取得する。

## Markdown ルール

- 最初の空行ではない行は `# ` から始めてタイトルにする。
- タイトルがない場合は `Set Title using "# Title in start"`とフォールバックで設定される

## 対応 Markdown（現状）

- 見出し: `#` 〜 `######`
- 箇条書き: `- item`
- 段落: プレーンテキストの行から構成

# Posts

## File Naming

- Place Markdown files in `src/posts/md/`.
- Filenames must follow `YYYY-MM-DD-slug.md` (e.g., `2024-01-01-hello-world.md`).
- `date` and `slug` are derived from the filename.

## Markdown Rules

- The first non-empty line should start with `# ` and is used as the title.
- If no title is found, it falls back to `Set Title using "# Title in start"`.

## Supported Markdown (Current)

- Headings: `#` to `######`
- Lists: `- item`
- Paragraphs: plain text lines
