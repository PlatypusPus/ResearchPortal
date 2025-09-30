import React, { useState } from 'react';
import { useData } from '../data/DataContext';

const ApplicantDashboard: React.FC = () => {
  const { applications, currentUser, submitApplication } = useData();
  const myApps = applications.filter(a => a.applicantName === currentUser?.name);
  const [showForm, setShowForm] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '', applicationType: '', publicationType: '', journalOrConference: '', quartile: '', impactFactor: '', indexingType: '', publisher: '', conferencePlaceDate: '', registrationFee: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication(form);
    setSubmittedMsg('Application Submitted');
    setForm({ title: '', applicationType: '', publicationType: '', journalOrConference: '', quartile: '', impactFactor: '', indexingType: '', publisher: '', conferencePlaceDate: '', registrationFee: '' });
    setShowForm(false);
    setTimeout(()=> setSubmittedMsg(null), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-brand-800">My Applications</h2>
        <button onClick={()=>setShowForm(s=>!s)} className="bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-500 text-sm font-medium">{showForm ? 'Close Form' : 'New Application'}</button>
      </div>
      {submittedMsg && <div className="mt-4 p-3 rounded bg-emerald-100 text-emerald-700 text-sm">{submittedMsg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow border">
          {[
            { label: 'Title of Publication', name: 'title' },
            { label: 'Application Type', name: 'applicationType', type: 'select', options: ['Publication Incentive','Conference Registration','Journal Publication Support'] },
            { label: 'Type of Publication', name: 'publicationType', type: 'select', options: ['National','International','Journal','Conference Proceedings','Other'] },
            { label: 'Name of Journal/Conference', name: 'journalOrConference' },
            { label: 'Quartile of Journal', name: 'quartile' },
            { label: 'Impact Factor', name: 'impactFactor' },
            { label: 'Type of Indexing (Conference/Journal)', name: 'indexingType' },
            { label: 'Publisher Details', name: 'publisher' },
            { label: 'Place & Date of Conference', name: 'conferencePlaceDate' },
            { label: 'Registration Fee', name: 'registrationFee' }
          ].map(field => (
            <div key={field.name} className="flex flex-col">
              <label className="text-xs font-medium text-slate-600 mb-1">{field.label}</label>
              {field.type === 'select' ? (
                <select name={field.name} value={(form as any)[field.name]} onChange={handleChange} className="border rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300">
                  <option value="">Select...</option>
                  {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input name={field.name} value={(form as any)[field.name]} onChange={handleChange} className="border rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300" />
              )}
            </div>
          ))}
          <div className="col-span-full flex flex-wrap gap-4 pt-2">
            <button type="button" className="px-3 py-2 bg-slate-200 rounded text-xs">Upload PDF (Signature)</button>
            <button type="button" className="px-3 py-2 bg-slate-200 rounded text-xs">Upload Attachment 1</button>
            <button type="button" className="px-3 py-2 bg-slate-200 rounded text-xs">Upload Attachment 2</button>
          </div>
          <div className="col-span-full pt-2">
            <button type="submit" className="bg-brand-600 text-white px-4 py-2 rounded text-sm font-medium">Submit Application</button>
          </div>
        </form>
      )}

      <div className="mt-8 grid gap-6">
        {myApps.map(app => (
          <div key={app.id} className="card">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-brand-700">{app.title || '(Untitled)'}</h3>
                <p className="text-xs text-slate-500">{app.applicationType} • {app.publicationType}</p>
              </div>
              <span className={`badge ${app.status === 'Pending' ? 'status-pending' : app.status === 'Approved' ? 'status-approved' : app.status === 'Denied' ? 'status-denied' : 'status-forwarded'}`}>{app.status}</span>
            </div>
            {/* Timeline removed per user request */}
            {app.comments.length > 0 && (
              <div className="mt-4 space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase">Comments</div>
                {app.comments.map(c => (
                  <div key={c.id} className="text-xs text-slate-600 flex gap-2">
                    <span className="font-medium text-brand-700">{c.role}:</span>
                    <span>{c.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {myApps.length === 0 && <div className="text-sm text-slate-600">No applications yet.</div>}
      </div>
    </div>
  );
};
export default ApplicantDashboard;
