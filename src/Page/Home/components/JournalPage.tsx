import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SaveIcon from '@mui/icons-material/Save';

type MoodType = 'happy' | 'neutral' | 'sad';
type JournalEntry = {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: MoodType;
};

const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType>('neutral');
  const [isDaytime, setIsDaytime] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      title,
      content,
      mood,
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setContent('');
    setMood('neutral');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">Mindful Journal</h1>
          <p className="text-lg text-gray-600">
            Capture your thoughts, reflect on your day, and express your emotions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Journal Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-gray-600">
                    <CalendarMonthIcon sx={{ mr: 1 }} />
                    <span>
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsDaytime(!isDaytime)}
                    className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    {isDaytime ? (
                      <>
                        <WbSunnyIcon sx={{ mr: 1 }} />
                        <span>Day</span>
                      </>
                    ) : (
                      <>
                        <NightsStayIcon sx={{ mr: 1 }} />
                        <span>Night</span>
                      </>
                    )}
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Journal entry title..."
                      className="w-full px-4 py-3 text-xl font-medium bg-gray-50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your thoughts here..."
                      rows={10}
                      className="w-full px-4 py-3 text-gray-700 bg-gray-50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex space-x-4 mb-4 sm:mb-0">
                      <button
                        type="button"
                        onClick={() => setMood('happy')}
                        className={`flex items-center px-4 py-2 rounded-full transition-all ${
                          mood === 'happy'
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <SentimentSatisfiedIcon sx={{ mr: 1 }} />
                        Happy
                      </button>
                      <button
                        type="button"
                        onClick={() => setMood('neutral')}
                        className={`flex items-center px-4 py-2 rounded-full transition-all ${
                          mood === 'neutral'
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <SentimentNeutralIcon sx={{ mr: 1 }} />
                        Neutral
                      </button>
                      <button
                        type="button"
                        onClick={() => setMood('sad')}
                        className={`flex items-center px-4 py-2 rounded-full transition-all ${
                          mood === 'sad'
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <SentimentDissatisfiedIcon sx={{ mr: 1 }} />
                        Sad
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                      <SaveIcon sx={{ mr: 1 }} />
                      Save Entry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Journal Entries */}
          <div className="lg:col-span-1 overflow-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 h-full">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-teal-700 mb-6">Your Entries</h2>
                
                {entries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No entries yet</p>
                    <p className="text-sm mt-2">Your journal entries will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                    {entries.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">{entry.title}</h3>
                          <span className="text-xs text-gray-500">{entry.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {entry.content}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          {entry.mood === 'happy' && (
                            <>
                              <SentimentSatisfiedIcon sx={{ mr: 0.5, color: 'teal.500' }} />
                              <span>Happy</span>
                            </>
                          )}
                          {entry.mood === 'neutral' && (
                            <>
                              <SentimentNeutralIcon sx={{ mr: 0.5, color: 'yellow.500' }} />
                              <span>Neutral</span>
                            </>
                          )}
                          {entry.mood === 'sad' && (
                            <>
                              <SentimentDissatisfiedIcon sx={{ mr: 0.5, color: 'blue.500' }} />
                              <span>Sad</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;