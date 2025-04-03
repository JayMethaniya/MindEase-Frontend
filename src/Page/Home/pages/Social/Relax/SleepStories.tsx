import React, { useState, useEffect } from "react";
import VideoSlider from "../../../../../components/Slider";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const SleepStories: React.FC = () => {
  const [videoList, setVideoList] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideosData = async () => {
      try {
        const youtubeApiKey = "AIzaSyDuWSva2fdNUgxPP_T4ekzvN0vv9-jdyrk";
        const playlistId = "PLZoDGrriQgsLsklfcYf0U0FgHBWzJrfAI";
        const maxResults = 10; // Adjust for better performance

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${youtubeApiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();

        if (!data.items) {
          throw new Error("No videos found in the playlist");
        }

        const videos: Video[] = data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
        }));

        setVideoList(videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideosData();
  }, []);

  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-bold mb-4 text-center">SleepTime Stories</h2>
      <div className="flex overflow-x-scroll gap-[10px] bottom-[100px]">
        {videoList.length > 0 ? (
         <VideoSlider> { videoList.map((video) => (
          <div key={video.id} className="w-[500px] h-[300px] mt-[20px] mb-[80px] p-[10px] text-center text-[10px] cursor-pointer transition-transform">
            <iframe
              width="100%"
              height="250"
              src={`https://www.youtube.com/embed/${video.id}`}
              allowFullScreen
              title={video.title}
              className="rounded-lg"
            ></iframe>
            <p className="text-center text-sm p-2">{video.title}</p>
          </div>
        ))} </VideoSlider>
        ) : (
          <p className="text-center text-gray-500">Loading videos...</p>
        )}
      </div>
    </div>
  );
};

export default SleepStories;
