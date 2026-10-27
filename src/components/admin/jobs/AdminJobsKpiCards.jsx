import React from 'react';
import { Briefcase, CheckCircle2, Clock, ShieldAlert, Users, AlertTriangle } from 'lucide-react';

export const AdminJobsKpiCards = ({ jobs = [] }) => {
  const total = jobs.length;
  const approved = jobs.filter((j) => j.moderationStatus === 'approved').length;
  const pending = jobs.filter((j) => j.moderationStatus === 'pending').length;
  const flagged = jobs.filter((j) => j.moderationStatus === 'flagged' || j.moderationStatus === 'blocked').length;
  const totalApps = jobs.reduce((acc, curr) => acc + (curr.applicantsCount || 0), 0);

  const kpis = [
    {
      label: 'Total Vacancies',
      value: total,
      sub: 'Across 4 faculties',
      icon: Briefcase,
      color: 'blue',
      border: 'border-blue-200/60',
      bg: 'bg-blue-50/70',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Approved Jobs',
      value: approved,
      sub: 'Live on candidate feed',
      icon: CheckCircle2,
      color: 'emerald',
      border: 'border-emerald-200/60',
      bg: 'bg-emerald-50/70',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Pending Review',
      value: pending,
      sub: 'Awaiting moderation',
      icon: Clock,
      color: 'amber',
      border: 'border-amber-200/60',
      bg: 'bg-amber-50/70',
      iconColor: 'text-amber-600',
      pulse: pending > 0,
      pulseColor: 'bg-amber-500',
    },
    {
      label: 'Flagged Jobs',
      value: flagged,
      sub: 'Suspicious postings',
      icon: ShieldAlert,
      color: 'rose',
      border: 'border-rose-200/60',
      bg: 'bg-rose-50/70',
      iconColor: 'text-rose-600',
      pulse: flagged > 0,
      pulseColor: 'bg-rose-500',
    },
    {
      label: 'Applications',
      value: totalApps,
      sub: 'Across all vacancies',
      icon: Users,
      color: 'indigo',
      border: 'border-indigo-200/60',
      bg: 'bg-indigo-50/70',
      iconColor: 'text-indigo-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5 2xl:gap-5 3xl:gap-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className={`bg-white p-3.5 sm:p-4 2xl:p-6 3xl:p-7 rounded-2xl 2xl:rounded-3xl border ${kpi.border} shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between relative overflow-hidden`}
          >
            <div className="flex items-center justify-between gap-2 mb-2.5 2xl:mb-3.5 min-w-0">
              <span
                className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold text-slate-500 uppercase tracking-normal truncate whitespace-nowrap min-w-0"
                title={kpi.label}
              >
                {kpi.label}
              </span>
              <div
                className={`w-7.5 h-7.5 2xl:w-11 2xl:h-11 3xl:w-13 3xl:h-13 rounded-lg 2xl:rounded-xl ${kpi.bg} ${kpi.iconColor} flex items-center justify-center shrink-0`}
              >
                <Icon className="w-3.5 h-3.5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 2xl:gap-2">
                <span className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                  {kpi.value}
                </span>
                {kpi.pulse && (
                  <span className="relative flex h-2 w-2 2xl:h-3 2xl:w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${kpi.pulseColor || 'bg-rose-400'} opacity-75`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 2xl:h-3 2xl:w-3 ${kpi.pulseColor || 'bg-rose-500'}`} />
                  </span>
                )}
              </div>
              <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-500 mt-0.5 2xl:mt-1 font-medium truncate">{kpi.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminJobsKpiCards;
