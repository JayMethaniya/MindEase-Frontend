import React, { useState, ReactNode } from "react";
import Header from "../Profile/Components/Header";
import Sidebar from "./Components/Sidebar";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen">
        {/* Sidebar - Always visible on desktop, toggles on mobile */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content Area */}
        <div className="relative flex flex-1 flex-col">
          {/* Header */}
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Main Content */}
          <main className="flex-1 flex flex-col">
            <div className="flex-1">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
