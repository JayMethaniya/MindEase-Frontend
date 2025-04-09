import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Doctor } from "../../types/doctor";

const DoctorsList: React.FC = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialization, setSpecialization] = useState("");

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

    fetchDoctors();
  }, [searchTerm, specialization]);

  const handleMessageClick = (doctorId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to message");
        return;
      }
      navigate(`/messages?doctorId=${doctorId}`);
    } catch (error) {
      setError("Failed to navigate to messages. Please try again.");
      console.error("Error navigating to messages:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E4747]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1E4747] mb-8 text-center">
          Find a Doctor
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name, specialization, or hospital"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4747]"
          />
          <input
            type="text"
            placeholder="Filter by specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4747]"
          />
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                {doctor.profilePhoto ? (
                  <img
                    src={doctor.profilePhoto}
                    alt={doctor.fullName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl text-gray-500">
                      {doctor.fullName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-[#1E4747]">
                    Dr. {doctor.fullName}
                  </h2>
                  <p className="text-gray-600">{doctor.specialization}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Hospital:</span>{" "}
                  {doctor.hospital}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Medical Registration:</span>{" "}
                  {doctor.medicalRegNumber}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Degrees:</span>{" "}
                  {doctor.degrees.join(", ")}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Address:</span>{" "}
                  {doctor.address}
                </p>
              </div>
              <button
                onClick={handleMessageClick(doctor._id)}
                className="w-full mt-4 bg-[#1E4747] text-white py-2 rounded-lg hover:bg-[#132d2d] transition"
              >
                Message
              </button>
            </div>
          ))}
        </div>

        {doctors.length === 0 && !loading && (
          <div className="text-center mt-8">
            <p className="text-gray-600">No doctors found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList; 