import React from 'react';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="lg:pl-72 min-h-screen transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-4 pt-16 lg:p-8 lg:pt-8 max-w-7xl"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;