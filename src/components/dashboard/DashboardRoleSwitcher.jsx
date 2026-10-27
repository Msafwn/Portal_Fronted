import React from 'react';
import { useDashboard } from './DashboardContext';

export const DashboardRoleSwitcher = ({ className = '' }) => {
  const { accountRole, profile, candidateRole } = useDashboard();

  const rawRole = accountRole || profile?.accountRole || (profile?.role === 'professional' ? 'experienced' : profile?.role) || candidateRole || 'student';
  const userRole = String(rawRole).toLowerCase();

  const roleMeta = {
    student: {
      label: 'Student',
      icon: '🎓',
      scope: 'Curated Internships, Research Grants & Trainee Tracks',
    },
    fresh_graduate: {
      label: 'Fresh Graduate',
      icon: '🚀',
      scope: 'Entry-Level Positions & High-Impact Growth Opportunities',
    },
    experienced: {
      label: 'Experienced Professional',
      icon: '💼',
      scope: 'Mid-to-Senior Roles & Specialized Leadership Positions',
    },
  };

  const activeRoleInfo = roleMeta[userRole] || roleMeta.student;

  return (
    <div
      className={`p-3.5 sm:p-4 2xl:p-5 3xl:p-6 bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 2xl:gap-6 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2.5 2xl:gap-3.5">
        <span className="text-xs 2xl:text-base 3xl:text-lg font-bold text-slate-800 uppercase tracking-wider shrink-0">
          Candidate Role:
        </span>

        {/* Single confirmed role from backend */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm 2xl:text-base font-bold bg-blue-600 text-white shadow-xs">
          <span className="text-base">{activeRoleInfo.icon}</span>
          <span>{activeRoleInfo.label}</span>
          <span className="text-[10px] 2xl:text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 text-white border border-white/20">
            Account Role
          </span>
        </div>

        <span className="text-[11px] 2xl:text-xs text-slate-500 font-medium hidden md:inline">
          • {activeRoleInfo.scope}
        </span>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs 2xl:text-sm font-semibold border border-emerald-200/80 shadow-2xs shrink-0 self-start sm:self-auto">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span>Synchronized with Profile</span>
      </div>
    </div>
  );
};

export default DashboardRoleSwitcher;
