import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-brand-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="/src/assets/sjeclogo.png" alt="SJEC" className="h-8 w-auto mr-3" />
            <span className="font-semibold text-lg">Research Grant Portal</span>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link to="/applicant" className="px-3 py-2 rounded hover:bg-brand-700 transition">
              My Applications
            </Link>
            <Link to="#new" className="px-3 py-2 rounded hover:bg-brand-700 transition">
              New Application
            </Link>
            <Link to="/profile" className="px-3 py-2 rounded hover:bg-brand-700 transition">
              Profile
            </Link>
            <button onClick={() => navigate("/login")} className="px-3 py-2 rounded bg-black text-white hover:opacity-90 transition">
              Logout
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-controls="mobile-menu"
              aria-expanded={open}
              className="p-2 rounded-md hover:bg-brand-700/70 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className={`${open ? "block" : "hidden"} md:hidden px-4 pb-4`}>
        <div className="flex flex-col space-y-2">
          <Link to="/applicant" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-brand-700 transition">
            My Applications
          </Link>
          <Link to="#new" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-brand-700 transition">
            New Application
          </Link>
          <Link to="/profile" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-brand-700 transition">
            Profile
          </Link>
          <button onClick={() => navigate("/login")} className="w-full text-left px-3 py-2 rounded bg-black text-white hover:opacity-90 transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;