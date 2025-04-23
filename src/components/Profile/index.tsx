import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Person, Settings, Logout } from '@mui/icons-material';
import axios from 'axios';
import UserProfileModal from '../../Page/Profile/Components/userprofile';
import ProfileSetting from '../../Page/Profile/ProfileSetting';

interface ProfileProps {
  profilePhoto?: string;
  isDoctor?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ profilePhoto, isDoctor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.post(
        'http://localhost:3001/auth/logout',
        {},
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      // Clear all local storage
      localStorage.clear();
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the API call fails, clear local storage and redirect
      localStorage.clear();
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    if (isDoctor) {
      navigate('/doctor/profile');
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleProfileClick}
        className="flex items-center gap-2 border-2 rounded-full border-[#1E4747]"
      >
        <img
          src={profilePhoto || '/default-avatar.png'}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </button>

      {!isDoctor && isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <button
            onClick={() => {
              setShowProfile(true);
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <Person className="mr-2" fontSize="small" />
            Profile
          </button>
          <button
            onClick={() => {
              setShowSettings(true);
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <Settings className="mr-2" fontSize="small" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <Logout className="mr-2" fontSize="small" />
            Logout
          </button>
        </div>
      )}

      {!isDoctor && showProfile && userId && (
        <UserProfileModal
          userId={userId}
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
        />
      )}

      {!isDoctor && showSettings && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <button
                onClick={() => setShowSettings(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow-md"
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
              <ProfileSetting />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 