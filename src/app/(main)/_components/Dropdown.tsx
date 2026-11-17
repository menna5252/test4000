"use client"

import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  Menu,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { getToken } from "@/utilties/get-token"

export function DropdownMenuAvatar() {
     
    const {data} = useSession()
   const user = data?.user;
   console.log(user)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost"  className="rounded-full gap-2 flex items-center border bg-gray-100 py-5">
        <Avatar>
          <AvatarImage src={user?.image} alt="shadcn" />
      
          <AvatarFallback>Loading...</AvatarFallback>
        </Avatar>
          <span>{user?.name}</span>
         <Menu/>
          </Button>} />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            setting
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"cursor-pointer text-red-500 hover:text-red-500!"} onClick={() => signOut({
          callbackUrl:"/login"
        })}>
          <LogOutIcon color="red"/>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
