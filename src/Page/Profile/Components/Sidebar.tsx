import { LogOut, User } from "lucide-react";
import logo from "../../../assets/logo.png";
import { Settings } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


interface SidebarProps {
  sidebarOpen: boolean;
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user");
    localStorage.removeItem("role"); 
    localStorage.removeItem("dailyGoals"); 
    localStorage.removeItem("loglevel"); 
    localStorage.removeItem("userId")
    localStorage.removeItem("dailyGoals")
    setToken(null); // Update state
    navigate("/"); // Redirect to login page
  };
  
  return (
    <aside
      className={`bg-[#A7D7C5] text-white w-64 p-5 flex flex-col justify-between space-y-6 ${
        sidebarOpen ? "block" : "hidden"
      } md:block`}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="w-44" />
        </div>
        <div className="mt-5 space-y-4">
          <Link to="/profile" className="flex items-center space-x-2">
            <User /> <span>Profile</span>
          </Link>
          <Link to="/setting" className="flex items-center space-x-2">
            <Settings /> <span>Setting</span>
          </Link>
        </div>
      </div>
      <div>
        <button onClick={handleLogout}  className="flex items-center space-x-2">
          <LogOut /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
