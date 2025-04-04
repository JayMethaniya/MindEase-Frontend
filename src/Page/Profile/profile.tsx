import { Phone, Edit, Email } from "@mui/icons-material";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/doctor_consultation_02.jpg";

interface BaseProfile {
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
  profilePhoto?: string;
  role: string;
}

interface DoctorProfile extends BaseProfile {
  specialization: string;
}

type ProfileType = DoctorProfile | BaseProfile;

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const role = profile?.role;
  const isDoctor = role === "doctor";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }
        const response = await axios.get<ProfileType>(
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

  if (!profile) {
    return <div className="text-center mt-10 text-gray-700">Loading...</div>;
  }

  return (
    <div className="p-8 flex flex-col items-center ">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Banner & Profile Image */}
        <div className="relative">
          <img
            src="https://source.unsplash.com/1600x400/?hospital,clinic"
            alt="Banner"
            className="w-full h-48 object-cover"
          />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                src={profile.profilePhoto || logo}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <Edit fontSize="small" />
              </button>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-14 text-center px-6 pb-6">
          <h2 className="text-2xl font-semibold text-gray-900">{profile.fullName}</h2>
          {isDoctor && "specialization" in profile && (
            <p className="text-blue-500 font-medium mt-1">{profile.specialization}</p>
          )}

          {/* Contact Info */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center justify-center bg-gray-100 p-3 rounded-lg">
              <Phone className="text-blue-600 mr-2" /> {profile.mobileNumber}
            </div>
            <div className="flex items-center justify-center bg-gray-100 p-3 rounded-lg">
              <Email className="text-red-500 mr-2" /> {profile.email}
            </div>
            <div className="flex items-center justify-center bg-gray-100 p-3 rounded-lg col-span-1 sm:col-span-2">
              <MapPin className="text-green-500 mr-2" /> {profile.address}
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About Me</h3>
            <p className="text-gray-600">
              {isDoctor
                ? "A dedicated healthcare professional committed to improving patient well-being through specialized care."
                : "Passionate about healthcare, striving to make a positive impact in the medical field."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Edit Profile
            </button>
            <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
