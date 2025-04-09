import { Edit, Email, Phone } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../assets/doctor_consultation_02.jpg";


interface Profile {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  address: string;
  profilePhoto?: string;
  role: string;
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
  const [activeTab, setActiveTab] = useState("profile");

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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={logo}
                    alt="Default Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-[#1E4747]">
                  {isDoctor ? "Dr. " : ""}
                  {profile.fullName}
                </h1>
                <p className="text-gray-600">{profile.bio}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Email className="text-[#1E4747]" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-[#1E4747]" />
                  <span>{profile.phone}</span>
                </div>
                <p className="text-gray-600 mt-2">{profile.address}</p>
              </div>
            </div>
          </div>

          {isDoctor && (
            <div className="border-t border-gray-200">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-6 py-3 ${
                    activeTab === "profile"
                      ? "border-b-2 border-[#1E4747] text-[#1E4747]"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </button>
                <button
                  className={`px-6 py-3 ${
                    activeTab === "resources"
                      ? "border-b-2 border-[#1E4747] text-[#1E4747]"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("resources")}
                >
                  Resources
                </button>
              </div>
              <div className="p-6">
              
                  <div>
                    <Link
                      to="/profile/settings"
                      className="inline-flex items-center gap-2 text-[#1E4747] hover:text-[#132d2d]"
                    >
                      <Edit /> Edit Profile
                    </Link>
                  </div>
               
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
