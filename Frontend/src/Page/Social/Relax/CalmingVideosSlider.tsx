import React, { useState, useEffect } from "react";

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
        const maxResults = 10; // Reduced for faster loading

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
    <div className="calming-videos-slider">
      <h2 className="text-xl font-bold mb-4 text-center">Calming Videos</h2>
      <div className="video-list flex flex-wrap gap-4 justify-center">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-card">
              <iframe
                width="400"
                height="250"
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
                allowFullScreen
                title={video.title}
                className="rounded-lg shadow-lg"
              ></iframe>
              <p className="text-center text-sm mt-2">{video.title}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading videos...</p>
        )}
      </div>
    </div>
  );
};

export default CalmingVideosSlider;
