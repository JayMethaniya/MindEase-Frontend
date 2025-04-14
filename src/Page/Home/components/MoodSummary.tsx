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
          setMoodHistory(
            data.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          );
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
    const today = new Date();
    return moodHistory.filter((entry) => {
      const entryDate = new Date(entry.date);
      const diffInDays =
        (today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
      return diffInDays <= 2;
    });
  };

  const getMoodInsight = () => {
    const recentMoods = getRecentThreeDaysMoods();
    const positiveCount = recentMoods.filter((entry) =>
      ['Happy', 'Relaxed'].includes(entry.mood)
    ).length;

    if (recentMoods.length === 0)
      return 'Start tracking your mood to get personalized insights!';

    if (positiveCount >= 2) {
      return "You've been feeling positive lately! Keep it up!";
    } else if (positiveCount === 1) {
      return 'Balanced mood detected. Try some relaxation techniques.';
    } else {
      return 'It seems like a rough few days. Take care of yourself 💙';
    }
  };

  const chartData: MoodValue[] = moodHistory
    .slice(0, 7)
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString(),
      moodValue: moodScale[entry.mood] ?? 0,
    }))
    .reverse();

  return (
    <div className=" mb-10 mt-8 w-[80%] mx-auto px-4 bg-[#ddece9] shadow-lg rounded-2xl p-6 md:p-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#155e63] mb-2 md:mb-0">
          🌈 Mood Insights Summary
        </h2>
        <Link
          to={token ? '/mood-tracking' : '/login'}
          className="text-sm text-white bg-[#287371] hover:bg-[#1e4f4f] transition-all font-medium py-2 px-4 rounded-lg"
        >
          Track Mood →
        </Link>
      </div>

      {loading ? (
        <div className="h-24 flex items-center justify-center">
          <p className="text-gray-500 animate-pulse">Loading mood data...</p>
        </div>
      ) : error ? (
        <div className="h-24 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : moodHistory.length === 0 ? (
        <div className="h-24 flex items-center justify-center">
          <p className="text-gray-500">No mood data available yet. Get started today!</p>
        </div>
      ) : (
        <>
          <div className="h-56 mb-8 bg-[#f0fdfa] rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis
                  type="number"
                  domain={[1, 6]}
                  ticks={[1, 2, 3, 4, 5, 6]}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f0fdfa] p-5 rounded-xl shadow-sm">
              <h3 className="text-md font-semibold text-[#287371] mb-3">
                Last 3 Days Mood 🌤
              </h3>
              <div className="flex flex-wrap gap-3">
                {getRecentThreeDaysMoods().map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white text-[#287371] p-3 rounded-lg shadow hover:shadow-md transition"
                  >
                    <span className="text-2xl">{emojiMap[entry.mood]}</span>
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

            <div className="bg-[#f0fdfa] p-5 rounded-xl shadow-sm">
              <h3 className="text-md font-semibold text-[#287371] mb-3">
                Insights 💡
              </h3>
              <p className="text-sm text-gray-700 text-[#287371] leading-relaxed">
                {getMoodInsight()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
