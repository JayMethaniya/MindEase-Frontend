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
    <div>
      <h1>Video Resources</h1>
      <ul>
        {videoResources.map((resource) => (
          <li key={resource._id} style={{ marginBottom: "2rem" }}>
            <p>{resource.title}</p>
            <iframe
              width="560"
              height="315"
              src={convertToEmbedUrl(resource.videoUrl)}
              title={resource.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoResources;
