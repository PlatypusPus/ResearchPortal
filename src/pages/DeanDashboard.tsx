import React, { useState } from 'react';
import { useData } from '../data/DataContext';

const DeanDashboard: React.FC = () => {
  const { applications, setDeanRecommendation, addComment } = useData();
  const deanQueue = applications.filter(a => a.status === 'Dean Review');
  const [drafts, setDrafts] = useState<Record<string, any>>({});
  const [commentDraft, setCommentDraft] = useState<Record<string,string>>({});

  const updateDraft = (id: string, field: string, value: any) => {
    setDrafts(d => ({ ...d, [id]: { ...d[id], [field]: value } }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-brand-800 mb-4">Dean Review</h2>
      <div className="space-y-6">
        {deanQueue.map(app => (
          <div key={app.id} className="card space-y-5">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold text-brand-700">{app.title}</h3>
                <p className="text-xs text-slate-500">Applicant: {app.applicantName}</p>
                <p className="text-[11px] text-slate-500">Type: {app.applicationType} • {app.publicationType}</p>
              </div>
              <span className="badge status-forwarded">Dean Review</span>
            </div>

            {/* Read-only Application Details */}
            <details className="bg-white/60 rounded border p-3 text-xs open:shadow-sm">
              <summary className="cursor-pointer font-medium text-brand-700 mb-2">View Application Details</summary>
              <div className="grid md:grid-cols-2 gap-3">
                <div><span className="font-semibold">Journal / Conference:</span> {app.journalOrConference || '—'}</div>
                <div><span className="font-semibold">Quartile:</span> {app.quartile || '—'}</div>
                <div><span className="font-semibold">Impact Factor:</span> {app.impactFactor || '—'}</div>
                <div><span className="font-semibold">Indexing Type:</span> {app.indexingType || '—'}</div>
                <div><span className="font-semibold">Publisher:</span> {app.publisher || '—'}</div>
                <div><span className="font-semibold">Conference Place & Date:</span> {app.conferencePlaceDate || '—'}</div>
                <div><span className="font-semibold">Registration Fee:</span> {app.registrationFee || '—'}</div>
                <div><span className="font-semibold">Submitted:</span> {new Date(app.createdAt).toLocaleString()}</div>
              </div>
            </details>

            {/* Recommendation Section */}
            <div className="border rounded p-3 bg-slate-50 space-y-4">
              <div className="text-sm font-semibold text-brand-800">Dean Recommendation</div>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium mb-1">Recommended Grant Amount for Conference Registration (₹)</label>
                  <input
                    type="number"
                    value={drafts[app.id]?.conferenceGrant || ''}
                    onChange={e => updateDraft(app.id, 'conferenceGrant', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Recommended Publication Incentive (₹)</label>
                  <input
                    type="number"
                    value={drafts[app.id]?.publicationIncentive || ''}
                    onChange={e => updateDraft(app.id, 'publicationIncentive', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              </div>

              {/* Funding Distribution Table */}
              <div className="text-xs">
                <div className="font-medium mb-1">Proposed Funding Distribution</div>
                <div className="overflow-x-auto">
                  <table className="min-w-[400px] text-[11px] border">
                    <thead className="bg-brand-100 text-brand-800">
                      <tr>
                        <th className="px-2 py-1 text-left border">Role</th>
                        <th className="px-2 py-1 text-left border">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-1 border">First Author</td>
                        <td className="px-2 py-1 border">
                          <input
                            type="number"
                            value={drafts[app.id]?.firstAuthorShare || ''}
                            onChange={e => updateDraft(app.id, 'firstAuthorShare', Number(e.target.value))}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border">Corresponding Author</td>
                        <td className="px-2 py-1 border">
                          <input
                            type="number"
                            value={drafts[app.id]?.correspondingAuthorShare || ''}
                            onChange={e => updateDraft(app.id, 'correspondingAuthorShare', Number(e.target.value))}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border">Co-Author</td>
                        <td className="px-2 py-1 border">
                          <input
                            type="number"
                            value={drafts[app.id]?.coAuthorShare || ''}
                            onChange={e => updateDraft(app.id, 'coAuthorShare', Number(e.target.value))}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Comments & Actions */}
            <div className="space-y-2 text-xs">
              <textarea
                value={commentDraft[app.id] || ''}
                onChange={e => setCommentDraft(d => ({ ...d, [app.id]: e.target.value }))}
                placeholder="Comment"
                className="w-full border rounded p-2 text-xs"
                rows={2}
              ></textarea>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => { if(commentDraft[app.id]) { addComment(app.id, commentDraft[app.id]); setCommentDraft(d=>({...d,[app.id]:''})); } }}
                  className="px-3 py-1 bg-slate-200 rounded"
                >Add Comment</button>
                <button
                  onClick={() => setDeanRecommendation(app.id, drafts[app.id])}
                  className="px-3 py-1 bg-brand-600 text-white rounded"
                >Forward to Principal</button>
              </div>
            </div>

            {/* Committee Comments */}
            {app.comments.length > 0 && (
              <div className="bg-brand-50 p-2 rounded text-xs">
                <div className="font-medium text-brand-700 mb-1">Committee Comments:</div>
                {app.comments.filter(c=>c.role==='Committee').map(c => (
                  <div key={c.id} className="border rounded p-1 mb-1">{c.message}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        {deanQueue.length === 0 && <div className="text-sm text-slate-600">No applications awaiting review.</div>}
      </div>
    </div>
  );
};
export default DeanDashboard;
