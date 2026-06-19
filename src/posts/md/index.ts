import postHelloWorld from "./2025-12-21-hello-world.md";
import postNewService from "./2025-12-22-new-service.md";
import postTechStack from "./2025-12-24-tech-stack.md";

// Prompt template for future updates:
// "src/posts/md/ のファイル構成を変更しました。現在の md 配下のファイル一覧に合わせて
// src/posts/md/index.ts の import と posts 配列を更新してください。"

export interface PostEntry {
  filename: string;
  content: string;
  // true の記事は一覧にも詳細にも出さない（直接URLアクセスも404）。
  draft?: boolean;
}

export const posts: PostEntry[] = [
  { filename: "2025-12-21-hello-world.md", content: postHelloWorld },
  { filename: "2025-12-22-new-service.md", content: postNewService, draft: true },
  { filename: "2025-12-24-tech-stack.md", content: postTechStack, draft: true },
];
