'use client'
import React, { useEffect, useState } from "react";
import { Image } from "@imagekit/next";
import { IVideo } from "@/models/video.model";
import { useRouter } from "next/navigation";

const Videos = () => {
  const [videos, setvideos] = useState<IVideo[]>([]);
  const [loading, setloading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    fetchVideos();
  }, []);


  

  const fetchVideos = async () => {
    try {
      setloading(true);
      const res = await fetch("/api/video");
      const data = await res.json();
      if (!res.ok) {
        console.log("Error", data?.error);
        return;
      }
      setvideos(data);
    } catch (error) {
      console.log("Unable to fetch the videos", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
    
    <div className="py-6 px-4 md:px-8">
      {loading ? (
        <p className="text-center text-gray-400">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-400">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video: IVideo, i) => (
            <div
              key={i} onClick={() => {
                
                  router.push(`/${video._id}`)

              }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg hover:scale-[1.01] transition-all duration-300 hover:bg-gray-900 active:scale-110"
            >
              <div className="w-full h-[180px] bg-black flex items-center justify-center">
                <Image
                  alt="Video Thumbnail"
                  src={video.thumbnailUrl}
                  width={300}
                  height={180}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-white font-semibold text-lg line-clamp-1">
                  {video.title}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Videos;
