import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../data/types";
import { useData } from "../data/DataContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";

const roles: Role[] = ["Applicant", "Committee", "Dean", "Principal", "Admin"];

const Login: React.FC = () => {
  const [role, setRole] = useState<Role>("Applicant");
  const [name, setName] = useState("Demo User");
  const { loginAs } = useData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay for effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    loginAs(role, name);
    const path = "/" + role.toLowerCase().replace(/ .*/, "");
    navigate(path);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 to-zinc-900/80" />
        
        <div className="relative z-10 max-w-lg text-white space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Research Grant Portal
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Streamline your research funding process. Submit proposals, track applications, and manage grants efficiently in one unified platform.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {['Streamlined Application Process', 'Real-time Status Tracking', 'Transparent Committee Review'].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-zinc-300">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-background flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Please enter your details to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Full Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
