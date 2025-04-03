import { Menu } from "@mui/icons-material";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const role = localStorage.getItem("role");
  const isDoctor = role === "doctor";
  return (
    <header className="bg-gradient-to-r from-[#A7D7C5] to-[#6AA889] shadow-md p-4 flex justify-between items-center">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 bg-gray-200 rounded"
      >
        <Menu />
      </button>
      <h1 className="text-xl font-semibold">
        {isDoctor ? "Doctor Profile" : "User Profile"}
      </h1>
    </header>
  );
}
