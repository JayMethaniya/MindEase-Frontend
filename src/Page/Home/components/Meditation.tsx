import { useState, useEffect, useRef } from 'react';
import music from '../../../assets/relex.mp3'
type MeditationTime = 5 | 10 | 15 | 20 | 30;

const MeditationPage = () => {
  const [selectedTime, setSelectedTime] = useState<MeditationTime>(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const meditationTimes: MeditationTime[] = [5, 10, 15, 20, 30];
 
  useEffect(() => {
    if (isMeditating) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsMeditating(false);
            setIsMusicPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isMeditating]);

  const startMeditation = () => {
    setTimeLeft(selectedTime * 60);
    setIsMeditating(true);
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const stopMeditation = () => {
    setIsMeditating(false);
    setIsMusicPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handlePlayPause = () => {
    setIsMusicPlaying(!isMusicPlaying);
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background imagery elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-200 mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-200 mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <audio ref={audioRef} src={music} loop />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">Mindful Meditation</h1>
          <p className="text-lg text-gray-600">
            Find your peace. Take a moment to breathe and center yourself.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-12 border border-gray-100">
          <div className="p-8">
            {!isMeditating ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Meditation Time</h2>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {meditationTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time} min
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={startMeditation}
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    Begin Meditation
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-teal-600 mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-gray-500">Remaining</p>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-all"
                  >
                    {isMusicPlaying ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Pause Music
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Play Music
                      </>
                    )}
                  </button>

                  <button
                    onClick={stopMeditation}
                    className="flex items-center justify-center px-6 py-3 bg-red-100 hover:bg-red-200 rounded-full text-red-700 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                    End Session
                  </button>
                </div>

                <div className="pt-4">
                  <p className="text-gray-600 italic">
                    "Breathe in peace, breathe out stress."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-teal-700 mb-4">Benefits of Meditation</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Reduces stress and anxiety
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Improves focus and concentration
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Promotes emotional health
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Enhances self-awareness
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                May reduce age-related memory loss
              </li>
            </ul>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-teal-700 mb-4">Meditation Tips</h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start">
                <div className="bg-teal-100 text-teal-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-medium">1</div>
                <p>Find a quiet, comfortable place to sit or lie down.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 text-teal-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-medium">2</div>
                <p>Close your eyes and take a few deep breaths to settle in.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 text-teal-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-medium">3</div>
                <p>Focus on your breath or a calming word/phrase.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 text-teal-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-medium">4</div>
                <p>When your mind wanders, gently return to your focus point.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 text-teal-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-medium">5</div>
                <p>Be kind to yourself - meditation is a practice, not perfection.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">About Meditation</h3>
          <div className="text-gray-600 space-y-4">
            <p>
              Meditation is a practice where an individual uses a technique – such as mindfulness, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state.
            </p>
            <p>
              Research has shown that regular meditation can have numerous benefits for mental health, including reduced symptoms of anxiety and depression, improved attention and concentration, and increased feelings of calm and relaxation.
            </p>
            <p>
              Even just a few minutes of meditation each day can make a difference. The key is consistency - making meditation a regular part of your routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationPage;