import React, { useEffect, useState } from "react";
import MentalHealthVideoData from "./data";

interface MoodVideoTitles {
  [key: string]: {
    title: string;
    description: string;
  };
}

const moodTitles: MoodVideoTitles = {
  Happy: {
    title: "Keep the Positivity Going! 🌟",
    description: "Inspiring videos to maintain your happy mood and spread joy.",
  },
  Relaxed: {
    title: "Stay Peaceful & Mindful 🌿",
    description: "Calming content to maintain your relaxed state of mind.",
  },
  Tired: {
    title: "Boost Your Energy 🌅",
    description: "Motivational videos to help you feel more energized.",
  },
  Sad: {
    title: "Finding Hope & Comfort 🌈",
    description: "Uplifting content to help brighten your mood.",
  },
  Stressed: {
    title: "Stress Relief & Calm 🍃",
    description: "Videos to help you manage stress and find peace.",
  },
  Angry: {
    title: "Finding Inner Peace 🕊️",
    description: "Content to help you manage anger and find tranquility.",
  },
};

export default function MentalHealthVideo() {
  const [lastMood, setLastMood] = useState<string>("Happy");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchLastMood = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/mood/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const sortedData = data.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setLastMood(sortedData[0].mood);
        }
      } catch (err) {
        console.error('Error fetching mood:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLastMood();
  }, [token]);

  // Get random videos for the current mood
  const getRandomVideos = () => {
    const moodVideos = MentalHealthVideoData[lastMood] || MentalHealthVideoData["Happy"];
    const shuffled = [...moodVideos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  const videos = getRandomVideos();
  const moodInfo = moodTitles[lastMood] || moodTitles["Happy"];

  if (loading) {
    return (
      <div className="w-full max-w-full overflow-hidden px-4 mt-8">
        <div className="text-center text-gray-500">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden px-4 mt-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-[#287371]">
          {moodInfo.title}
        </h2>
        <p className="text-gray-600 mt-2">
          {moodInfo.description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6 mt-6 max-w-7xl mx-auto">
        {videos.map((videoUrl, index) => (
          <div key={index} className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                className="w-full aspect-video rounded-t-lg"
                src={videoUrl}
                title={`Mental Wellness Video ${index + 1}`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
