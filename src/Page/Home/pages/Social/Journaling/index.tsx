import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

type JournalEntry = {
  id: number;
  date: string;
  content: string;
};

const Journaling: React.FC = () => {
  const [entry, setEntry] = useState<string>("");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const storedEntries: JournalEntry[] = JSON.parse(
      localStorage.getItem("journalEntries") || "[]"
    );
    setJournalEntries(storedEntries);
  }, []);

  const handleSaveEntry = () => {
    if (!entry.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      content: entry,
    };
    const updatedEntries = [newEntry, ...journalEntries];
    setJournalEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setEntry("");
  };

  const handleDeleteEntry = (id: number) => {
    const updatedEntries = journalEntries.filter((entry) => entry.id !== id);
    setJournalEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  return (
    <div className="max-w-3xl mx-auto h-[100vh] rounded-lg shadow-lg border border-[#1e3245]  text-[#287371] bg-[#fdefdf] p-6 flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold mb-4">Journaling</h1>

      <textarea
        className="w-full h-32 p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#287371] text-[#1e3245] placeholder-gray-500"
        placeholder="Write your thoughts here..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <button
        className="w-full bg-gradient-to-r from-[#287371] to-[#1e3245] text-white py-2 rounded-lg mt-3 shadow-md hover:opacity-90 transition-all"
        onClick={handleSaveEntry}
      >
        Save Entry
      </button>

      <h2 className="text-xl font-semibold text-[#1e3245] mt-6">
        Your Journal Entries
      </h2>
      {journalEntries.length === 0 ? (
        <p className="text-gray-600 text-center mt-2">
          No entries yet. Start writing!
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {journalEntries.map(({ id, date, content }) => (
            <li
              key={id}
              className="p-4 border rounded-lg bg-white relative shadow-md"
            >
              <p className="text-sm text-gray-500">{date}</p>
              <p className="mt-2 text-[#1e3245]">{content}</p>

              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                onClick={() => handleDeleteEntry(id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Journaling;
