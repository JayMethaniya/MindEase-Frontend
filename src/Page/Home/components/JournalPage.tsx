import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type MoodType = 'happy' | 'neutral' | 'sad';
type JournalEntry = {
  _id: string;
  date: string;
  title: string;
  content: string;
  mood: MoodType;
};

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType>('neutral');
  const [isDaytime, setIsDaytime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);

  // Get user ID from localStorage or use a default one
  const getUserId = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      const newUserId = Date.now().toString();
      localStorage.setItem('userId', newUserId);
      return newUserId;
    }
    return userId;
  };

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchJournalEntries = async () => {
    try {
      const response = await axios.get<ApiResponse<JournalEntry[]>>('http://localhost:3001/journal', {
        params: {
          userId: getUserId()
        }
      });
      setEntries(response.data.data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      toast.error('Failed to fetch journal entries');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);
    try {
      if (editingEntry) {
        await axios.put(
          `http://localhost:3001/journal/${editingEntry}`,
          { 
            title, 
            content, 
            mood,
            userId: getUserId()
          }
        );
        toast.success('Entry updated successfully');
      } else {
        await axios.post(
          'http://localhost:3001/journal',
          { 
            title, 
            content, 
            mood,
            userId: getUserId()
          }
        );
        toast.success('Entry created successfully');
      }
      fetchJournalEntries();
      resetForm();
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast.error('Failed to save journal entry');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {
      await axios.delete(`http://localhost:3001/journal/${id}`, {
        params: {
          userId: getUserId()
        }
      });
      toast.success('Entry deleted successfully');
      fetchJournalEntries();
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      toast.error('Failed to delete journal entry');
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
    setEditingEntry(entry._id);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setMood('neutral');
    setEditingEntry(null);
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
                      disabled={isLoading}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <SaveIcon sx={{ mr: 1 }} />
                      )}
                      {editingEntry ? 'Update Entry' : 'Save Entry'}
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
                        key={entry._id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">{entry.title}</h3>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(entry)}
                              className="p-1 text-teal-600 hover:text-teal-800"
                            >
                              <EditIcon fontSize="small" />
                            </button>
                            <button
                              onClick={() => handleDelete(entry._id)}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <DeleteIcon fontSize="small" />
                            </button>
                          </div>
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
                        <div className="text-xs text-gray-400 mt-2">
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
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