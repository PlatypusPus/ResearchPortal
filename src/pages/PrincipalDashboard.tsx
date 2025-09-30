import React from 'react';
import { useData } from '../data/DataContext';

const PrincipalDashboard: React.FC = () => {
  const { applications, setFinalDecision } = useData();
  const principalQueue = applications.filter(a => a.status === 'Principal Review');

  return (
    <div>
      <h2 className="text-xl font-semibold text-brand-800 mb-4">Principal Desk</h2>
      <div className="space-y-6">
        {principalQueue.map(app => (
          <div key={app.id} className="card space-y-3">
            <div className="flex justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-semibold text-brand-700">{app.title}</h3>
                <p className="text-xs text-slate-500">Applicant: {app.applicantName}</p>
              </div>
              <span className="badge status-forwarded">Principal Review</span>
            </div>
            {app.deanRecommendation && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs bg-brand-50 p-3 rounded">
                <div><span className="font-medium">Grant:</span> ₹{app.deanRecommendation.grantAmount}</div>
                <div><span className="font-medium">Incentive:</span> ₹{app.deanRecommendation.publicationIncentive}</div>
                <div><span className="font-medium">First Author:</span> ₹{app.deanRecommendation.firstAuthorShare}</div>
                <div><span className="font-medium">Corresponding:</span> ₹{app.deanRecommendation.correspondingAuthorShare}</div>
                <div><span className="font-medium">Co-Author:</span> ₹{app.deanRecommendation.coAuthorShare}</div>
              </div>
            )}
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => setFinalDecision(app.id, 'Approved')} className="px-4 py-1.5 bg-emerald-600 text-white rounded text-sm">Approve</button>
              <button onClick={() => setFinalDecision(app.id, 'Rejected')} className="px-4 py-1.5 bg-rose-600 text-white rounded text-sm">Reject</button>
            </div>
            {app.comments.length > 0 && (
              <div className="text-xs space-y-1">
                <div className="font-medium text-brand-700">Comments:</div>
                {app.comments.map(c => (
                  <div key={c.id} className="border rounded p-1 bg-white">{c.role}: {c.message}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        {principalQueue.length === 0 && <div className="text-sm text-slate-600">No applications waiting.</div>}
      </div>
    </div>
  );
};
export default PrincipalDashboard;
