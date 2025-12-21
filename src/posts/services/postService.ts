import { posts } from "../md";
import { MarkdownConversionService } from "./markdownConversionService";

/**
 * 一覧表示用のサマリー情報。
 * - タイトル: 最初の "# " 行から取得（無い場合はフォールバック文字列）
 * - 日付: ファイル名の YYYY-MM-DD
 * - スラッグ: ファイル名の date 以降
 * - 抜粋: 本文から最大3行分を抜き出したプレーンテキスト
 */
export interface PostSummary {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
}

/**
 * 詳細表示用の本文情報。
 * - body: Markdown本文（ファイル内容そのまま）
 * - html: 本文をHTMLに変換した文字列（見出し・箇条書き・段落のみ対応）
 */
export interface PostDetail extends PostSummary {
  body: string;
  html: string;
}

export class PostService {
  private conversionService = new MarkdownConversionService();

  listPosts(): PostSummary[] {
    const allPosts = posts.map((post) =>
      this.conversionService.parse(post.content, post.filename)
    );

    return allPosts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(({ title, date, slug, excerpt }) => ({
        title,
        date,
        slug,
        excerpt,
      }));
  }

  getPost(date: string, slug: string): PostDetail | null {
    const allPosts = posts.map((post) =>
      this.conversionService.parse(post.content, post.filename)
    );

    return allPosts.find((post) => post.date === date && post.slug === slug) ?? null;
  }
}
