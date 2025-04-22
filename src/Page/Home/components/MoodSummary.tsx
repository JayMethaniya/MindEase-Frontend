import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type MoodEntry = {
  mood: string;
  note: string;
  date: string;
};

type MoodValue = {
  date: string;
  moodValue: number;
};

const moodScale: Record<string, number> = {
  Angry: 1,
  Stressed: 2,
  Sad: 3,
  Tired: 4,
  Relaxed: 5,
  Happy: 6,
};

const emojiMap: Record<string, string> = {
  Happy: '😀',
  Relaxed: '😌',
  Tired: '😴',
  Sad: '😢',
  Stressed: '🤯',
  Angry: '😡',
};

export default function MoodSummary() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMoodHistory = async () => {
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

        if (Array.isArray(data)) {
          const sortedData = data.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setMoodHistory(sortedData.slice(0, 3));
        } else {
          throw new Error('Invalid data format received.');
        }
      } catch (err) {
        console.error('Error fetching mood history:', err);
        setError('Failed to load mood data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMoodHistory();
  }, [token]);

  const getRecentThreeDaysMoods = () => {
    return moodHistory;
  };

  const getMoodInsight = () => {
    const recentMoods = getRecentThreeDaysMoods();
    const positiveCount = recentMoods.filter((entry) =>
      ['Happy', 'Relaxed'].includes(entry.mood)
    ).length;
    const latestMood = recentMoods[0]?.mood;

    if (recentMoods.length === 0)
      return "Start tracking your mood to get personalized insights!";

    if (positiveCount >= 2) {
      return "You've been maintaining a positive mindset! 🌟 Try practicing gratitude journaling to amplify these good feelings.";
    }

    // Specific insights based on latest mood
    switch (latestMood) {
      case "Happy":
        return "Your positive energy is shining through! 🌞 Share your joy with others and consider starting a gratitude journal.";
      case "Relaxed":
        return "You are in a calm state of mind. 🌿 Perfect time for meditation or gentle yoga to maintain this peaceful energy.";
      case "Tired":
        return "Notice your energy levels. 🌙 Try taking short breaks, deep breathing, or a 10-minute power nap to recharge.";
      case "Sad":
        return "It is okay to feel down sometimes. 💙 Consider talking to a friend, taking a nature walk, or trying some mindful breathing exercises.";
      case "Stressed":
        return "Take a moment to pause. 🍃 Try the 5-5-5 breathing technique: breathe in for 5 seconds, hold for 5, release for 5.";
      case "Angry":
        return "Let us channel this energy positively. 🌊 Try progressive muscle relaxation or step outside for some fresh air and deep breaths.";
      default:
        return "Take a moment for self-care today. Try some deep breathing or a short meditation session.";
    }
  };

  const chartData: MoodValue[] = moodHistory
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString(),
      moodValue: moodScale[entry.mood] ?? 0,
    }))
    .reverse();

  return (
    <div className="mb-4 sm:mb-10 mt-4 sm:mt-8 w-[95%] sm:w-[90%] md:w-[80%] mx-auto px-2 sm:px-4 bg-[#ddece9] shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#155e63] mb-2 sm:mb-0">
          🌈 Mood Insights Summary
        </h2>
        <Link
          to={token ? '/mood-tracking' : '/login'}
          className="text-sm text-white bg-[#287371] hover:bg-[#1e4f4f] transition-all font-medium py-2 px-3 sm:px-4 rounded-lg w-full sm:w-auto text-center"
        >
          Track Mood →
        </Link>
      </div>

      {loading ? (
        <div className="h-20 sm:h-24 flex items-center justify-center">
          <p className="text-gray-500 animate-pulse">Loading mood data...</p>
        </div>
      ) : error ? (
        <div className="h-20 sm:h-24 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : moodHistory.length === 0 ? (
        <div className="h-20 sm:h-24 flex items-center justify-center">
          <p className="text-gray-500 text-center px-2">No mood data available yet. Get started today!</p>
        </div>
      ) : (
        <>
          <div className="h-48 sm:h-56 mb-6 sm:mb-8 bg-[#f0fdfa] rounded-lg p-2 sm:p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  type="number"
                  domain={[1, 6]}
                  ticks={[1, 2, 3, 4, 5, 6]}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    Object.entries(moodScale).find(([, val]) => val === value)?.[0] ?? ''
                  }
                />
                <Tooltip
                  formatter={(value: number) =>
                    Object.entries(moodScale).find(([, val]) => val === value)?.[0]
                  }
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="moodValue"
                  stroke="#155e63"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#f0fdfa] p-3 sm:p-5 rounded-xl shadow-sm">
              <h3 className="text-sm sm:text-md font-semibold text-[#287371] mb-2 sm:mb-3">
                Last 3 Days Mood 🌤
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {getRecentThreeDaysMoods().map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 bg-white text-[#287371] p-2 sm:p-3 rounded-lg shadow hover:shadow-md transition w-full sm:w-auto"
                  >
                    <span className="text-xl sm:text-2xl">{emojiMap[entry.mood]}</span>
                    <div>
                      <p className="text-xs sm:text-sm font-medium">{entry.mood}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f0fdfa] p-3 sm:p-5 rounded-xl shadow-sm">
              <h3 className="text-sm sm:text-md font-semibold text-[#287371] mb-2 sm:mb-3">
                Insights 💡
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 text-[#287371] leading-relaxed">
                {getMoodInsight()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
