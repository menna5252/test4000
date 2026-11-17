'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


 const tabs = [
    {href:"/login",label:"Login"},
    {href:"/register",label:"Register"},
 ]

export default function AuthTabs() {
    const pathname = usePathname()
   
  return (
    <div className='grid grid-cols-2 p-2 bg-gray-100 text-center'>
     {tabs.map((tab)=>{
        return(
            <Link className={`${pathname === tab.href && "bg-white text-blue-900"}`}
             key={tab.href} href={tab.href}>{tab.label}</Link>
        )
     })}
    </div>
  )
}
