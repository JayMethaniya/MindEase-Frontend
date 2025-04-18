import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import Google from "../../../assets/google.png";
import axios from "axios";
import { Link } from "react-router-dom";
import rightImg from "../../../assets/doctor_consultation_02.jpg";
interface FormData {
  fullName: string;
  email: string;
  gender: string;
  profilePhoto: File | null;
  password: string;
  phone: string;
  hospital: string;
  address: string;
  medicalRegNumber: string;
  specialization: string;
  degrees: string;
  idProof: File | null;
  role: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    gender: "",
    profilePhoto: null,
    password: "",
    phone: "",
    hospital: "",
    address: "",
    medicalRegNumber: "",
    specialization: "",
    degrees: "",
    idProof: null,
    role: "doctor",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Prepare FormData for the POST request
    const formPayload = new FormData();
    formPayload.append("fullName", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("gender", formData.gender);
    formPayload.append("password", formData.password);
    formPayload.append("phone", formData.phone);
    formPayload.append("hospital", formData.hospital);
    formPayload.append("address", formData.address);
    formPayload.append("medicalRegNumber", formData.medicalRegNumber);
    formPayload.append("specialization", formData.specialization);
    formPayload.append("degrees", formData.degrees);
    formPayload.append("role", formData.role); // Ensure role is sent

    if (formData.profilePhoto) {
      formPayload.append("profilePhoto", formData.profilePhoto);
    }

    if (formData.idProof) {
      formPayload.append("idProof", formData.idProof);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/user/signup",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      if (response.status === 201) {
        setMessage("Account created successfully!");
        setTimeout(() => navigate("/login"), 1500);
        console.log("Response:", response.data);
      }
    } catch (error) {
      setMessage("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#F1F8F8] flex items-center justify-center p-4">
      <div className="flex bg-white shadow-xl flex-col sm:flex-row rounded-3xl w-full max-w-6xl h-[90vh] mx-auto">
        <div className="w-full sm:w-1/2 flex flex-col justify-start items-center p-4 sm:p-6 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#F1F8F8] [&::-webkit-scrollbar-thumb]:bg-[#DDECE9] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-[#287371]">
          <div className="max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#1E3A3A] text-center mb-1">
              Doctor Registration
            </h2>
            <p className="text-center text-sm text-[#287371] mb-4">
              Join our network of mental health professionals
            </p>
            {message && (
              <div
                className={`text-center mb-3 p-2 rounded-lg text-sm ${
                  message.includes("successfully")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                    Hospital Name
                  </label>
                  <input
                    value={formData.hospital}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    type="text"
                    name="hospital"
                    placeholder="Hospital Name"
                    required
                    className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="address"
                  placeholder="Address"
                  required
                  className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition resize-none"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                    Medical Registration Number
                  </label>
                  <input
                    value={formData.medicalRegNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    type="text"
                    name="medicalRegNumber"
                    placeholder="Medical Registration Number"
                    required
                    className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                    Specialization
                  </label>
                  <input
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    required
                    className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider mb-1">
                  Degrees
                </label>
                <input
                  value={formData.degrees}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  type="text"
                  name="degrees"
                  placeholder="Degrees"
                  required
                  className="w-full p-2 text-sm border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider">
                    Profile Photo
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="border-2 border-dashed border-[#DDECE9] rounded-lg p-3 text-center hover:border-[#287371] transition-colors">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-8 h-8 text-[#287371] mb-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-xs text-[#287371]">
                          {formData.profilePhoto
                            ? formData.profilePhoto.name
                            : "Click to upload profile photo"}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          PNG, JPG or JPEG (max. 2MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#287371] uppercase tracking-wider">
                    ID Proof
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="idProof"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="border-2 border-dashed border-[#DDECE9] rounded-lg p-3 text-center hover:border-[#287371] transition-colors">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-8 h-8 text-[#287371] mb-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-xs text-[#287371]">
                          {formData.idProof
                            ? formData.idProof.name
                            : "Click to upload ID proof"}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          PNG, JPG or JPEG (max. 2MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#287371] text-white font-semibold py-2 rounded-lg hover:bg-[#1E3A3A] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  "Register as Doctor"
                )}
              </button>
            </form>
            <p className="text-xs text-[#287371] mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#1E3A3A] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-4 hidden sm:block">
          <img
            src={rightImg}
            alt="Doctor Consultation"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
