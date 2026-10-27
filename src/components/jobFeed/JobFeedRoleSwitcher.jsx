import React from 'react';
import { useJobFeed } from './JobFeedContext';

export const JobFeedRoleSwitcher = ({ className = '' }) => {
  const { profile, candidateRole } = useJobFeed();

  const rawRole = profile?.accountRole || (profile?.role === 'professional' ? 'experienced' : profile?.role) || candidateRole || 'student';
  const userRole = String(rawRole).toLowerCase();

  const roleMeta = {
    student: {
      label: 'Student',
      icon: '🎓',
      scope: 'Curated Internships, Trainee Roles & Research Tracks',
    },
    fresh_graduate: {
      label: 'Fresh Graduate',
      icon: '🚀',
      scope: 'Entry-Level Positions & High-Impact Career Tracks',
    },
    experienced: {
      label: 'Experienced Professional',
      icon: '💼',
      scope: 'Mid-Senior Level Roles & Leadership Positions',
    },
  };

  const activeRoleInfo = roleMeta[userRole] || roleMeta.student;

  return (
    <div
      className={`p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider shrink-0">
          Target Role Scope:
        </span>

        {/* Single confirmed role from backend */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-xs">
          <span>{activeRoleInfo.icon}</span>
          <span>{activeRoleInfo.label}</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/20 text-white border border-white/20">
            Account Role
          </span>
        </div>

        <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
          • Filtered for {activeRoleInfo.scope}
        </span>
      </div>

      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80 shadow-2xs shrink-0 self-start sm:self-auto">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span>Synchronized with Profile</span>
      </div>
    </div>
  );
};

export default JobFeedRoleSwitcher;
