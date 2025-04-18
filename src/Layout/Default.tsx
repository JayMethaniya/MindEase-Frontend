import React from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";

const DefaultLayout: React.FC<{ children?:React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f1f8f8]">
      <Header />
      <main className="w-full max-w-full overflow-x-hidden mt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
