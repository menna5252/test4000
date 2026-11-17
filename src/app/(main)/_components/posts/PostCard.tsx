'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Post } from "@/types/posts"
import Image from "next/image"
import Link from "next/link"
import PostActions from "./PostActions"
import { useState } from "react"
import PostForm from "./PostForm"
import { updatePost } from "@/lib/action/posts.action"

export function PostCard({ post , currentUserId}: { post: Post, currentUserId?:string }) {
  const [editMode, setEditMode] = useState(false);
    const isOwner = !!currentUserId && currentUserId === post.user._id

  return (
    <Card className=" mx-auto w-full  ">
   <div className="flex justify-between px-4">
     <div className="flex items-center gap-4 ">
    <Image width={50} height={50} src = {post.user.photo} alt="User Image" className="w-12 h-12 rounded-full" />
    <span>{post.user.name}</span>

    </div>
    {isOwner && <PostActions setEditMode={setEditMode} post={post}/>}
   </div>
      <div className=" " />
      {post.image && <Image
        width={500}
        height={500}
        src={post.image}
        alt="Event cover"
        className="w-full object-cover "
      />}
      <CardHeader>
        <CardAction className="pt-4">
          <Badge variant="secondary">{new Date(post.createdAt).toLocaleString('en-US')}</Badge>
        </CardAction>
        
        {post.body && <CardDescription className="">
          {post.body}

        </CardDescription>}
      </CardHeader>
                {editMode && <PostForm post={post} onSubmit={(formData)=>updatePost(formData,post._id)} editMode={editMode} setEditMode={setEditMode} />}

      <CardFooter>
        <Link href={`/posts/${post._id}`} className="w-full cursor-pointer text-blue-500">View Details</Link>
      </CardFooter>
    </Card>
  )
}
