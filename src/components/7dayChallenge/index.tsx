import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Challenge {
  day: number;
  task: string;
  duration?: number; // in minutes
  completed: boolean;
  startTime?: number;
  progress?: number;
}

const challengeSets = [
  // Set 1: Mindfulness Focus
  [
    {
      day: 1,
      task: "Practice 5 minutes of deep breathing.",
      duration: 5,
      completed: false,
    },
    {
      day: 2,
      task: "Write down three things you're grateful for.",
      completed: false,
    },
    {
      day: 3,
      task: "Take a 10-minute walk in nature.",
      duration: 10,
      completed: false,
    },
    {
      day: 4,
      task: "Disconnect from screens for an hour before bed.",
      duration: 60,
      completed: false,
    },
    {
      day: 5,
      task: "Listen to calming music or meditate for 10 minutes.",
      duration: 10,
      completed: false,
    },
    { day: 6, task: "Do something kind for someone else.", completed: false },
    {
      day: 7,
      task: "Reflect on your progress and set future goals.",
      completed: false,
    },
  ],
  // Set 2: Physical Wellness
  [
    {
      day: 1,
      task: "Do 10 minutes of stretching exercises.",
      duration: 10,
      completed: false,
    },
    {
      day: 2,
      task: "Drink 8 glasses of water throughout the day.",
      completed: false,
    },
    {
      day: 3,
      task: "Take a 15-minute walk during lunch break.",
      duration: 15,
      completed: false,
    },
    {
      day: 4,
      task: "Practice yoga for 20 minutes.",
      duration: 20,
      completed: false,
    },
    { day: 5, task: "Try a new healthy recipe for dinner.", completed: false },
    { day: 6, task: "Get 8 hours of sleep.", completed: false },
    {
      day: 7,
      task: "Do a full body workout for 30 minutes.",
      duration: 30,
      completed: false,
    },
  ],
  // Set 3: Social Connection
  [
    { day: 1, task: "Call a friend or family member.", completed: false },
    { day: 2, task: "Join a group activity or class.", completed: false },
    { day: 3, task: "Write a thank you note to someone.", completed: false },
    {
      day: 4,
      task: "Have a meaningful conversation with a colleague.",
      completed: false,
    },
    {
      day: 5,
      task: "Volunteer for 30 minutes.",
      duration: 30,
      completed: false,
    },
    { day: 6, task: "Plan a social gathering with friends.", completed: false },
    {
      day: 7,
      task: "Share your experiences on social media.",
      completed: false,
    },
  ],
  // Set 4: Creative Expression
  [
    {
      day: 1,
      task: "Draw or paint for 15 minutes.",
      duration: 15,
      completed: false,
    },
    { day: 2, task: "Write a short poem or story.", completed: false },
    {
      day: 3,
      task: "Learn a new song or instrument for 20 minutes.",
      duration: 20,
      completed: false,
    },
    {
      day: 4,
      task: "Take creative photos throughout the day.",
      completed: false,
    },
    { day: 5, task: "Try a new craft or DIY project.", completed: false },
    { day: 6, task: "Visit an art gallery or museum.", completed: false },
    { day: 7, task: "Create a vision board for your goals.", completed: false },
  ],
  // Set 5: Digital Wellness
  [
    {
      day: 1,
      task: "Take a 30-minute break from all screens.",
      duration: 30,
      completed: false,
    },
    {
      day: 2,
      task: "Organize your digital files and emails.",
      completed: false,
    },
    { day: 3, task: "Set up app time limits on your phone.", completed: false },
    { day: 4, task: "Have a screen-free evening.", completed: false },
    {
      day: 5,
      task: "Learn a new digital skill for 20 minutes.",
      duration: 20,
      completed: false,
    },
    { day: 6, task: "Backup your important digital files.", completed: false },
    { day: 7, task: "Plan a digital detox day.", completed: false },
  ],
  // Set 6: Learning & Growth
  [
    {
      day: 1,
      task: "Read a book for 20 minutes.",
      duration: 20,
      completed: false,
    },
    {
      day: 2,
      task: "Learn 5 new words in a foreign language.",
      completed: false,
    },
    {
      day: 3,
      task: "Watch an educational video or documentary.",
      completed: false,
    },
    { day: 4, task: "Try solving a puzzle or brain teaser.", completed: false },
    { day: 5, task: "Attend a workshop or online course.", completed: false },
    { day: 6, task: "Teach someone a new skill.", completed: false },
    {
      day: 7,
      task: "Reflect on what you've learned this week.",
      completed: false,
    },
  ],
  // Set 7: Self-Care
  [
    { day: 1, task: "Take a relaxing bath or shower.", completed: false },
    {
      day: 2,
      task: "Practice positive affirmations for 5 minutes.",
      duration: 5,
      completed: false,
    },
    { day: 3, task: "Prepare a healthy meal for yourself.", completed: false },
    { day: 4, task: "Get a massage or do self-massage.", completed: false },
    {
      day: 5,
      task: "Spend 15 minutes in quiet reflection.",
      duration: 15,
      completed: false,
    },
    { day: 6, task: "Treat yourself to something special.", completed: false },
    {
      day: 7,
      task: "Create a self-care routine for the week.",
      completed: false,
    },
  ],
];

const ChallengePage: React.FC = () => {
  const [currentSet, setCurrentSet] = useState<number>(0);
  const [challenges, setChallenges] = useState<Challenge[]>(challengeSets[0]);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showCompletionPopup, setShowCompletionPopup] =
    useState<boolean>(false);
  const [timerValidation, setTimerValidation] = useState<{
    valid: boolean;
    message: string;
  }>({ valid: true, message: "" });

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("challengeProgress");
    const savedSet = localStorage.getItem("currentChallengeSet");
    if (savedProgress && savedSet) {
      setChallenges(JSON.parse(savedProgress));
      setCurrentSet(parseInt(savedSet));
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem("challengeProgress", JSON.stringify(challenges));
    localStorage.setItem("currentChallengeSet", currentSet.toString());

    // Check if all challenges are completed
    const allCompleted = challenges.every((challenge) => challenge.completed);
    if (allCompleted) {
      setShowCompletionPopup(true);
    }
  }, [challenges, currentSet]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeTimer !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            completeChallenge(activeTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTimer, timeLeft]);

  const validateTimer = (day: number): boolean => {
    const challenge = challenges.find((c) => c.day === day);
    if (!challenge) return false;

    if (challenge.completed) {
      setTimerValidation({
        valid: false,
        message: "This challenge is already completed!",
      });
      return false;
    }

    if (activeTimer !== null && activeTimer !== day) {
      setTimerValidation({
        valid: false,
        message:
          "Please complete the current challenge before starting a new one.",
      });
      return false;
    }

    setTimerValidation({ valid: true, message: "" });
    return true;
  };

  const startChallenge = (day: number) => {
    if (!validateTimer(day)) return;

    const challenge = challenges.find((c) => c.day === day);
    if (challenge && challenge.duration) {
      setActiveTimer(day);
      setTimeLeft(challenge.duration * 60);
      setChallenges((prev) =>
        prev.map((c) => (c.day === day ? { ...c, startTime: Date.now() } : c))
      );
    }
  };

  const completeChallenge = (day: number) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.day === day ? { ...c, completed: true, progress: 100 } : c
      )
    );
    setActiveTimer(null);
    setTimeLeft(0);
  };

  const restartWithNewSet = () => {
    const nextSet = (currentSet + 1) % challengeSets.length;
    setCurrentSet(nextSet);
    setChallenges(
      challengeSets[nextSet].map((challenge) => ({ ...challenge }))
    );
    setShowCompletionPopup(false);
    setActiveTimer(null);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    const completed = challenges.filter((c) => c.completed).length;
    return Math.round((completed / challenges.length) * 100);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Completion Popup */}
      {showCompletionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-[#287371] text-center mb-4">
              Congratulations! 🎉
            </h2>
            <p className="text-gray-700 text-center mb-6">
              You've successfully completed all 7 days of the Mental Wellness
              Challenge! Your dedication to self-care is inspiring.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={restartWithNewSet}
                className="px-6 py-2 bg-[#287371] text-white rounded-lg hover:bg-[#1F5B5B] transition"
              >
                Start New Challenge Set
              </button>
              <button
                onClick={() => setShowCompletionPopup(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center text-[#287371]">
        7-Day Mental Wellness Challenge
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Follow these daily tasks to improve your mental well-being.
      </p>

      {/* Challenge Set Indicator */}
      <div className="text-center mt-4">
        <span className="text-sm font-medium text-[#287371]">
          Challenge Set {currentSet + 1} of {challengeSets.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#287371]">Progress</span>
          <span className="text-sm font-medium text-[#287371]">
            {calculateProgress()}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[#287371] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Timer Validation Message */}
      {!timerValidation.valid && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {timerValidation.message}
        </div>
      )}

      <div className="mt-6 space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.day}
            className={`p-4 rounded-lg shadow-md transition-all ${
              challenge.completed
                ? "bg-green-50 border border-green-200"
                : activeTimer === challenge.day
                ? "bg-blue-50 border border-blue-200"
                : "bg-[#F1E8DD]"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-[#1E3A3A]">
                  Day {challenge.day}
                </h2>
                <p className="text-gray-700 mt-1">{challenge.task}</p>
              </div>
              {challenge.completed ? (
                <span className="text-green-600 font-medium">✓ Completed</span>
              ) : activeTimer === challenge.day ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#287371] mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Task will complete automatically
                  </div>
                </div>
              ) : challenge.duration ? (
                <button
                  onClick={() => startChallenge(challenge.day)}
                  className="px-4 py-2 bg-[#287371] text-white rounded-lg hover:bg-[#1E3A3A] transition"
                >
                  Start Timer
                </button>
              ) : (
                <button
                  onClick={() => completeChallenge(challenge.day)}
                  className="px-4 py-2 bg-[#287371] text-white rounded-lg hover:bg-[#1E3A3A] transition"
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/"
          className="px-6 py-3 bg-[#287371] text-white text-lg rounded-full shadow-lg hover:bg-[#1F5B5B] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ChallengePage;
