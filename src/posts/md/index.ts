import postHelloWorld from "./2025-12-21-hello-world.md";
import postNewTechStack from "./2025-12-22-new-tech-stack.md";

// Prompt template for future updates:
// "src/posts/md/ のファイル構成を変更しました。現在の md 配下のファイル一覧に合わせて
// src/posts/md/index.ts の import と posts 配列を更新してください。"

export const posts = [
  { filename: "2025-12-21-hello-world.md", content: postHelloWorld },
  { filename: "2025-12-22-new-tech-stack.md", content: postNewTechStack },
];
