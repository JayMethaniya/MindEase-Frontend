import { Home, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Book, Chat, Settings } from "@mui/icons-material";

import logo from "../../../assets/logo.png";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const role = localStorage.getItem("role");
const isDoctor = role === "doctor";

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/");
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-[#A7D7C5] text-white p-5 flex flex-col justify-between transition-transform duration-300 z-50
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 `}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" className="w-44" />
          </div>
          <div className="mt-5 space-y-4">
            <Link
              to="/"
              className="flex bg-[#3a8585] p-3 rounded-3xl hover:bg-[#1E4747]  items-center space-x-2"
            >
              <Home /> <span>Home</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 bg-[#3a8585] p-3 rounded-3xl hover:bg-[#1E4747]"
            >
              <User /> <span>Profile</span>
            </Link>
            <Link
              to="/setting"
              className="flex items-center space-x-2 bg-[#3a8585] p-3 rounded-3xl hover:bg-[#1E4747]"
            >
              <Settings /> <span>Setting</span>
            </Link>
            <Link
              to="/messages"
              className="flex items-center space-x-2 bg-[#3a8585] p-3 rounded-3xl hover:bg-[#1E4747]"
            >
              <Chat /> <span>Message</span>
            </Link>
            {isDoctor && (
              <Link
                to="/resource"
                className="flex items-center space-x-2 bg-[#3a8585] p-3 rounded-3xl hover:bg-[#1E4747]"
              >
                <Book /> <span>Resource</span>
              </Link>
            )}
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-2 bg-[#3a8585] p-3 rounded-3xl hover:bg-[#1E4747]"
          >
            <LogOut /> <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
