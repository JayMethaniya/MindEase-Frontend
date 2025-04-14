import { Email, Phone } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface Profile {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  address: string;
  profilePhoto?: string;
  role: string;
  verified?: boolean;
  specialties?: string[];
  availability?: string;
  medicalRegNumber?: string;
  degrees?: string;
  specialization?: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
    role: "",
  });
const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get<Profile>(
          `http://localhost:3001/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const isDoctor = profile.role === "doctor";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 h-32 md:h-40 w-full"></div>

          <div className="relative px-6 pb-8">
            {/* Profile Photo with Edit Button */}
            <div className="flex justify-center md:justify-start -mt-16 relative">
              <div className="relative group">
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
                <button className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-2 shadow-md hover:bg-teal-700 transition-all opacity-0 group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-6 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center justify-between">
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
                  <button className="text-teal-600 hover:text-teal-800 font-medium flex items-center gap-1">
                    <Link to="/setting">
                    Edit Profile
                    </Link>
                  </button>
                </div>

                <p className="text-gray-600 mt-2 text-lg">{profile.bio}</p>

                {isDoctor && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.specialties?.map((specialty: string, index: number) => (
                      <span
                        key={index}
                        className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-50 p-2 rounded-full">
                      <Email className="text-teal-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800 font-medium">
                        {profile.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-teal-50 p-2 rounded-full">
                      <Phone className="text-teal-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800 font-medium">
                        {profile.phone}
                      </p>
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
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-800 font-medium">
                        {profile.address}
                      </p>
                    </div>
                  </div>

                  {isDoctor && profile.availability && (
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
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Availability</p>
                        <p className="text-gray-800 font-medium">
                          {profile.availability}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info Section (for doctors) */}
              {isDoctor && (
                <div className="md:w-80 bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Professional Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Medical RegNumber</p>
                      <p className="text-gray-800 font-medium">
                        {profile.medicalRegNumber || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                      Degrees
                      </p>
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
                  </div>

                 
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
