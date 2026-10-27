import React from 'react';
import { useJobFeed } from './JobFeedContext';

export const JobFeedRoleSwitcher = ({ className = '' }) => {
  const { candidateRole } = useJobFeed();

  const roleMeta = {
    student: {
      label: 'Student',
      icon: '🎓',
      track: 'Internships, Research & Part-Time Opportunities',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    fresh_graduate: {
      label: 'Fresh Graduate',
      icon: '🚀',
      track: 'Entry-Level & Trainee Program Opportunities',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    experienced: {
      label: 'Professional',
      icon: '💼',
      track: 'Mid & Senior-Level Career Opportunities',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    professional: {
      label: 'Professional',
      icon: '💼',
      track: 'Mid & Senior-Level Career Opportunities',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  };

  const currentRole = roleMeta[candidateRole] || roleMeta.fresh_graduate;

  return (
    <div className={`p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Candidate Role:
        </span>
        <span className="text-xs text-slate-500 font-medium">
          {currentRole.track}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold shadow-2xs ${currentRole.badgeClass}`}>
          <span className="text-sm">{currentRole.icon}</span>
          <span>{currentRole.label}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default JobFeedRoleSwitcher;
