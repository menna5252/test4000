import React from 'react'
import PostForm from './PostForm'
import { createPost } from '@/lib/action/posts.action'

export default function CreatePost() {
  return (
  <PostForm onSubmit={createPost}/>
  )
}
