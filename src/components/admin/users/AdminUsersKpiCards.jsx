import React from 'react';
import { Users, GraduationCap, Briefcase, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AdminUsersKpiCards = ({ candidates }) => {
  const total = candidates.length;
  const students = candidates.filter((c) => c.role === 'student').length;
  const graduates = candidates.filter((c) => c.role === 'fresh_graduate').length;
  const professionals = candidates.filter((c) => c.role === 'professional').length;
  const activeCount = candidates.filter((c) => c.status === 'active').length;
  const bannedCount = candidates.filter((c) => c.status === 'banned').length;

  const cards = [
    {
      title: 'Active Candidates',
      value: `${activeCount} / ${total}`,
      suffix: null,
      subLabel: `${Math.round((activeCount / (total || 1)) * 100)}% verified active roster`,
      tag: 'Verified Access',
      icon: Users,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Enrolled Students',
      value: students,
      suffix: null,
      subLabel: 'University scholars exploring internships & AI jobs',
      tag: `${Math.round((students / (total || 1)) * 100)}% of total pool`,
      icon: GraduationCap,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-100',
    },
    {
      title: 'Fresh Graduates',
      value: graduates,
      suffix: null,
      subLabel: 'Degree holders actively matched to entry roles',
      tag: 'Available Now',
      icon: Briefcase,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Professionals',
      value: professionals,
      suffix: 'Pros',
      subLabel: `${bannedCount} ${bannedCount === 1 ? 'account' : 'accounts'} suspended for compliance review`,
      tag: bannedCount > 0 ? `${bannedCount} Suspended` : 'All Compliant',
      icon: ShieldAlert,
      bgColor: bannedCount > 0 ? 'bg-rose-50' : 'bg-purple-50',
      textColor: bannedCount > 0 ? 'text-rose-600' : 'text-purple-600',
      borderColor: bannedCount > 0 ? 'border-rose-100' : 'border-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-6 3xl:gap-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-4 sm:p-5 2xl:p-7 3xl:p-8 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 2xl:mb-4 min-w-0">
                <span
                  className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold text-slate-500 uppercase tracking-normal truncate whitespace-nowrap min-w-0"
                  title={card.title}
                >
                  {card.title}
                </span>
                <div
                  className={`w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-13 3xl:h-13 rounded-lg 2xl:rounded-xl ${card.bgColor} ${card.textColor} border ${card.borderColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-4 h-4 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7" />
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

              <p className="text-[11.5px] sm:text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-1 2xl:mt-2 font-medium leading-relaxed">
                {card.subLabel}
              </p>
            </div>

            <div className="pt-3 2xl:pt-4 mt-3 2xl:mt-4 border-t border-slate-100 flex items-center justify-between gap-1.5 text-[11px] 2xl:text-xs 3xl:text-sm">
              <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg truncate max-w-[72%] shrink min-w-0">
                {card.tag}
              </span>
              <span className="text-slate-400 font-medium whitespace-nowrap shrink-0 text-[10.5px] 2xl:text-xs 3xl:text-sm">
                Live Roster
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminUsersKpiCards;
