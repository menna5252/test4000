'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast";
import { deletePost } from "@/lib/action/posts.action";
import { Post } from "@/types/posts";
import { useTransition } from "react";

export function AlertDialogBasic({
    open,onOpenChange,post
}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    post:Post
}
)


 {
const [isPending, startTransition] = useTransition();

    async function handleDelete() {
    
    startTransition(async () => {
        
        const response = await deletePost(post._id);
        if(response.success) {
            
           
           toast.add({
                   type:'success',
                   description:response.message
                  })
                  
        }
    
    console.log(response);
    })
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you delete post?</AlertDialogTitle>
          <AlertDialogDescription>
           
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>{isPending?'loading...':'Delete'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
