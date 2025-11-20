import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useData } from '../data/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  User, 
  FileText, 
  Users, 
  School, 
  ShieldCheck 
} from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const { currentUser, logout } = useData();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const roleLinks = {
    Applicant: [
      { to: '/applicant', icon: LayoutDashboard, label: 'Dashboard' },
    ],
    Committee: [
      { to: '/committee', icon: Users, label: 'Committee Dashboard' },
    ],
    Dean: [
      { to: '/dean', icon: School, label: 'Dean Dashboard' },
    ],
    Principal: [
      { to: '/principal', icon: ShieldCheck, label: 'Principal Dashboard' },
    ],
    Admin: [
      { to: '/admin', icon: User, label: 'Admin Dashboard' },
    ],
  };

  const links = currentUser ? roleLinks[currentUser.role as keyof typeof roleLinks] || [] : [];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          ResearchPortal
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Grant Management System</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
            onClick={() => setIsOpen(false)}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {currentUser?.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{currentUser?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser?.role}</p>
          </div>
        </div>
        <Button 
          variant="destructive" 
          className="w-full justify-start gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-card border-r border-border">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
