import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

interface DropdownMenuProps {
  title: string;
  items: { name: string; path: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => window.innerWidth >= 1024 && setIsOpen(true)} // Hover effect on large screens
      onMouseLeave={() => window.innerWidth >= 1024 && setIsOpen(false)} // Close dropdown when hover is removed
    >
      <button
        className="p-2 rounded flex items-center gap-2 bg-transparent text-white transition md:hover:text-[#3A7D7D]"
        onClick={() => window.innerWidth < 1024 && setIsOpen(!isOpen)} // Toggle on small screens
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`left-0 w-48 bg-[#3A7D7D] shadow-lg rounded-lg overflow-hidden ${
            window.innerWidth < 768 ? "" : "absolute"
          }`}
        >
          <ul className="text-[#F4ECE2]">
            {items.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:bg-[#A7D7C5] hover:text-[#2C5E5E] cursor-pointer"
              >
                <NavLink
                  to={item.path}
                  className="block p-2"
                  onClick={() => setIsOpen(false)} // Close dropdown on click
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
