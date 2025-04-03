import { Phone, Edit } from "@mui/icons-material";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface BaseProfile {
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
  profilePhoto?: string;
  role:string
}

interface DoctorProfile extends BaseProfile {
  specialization: string;
}

type ProfileType = DoctorProfile | BaseProfile;


export default function MainContent() {

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const role = profile?.role
  const isDoctor = role === 'doctor'

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
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full relative">
        <img
          src="https://source.unsplash.com/1600x400/?abstract"
          alt="Banner"
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 text-center">
          <img
            src={profile.profilePhoto || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full">
            <Edit fontSize="small" />
          </button>
        </div>
      </div>
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold">{profile.fullName}</h2>
        {isDoctor && "specialization" in profile && <p className="text-gray-600">{profile.specialization}</p>}
        <div className="flex justify-center space-x-4 mt-2">
          <p className="text-gray-500 flex items-center">
            <Phone className="mr-1" /> {profile.mobileNumber}
          </p>
          <p className="text-gray-500 flex items-center">
            <MapPin className="mr-1" /> {profile.address}
          </p>
        </div>
      </div>
      <div className="mt-6 p-6 bg-white rounded-lg shadow-lg w-3/4 max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">About Me</h3>
        <p className="text-gray-600">describe about</p>
      </div>
    </div>
  );
}
