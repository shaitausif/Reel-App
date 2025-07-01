"use client";
import React, { useEffect, useState } from "react";
import { Video } from "@imagekit/next";
import { IVideo } from "@/models/video.model";

const Videos = () => {
  const [videos, setvideos] = useState([]);
  const [loading, setloading] = useState(false);

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
      {videos.length === 0 ? (
        <div></div>
      ) : (
        videos.map((video: IVideo, i) => (
          <div key={i} className="card md:px-4 bg-gray-700 w-fit flex flex-row">
            <Video src={video?.videoUrl} width={200} height={500} controls />

          </div>
        ))
      )}
    </>
  );
};

export default Videos;
