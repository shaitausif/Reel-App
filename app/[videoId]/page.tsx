'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'next/navigation'
import { Video } from '@imagekit/next'

const page = () => {

    const [showVideo, setshowVideo] = useState(false)
    const [videoData, setvideoData] = useState({
        title : "",
        description : "",
        videoUrl : "",
        thumbnailUrl : ""
      })    
    const params = useParams()



    useEffect(() => {
        fetchVideo()
        const timeout = setTimeout(() => {
            setshowVideo(true)
        }, 1000);

        return () => clearTimeout(timeout)
    }, [params])
    

    const fetchVideo = async() => {
        try {
            const res = await fetch(`/api/video/${params.videoId}`)
            const data = await res.json()
            if(!res.ok){
                alert(data.error)
                console.log(data.error)
                return;
            }
            setvideoData(data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <Navbar z-value='60'/>
      <div className='flex fixed bg-black/50 w-screen justify-center items-center h-screen inset-0 z-50'>
       <div className='h-[90vh] w-[40vw] rounded-lg flex justify-center gap-3 py-6 px-6 bg-gray-600'>
            <div className='w-full h-[400px] flex flex-col gap-3 items-center'>
                {
                    showVideo && (
                        <Video src={videoData?.videoUrl || ""} width={500} height={300} controls className='object-cover rounded-lg' />
                    )
                }
                <h2 className='md:text-2xl text-lg'>{videoData?.title || "No Title found"}</h2>
                <p className='text-gray-400'>{videoData?.description}</p>
                <div>
                    {/* User */}

                </div>
            </div>
       </div> 
    </div>
    </div>
  )
}

export default page
