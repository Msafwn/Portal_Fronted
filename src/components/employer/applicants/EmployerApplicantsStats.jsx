import React from 'react';
import { Users, Sparkles, CheckCircle2, Calendar } from 'lucide-react';

export const EmployerApplicantsStats = ({ applicants = [] }) => {
  const total = applicants.length;
  const highMatch = applicants.filter((a) => (a.matchScore || 0) >= 80).length;
  const shortlisted = applicants.filter((a) => a.status === 'Shortlisted').length;
  const interviews = applicants.filter((a) => a.status === 'Interview Scheduled').length;

  const stats = [
    {
      title: 'Total Applications',
      value: total,
      subValue: 'Across all vacancies',
      icon: Users,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      title: 'High AI Matches',
      value: highMatch,
      subValue: '≥ 80% Skill & Role Fit',
      icon: Sparkles,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-100',
    },
    {
      title: 'Shortlisted Pool',
      value: shortlisted,
      subValue: 'Flagged for offer review',
      icon: CheckCircle2,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Interviews Scheduled',
      value: interviews,
      subValue: 'Live video & onsite rounds',
      icon: Calendar,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-6 3xl:gap-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="p-4 sm:p-5 2xl:p-7 3xl:p-9 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5 2xl:mb-3.5 min-w-0">
              <span
                className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold text-slate-500 uppercase tracking-normal truncate whitespace-nowrap min-w-0"
                title={stat.title}
              >
                {stat.title}
              </span>
              <div
                className={`w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-13 3xl:h-13 rounded-lg 2xl:rounded-xl ${stat.bgColor} ${stat.textColor} border ${stat.borderColor} flex items-center justify-center shrink-0`}
              >
                <Icon className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 2xl:gap-3">
              <span className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs 2xl:text-sm 3xl:text-base font-medium text-slate-500">
                candidates
              </span>
            </div>

            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-2 2xl:mt-3 font-medium">
              {stat.subValue}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default EmployerApplicantsStats;
