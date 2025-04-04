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
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      
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
    <div className="w-full h-screen flex justify-center items-center p-4 bg-cover bg-no-repeat bg-center bg-[url(https://img.freepik.com/free-vector/clean-medical-background_53876-116875.jpg?semt=ais_hybrid)]">
      <div className="flex bg-gradient-to-r from-[#A7D7C5] to-[#6AA889] shadow-lg flex-col md:flex-row rounded-3xl w-full max-w-4xl mx-auto">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 rounded-r-lg">
          <div className="max-w-md w-full">
            <h2 className="text-2xl sm:text-3xl text-[#1e2b47] text-center mb-4">
              Login
            </h2>
            {message && (
              <p className="text-center text-red-500 mb-4">{message}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="ml-2 text-[#1E4747] text-sm">Email</label>
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
                  className="w-full h-10 text-sm p-3 border rounded-3xl focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="ml-2 text-[#1E4747] text-sm">Password</label>
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
                  className="w-full h-10 text-sm p-3 border rounded-3xl focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1E4747] text-white py-2 rounded-3xl hover:bg-[#132d2d] transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Submit"}
              </button>
            </form>

            {/* Social Login Buttons */}
            <div className="flex flex-col sm:flex-row justify-center w-full mt-4">
              <button className=" w-1/2 border px-4 py-2 rounded-3xl flex items-center justify-center">
                <img src={Google} alt="google" className="w-5 h-5 mr-2" />
                <span className="text-sm">Google</span>
              </button>
            </div>

            <p className="text-sm text-[#317070] mt-4 text-center">
              Create New Account?{" "}
              <Link to="/signup" className="text-[#1E4747] underline">
                SignUp
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section (Hidden on Small Screens) */}
        <div className="w-full md:w-1/2 p-4 hidden md:block">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg?semt=ais_hybrid"
            alt="Teamwork"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
