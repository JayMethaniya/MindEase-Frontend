import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "axios";
import Google from "../../../assets/google.png";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    email: string;
    password: string;
    fullName: string;
    id: string;
    role: string;
  };
  token: string;
  role: string;
}
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3001/user/login",
        formData
      );
      if (response.status === 200) {
        const { user, token } = response.data;
        setMessage("Login successful!");
        localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
        localStorage.setItem("userId", user.id);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F8F8] flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="flex bg-white shadow-xl flex-col md:flex-row rounded-3xl w-full max-w-4xl mx-auto overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold text-[#1E3A3A] text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-[#287371] mb-6">Sign in to continue your wellness journey</p>
            {message && (
              <div className={`text-center mb-4 p-3 rounded-lg ${message.includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#287371] uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="example@gmail.com"
                  className="w-full p-3 border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#287371] uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="Password"
                  className="w-full p-3 border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#287371] text-white font-semibold py-3 rounded-lg hover:bg-[#1E3A3A] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Social Login Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button className="w-full sm:w-auto border border-[#DDECE9] text-[#287371] hover:bg-[#DDECE9] transition px-6 py-3 rounded-lg flex justify-center items-center font-semibold">
                <img src={Google} alt="google" className="w-5 h-5 mr-2" />
                <span>Google</span>
              </button>
            </div>

            <p className="text-sm text-[#287371] mt-6 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#1E3A3A] font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section (Hidden on Small Screens) */}
        <div className="w-full md:w-1/2 p-4 hidden md:block">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg?semt=ais_hybrid"
            alt="Teamwork"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
