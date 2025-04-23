import { useEffect, useState } from "react";
import axios from "axios";
import {
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  profilePhoto?: string;
  role: string;
  verified?: boolean;
  specialties?: string[];
  availability?: string;
  medicalRegNumber?: string;
  degrees?: string;
  specialization?: string;
}

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  mood: string;
  date: string;
}

interface MoodEntry {
  _id: string;
  mood: string;
  note: string;
  createdAt: string;
}
type MoodValue = {
  date: string;
  moodValue: number;
};
interface UserProfileModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const moodScale: Record<string, number> = {
    Angry: 1,
    Stressed: 2,
    Sad: 3,
    Tired: 4,
    Relaxed: 5,
    Happy: 6,
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Fetch profile
        const profileResponse = await axios.get<UserProfile>(
          `http://localhost:3001/user/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setProfile(profileResponse.data);

        // Fetch journal entries
        const journalResponse = await axios.get<{ data: JournalEntry[] }>(
          `http://localhost:3001/journal?userId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJournalEntries(journalResponse.data.data);

        // Fetch mood entries
        const moodResponse = await axios.get<MoodEntry[]>(
          `http://localhost:3001/mood/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMoodEntries(moodResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [userId, isOpen]);

  if (!isOpen || !profile) return null;

  const isDoctor = profile.role === "doctor";

  const chartData = moodEntries
    .map((entry) => ({
      date: new Date(entry.createdAt).toLocaleDateString(),
      moodValue: moodScale[entry.mood] ?? 0,
    }))
    .reverse();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 h-32 md:h-40 w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="relative px-6 pb-8">
          {/* Profile Photo */}
          <div className="flex justify-center md:justify-start -mt-16 relative">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-teal-100 flex items-center justify-center">
                  <span className="text-4xl font-bold text-teal-600">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {isDoctor ? "Dr. " : ""}
              {profile.fullName}
              {profile.verified && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
                </span>
              )}
            </h1>

            <p className="text-gray-600 mt-2 text-lg">{profile.bio}</p>

            {isDoctor && (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.specialties?.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}

            {/* Contact Information */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-teal-50 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-teal-50 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800 font-medium">{profile.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-teal-50 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-800 font-medium">
                    {profile.street}, {profile.area}, {profile.city},{" "}
                    {profile.state} - {profile.pincode}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Information (for doctors) */}
            {isDoctor && (
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Professional Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Medical Registration Number
                    </p>
                    <p className="text-gray-800 font-medium">
                      {profile.medicalRegNumber || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Degrees</p>
                    <p className="text-gray-800 font-medium">
                      {profile.degrees || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="text-gray-800 font-medium">
                      {profile.specialization || "Not specified"}
                    </p>
                  </div>
                  {profile.availability && (
                    <div>
                      <p className="text-sm text-gray-500">Availability</p>
                      <p className="text-gray-800 font-medium">
                        {profile.availability}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isDoctor && (
              <div className="h-48 sm:h-56 mb-6 sm:mb-8 bg-[#f0fdfa] rounded-lg p-2 sm:p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis
                      type="number"
                      domain={[1, 6]}
                      ticks={[1, 2, 3, 4, 5, 6]}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value: number) =>
                        Object.entries(moodScale).find(([, val]) => val === value)?.[0] ?? ""
                      }
                    />
                    <Tooltip<number, string>
                      formatter={(value: number) =>
                        Object.entries(moodScale).find(([, val]) => val === value)?.[0]
                      }
                      labelFormatter={(label: string) => `Date: ${label}`}
                    />
                    <Line
                      dataKey="moodValue"
                      stroke="#155e63"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Mood Tracking Section */}
            {!isDoctor && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Mood Tracking
                </h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {moodEntries.slice(0, 3).map((entry) => (
                    <div key={entry._id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            entry.mood === "very-happy"
                              ? "bg-green-100 text-green-800"
                              : entry.mood === "happy"
                              ? "bg-green-50 text-green-700"
                              : entry.mood === "neutral"
                              ? "bg-yellow-100 text-yellow-800"
                              : entry.mood === "sad"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {entry.mood.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{entry.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Journal Entries Section */}
            {!isDoctor && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Recent Journal Entries
                </h2>
                <div className="space-y-4">
                  {journalEntries.slice(0, 3).map((entry) => (
                    <div key={entry._id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {entry.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600 line-clamp-2">
                        {entry.content}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-500">Mood:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            entry.mood === "very-happy"
                              ? "bg-green-100 text-green-800"
                              : entry.mood === "happy"
                              ? "bg-green-50 text-green-700"
                              : entry.mood === "neutral"
                              ? "bg-yellow-100 text-yellow-800"
                              : entry.mood === "sad"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {entry.mood.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
