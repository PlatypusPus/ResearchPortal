import React, { useState } from 'react';
import { useData } from '../data/DataContext';

const CommitteeDashboard: React.FC = () => {
  const { applications, addComment, currentUser, setCommitteeAssessment, users } = useData();
  const committeeMembers = users.filter(u => u.role === 'Committee');
  const queue = applications.filter(a => a.status === 'Committee Review' || a.status === 'Pending');
  const [commentDraft, setCommentDraft] = useState<Record<string,string>>({});

  const myId = currentUser?.id;

  const handleAssessmentChange = (appId: string, field: 'publicationIncentiveApplicable' | 'conferenceRegistrationChargeApplicable' | 'decision', value: any) => {
    if (!myId) return;
    const payload: any = { committeeUserId: myId };
    if (field === 'decision') payload.decision = value; else payload[field] = value;
    if (field === 'decision' && value) payload.decidedAt = new Date().toISOString();
    setCommitteeAssessment(appId, payload);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-brand-800 mb-4">Committee Review Queue</h2>
      <div className="space-y-6">
        {queue.map(app => {
          const assessments = app.committeeAssessments || [];
          const myAssessment = assessments.find(a => a.committeeUserId === myId);
          const approvals = assessments.filter(a => a.decision === 'Approved').length;
          const denials = assessments.filter(a => a.decision === 'Denied').length;
          const totalNeeded = committeeMembers.length;
          const allDecided = approvals + denials === totalNeeded;
          return (
            <div key={app.id} className="card space-y-4">
              <div className="flex flex-wrap justify-between gap-2 items-start">
                <div>
                  <h3 className="font-semibold text-brand-700">{app.title || '(Untitled)'}</h3>
                  <p className="text-xs text-slate-500">Applicant: {app.applicantName}</p>
                  <p className="text-xs text-slate-500">Type: {app.applicationType} • {app.publicationType}</p>
                </div>
                <div className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded font-medium">{app.status}</div>
              </div>
              {/* Read-only application details */}
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
              {/* Proceedings Section */}
              <div className="border rounded p-3 bg-slate-50">
                <div className="text-sm font-semibold text-brand-800 mb-2">Assessment Committee Proceedings</div>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="font-medium mb-1">Publication Incentive Applicable?</div>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center gap-1">
                        <input type="radio" name={`pubInc-${app.id}`} checked={myAssessment?.publicationIncentiveApplicable === true} onChange={()=>handleAssessmentChange(app.id,'publicationIncentiveApplicable',true)} />
                        <span>Yes</span>
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input type="radio" name={`pubInc-${app.id}`} checked={myAssessment?.publicationIncentiveApplicable === false} onChange={()=>handleAssessmentChange(app.id,'publicationIncentiveApplicable',false)} />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Conference Registration Charge Applicable?</div>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center gap-1">
                        <input type="radio" name={`confReg-${app.id}`} checked={myAssessment?.conferenceRegistrationChargeApplicable === true} onChange={()=>handleAssessmentChange(app.id,'conferenceRegistrationChargeApplicable',true)} />
                        <span>Yes</span>
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input type="radio" name={`confReg-${app.id}`} checked={myAssessment?.conferenceRegistrationChargeApplicable === false} onChange={()=>handleAssessmentChange(app.id,'conferenceRegistrationChargeApplicable',false)} />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-4 text-xs">
                  <label className="inline-flex items-center gap-1">
                    <input type="radio" name={`decision-${app.id}`} checked={myAssessment?.decision === 'Approved'} onChange={()=>handleAssessmentChange(app.id,'decision','Approved')} />
                    <span>Approve</span>
                  </label>
                  <label className="inline-flex items-center gap-1">
                    <input type="radio" name={`decision-${app.id}`} checked={myAssessment?.decision === 'Denied'} onChange={()=>handleAssessmentChange(app.id,'decision','Denied')} />
                    <span>Deny</span>
                  </label>
                  <div className="ml-auto text-xs font-medium">Decisions: {approvals+denials}/{totalNeeded} • Approvals: {approvals} {denials>0 && <span className="text-rose-600">• Denials: {denials}</span>}</div>
                </div>
                {!allDecided && <div className="mt-2 text-[11px] text-slate-500">Waiting for remaining committee members...</div>}
                {allDecided && app.status === 'Dean Review' && <div className="mt-2 text-[11px] text-emerald-600 font-medium">All approvals complete. Forwarded to Dean.</div>}
                {denials>0 && app.status === 'Denied' && <div className="mt-2 text-[11px] text-rose-600 font-medium">Application denied (at least one member rejected).</div>}
              </div>
              <div className="space-y-2">
                <textarea value={commentDraft[app.id] || ''} onChange={e => setCommentDraft(d => ({ ...d, [app.id]: e.target.value }))} placeholder="Comment" className="w-full border rounded p-2 text-xs" rows={2}></textarea>
                <div className="flex gap-2 flex-wrap">
                  <button type="button" onClick={() => { if(commentDraft[app.id]) { addComment(app.id, commentDraft[app.id]); setCommentDraft(d=>({...d,[app.id]:''})); } }} className="px-3 py-1 bg-slate-200 rounded text-xs">Add Comment</button>
                </div>
              </div>
              {assessments.length > 0 && (
                <div className="bg-brand-50 p-2 rounded text-[11px] space-y-1">
                  <div className="font-medium text-brand-700">Reviewer Decisions:</div>
                  {assessments.map(a => {
                    const user = committeeMembers.find(u => u.id === a.committeeUserId);
                    return <div key={a.committeeUserId}>{user?.name || a.committeeUserId}: {a.decision || 'Pending'}</div>;
                  })}
                </div>
              )}
              {app.comments.filter(c=>c.role==='Committee').length > 0 && (
                <div className="bg-white border rounded p-2 text-[11px] space-y-1">
                  <div className="font-medium text-brand-700">Comments:</div>
                  {app.comments.filter(c=>c.role==='Committee').map(c => (
                    <div key={c.id} className="border rounded p-1 bg-brand-50">{c.message}</div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {queue.length === 0 && <div className="text-sm text-slate-600">No applications in queue.</div>}
      </div>
    </div>
  );
};
export default CommitteeDashboard;
