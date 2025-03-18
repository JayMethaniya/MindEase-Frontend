import React, { ReactNode } from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";

const DefaultLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-[#fcf2e7] overflow-hidden">
      {/* Fix: Make Header sticky with high z-index */}
      <Header />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden mx-auto xl:max-w-screen-2xl max-w-screen-lg pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
