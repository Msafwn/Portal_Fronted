import React from 'react';
import { Briefcase, CheckCircle2, PauseCircle, Users, Sparkles, TrendingUp } from 'lucide-react';

export const EmployerJobsStats = ({ jobs = [] }) => {
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === 'Active').length;
  const pausedJobs = jobs.filter((j) => j.status === 'Paused').length;
  const closedJobs = jobs.filter((j) => j.status === 'Closed').length;

  const totalSeats = jobs.reduce((acc, j) => acc + (Number(j.totalSeats) || 0), 0);
  const filledSeats = jobs.reduce((acc, j) => acc + (Number(j.filledSeats) || 0), 0);
  const totalApplicants = jobs.reduce((acc, j) => acc + (Number(j.applicantsCount) || 0), 0);
  const totalHighMatch = jobs.reduce((acc, j) => acc + (Number(j.highMatchCount) || 0), 0);

  const stats = [
    {
      title: 'Total Job Openings',
      value: totalJobs,
      subValue: `${filledSeats}/${totalSeats} Seats Filled`,
      subText: `${Math.round((filledSeats / (totalSeats || 1)) * 100)}% quota occupied`,
      icon: Briefcase,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Active Recruitment',
      value: activeJobs,
      subValue: `${totalJobs > 0 ? Math.round((activeJobs / totalJobs) * 100) : 0}% of portfolio`,
      subText: 'Accepting applications',
      icon: CheckCircle2,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Paused / In Review',
      value: pausedJobs,
      subValue: `${closedJobs} closed roles`,
      subText: 'Screening in progress',
      icon: PauseCircle,
      color: 'amber',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-100',
    },
    {
      title: 'Candidate Pipeline',
      value: totalApplicants,
      subValue: `${totalHighMatch} High Match`,
      subText: 'AI-ranked candidates',
      icon: Users,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-6 3xl:gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="p-4 sm:p-5 2xl:p-7 3xl:p-9 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 mb-3 2xl:mb-4 min-w-0">
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

            <div className="flex items-baseline gap-2 2xl:gap-3 flex-wrap">
              <span className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg">
                {stat.subValue}
              </span>
            </div>

            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-2 2xl:mt-3 flex items-center gap-1">
              <span>{stat.subText}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default EmployerJobsStats;
