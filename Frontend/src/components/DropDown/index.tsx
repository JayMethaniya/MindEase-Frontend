import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

interface DropdownMenuProps {
  title: string;
  items: { name: string; path: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block "
      onMouseEnter={() => window.innerWidth >= 1024 && setIsOpen(true)} // Hover effect on large screens
      onMouseLeave={() => window.innerWidth >= 1024 && setIsOpen(false)} // Close dropdown when hover is removed
    >
      {/* Dropdown Button */}
      <button
        className="p-2 rounded flex items-center gap-2 bg-transparent text-[#1e3245] transition md:hover:text-[#283848]"
        onClick={() => window.innerWidth < 1024 && setIsOpen(!isOpen)} // Toggle on small screens
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 w-48 bg-[#1e3245] shadow-lg rounded-lg overflow-hidden">
          <ul className="text-[#f1e2d0]">
            {items.map((item, index) => (
              <li key={index} className="p-2 hover:bg-[#f1e8dded] hover:text-[#283848] cursor-pointer">
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
