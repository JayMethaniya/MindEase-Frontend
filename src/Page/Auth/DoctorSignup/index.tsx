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
  mobileNumber: string;
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
    mobileNumber: "",
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
    localStorage.setItem("role", formData.role)

    // Prepare FormData for the POST request
    const formPayload = new FormData();
    formPayload.append("fullName", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("gender", formData.gender);
    formPayload.append("password", formData.password);
    formPayload.append("mobileNumber", formData.mobileNumber);
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
      }
    } catch (error) {
      setMessage("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center px-4 sm:px-0 bg-cover bg-no-repeat bg-center bg-[url(https://img.freepik.com/free-vector/clean-medical-background_53876-116875.jpg?semt=ais_hybrid)]">
      <div className="flex bg-gradient-to-r from-[#A7D7C5] to-[#6AA889] shadow-lg flex-col sm:flex-row rounded-3xl w-full max-w-4xl mx-auto overflow-hidden">
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-center sm:p-10 rounded-r-lg">
          <div className="max-w-md w-full">
            <h2 className="text-3xl text-[#1e2b47] text-center mb-6">
              Signup as Doctor
            </h2>
            {message && (
              <p className="text-center text-red-500 mb-4">{message}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
              />
              <div className="flex justify-center items-center gap-2">
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
                  className="w-full h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
                />
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
                />
              </div>
              <div className="flex justify-center items-center gap-2">
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
                  className="w-full h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
                />
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
                  className=" h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
                >
                  <option className="text-[13px]" value="">
                    Gender
                  </option>
                  <option className="text-[13px]" value="Male">
                    Male
                  </option>
                  <option className="text-[13px]" value="Female">
                    Female
                  </option>
                  <option className="text-[13px]" value="Other">
                    Other
                  </option>
                </select>
              </div>
              <input
                value={formData.hospital}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                type="text"
                name="hospital"
                placeholder="Hospital Name"
                required
                className="w-full h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
              />
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                name="address"
                placeholder="Address"
                required
                className="w-full h-17 px-3 border rounded-xl text-[13px] focus:outline-none resize-none"
              />
              <input
                value={formData.medicalRegNumber}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                type="text"
                name="medicalRegNumber"
                placeholder="Medical Registration Number"
                required
                className="w-full h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
              />
              <div className="flex justify-center items-center gap-2">
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
                  className="w-full h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
                />
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
                  className="w-full h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <div>
                  <label className="ml-2 text-[#1E4747] text-sm">
                    Medical Id Proof
                  </label>
                  <input
                    type="file"
                    name="idProof"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    required
                    className="w-full h-10 px-3 border rounded-xl text-[13px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="ml-2 text-[#1E4747] text-sm">
                    profilePhoto (optional)
                  </label>
                  <input
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full h-10 px-3 border rounded-xl text-[10px] focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1E4747] text-white py-3 rounded-xl hover:bg-[#132d2d] transition"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 mt-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-[#1E4747] text-white hover:bg-[#132d2d] transition px-4 py-2 rounded-3xl flex justify-center items-center"
              >
                Signup as User
              </Link>
              <button className="w-full sm:w-auto border px-4 py-2 rounded-3xl flex justify-center items-center mt-2 sm:mt-0">
                <img src={Google} alt="google" className="w-5 h-5 mr-2" />
                <span className="text-sm">Google</span>
              </button>
            </div>
            <p className="text-sm text-[#317070] mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-[#1E4747] underline">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 hidden p-4 sm:block overflow-hidden">
          <img
            src={rightImg}
            alt="Sign Up"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
