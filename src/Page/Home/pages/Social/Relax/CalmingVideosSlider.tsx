import React, { useState, useEffect } from "react";
import VideoSlider from "../../../../../components/Slider/index";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
}

const CalmingVideosSlider: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = "AIzaSyApVeK3cmd63M7u-bh1MCKm-UwXRHfoQec"; // Add your own API Key
        const playlistId = "PLQ_PIlf6OzqKdBTuABBCzazB4i732pNTa";
        const maxResults = 10;

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();

        if (!data.items) {
          throw new Error("No videos found");
        }

        const videoItems: VideoItem[] = data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
        }));

        setVideos(videoItems);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Calming Videos</h2>
      {videos.length > 0 ? (
        <VideoSlider>
          {videos.map((video) => (
            <div key={video.id} className="p-2">
              <div className="w-full max-w-[450px] mx-auto">
                <iframe
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg shadow-lg"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  allowFullScreen
                  title={video.title}
                ></iframe>
              </div>
              <p className="text-center text-sm mt-2">{video.title}</p>
            </div>
          ))}
        </VideoSlider>
      ) : (
        <p className="text-center text-gray-500">Loading videos...</p>
      )}
    </div>
  );
};

export default CalmingVideosSlider;
