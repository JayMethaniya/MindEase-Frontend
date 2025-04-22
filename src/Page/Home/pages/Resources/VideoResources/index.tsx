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
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-[#F1F8F8] p-8">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-[#1E3A3A] mb-2">🎥 Video Resources</h1>
        <p className="text-[#287371] mb-8">Watch educational videos about mental health and wellness</p>
        
        <div className="grid gap-8 md:grid-cols-2">
          {videoResources.map((resource) => (
            <div 
              key={resource._id}
              className="bg-white w-[400px] h-[300px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-[#DDECE9] cursor-pointer"
              onClick={() => handleVideoClick(resource)}
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

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl p-4 max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#1E3A3A]">{selectedVideo.title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={convertToEmbedUrl(selectedVideo.videoUrl)}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoResources;
