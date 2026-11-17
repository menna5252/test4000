import React from 'react'
import AuthTabs from './_components/AuthTabs'

export default function AuthLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='max-w-7xl w-full mx-auto grid gap-12 lg:grid-cols-2 items-center min-h-screen'>
    <h1>Route Posts</h1>
    <div className='flex flex-col gap-6 bg-white p-8 rounded-2xl'>
<AuthTabs/>
        {children}
    </div>
    </div>
  )
}
