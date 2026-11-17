import { getPosts } from '@/lib/services/posts.service'
import { PostCard } from './PostCard'
import { getServerSession } from 'next-auth'
import { authOption } from '@/auth';

export  default async function PostList() {
      const data = await getPosts()
      console.log(data);
        const session = await getServerSession(authOption);
        console.log('session', session);
  const currentUserId = session?.user?.id


  return (
    <>
      {data.data.posts.map((post) => (
        <div key={post._id} className="space-y-4 my-4">
          <PostCard post={post} currentUserId={currentUserId}/>
        </div>
      ))}
    </>
  )
}
