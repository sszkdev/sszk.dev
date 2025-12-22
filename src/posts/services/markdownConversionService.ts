import { marked } from "marked";
import type { PostDetail } from "./postService";

export class MarkdownConversionService {
  parse(raw: string, filename: string): PostDetail {
    const body = raw;
    const { date, slug } = this.parseFilename(filename);
    const title = this.extractTitle(body);
    const html = this.renderMarkdown(body);
    const excerpt = this.buildExcerpt(body);

    return {
      title: title || 'Set Title using "# Title in start"',
      date,
      slug,
      body,
      html,
      excerpt,
    };
  }

  private parseFilename(filename: string): { date: string; slug: string } {
    const base = filename.replace(/\.md$/, "");
    const match = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    if (!match) {
      throw new Error(`Invalid post filename: ${filename}`);
    }
    return { date: match[1], slug: match[2] };
  }

  private extractTitle(body: string): string {
    const lines = body.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        continue;
      }
      const match = trimmed.match(/^#\s+(.+)/);
      return match ? match[1].trim() : "";
    }
    return "";
  }

  private buildExcerpt(body: string): string {
    const lines = body.split(/\r?\n/);
    const excerptLines: string[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        if (excerptLines.length) {
          break;
        }
        continue;
      }
      if (trimmed.startsWith("#")) {
        continue;
      }
      excerptLines.push(this.stripMarkdownPrefix(trimmed));
      if (excerptLines.join(" ").length >= 100) {
        break;
      }
    }
    return excerptLines.join(" ").slice(0, 100);
  }

  private stripMarkdownPrefix(line: string): string {
    if (line.startsWith("- ")) {
      return line.slice(2).trim();
    }
    return line;
  }

  private renderMarkdown(markdown: string): string {
    const html = marked.parse(markdown, { async: false });
    if (typeof html !== "string") {
      throw new Error("Expected synchronous markdown rendering.");
    }
    return html;
  }
}
