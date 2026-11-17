import React, { Suspense } from 'react'
import Navbar from './_components/Navbar'

export default function MainLayout({children}:{children:React.ReactNode}) {
  return (
    <div className=' '>
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>
        {children}
    </div>
    
  )
}
