import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../data/types";
import { useData } from "../data/DataContext";
import Dropdown from "../components/ui/Dropdown";

const roles: Role[] = ["Applicant", "Committee", "Dean", "Principal", "Admin"];

const Login: React.FC = () => {
  const [role, setRole] = useState<Role>("Applicant");
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@domain.com");
  const [password, setPassword] = useState("password");
  const { loginAs } = useData();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role, name);
    const path = "/" + role.toLowerCase().replace(/ .*/, "");
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border-2 border-brand-500 rounded-3xl shadow-sm px-8 py-10 sm:px-10 sm:py-12"
      >
        <div className="mb-6 text-center">
          <img
            src="/src/assets/sjeclogo.png"
            alt="SJEC Logo"
            className="mx-auto h-16 w-auto mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight">
            Research Grant Portal
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please login with credentials
          </p>
        </div>

        <div className="grid gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Email / Username
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@domain.com"
              className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
            />
          </div>

          <div>
            <Dropdown
              id="role"
              label="Role"
              options={roles}
              value={role}
              onChange={(v) => setRole(v as Role)}
              placeholder="Select a role"
            />
          </div>

          <div className="h-10" />

          <button
            type="submit"
            className="w-full inline-flex justify-center items-center bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-brand-800 transition-colors shadow-sm"
          >
            Enter Portal
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
