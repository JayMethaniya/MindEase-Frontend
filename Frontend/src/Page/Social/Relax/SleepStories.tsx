import React, { useState, useEffect } from "react";

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
    <div className="calming-videos-slider p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">SleepTime Stories</h2>
      <div className="video-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videoList.length > 0 ? (
          videoList.map((video) => (
            <div key={video.id} className="video-card shadow-lg rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="250"
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
                allowFullScreen
                title={video.title}
                className="rounded-lg"
              ></iframe>
              <p className="text-center text-sm p-2">{video.title}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading videos...</p>
        )}
      </div>
    </div>
  );
};

export default SleepStories;
