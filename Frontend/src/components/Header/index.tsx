import { useState } from "react";
import { Notifications, Menu, Close } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import UserProfile from "../UserProfile/index";
import DropdownMenu from "../DropDown/index";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when clicking outside
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-[#efdcc5] to-[#e6d1b7] border-b-2 border-[#287371] p-4 shadow-md font-bold text-xl flex justify-between items-center h-16 fixed top-0 left-0 w-full z-50">
        
        {/* Logo (Hidden on Small Screens) */}
        <img
          src={logo}
          className="h-[50px] w-auto object-contain hidden md:block"
          alt="Logo"
        />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="text-[#1e3245]" fontSize="large" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 text-base">
          <NavLink to="/home" className="p-2 text-[#1e3245] rounded">
            Home
          </NavLink>
          <NavLink to="/mood-tracking" className="p-2 text-[#1e3245] rounded">
            Mood Tracking
          </NavLink>
          <DropdownMenu
            title="Resources"
            items={[
              { name: "Articles", path: "/resources/articles" },
              { name: "Initiatives", path: "/resources/initiatives" },
            ]}
          />
          <DropdownMenu
            title="Social"
            items={[
              { name: "Journaling", path: "/social/Journaling" },
              { name: "Groups", path: "/social/group" },
              { name: "Quiz", path: "/social/quiz" },
              { name: "Relax", path: "/social/relax" },
            ]}
          />
        </nav>

        {/* Icons (Notifications & Profile) */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full h-12 w-12 flex items-center justify-center">
            <Notifications className="text-[#1e3245]" fontSize="large" />
          </button>
          <UserProfile />
        </div>
      </header>

      {/* Sidebar (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar} // Close when clicking outside
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#efdcc5] w-64 shadow-lg z-50 p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Sidebar Close Button */}
        <button className="mb-4" onClick={closeSidebar}>
          <Close className="text-[#1e3245]" fontSize="large" />
        </button>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/home"
            className="p-2 text-[#1e3245] rounded"
            onClick={closeSidebar}
          >
            Home
          </NavLink>
          <NavLink
            to="/mood-tracking"
            className="p-2 text-[#1e3245] rounded"
            onClick={closeSidebar}
          >
            Mood Tracking
          </NavLink>
          <DropdownMenu
            title="Resources"
            items={[
              { name: "Articles", path: "/resources/articles" },
              { name: "Initiatives", path: "/resources/initiatives" },
            ]}
          />
          <DropdownMenu
            title="Social"
            items={[
              { name: "Journaling", path: "/social/Journaling" },
              { name: "Groups", path: "/social/group" },
              { name: "Quiz", path: "/social/quiz" },
              { name: "Relax", path: "/social/relax" },
            ]}
          />
        </nav>
      </aside>
    </>
  );
};

export default Header;
