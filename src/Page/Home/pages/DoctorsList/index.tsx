import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Doctor } from "../../../../types/doctor";

interface ChatResponse {
  _id: string;
  members: string[];
}

const DoctorsList: React.FC = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view doctors");
          setLoading(false);
          return;
        }

        let url = "http://localhost:3001/user/doctors";
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (specialization) params.append("specialization", specialization);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await axios.get<Doctor[]>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDoctors(response.data);
      } catch (error) {
        setError("Failed to fetch doctors. Please try again later.");
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchDoctors();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, specialization]);

  const handleMessageClick = async (doctorId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to message");
        return;
      }

      // First check if a chat already exists
      const existingChats = await axios.get<ChatResponse[]>(
        `http://localhost:3001/chat/${localStorage.getItem("userId")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Find existing chat with this doctor
      const existingChat = existingChats.data.find(chat => 
        chat.members.includes(doctorId)
      );

      if (existingChat) {
        // If chat exists, navigate to it
        navigate(`/messages?chatId=${existingChat._id}`);
      } else {
        // Create a new chat if none exists
        const response = await axios.post<ChatResponse>(
          "http://localhost:3001/chat",
          {
            senderId: localStorage.getItem("userId"),
            receiverId: doctorId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate(`/messages?chatId=${response.data._id}`);
      }
    } catch (error) {
      console.error("Error handling chat:", error);
      setError("Failed to start chat. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-teal-800 mb-2">
            Find Your Doctor
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our network of qualified healthcare professionals and find
            the right specialist for your needs.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, specialization, or hospital"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
            </button>
          </div>

          {(isFilterOpen || window.innerWidth >= 768) && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Filter by:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    placeholder="e.g. Cardiologist"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Doctors Grid */}
        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-full">
                      {doctor.profilePhoto ? (
                        <img
                          src={doctor.profilePhoto}
                          alt={doctor.fullName}
                          className="w-full rounded-3xl object-cover border-2 border-teal-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center border-2 border-teal-100">
                          <span className="text-xl font-medium text-teal-800">
                            {doctor.fullName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-gray-900 truncate">
                        Dr. {doctor.fullName}
                      </h2>
                      <p className="text-sm text-teal-600 font-medium">
                        {doctor.specialization}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {doctor.hospital}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-teal-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span>{doctor.medicalRegNumber}</span>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-teal-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{doctor.degrees.join(", ")}</span>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-teal-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="line-clamp-2">{doctor.address}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleMessageClick(doctor._id)}
                    className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No doctors found
            </h3>
            <p className="mt-1 text-gray-500">
              {searchTerm || specialization
                ? "Try adjusting your search or filter criteria"
                : "There are currently no doctors available in our network"}
            </p>
            {(searchTerm || specialization) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSpecialization("");
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
