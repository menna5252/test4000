'use client'
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { createPost } from '@/lib/action/posts.action';
import { Post } from '@/types/posts';
import React, { useEffect, useRef, useState, useTransition } from 'react'

interface PostFormProps {
    onSubmit:(formData:FormData)=>Promise<{success:boolean,message:string}>
    post?:Post
    editMode?:boolean
    setEditMode?:(editMode:boolean)=>void
}

export default function PostForm({onSubmit,post,editMode,setEditMode}:PostFormProps) {
       const postImgRef = useRef<HTMLInputElement>(null);
     const [postBody, setPostBody] = useState(post?.body || "");
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(true);

  

  function onChangePhotoHandler() {
    console.log(postImgRef.current?.files);
    const imgFile = postImgRef.current?.files?.[0];
    if (!imgFile) return;
    setShowImage(true);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(imgFile);
    setPreviewUrl(URL.createObjectURL(imgFile));

  }

  function removeImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
      setShowImage(false);
    setPreviewUrl(null);
    setPreviewUrl(null);
     if (postImgRef.current) postImgRef.current.value = '';
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      console.log("Submit fired");
    e.preventDefault();

    const postForm = new FormData();
    if (postBody) postForm.append("body", postBody);
    if (file) {
  postForm.append("image", file);
} else if (!showImage && post) {
  postForm.delete("image");
}
    
    startTransition(async () => {
        console.log('postForm', postForm);
        const response = await onSubmit(postForm);
        if(response.success) {
            
            setPostBody("");
           removeImage();
           toast.add({
                   type:'success',
                   description:response.message
                  })
                  if(editMode) setEditMode?.(false)
        }
    
    console.log(response);
    })
  }
  return (
   <div>
  {/* component */}
  <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
  <style dangerouslySetInnerHTML={{__html: "\n  body {background:white !important;}\n" }} />
  <form onSubmit={handleSubmit} className="editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg  mb-4">
    <textarea value={postBody} onChange={(e) => setPostBody(e.target.value)} className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Describe everything about this post here"  />
    {/* icons */}
    <div className="icons flex text-gray-500 m-2">
    <input type="file" name="" id="" accept='image/*'  ref={postImgRef} onChange={onChangePhotoHandler}/>
      <svg onClick={()=>postImgRef.current?.click()} className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
      <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
    </div>
          {(showImage && (previewUrl || post?.image) ) && <img src={previewUrl || post?.image} alt="preview" className="w-full" />}

    {/* buttons */}
    <div className="buttons flex gap-2">
      <Button disabled={isPending}  type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer  text-gray-200 bg-blue-500">
        {isPending ? "Posting..." : "Post"}
      </Button>
      <Button className="btn border border-red-500 p-1 px-4 font-semibold cursor-pointer  text-gray-200 bg-red-500" onClick={removeImage}>REMOVE IMAGE</Button>
    </div>
  </form>
</div>
  )
}
