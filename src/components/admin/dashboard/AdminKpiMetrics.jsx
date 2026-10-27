import React from 'react';
import { Users, Building2, Briefcase, Sparkles } from 'lucide-react';
import { useAdminPortal } from '../../../context/AdminPortalContext';

export const AdminKpiMetrics = () => {
  const { kpis } = useAdminPortal();

  const cards = [
    {
      title: 'Registered Candidates',
      value: kpis.totalCandidates.toLocaleString(),
      suffix: null,
      subLabel: `${kpis.studentsCount} Students, ${kpis.graduatesCount} Grads, ${kpis.professionalsCount} Pros`,
      tag: '+24% this month',
      icon: Users,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Verified Employers',
      value: kpis.verifiedEmployersCount.toLocaleString(),
      suffix: 'Verified',
      subLabel: `${kpis.pendingEmployersCount} companies pending review`,
      tag: `${kpis.totalEmployers} registered`,
      icon: Building2,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Active Job Postings',
      value: kpis.activeJobsCount.toLocaleString(),
      suffix: 'Active',
      subLabel: `${kpis.totalJobs} total vacancies across disciplines`,
      tag: `${kpis.flaggedJobsCount} under review`,
      icon: Briefcase,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-100',
    },
    {
      title: 'AI Matches Generated',
      value: kpis.totalAiMatches.toLocaleString(),
      suffix: null,
      subLabel: `${kpis.avgMatchScore}% average weighted score`,
      tag: 'Semantic Engine',
      icon: Sparkles,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-6 3xl:gap-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-4 sm:p-4.5 2xl:p-7 3xl:p-9 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5 2xl:mb-3.5 min-w-0">
                <span
                  className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold text-slate-500 uppercase tracking-normal truncate whitespace-nowrap min-w-0"
                  title={card.title}
                >
                  {card.title}
                </span>
                <div
                  className={`w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-13 3xl:h-13 rounded-lg 2xl:rounded-xl ${card.bgColor} ${card.textColor} border ${card.borderColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 2xl:gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                  {card.value}
                </span>
                {card.suffix && (
                  <span className="text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-500">
                    {card.suffix}
                  </span>
                )}
              </div>

              <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-500 mt-1 2xl:mt-2 font-medium leading-relaxed">
                {card.subLabel}
              </p>
            </div>

            <div className="pt-2.5 2xl:pt-4 mt-2.5 2xl:mt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] 2xl:text-xs 3xl:text-sm">
              <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg truncate max-w-[70%] shrink min-w-0">
                {card.tag}
              </span>
              <span className="text-slate-400 font-medium whitespace-nowrap shrink-0 text-[10.5px] 2xl:text-xs">
                Real-time
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminKpiMetrics;
