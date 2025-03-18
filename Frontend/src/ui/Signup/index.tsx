import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Lottie from "lottie-react";
import SignupAnimation from "../../animation/Animation - 1741259165920.json"; // Lottie Animation
import CompanyLogo from "../../assets/logo.png"; // Import Company Logo

interface FormData {
  name: string;
  email: string;
  password: string;
}

const quotes = [
  "Start where you are. Use what you have. Do what you can.",
  "Believe in yourself. You are braver than you think.",
  "Success is not final, failure is not fatal. Keep going!",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Dream big and dare to fail. You are capable of amazing things.",
];

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signing up...", formData);

   
    navigate("/home", { replace: true });

   
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1e3245]">
      {/* Left Section with Animation */}
      <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center px-6">
        <Lottie animationData={SignupAnimation} className="w-[60%] max-w-md mb-6" />
        <p className="text-xl md:text-2xl font-semibold text-[#efdcc5] text-center transition-opacity duration-500">
          {quotes[quoteIndex]}
        </p>
      </div>

      {/* Right Section with Signup Form */}
      <div className="flex items-center justify-center w-full md:w-1/2">
        <div className="bg-[#efdcc5] p-10 shadow-lg rounded-xl w-full max-w-sm flex flex-col items-center">
          <img src={CompanyLogo} className="h-[60px] w-auto object-fill mb-4" alt="Company Logo" />

          <h2 className="text-3xl font-bold text-center text-[#287371] mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border text-[#efdcc5] bg-[#1e3245] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#287371] placeholder-gray-400"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border text-[#efdcc5] bg-[#1e3245] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#287371] placeholder-gray-400"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border text-[#efdcc5] bg-[#1e3245] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#287371] placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#287371] text-white py-3 rounded-lg hover:bg-[#1f5b5b] transition font-semibold"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4 text-[#287371]">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
