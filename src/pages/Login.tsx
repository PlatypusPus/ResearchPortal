import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '../data/types';
import { useData } from '../data/DataContext';

const roles: Role[] = ['Applicant', 'Committee', 'Dean', 'Principal', 'Admin'];

const Login: React.FC = () => {
  const [role, setRole] = useState<Role>('Applicant');
  const [name, setName] = useState('Demo User');
  const { loginAs } = useData();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role, name);
    const path = '/' + role.toLowerCase().replace(/ .*/, '');
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 p-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-lg shadow-md space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-800 mb-1">Research Grant Portal</h1>
          <p className="text-sm text-slate-600">Demo UI – select a role to explore dashboards.</p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Role</label>
          <select value={role} onChange={e => setRole(e.target.value as Role)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400">
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white py-2 rounded font-medium">Enter Portal</button>
      </form>
    </div>
  );
};
export default Login;
