
import { getPosts } from '@/lib/services/posts.service';
import { getToken } from '@/utilties/get-token'
import React, { Suspense } from 'react'
import { PostCard } from './_components/posts/PostCard';
import PostList from './_components/posts/PostList';
import CreatePost from './_components/posts/CreatePost';

export  default async  function HomePage() {
console.log(await getToken())

  return (
     <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 my-7">
      <aside className="col-span-3">Links</aside>
      <section className="col-span-6">
        <CreatePost/>
        <h1>Posts</h1>
        <Suspense fallback={'loading...'}>
          <PostList/>
        </Suspense>
      </section>
      <aside className="col-span-3">followers</aside>
    </div>
  )
}
