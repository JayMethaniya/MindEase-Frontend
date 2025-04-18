import React, { useEffect, useState } from "react";
import axios from "axios";

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  type: string;
}

const convertToEmbedUrl = (url: string): string => {
  try {
    // YouTube
    const youtubeRegex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const ytMatch = url.match(youtubeRegex);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    // Vimeo
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    // Dailymotion
    const dailymotionRegex = /dailymotion\.com\/video\/([a-zA-Z0-9]+)/;
    const dmMatch = url.match(dailymotionRegex);
    if (dmMatch && dmMatch[1]) {
      return `https://www.dailymotion.com/embed/video/${dmMatch[1]}`;
    }

    // Default fallback
    return url;
  } catch {
    return url;
  }
};

const VideoResources = () => {
  const [videoResources, setVideoResources] = useState<Video[]>([]);
  const token = localStorage.getItem("token") || "";

  const fetchVideoResources = async () => {
    try {
      const response = await axios.get("http://localhost:3001/resource/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const videos = (response.data as Video[]).filter(
        (resource: Video) => resource.type === "video"
      );

      setVideoResources(videos);
    } catch (error) {
      console.error("Error fetching video resources:", error);
    }
  };

  useEffect(() => {
    fetchVideoResources();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F8F8] p-8">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold text-[#1E3A3A] mb-2">🎥 Video Resources</h1>
        <p className="text-[#287371] mb-8">Watch educational videos about mental health and wellness</p>
        
        <div className="grid gap-8 md:grid-cols-2">
          {videoResources.map((resource) => (
            <div 
              key={resource._id}
              className="bg-white w-[400px] h-[300px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-[#DDECE9]"
            >
              <h2 className="text-xl font-semibold text-[#1E3A3A] mb-4">{resource.title}</h2>
              <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={convertToEmbedUrl(resource.videoUrl)}
                  title={resource.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoResources;
