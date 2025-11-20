import React, { useState } from 'react';
import { useData } from '../data/DataContext';
import { Role, User } from '../data/types';
import { motion } from 'framer-motion';
import { Users, FileText, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { cn } from '../lib/utils';

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage users and view system-wide application status.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* User Management Section */}
        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" /> User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="bg-muted/30 p-4 rounded-lg border space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input 
                      value={form.name} 
                      onChange={e => setForm(f=>({...f,name:e.target.value}))}
                      placeholder="User Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <select 
                      value={form.role} 
                      onChange={e => setForm(f=>({...f,role:e.target.value as Role}))}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 gap-2">
                    {editing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editing ? 'Update User' : 'Add User'}
                  </Button>
                  {editing && (
                    <Button type="button" variant="outline" onClick={reset}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>

              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                      <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="p-4 align-middle">{u.name}</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" onClick={()=>startEdit(u)}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={()=>deleteUser(u.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Applications Overview Section */}
        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" /> Applications Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Applicant</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(a => (
                      <tr key={a.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="p-4 align-middle font-medium truncate max-w-[150px]">{a.title}</td>
                        <td className="p-4 align-middle">{a.applicantName}</td>
                        <td className="p-4 align-middle">
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                            a.status === 'Approved' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                            a.status === 'Denied' ? "bg-rose-100 text-rose-700 border-rose-200" :
                            "bg-slate-100 text-slate-700 border-slate-200"
                          )}>
                            {a.finalDecision ? 'Completed' : a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-muted-foreground">No applications found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
