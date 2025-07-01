'use client'
import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import UploadFile from './VideoUpload'


const Navbar = () => {
    const router = useRouter()
    const [isUploadMounted, setisUploadMounted] = useState(false)
    const {data : session} = useSession()

    

  return (
   <>
   {isUploadMounted && <UploadFile onClose={() => setisUploadMounted(false)} isMounted={isUploadMounted}/>}
     <div className='w-screen h-16 md:px-12 px-4 md:py-4 py-2 bg-gray-500 flex items-center justify-between'>
      <h1>Reel App</h1>
      <div>
        { 
            session ? (
                <div className='flex justify-center items-center  gap-5'>
                <span onClick={() => setisUploadMounted((prev) => !prev)} className='px-3 py-2 cursor-pointer hover:bg-gray-600 duration-200 rounded-lg'><Plus/></span>
                 <span className='px-3 py-2 cursor-pointer hover:bg-gray-600 duration-200 rounded-lg' onClick={() => signOut()}>Logout</span></div>
            ) :  (
                <>
                <span className='px-3 py-2  cursor-pointer hover:bg-gray-600 duration-200 rounded-lg' onClick={() => router.push('/login') }>Login</span>
                </>
            )
        }
      </div>
    </div>
   </>
  )
}

export default Navbar
