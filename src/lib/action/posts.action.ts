"use server";
import { revalidatePath } from 'next/cache';


import { getToken } from "@/utilties/get-token";


export async function createPost(

  formData: FormData
) {
  const token = await getToken();
  if (!token) return { success: false, message: "Unauthorized" };



  const res = await fetch("https://route-posts.routemisr.com/posts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`
        
     }, 
    body: formData,
  });

  const finalResponse = await res.json();

  if (!res.ok) return { success: false, message: finalResponse.message||"Failed to create post" };
 revalidatePath('/')
 
  return { success: true, message: finalResponse.message||"Post created" };
}
export async function updatePost(

  formData: FormData,id:string
) {
  const token = await getToken();
  if (!token) return { success: false, message: "Unauthorized" };



  const res = await fetch(`https://route-posts.routemisr.com/posts/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`
        
     }, 
    body: formData,
  });

  const finalResponse = await res.json();

  if (!res.ok) return { success: false, message: finalResponse.message||"Failed to UPDATE post" };
 revalidatePath('/')
 
  return { success: true, message: finalResponse.message||"Post UPDATED" };
}
export async function deletePost(

  id:string
) {
  const token = await getToken();
  if (!token) return { success: false, message: "Unauthorized" };



  const res = await fetch(`https://route-posts.routemisr.com/posts/${id}`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}`
        
     }
  });

  const finalResponse = await res.json();

  if (!res.ok) return { success: false, message: finalResponse.message||"Failed to UPDATE post" };
 revalidatePath('/')
 
  return { success: true, message: finalResponse.message||"Post UPDATED" };
}