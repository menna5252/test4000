// app/(main)/posts/[id]/page.tsx
import { getPostById } from "@/lib/services/posts.service";
import { PostCard } from "../../_components/posts/PostCard";

export default async function PostDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getPostById(id);
  console.log(res); 

  return <div className="max-w-4xl mx-auto my-5">
    <PostCard post={res.data.post} />
  </div>;
}

