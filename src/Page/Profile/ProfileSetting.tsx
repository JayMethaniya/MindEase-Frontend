import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Profile = {
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
  profilePhoto?: File | null;
  specialization?: string;
  hospital?: string;
  degrees?: string;
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
  });

  const navigate = useNavigate();
  const UserRole = localStorage.getItem("role");
  const isDoctor = UserRole === "doctor";

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

        // Ensure fields always have default values
        setProfile((prev) => ({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          mobileNumber: response.data.mobileNumber || "",
          address: response.data.address || "",
          profilePhoto: null, // File should be null initially
          specialization: response.data.specialization || "",
          hospital: response.data.hospital || "",
          degrees: response.data.degrees || "",
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
      setProfile((prev) => ({ ...prev, profilePhoto: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.entries(profile).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value as string | Blob);
        }
      });

      await axios.put(
        `http://localhost:3001/user/profile`, // Fixed URL typo
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      alert("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
        />
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />
        <input
          name="mobileNumber"
          value={profile.mobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="input"
        />
        <input
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Address"
          className="input"
        />
        <input type="file" onChange={handleFileChange} className="input" />
        
        {isDoctor && (
          <>
            <input
              name="specialization"
              value={profile.specialization}
              onChange={handleChange}
              placeholder="Specialization"
              className="input"
            />
            <input
              name="hospital"
              value={profile.hospital}
              onChange={handleChange}
              placeholder="Hospital"
              className="input"
            />
            <input
              name="degrees"
              value={profile.degrees}
              onChange={handleChange}
              placeholder="Degrees"
              className="input"
            />
          </>
        )}
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
