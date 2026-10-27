import React from 'react';
import { Building2, ShieldCheck, Clock, ShieldAlert, Briefcase } from 'lucide-react';

export const AdminEmployersKpiCards = ({ employers }) => {
  const total = employers.length;
  const verifiedCount = employers.filter((e) => e.verificationStatus === 'verified').length;
  const pendingCount = employers.filter((e) => e.verificationStatus === 'pending').length;
  const suspendedCount = employers.filter((e) => e.verificationStatus === 'suspended').length;
  const totalActiveJobs = employers.reduce((acc, curr) => acc + (curr.activeJobsCount || 0), 0);

  const cards = [
    {
      title: 'Verified Enterprises',
      value: verifiedCount,
      suffix: verifiedCount === 1 ? 'Company' : 'Companies',
      subLabel: `${Math.round((verifiedCount / (total || 1)) * 100)}% verified corporate entities`,
      tag: 'Authorized',
      icon: ShieldCheck,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Pending KYC Review',
      value: pendingCount,
      suffix: 'Pending',
      subLabel: 'NTN & SECP documents submitted for audit',
      tag: pendingCount > 0 ? 'Action Needed' : 'All Clear',
      icon: Clock,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-100',
    },
    {
      title: 'Total Active Vacancies',
      value: totalActiveJobs,
      suffix: totalActiveJobs === 1 ? 'Listing' : 'Listings',
      subLabel: 'Live openings across all 4 faculty disciplines',
      tag: 'Active Vacancies',
      icon: Briefcase,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Fraud Sentinel',
      value: suspendedCount,
      suffix: suspendedCount === 1 ? 'Blocked' : 'Blocked',
      subLabel: 'Suspicious / forged credentials blocked by WAF',
      tag: 'Fraud Guard',
      icon: ShieldAlert,
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      borderColor: 'border-rose-100',
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
              <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg truncate max-w-[70%] shrink min-w-0">
                {card.tag}
              </span>
              <span className="text-slate-400 font-medium whitespace-nowrap shrink-0 text-[10.5px] 2xl:text-xs 3xl:text-sm">
                Live KYC
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminEmployersKpiCards;
