import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../data/DataContext";

const navByRole: Record<string, { path: string; label: string }[]> = {
  Applicant: [{ path: "/applicant", label: "My Applications" }],
  Committee: [{ path: "/committee", label: "Committee Queue" }],
  Dean: [{ path: "/dean", label: "Dean Review" }],
  Principal: [{ path: "/principal", label: "Principal Desk" }],
  Admin: [{ path: "/admin", label: "Admin Panel" }],
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useData();
  const navigate = useNavigate();
  const nav = currentUser ? navByRole[currentUser.role] ?? [] : [];

  return (
    <header className="bg-brand-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/sjeclogo.png"
              alt="SJEC Logo"
              className="h-8 w-auto"
            />
            <div className="hidden sm:block">
              <div className="font-semibold text-lg">Research Grant Portal</div>
              <div className="text-xs text-brand-200">Research & Grants</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {nav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 rounded hover:bg-brand-700 transition"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-6 w-px bg-brand-700 mx-2" />
            <div className="text-sm text-brand-200 mr-3 hidden lg:block">
              {currentUser?.name} ·{" "}
              <span className="text-xs text-brand-100">
                {currentUser?.role}
              </span>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="px-3 py-2 rounded bg-black text-white hover:opacity-90 transition"
            >
              Logout
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              className="p-2 rounded-md hover:bg-brand-700/60 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${open ? "block" : "hidden"} md:hidden px-4 pb-4`}>
        <div className="space-y-2 pt-2">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded hover:bg-brand-700 transition"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-brand-700 pt-3">
            <div className="text-sm text-brand-100 mb-2">
              {currentUser?.name}
            </div>
            <div className="text-xs text-brand-200 mb-3">
              {currentUser?.role}
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded bg-black text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
