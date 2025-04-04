import React, { useState, ReactNode } from "react";
import Header from "../Profile/Components/Header";
import Sidebar from "./Components/Sidebar";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div >
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Always visible on desktop, toggles on mobile */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content Area */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header */}
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Main Content */}
          <main>
            <div className="mx-auto w-full h-screen">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
