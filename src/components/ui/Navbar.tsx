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
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 bg-brand-800/70 text-white backdrop-blur-sm rounded-xl border border-brand-700/20 shadow-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/sjeclogo.png"
              alt="SJEC Logo"
              className="h-8 w-auto"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold text-lg">
                Research Grant Portal
              </span>
              <span className="text-xs text-brand-200">Research & Grants</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
            {nav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 rounded-md text-sm hover:bg-white/8 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className="text-sm text-brand-100 text-right">
              <div className="font-medium">{currentUser?.name}</div>
              <div className="text-xs text-brand-200">{currentUser?.role}</div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="px-3 py-2 rounded-md bg-black text-white text-sm hover:opacity-95 transition"
            >
              Logout
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              className="p-2 rounded-md hover:bg-white/6 focus:outline-none"
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

        <div className={`${open ? "block" : "hidden"} md:hidden mt-3`}>
          <div className="bg-brand-800/65 text-white backdrop-blur-sm rounded-xl border border-brand-700/20 shadow-md px-4 py-3 space-y-3">
            <div className="flex flex-col gap-2">
              {nav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-white/8 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-brand-700/20 pt-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-brand-100">
                  {currentUser?.name}
                </div>
                <div className="text-xs text-brand-200">
                  {currentUser?.role}
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                  setOpen(false);
                }}
                className="px-3 py-2 rounded-md bg-black text-white text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
