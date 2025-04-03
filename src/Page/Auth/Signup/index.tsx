import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import Google from "../../../assets/google.png";
import axios from "axios";
import { Link } from "react-router-dom";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  role:string
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    role:"user"
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.post(
        "http://localhost:3001/user/signup",
        formData
      );
      if (response.status === 201) {
   
        setMessage("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      setMessage("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center px-4 sm:px-0 bg-cover bg-no-repeat bg-center bg-[url(https://img.freepik.com/free-vector/clean-medical-background_53876-116875.jpg?semt=ais_hybrid)]">
      <div className="flex bg-gradient-to-r from-[#A7D7C5] to-[#6AA889] shadow-lg flex-col sm:flex-row rounded-3xl w-full max-w-4xl mx-auto">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 rounded-r-lg">
          <div className="max-w-md w-full">
            <h2 className="text-3xl text-[#1e2b47] text-center mb-6">Sign Up</h2>
            {message && <p className="text-center text-red-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="space-y-2 mb-4">
                <label className="ml-2 text-[#1E4747] text-sm">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="John Doe"
                  className="w-full h-10 px-3 border rounded-3xl placeholder:text-sm focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2 mb-4">
                <label className="ml-2 text-[#1E4747] text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="example@gmail.com"
                  className="w-full h-10 px-3 border rounded-3xl placeholder:text-sm focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2 mb-6">
                <label className="ml-2 text-[#1E4747] text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  placeholder="Password"
                  className="w-full h-10 px-3 border rounded-3xl placeholder:text-sm focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1E4747] text-white py-3 rounded-3xl hover:bg-[#132d2d] transition"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 mt-4">
              <Link
                to="/doctor-signup"
                className="w-full sm:w-auto bg-[#1E4747] text-white hover:bg-[#132d2d] transition px-4 py-2 rounded-3xl flex justify-center items-center"
              >
                Signup as Doctor
              </Link>
              <button className="w-full sm:w-auto border px-4 py-2 rounded-3xl flex justify-center items-center mt-2 sm:mt-0">
                <img src={Google} alt="google" className="w-5 h-5 mr-2" />
                <span className="text-sm">Google</span>
              </button>
            </div>
            <p className="text-sm text-[#317070] mt-4 text-center">
              Already have an account? <Link to="/login" className="text-[#1E4747] underline">Login</Link>
            </p>
          </div>
        </div>
        {/* Right Section (Hidden on Small Screens) */}
        <div className="w-full p-4 sm:w-1/2 hidden sm:block">
          <img
            src="https://media.istockphoto.com/id/1294477039/vector/metaphor-bipolar-disorder-mind-mental-double-face-split-personality-concept-mood-disorder-2.jpg?s=612x612&w=0&k=20&c=JtBxyFapXIA63hzZk_F5WNDF92J8fD2gIFNX3Ta4U3A="
            alt="Sign Up"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;