import React from 'react';
import { Application } from '../data/types';

const steps = ['Submitted', 'Committee', 'Dean', 'Principal', 'Approved'];

const Timeline: React.FC<{ application: Application }> = ({ application }) => {
  const currentIndex = (() => {
    switch (application.status) {
      case 'Pending': return 0;
      case 'Committee Review': return 1;
      case 'Dean Review': return 2;
      case 'Principal Review': return 3;
      case 'Approved': return 4;
      case 'Denied': return 4; // finished terminal
      default: return 0;
    }
  })();
  return (
    <div className="flex items-center justify-between mt-4">
      {steps.map((s, i) => {
        const done = i <= currentIndex;
        return (
          <div key={s} className="flex-1 flex flex-col items-center text-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mb-1 border ${done ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-slate-400 border-slate-300'}`}>{i+1}</div>
            <span className={`text-xs ${done ? 'text-brand-600 font-medium' : 'text-slate-400'}`}>{s}</span>
            {i < steps.length -1 && <div className={`h-0.5 w-full -mt-5 ${done && i < currentIndex ? 'bg-brand-400' : 'bg-slate-200'}`}></div>}
          </div>
        );
      })}
    </div>
  );
};
export default Timeline;
