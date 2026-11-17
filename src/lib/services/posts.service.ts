import { ApiResponse } from "@/types/ApiResponse";
import { Post } from "@/types/posts";
import { getToken } from "@/utilties/get-token";

export async function getPosts():Promise<ApiResponse<{ posts: Post[] }>> {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${process.env.API_BASE_URL}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

 

  if (!res.ok) throw new Error(`Failed to fetch posts`);
  return res.json();
}

// src/services/posts.service.ts
export async function getPostById(id: string): Promise<ApiResponse<{ post: Post }>> {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${process.env.API_BASE_URL}/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}