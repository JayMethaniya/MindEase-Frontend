import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Close, Menu, Notifications } from '@mui/icons-material';

import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';
import DropdownMenu from '../DropDown/index';

interface ProfileType {
  profilePhoto?: string;
  role?: string;
}

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState<string | null>();
  const [profile, setProfilePhoto] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const img = { avatar };
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }
        const response = await axios.get<ProfileType>(
          `http://localhost:3001/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setProfilePhoto(response.data.profilePhoto || img.avatar);
        setUserRole(response.data.role || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md md:mx-auto ${
          isScrolled
            ? "h-16 md:w-[80%] md:rounded-xl md:mt-7 bg-[#6aa889] md:bg-[#6aa889cd]"
            : "w-full h-16 bg-gradient-to-r from-[#A7D7C5] to-[#6AA889]"
        }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 h-full gap-x-2 md:gap-x-4">
          {/* Logo */}
          <img
            src={logo}
            className={`h-10 sm:h-[40px] md:h-[50px] w-auto object-contain transition-all hidden lg:block duration-300 ${
              isScrolled ? "h-[30px]" : "h-[50px]"
            }`}
            alt="Logo"
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="text-[#1E4747]" fontSize="large" />
          </button>
          <nav className="hidden md:flex gap-6 text-white text-sm lg:text-base">
            <NavLink to="/" className="p-2 hover:text-[#1E4747] transition">
              Home
            </NavLink>
            {token && (
              <NavLink
                to="/mood-tracking"
                className="p-2 hover:text-[#1E4747] transition"
              >
                Mood Tracking
              </NavLink>
            )}
            <DropdownMenu
              title="Resources"
              items={[
                { name: "Articles", path: "/resources/articles" },
                { name: "Initiatives", path: "/resources/initiatives" },
                { name: "Videos", path: "/resources/video" },
                { name: "Blog", path: "/resources/blog" },
                ...(userRole === 'doctor' ? [{ name: "Manage Resources", path: "/doctor/resources" }] : []),
              ]}
            />
            <DropdownMenu
              title="Page"
              items={[
                ...(token
                  ? [{ name: "Add Blog", path: "/page/AddBlog" }]
                  : []),
                { name: "Contact Us", path: "/page/contactUs" },
                { name: "Support Groups", path: "/page/group" },
                { name: "Wellness Quiz", path: "/page/quiz" },
                { name: "Relaxation", path: "/page/relax" },
                { name: "Doctor", path: "/doctors" },
              ]}
            />
          </nav>
          <div className="flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full h-10 w-10 flex items-center justify-center">
                  <Notifications className="text-[#1E4747]" fontSize="large" />
                </button>
                <Link to="/profile" className="flex items-center gap-2">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#1E4747] text-white font-semibold h-10 w-16 flex justify-center items-center rounded-xl hover:bg-[#183939]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#A7D7C5] w-64 shadow-lg z-50 p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <button className="mb-4" onClick={closeSidebar}>
          <Close className="text-[#1E4747]" fontSize="large" />
        </button>
        <nav className="flex flex-col gap-4 text-[#1E4747] font-medium">
          <NavLink to="/" className="p-2" onClick={closeSidebar}>
            Home
          </NavLink>
          {token && (
            <NavLink to="/mood-tracking" className="p-2" onClick={closeSidebar}>
              Mood Tracking
            </NavLink>
          )}
          <DropdownMenu
            title="Resources"
            items={[
              { name: "Articles", path: "/resources/articles" },
              { name: "Initiatives", path: "/resources/initiatives" },
              { name: "Videos", path: "/resources/video" },
              { name: "Blog", path: "/resources/blog" },
              ...(userRole === 'doctor' ? [{ name: "Manage Resources", path: "/doctor/resources" }] : []),
            ]}
          />
          <DropdownMenu
            title="Page"
            items={[
              ...(token ? [{ name: "Add Blog", path: "/page/AddBlog" }] : []),
              { name: "Contact Us", path: "/page/contactUs" },
              { name: "Support Groups", path: "/page/group" },
              { name: "Wellness Quiz", path: "/page/quiz" },
              { name: "Relaxation", path: "/page/relax" },
              { name: "Doctor", path: "/doctors" },
            ]}
          />
        </nav>
      </aside>
    </>
  );
};

export default Header;
