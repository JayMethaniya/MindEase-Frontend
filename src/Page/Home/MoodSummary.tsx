import React from "react";

export default function MoodSummary() {
  return (
    <div className="mt-8 w-full max-w-3xl bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-bold text-[#287371]">
        Mood Insights Summary
      </h2>
      <p className="text-sm text-gray-600 mt-2">
        Since you've been feeling stressed, try a short meditation session.
      </p>
      <div className="h-24 bg-gray-100 mt-4 rounded-lg"></div>
    </div>
  );
}
