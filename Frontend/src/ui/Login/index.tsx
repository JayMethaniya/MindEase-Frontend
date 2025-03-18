import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Lottie from "lottie-react";
import LoginSide from "../../animation/loginSide.json";
import CompanyLogo from "../../assets/logo.png";

interface FormData {
  email: string;
  password: string;
}

const quotes = [
  "Your feelings matter. You are not alone.",
  "Every storm runs out of rain. Keep going.",
  "You deserve to be happy and healthy.",
  "It's okay to ask for help. You are valued.",
  "Small progress is still progress.",
];

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
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
    console.log("Logging in...", formData);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1e3245]">
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 px-6">
        <Lottie animationData={LoginSide} className="w-[50%] max-w-md mb-6" />
        <p className="text-xl md:text-3xl font-semibold text-[#efdcc5] text-center transition-opacity duration-500">
          {quotes[quoteIndex]}
        </p>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2">
        <div className="bg-[#efdcc5] p-10 shadow-lg rounded-xl w-full max-w-sm flex flex-col items-center">
          <img
            src={CompanyLogo}
            className="h-[60px] rounded-xl w-auto object-contain mb-4"
            alt="Logo"
          />

          <h2 className="text-3xl font-bold text-center text-[#287371] mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 w-full">
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
              className="w-full p-3 border text-[#efdcc5] bg-[#1e3245] rounded-lg focus:outline-none  border-[#287371] focus:ring-2 focus:ring-[#287371] placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#287371] text-white py-3 rounded-lg hover:bg-[#1f5b5b] transition font-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-[#287371]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-600 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
