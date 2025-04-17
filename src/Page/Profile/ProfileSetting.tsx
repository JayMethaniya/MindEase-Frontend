import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Profile = {
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
  profilePhoto?: File | null;
  specialization?: string;
  hospital?: string;
  degrees?: string;
  profilePhotoUrl?: string;
};

export default function Settings() {
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
    profilePhoto: null,
    specialization: "",
    hospital: "",
    degrees: "",
    profilePhotoUrl: "",
  });

  const navigate = useNavigate();
  const UserRole = localStorage.getItem("role");
  const isDoctor = UserRole === "doctor";
const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get<Profile>(
          `http://localhost:3001/user/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setProfile((prev) => ({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          mobileNumber: response.data.mobileNumber || "",
          address: response.data.address || "",
          profilePhoto: null,
          specialization: response.data.specialization || "",
          hospital: response.data.hospital || "",
          degrees: response.data.degrees || "",
          profilePhotoUrl: response.data.profilePhotoUrl || "",
        }));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [isDoctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile((prev) => ({
        ...prev,
        profilePhoto: file,
        profilePhotoUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.entries(profile).forEach(([key, value]) => {
        if (value && key !== "profilePhotoUrl") {
          formData.append(key, value as string | Blob);
        }
      });

      await axios.put(`http://localhost:3001/user/profile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#287371] p-6 text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {profile.profilePhotoUrl ? (
                <img
                  src={profile.profilePhotoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-4xl">👤</span>
                </div>
              )}
            </div>
            <label
              htmlFor="profilePhoto"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#287371]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </label>
            <input
              type="file"
              id="profilePhoto"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">
            {profile.fullName || "Your Name"}
          </h1>
          <p className="text-white/80">{isDoctor ? "Doctor" : "User"}</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  name="mobileNumber"
                  value={profile.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                />
              </div>
            </div>

            {isDoctor && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleChange}
                    placeholder="Enter your specialization"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital
                  </label>
                  <input
                    name="hospital"
                    value={profile.hospital}
                    onChange={handleChange}
                    placeholder="Enter your hospital"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degrees
                  </label>
                  <input
                    name="degrees"
                    value={profile.degrees}
                    onChange={handleChange}
                    placeholder="Enter your degrees"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              
              <button
                type="submit"
                className="px-6 py-2 bg-[#287371] text-white rounded-lg hover:bg-[#1F5B5B] transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
