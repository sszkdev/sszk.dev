import { PostService } from "./services/postService";
import type { PostDetail, PostSummary } from "./services/postService";

const postService = new PostService();

export type { PostDetail as Post, PostSummary };

export function listPosts(): PostSummary[] {
  return postService.listPosts();
}

export function findPost(date: string, slug: string): PostDetail | null {
  return postService.getPost(date, slug);
}
