import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Mood = {
  emoji: string;
  label: string;
};

type MoodEntry = {
  mood: Mood;
  note: string;
  date: string;
};

const moods: Mood[] = [
  { emoji: "😀", label: "Happy" },
  { emoji: "😌", label: "Relaxed" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😢", label: "Sad" },
  { emoji: "🤯", label: "Stressed" },
  { emoji: "😡", label: "Angry" },
];

const moodSuggestions: Record<string, string> = {
  Happy:
    "🎉 Keep spreading positivity! Maybe share your happiness with a friend today.",
  Sad: "💙 It's okay to feel down. Try journaling or listening to uplifting music.",
  Angry:
    "🔥 Take a deep breath. A short walk or meditation might help you cool down.",
  Tired:
    "😴 Get some rest! A quick power nap or stretching session could help recharge.",
  Relaxed: "🌿 Enjoy your calmness. Maybe read a book or do some light yoga.",
  Stressed:
    "😌 Try a 5-minute deep breathing exercise or listen to relaxing music.",
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState<string>("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/mood/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (Array.isArray(response.data)) {
          const transformedData = response.data.map((entry) => ({
            ...entry,
            mood: moods.find((m) => m.label === entry.mood) || {
              label: entry.mood,
              emoji: "❓",
            },
          }));

          setMoodHistory(transformedData);
        } else {
          console.error("Fetched data is not an array:", response.data);
          setMoodHistory([]);
        }
      } catch (error) {
        console.error("Error fetching mood history:", error);
        setMoodHistory([]);
      }
    };

    fetchMoodHistory();
  }, []);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = async () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        mood: selectedMood,
        note,
        date: new Date().toISOString(),
      };

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        await axios.post(
          "http://localhost:3001/mood",
          {
            userId,
            mood: selectedMood.label,
            note,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMoodHistory((prevHistory) => [newEntry, ...prevHistory]);
        setSelectedMood(null);
        setNote("");
      } catch (error: any) {
        console.error(
          "Error saving mood:",
          error.response?.data || error.message
        );
      }
    }
  };

  const latestMood = moodHistory.length > 0 ? moodHistory[0].mood.label : null;
  const suggestion = latestMood ? moodSuggestions[latestMood] : null;

  const graphData = moodHistory.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    mood: moods.findIndex((m) => m.label === entry.mood.label) + 1,
  }));

  return (
    <div className="h-full text-[#1E3A3A] flex flex-col items-center overflow-y-auto bg-[#F1F8F8] p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#287371]">
        How are you feeling today?
      </h2>

      <div className="flex space-x-3 mb-4">
        {moods.map((m) => (
          <button
            key={m.label}
            className={`p-3 border-2 border-[#287371] rounded-lg text-2xl transition ${
              selectedMood?.label === m.label
                ? "bg-[#287371] text-white"
                : "text-[#1E3A3A] hover:bg-[#DDECE9]"
            }`}
            onClick={() => handleMoodSelect(m)}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note (optional)"
        className="w-1/2 p-2 border border-[#DDECE9] rounded-md mb-4 bg-white text-[#1E3A3A] focus:border-[#287371] focus:ring-1 focus:ring-[#287371]"
      />

      <button
        onClick={handleSaveMood}
        disabled={!selectedMood}
        className="px-4 py-2 bg-[#287371] text-white text-lg rounded-full shadow-lg hover:bg-[#1E3A3A] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Mood
      </button>

      <h3 className="text-lg font-bold mt-6 text-[#287371]">
        Mood History (Last 7 Days)
      </h3>

      {suggestion && (
        <div className="my-4 p-4 bg-[#287371] shadow-md rounded-lg w-[60%] h-32 text-center">
          <h4 className="text-xl font-bold text-white">
            ✨ Self-Care Tip for You:
          </h4>
          <p className="text-lg text-[#F1F8F8]">{suggestion}</p>
        </div>
      )}

      <ResponsiveContainer width="60%" height={300}>
        <LineChart data={graphData}>
          <XAxis dataKey="date" stroke="#1E3A3A" />
          <YAxis
            domain={[1, moods.length]}
            tickFormatter={(tick: number) => moods[tick - 1]?.label}
            stroke="#1E3A3A"
          />
          <Tooltip 
            formatter={(value: number) => moods[value - 1]?.label}
            contentStyle={{ 
              backgroundColor: '#F1F8F8',
              border: '1px solid #DDECE9',
              borderRadius: '8px',
              color: '#1E3A3A'
            }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#287371"
            strokeWidth={3}
            dot={{ fill: '#287371', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodTracker;
  