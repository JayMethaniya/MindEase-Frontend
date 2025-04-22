import React from 'react';

interface DailyTip {
  emoji: string;
  tip: string;
}

const weeklyTips: { [key: number]: DailyTip } = {
  0: { // Sunday
    emoji: "🌅",
    tip: "Take time to reflect and set intentions for the week ahead."
  },
  1: { // Monday
    emoji: "🌱",
    tip: "Start fresh: Each moment is a new beginning. Take three deep breaths."
  },
  2: { // Tuesday
    emoji: "💪",
    tip: "Build resilience: Face challenges with a calm and focused mind."
  },
  3: { // Wednesday
    emoji: "🎯",
    tip: "Mid-week check-in: Pause and realign with your goals and values."
  },
  4: { // Thursday
    emoji: "🌿",
    tip: "Practice gratitude: Name three things you're thankful for today."
  },
  5: { // Friday
    emoji: "🌸",
    tip: "Celebrate progress: Acknowledge how far you've come this week."
  },
  6: { // Saturday
    emoji: "🧘",
    tip: "Take time for self-care and mindful relaxation today."
  }
};

const DailyTip: React.FC = () => {
  const today = new Date().getDay(); // 0-6 for Sunday-Saturday
  const { emoji, tip } = weeklyTips[today];

  return (
    <div className="relative z-10 px-4 py-3 sm:py-4">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <span className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-0">{emoji}</span>
        <span className="px-2">Daily Mindfulness Tip: {tip}</span>
      </h1>
    </div>
  );
};

export default DailyTip; 