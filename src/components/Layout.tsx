import React from "react";
import Navbar from "./ui/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-50/50">
      <Navbar />
      <main className="flex-1 p-6 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;