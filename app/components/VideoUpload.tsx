// UploadFile.tsx
'use client';

import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { apiClient } from '@/lib/apiClient';


const UploadFile = ({isMounted, onClose}: {isMounted: boolean, onClose:() => void}) => {

  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [isSubmitting, setisSubmitting] = useState(false)
  const [thumbnailUrl, setthumbnailUrl] = useState("")
  const [videoUrl, setvideoUrl] = useState("")

  const [thumbnailProgress, setthumbnailProgress] = useState(0)
  const [videoProgress, setvideoProgress] = useState(0)


  

  const handleSubmit = async() => {
    try {
      setisSubmitting(true)
      const videoData = {title, description, videoUrl, thumbnailUrl}
      if(title.trim() =="" || description.trim() == ''){
        alert("Please Enter the Title and Description")
        return;
      }
      const res = await fetch("/api/video",
        {method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(videoData)
        }
      )
      console.log(res)
      const data = await res.json()
      
      if(!res.ok){
        console.log("Error:",data?.error)
        return
      }
    } catch (error) {
      console.log("Failed to upload the Video",error)

    } finally {
      setisSubmitting(false)
      setvideoUrl('')
      setthumbnailUrl('')
    }
  }

  return (
   <>
   {
    isMounted && (
       <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-600 p-6 rounded-xl shadow-lg">
        <h1 className='md:text-2xl text-lg text-center'>Upload Video</h1>
        <form className='flex flex-col gap-4 pt-3' onSubmit={handleSubmit}>
          <input type="text" name='title' 
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className='px-2 py-1 outline-none border duration-200 border-gray-600 rounded-lg focus:border-gray-300'  
          placeholder='Enter Title'
          />
          <input type="text" name='description'
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className='px-2 py-1 outline-none border duration-200 border-gray-600 rounded-lg focus:border-gray-300'  
          placeholder='Enter description'
          />
          <div className='flex flex-col'>
            <label htmlFor="" className='text-gray-400'>Upload Video</label>
            <FileUpload            
            onSuccess={(res) => {
            setvideoUrl(res.url)
            console.log(res)
          }}
            onProgress={(progress) => setvideoProgress(progress)}
            fileType='video'
          />

          
         {
          videoProgress > 0 && videoProgress < 100 && (
             <span className='text-right'><input type="range" value={videoProgress} className='w-full h-[5px] bg-gray-300 rounded 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-moz-range-thumb]:appearance-none 
             [&::-ms-thumb]:appearance-none 
             accent-blue-500' />{videoProgress}%</span>
          )
         }
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-400' htmlFor="">Upload Thumbnail</label>
            <FileUpload
          onSuccess={(res) => {
            setthumbnailUrl(res.url)
            console.log(res)
          }}
            onProgress={(progress) => setthumbnailProgress(progress)}
            fileType='image'
          />
          {
            thumbnailProgress > 0 && thumbnailProgress < 100 && (
               <span className='text-right'><input type="range" value={thumbnailProgress} className='w-full h-[5px] bg-gray-300 rounded 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-moz-range-thumb]:appearance-none 
             [&::-ms-thumb]:appearance-none 
             accent-blue-500' />{thumbnailProgress}%</span>
            )
          } 
          </div>
          <div className='w-full flex gap-4 justify-center mt-4'>
            <button className={`bg-blue-500 rounded-lg px-6 py-1.5 hover:bg-blue-600 duration-300 ${ !videoUrl ? 'bg-blue-400' : ''}`} disabled={(!videoUrl || !thumbnailUrl) || isSubmitting}>Submit</button>
            <button onClick={() => onClose()} type='button' className={`bg-red-500 rounded-lg px-6 py-1.5 hover:bg-red-600 duration-300`}>Cancel</button>
          </div>
        
        </form>
      </div>
    </div>
    )
   }
   </>
  );
};

export default UploadFile;
