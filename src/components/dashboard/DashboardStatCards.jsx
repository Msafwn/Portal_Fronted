import React from 'react';
import { TrendingUp, Briefcase, Send, Award } from 'lucide-react';
import { useDashboard } from './DashboardContext';

export const DashboardStatCards = ({ className = '' }) => {
  const { stats } = useDashboard();

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 2xl:gap-6 3xl:gap-8 ${className}`}>
      <div className="p-3.5 2xl:p-6 3xl:p-8 rounded-xl 2xl:rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3 2xl:gap-5">
        <div className="p-2 2xl:p-4 rounded-lg 2xl:rounded-xl bg-blue-50 text-blue-600 shrink-0">
          <TrendingUp className="w-4 h-4 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8" />
        </div>
        <div>
          <span className="text-base 2xl:text-3xl 3xl:text-4xl font-extrabold text-slate-900 block leading-tight">
            {stats.matchIndex}%
          </span>
          <span className="text-[11px] 2xl:text-base 3xl:text-lg text-slate-500 font-medium">Match Index</span>
        </div>
      </div>

      <div className="p-3.5 2xl:p-6 3xl:p-8 rounded-xl 2xl:rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3 2xl:gap-5">
        <div className="p-2 2xl:p-4 rounded-lg 2xl:rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
          <Briefcase className="w-4 h-4 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8" />
        </div>
        <div>
          <span className="text-base 2xl:text-3xl 3xl:text-4xl font-extrabold text-slate-900 block leading-tight">
            {stats.totalRecommended}
          </span>
          <span className="text-[11px] 2xl:text-base 3xl:text-lg text-slate-500 font-medium">Matched Roles</span>
        </div>
      </div>

      <div className="p-3.5 2xl:p-6 3xl:p-8 rounded-xl 2xl:rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3 2xl:gap-5">
        <div className="p-2 2xl:p-4 rounded-lg 2xl:rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
          <Send className="w-4 h-4 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8" />
        </div>
        <div>
          <span className="text-base 2xl:text-3xl 3xl:text-4xl font-extrabold text-slate-900 block leading-tight">
            {stats.activeApplications}
          </span>
          <span className="text-[11px] 2xl:text-base 3xl:text-lg text-slate-500 font-medium">Applied Roles</span>
        </div>
      </div>

      <div className="p-3.5 2xl:p-6 3xl:p-8 rounded-xl 2xl:rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3 2xl:gap-5">
        <div className="p-2 2xl:p-4 rounded-lg 2xl:rounded-xl bg-amber-50 text-amber-600 shrink-0">
          <Award className="w-4 h-4 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8" />
        </div>
        <div>
          <span className="text-base 2xl:text-3xl 3xl:text-4xl font-extrabold text-slate-900 block leading-tight">
            {stats.shortlistedCount}
          </span>
          <span className="text-[11px] 2xl:text-base 3xl:text-lg text-slate-500 font-medium">Shortlisted</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCards;
