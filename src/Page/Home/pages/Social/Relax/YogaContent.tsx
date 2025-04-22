import React, { useState, useEffect } from 'react';
import { Language} from './types';
import { yogaData } from './yogaData';


const POSES_PER_PAGE = 6;

const YogaContent: React.FC = () => {
  const [language, setLanguage] = useState<Language>('english');
  const [showModal, setShowModal] = useState(false);
  const [selectedPose, setSelectedPose] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [randomizedPoses, setRandomizedPoses] = useState<any[]>([]);

  const content = yogaData;
  const currentData = content[language];

  // Randomize poses when language changes
  useEffect(() => {
    const shuffledPoses = [...currentData.poses].sort(() => Math.random() - 0.5);
    setRandomizedPoses(shuffledPoses);
    setCurrentPage(1); // Reset to first page when language changes
  }, [language, currentData.poses]);

  const totalPages = Math.ceil(randomizedPoses.length / POSES_PER_PAGE);
  const startIndex = (currentPage - 1) * POSES_PER_PAGE;
  const currentPoses = randomizedPoses.slice(startIndex, startIndex + POSES_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-4 bg-[#f1f8f8] min-h-screen">
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => setLanguage('english')}
          className={`px-4 py-2 rounded transition-all duration-300 ${
            language === 'english' 
              ? 'bg-teal-600 text-white shadow-lg' 
              : 'bg-gray-100 hover:bg-emerald-50 text-gray-700'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('hindi')}
          className={`px-4 py-2 rounded transition-all duration-300 ${
            language === 'hindi' 
              ? 'bg-teal-600 text-white shadow-lg' 
              : 'bg-gray-100 hover:bg-emerald-50 text-gray-700'
          }`}
        >
          हिंदी
        </button>
        <button
          onClick={() => setLanguage('gujarati')}
          className={`px-4 py-2 rounded transition-all duration-300 ${
            language === 'gujarati' 
              ? 'bg-teal-600 text-white shadow-lg' 
              : 'bg-gray-100 hover:bg-emerald-50 text-gray-700'
          }`}
        >
          ગુજરાતી
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-teal-800">{currentData.title}</h1>
      <p className="text-lg mb-6 text-gray-700">{currentData.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentPoses.map((pose, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-emerald-100"
          >
            <img
              src={pose.image}
              alt={pose.name}
              className="w-full h-64 object-contain"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-teal-700">{pose.name}</h2>
              <p className="text-gray-600 mb-2 italic">{pose.sanskritName}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm px-3 py-1 rounded-full bg-emerald-100 text-teal-700">
                  {pose.difficulty}
                </span>
                <span className="text-sm px-3 py-1 rounded-full bg-teal-100 text-teal-700">
                  {pose.duration}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedPose(startIndex + index);
                  setShowModal(true);
                }}
                className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors duration-300 shadow-md"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 pb-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300'
          }`}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              currentPage === i + 1
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-emerald-50 text-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-300'
          }`}
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed bottom-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-emerald-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-teal-800">
                  {randomizedPoses[selectedPose].name}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-teal-700 transition-colors duration-300"
                >
                  ✕
                </button>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-teal-700">Steps:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  {randomizedPoses[selectedPose].steps.map((step: string, index: number) => (
                    <li key={index} className="hover:bg-emerald-50 p-2 rounded transition-colors duration-300">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-teal-700">Benefits:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {randomizedPoses[selectedPose].benefits.map((benefit: string, index: number) => (
                    <li key={index} className="hover:bg-emerald-50 p-2 rounded transition-colors duration-300">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YogaContent; 