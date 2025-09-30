import React, { useState } from 'react';
import { useData } from '../data/DataContext';
import { Role, User } from '../data/types';

const roles: Role[] = ['Applicant','Committee','Dean','Principal','Admin'];

const AdminDashboard: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, applications } = useData();
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ name: '', role: 'Applicant' as Role });

  const startEdit = (u: User) => { setEditing(u); setForm({ name: u.name, role: u.role }); };
  const reset = () => { setEditing(null); setForm({ name: '', role: 'Applicant' }); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateUser(editing.id, form);
    } else {
      addUser(form);
    }
    reset();
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold text-brand-800 mb-4">User Management</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 bg-white p-4 border rounded shadow text-sm items-end">
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Name</label>
            <input value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} className="border rounded px-2 py-1" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Role</label>
            <select value={form.role} onChange={e => setForm(f=>({...f,role:e.target.value as Role}))} className="border rounded px-2 py-1">
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded">{editing ? 'Update User' : 'Add User'}</button>
          {editing && <button type="button" onClick={reset} className="px-3 py-2 bg-slate-200 rounded">Cancel</button>}
        </form>

        <div className="overflow-x-auto mt-4 border rounded bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-100 text-brand-800">
              <tr>
                <th className="text-left px-3 py-2">Name</th>
                <th className="text-left px-3 py-2">Role</th>
                <th className="text-left px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="px-3 py-1">{u.name}</td>
                  <td className="px-3 py-1">{u.role}</td>
                  <td className="px-3 py-1 space-x-2">
                    <button onClick={()=>startEdit(u)} className="text-brand-700 hover:underline">Edit</button>
                    <button onClick={()=>deleteUser(u.id)} className="text-rose-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-800 mb-4">Applications Overview</h2>
        <div className="overflow-x-auto border rounded bg-white">
          <table className="min-w-full text-xs">
            <thead className="bg-brand-100 text-brand-800">
              <tr>
                <th className="text-left px-3 py-2">Title</th>
                <th className="text-left px-3 py-2">Applicant</th>
                <th className="text-left px-3 py-2">Type</th>
                <th className="text-left px-3 py-2">Status</th>
                <th className="text-left px-3 py-2">Stage</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(a => (
                <tr key={a.id} className="border-t">
                  <td className="px-3 py-1">{a.title}</td>
                  <td className="px-3 py-1">{a.applicantName}</td>
                  <td className="px-3 py-1">{a.applicationType}</td>
                  <td className="px-3 py-1">{a.status}</td>
                  <td className="px-3 py-1">{a.finalDecision ? 'Completed' : a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
export default AdminDashboard;
