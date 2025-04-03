import { ReactNode, useState } from "react";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

interface ProfileProps {
  children?: ReactNode;
}

export default function Profile({ children }: ProfileProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main>{children}</main>
      </div>
    </div>
  );
}
