# Posts

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
