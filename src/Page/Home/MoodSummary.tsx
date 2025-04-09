import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type MoodEntry = {
  mood: string;
  note: string;
  date: string;
};

export default function MoodSummary() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchMoodHistory = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/mood/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMoodHistory(data);
      } catch (error) {
        console.error("Error fetching mood history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodHistory();
  }, []);

  const getMoodEmoji = (mood: string) => {
    const moodEmojis: Record<string, string> = {
      Happy: "😀",
      Relaxed: "😌",
      Tired: "😴",
      Sad: "😢",
      Stressed: "🤯",
      Angry: "😡",
    };
    return moodEmojis[mood] || "❓";
  };

  const getMoodInsight = () => {
    if (moodHistory.length === 0)
      return "Start tracking your mood to get personalized insights!";

    const recentMoods = moodHistory.slice(0, 3);
    const positiveMoods = recentMoods.filter((entry) =>
      ["Happy", "Relaxed"].includes(entry.mood)
    ).length;

    if (positiveMoods >= 2) {
      return "You've been feeling positive lately! Keep up the good work!";
    } else if (positiveMoods === 1) {
      return "You're maintaining a balanced mood. Consider trying some relaxation techniques.";
    } else {
      return "You might be going through a tough time. Remember to take care of yourself and reach out for support if needed.";
    }
  };

  const chartData = moodHistory
    .slice(0, 7)
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString(),
      mood: entry.mood,
    }))
    .reverse();

  return (
    <div className="mt-8 w-full mx-auto max-w-3xl bg-[#a7d7c5d5] shadow-md rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#1E3A3A]">
          Mood Insights Summary
        </h2>
        <Link
          to={`${token ?("/mood-tracking"):("/login")}`}
          className="text-sm text-[#1E3A3A] hover:text-[#488a8a] font-medium"
        >
          Track Mood →
        </Link>
      </div>

      {loading ? (
        <div className="h-24 flex items-center justify-center">
          <p className="text-gray-500">Loading mood data...</p>
        </div>
      ) : moodHistory.length === 0 ? (
        <div className="h-24 flex items-center justify-center">
          <p className="text-gray-500">
            No mood data available. Start tracking your mood!
          </p>
        </div>
      ) : (
        <>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) => getMoodEmoji(value)}
                  domain={[
                    "Happy",
                    "Relaxed",
                    "Tired",
                    "Sad",
                    "Stressed",
                    "Angry",
                  ]}
                />
                <Tooltip
                  formatter={(value) => value}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#287371"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="bg-[#F8F9FA] p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-[#287371] mb-2">
                Recent Moods
              </h3>
              <div className="flex gap-2">
                {moodHistory.slice(0, 3).map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm"
                  >
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <p className="text-sm font-medium">{entry.mood}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-[#287371] mb-2">
                Insights
              </h3>
              <p className="text-sm text-gray-600">{getMoodInsight()}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
