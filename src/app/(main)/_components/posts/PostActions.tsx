'use client'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Pin, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlertDialogBasic } from './DeleteDialog'
import { Post } from '@/types/posts'

export default function PostActions({
  setEditMode,post
}: {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  post?:Post
}
) {
const [deleteModal, setDeleteModal] = useState(false);


  return (
   <>
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost"  className="rounded-full gap-2 flex items-center border bg-gray-100 py-5">
       
         <Menu/>
          </Button>} />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setEditMode(true)}>
            <Pin />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteModal(true)}>
            <Trash />
           Delete
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
       
      </DropdownMenuContent>
    </DropdownMenu>
    <AlertDialogBasic open={deleteModal} onOpenChange={setDeleteModal} post={post!} />
   </>
  )
}
