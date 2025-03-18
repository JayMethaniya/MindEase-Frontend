import { useState } from "react";

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
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😌", label: "Relaxed" },
  { emoji: "🤯", label: "Stressed" },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState<string>("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        mood: selectedMood,
        note,
        date: new Date().toLocaleString(),
      };
      setMoodHistory([newEntry, ...moodHistory]);
      setSelectedMood(null);
      setNote("");
    }
  };

  return (
    <div className="h-full w-screen text-[#287371] flex flex-col items-center overflow-auto  ">
      <h2 className="text-xl font-bold mb-4">How are you feeling today?</h2>
      <div className="flex space-x-3 mb-4">
        {moods.map((m) => (
          <button
            key={m.label}
            className={`p-3 border-2 border-[#1e3245] rounded-lg text-2xl ${
              selectedMood?.label === m.label ? "bg-[#1e3245]" : ""
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
        className="w-1/2 p-2 border rounded-md mb-4"
      />

      <button onClick={handleSaveMood} disabled={!selectedMood} className="px-4 py-2 text-[#fdefdf] bg-[#1e3245] rounded">
        Save Mood
      </button>

      <h3 className="text-lg font-bold mt-6">Mood History</h3>
      <div className="space-y-2 font-bold mt-3">
       mood graph
      </div>
    </div>
  );
}
