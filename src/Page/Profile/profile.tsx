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

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }
        const response = await axios.get<Profile>(
          `http://localhost:3001/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setProfile(response.data);
        console.log("Profile data:", response.data);
        console.log("Phone:", response.data.phone);
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
    <div className="flex w-full h-full flex-col items-center bg-[#FAF3E0]">
      <div className="w-full overflow-hidden p-10">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#164734]">Profile</h2>
        </div>

        {/* Profile Overview */}
        <div className="flex items-center bg-[#A7D7C5] p-6 rounded-lg mt-4 shadow-md">
          <img
            src={profile.profilePhoto || logo}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
          />
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-[#164734]">
              {profile.fullName}
            </h3>
            <p className="text-[#4A4A4A]">{profile.address}</p>
          </div>
          <div className="ml-auto">
            <Link to="/setting" className="p-2 bg-[#164734] text-white rounded-lg">
              <Edit /> Edit
            </Link>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-[#164734] mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-[#4A4A4A]">
            <p>
              <span className="font-medium text-[#164734]">Full Name:</span> {profile.fullName}
            </p>
            <p>
              <Email className="mr-2 text-[#164734]" />
              <span className="font-medium text-[#164734]">Email:</span> {profile.email}
            </p>
            <p>
              <Phone className="mr-2 text-[#164734]" />
              <span className="font-medium text-[#164734]">Phone:</span> {profile.phone}
            </p>
            <p>
              <span className="font-medium text-[#164734]">Bio:</span> {profile.bio}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-[#164734] mb-4">Address</h3>
          <p className="text-[#4A4A4A]">
            <span className="font-medium text-[#164734]">Full Address:</span> {profile.address}
          </p>
        </div>
      </div>
    </div>
  );
}
