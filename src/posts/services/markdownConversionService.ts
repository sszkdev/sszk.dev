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
      if (excerptLines.length >= 3) {
        break;
      }
    }
    return excerptLines.join(" ");
  }

  private stripMarkdownPrefix(line: string): string {
    if (line.startsWith("- ")) {
      return line.slice(2).trim();
    }
    return line;
  }

  private renderMarkdown(markdown: string): string {
    const lines = markdown.split(/\r?\n/);
    const htmlParts: string[] = [];
    let paragraphLines: string[] = [];
    let inList = false;

    const flushParagraph = () => {
      if (!paragraphLines.length) {
        return;
      }
      htmlParts.push(`<p>${this.escapeHtml(paragraphLines.join(" "))}</p>`);
      paragraphLines = [];
    };

    const closeList = () => {
      if (inList) {
        htmlParts.push("</ul>");
        inList = false;
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushParagraph();
        closeList();
        continue;
      }

      const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)/);
      if (headingMatch) {
        flushParagraph();
        closeList();
        const level = headingMatch[1].length;
        htmlParts.push(
          `<h${level}>${this.escapeHtml(headingMatch[2].trim())}</h${level}>`
        );
        continue;
      }

      const listMatch = trimmed.match(/^-+\s+(.+)/);
      if (listMatch) {
        flushParagraph();
        if (!inList) {
          htmlParts.push("<ul>");
          inList = true;
        }
        htmlParts.push(`<li>${this.escapeHtml(listMatch[1].trim())}</li>`);
        continue;
      }

      paragraphLines.push(trimmed);
    }

    flushParagraph();
    closeList();

    return htmlParts.join("");
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
}
