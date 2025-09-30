import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../data/DataContext';

const navByRole: Record<string, { path: string; label: string; }[]> = {
  Applicant: [ { path: '/applicant', label: 'My Applications' } ],
  Committee: [ { path: '/committee', label: 'Committee Queue' } ],
  Dean: [ { path: '/dean', label: 'Dean Review' } ],
  Principal: [ { path: '/principal', label: 'Principal Desk' } ],
  Admin: [ { path: '/admin', label: 'Admin Panel' } ]
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout } = useData();
  const navigate = useNavigate();
  const nav = currentUser ? navByRole[currentUser.role] : [];
  const [open, setOpen] = useState(false);

  const close = useCallback(()=> setOpen(false),[]);

  // Close on route change or logout redirect could be added via effect if using location
  useEffect(()=>{
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handleEsc);
    return ()=> window.removeEventListener('keydown', handleEsc);
  },[close]);

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {open && <div onClick={close} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden" aria-hidden="true"/>}

      {/* Sidebar */}
      <aside className={`fixed md:static z-40 top-0 left-0 h-full md:h-auto w-64 md:w-60 bg-brand-800 text-white flex flex-col transform transition-transform duration-200 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} shadow-lg md:shadow-none`} aria-label="Sidebar Navigation">
        <div className="px-4 py-4 text-xl font-semibold tracking-wide flex items-center justify-between">
          <span>RG Portal</span>
          <button className="md:hidden p-2 -mr-2 rounded hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-white/40" onClick={close} aria-label="Close navigation menu">
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </button>
        </div>
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          {nav.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={close}
              className="block px-3 py-2 rounded hover:bg-brand-600 focus:bg-brand-600 focus:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {currentUser && (
          <div className="p-3 border-t border-brand-700 text-sm">
            <div className="font-medium truncate">{currentUser?.name}</div>
            <div className="text-brand-200 mb-2">{currentUser?.role}</div>
            <button
              onClick={() => { logout(); navigate('/login'); close(); }}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white py-1.5 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main content with top bar */}
      <div className="flex-1 flex flex-col md:pl-0">
        <header className="md:hidden flex items-center gap-3 px-4 h-14 bg-white border-b sticky top-0 z-20">
            <button
              onClick={()=>setOpen(o=>!o)}
              aria-label="Open navigation menu"
              className="p-2 rounded border border-brand-200 bg-brand-50 text-brand-800 hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            >
              <div className="space-y-1">
                <span className="block w-5 h-0.5 bg-brand-800"/>
                <span className="block w-5 h-0.5 bg-brand-800"/>
                <span className="block w-5 h-0.5 bg-brand-800"/>
              </div>
            </button>
            <div className="font-semibold text-brand-800 tracking-wide">RG Portal</div>
            <div className="ml-auto text-xs text-brand-600 font-medium">{currentUser?.role}</div>
        </header>
        <main className="flex-1 p-4 md:p-6 space-y-6 bg-brand-50/70">{children}</main>
      </div>
    </div>
  );
};
export default Layout;
