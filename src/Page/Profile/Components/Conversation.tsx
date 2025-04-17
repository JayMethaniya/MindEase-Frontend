import { useEffect, useState } from "react";
import axios, { head } from "axios";

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

interface ConversationData {
  members: string[]; // array of user IDs
  // Add other conversation properties if needed
}

interface Props {
  data: ConversationData;
  currentUser: string;
  online: boolean;
}

const Conversation: React.FC<Props> = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState<Profile>();
  
  const userId = data.members.find((id) => id !== currentUser);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) {
          console.error("No user ID found");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }


        const response = await axios.get<Profile>(
          `http://localhost:3001/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true,
          }
        );

        if (!response.data) {
          throw new Error("No data received from server");
        }
        setUserData(response.data);
      } catch (error: any) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    };

    fetchProfile();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      <div className="relative">
        {online && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
        <img
          src={
            userData?.profilePhoto
              ? userData.profilePhoto
              : `${process.env.REACT_APP_PUBLIC_FOLDER}defaultProfile.png`
          }
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col  text-sm md:hidden lg:flex ">
        <span className="font-medium text-gray-800">
          {userData?.fullName}
        </span>
        <span className={online ? "text-green-500" : "text-gray-500"}>
          {online ? "Online" : "Offline"}
        </span>
      </div>
    </div>
    <hr className="border-t border-gray-200 mx-auto w-[85%]" />
  </>
  );
};

export default Conversation;
