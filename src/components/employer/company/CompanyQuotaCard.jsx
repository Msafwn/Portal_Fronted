import React from 'react';
import { Shield } from 'lucide-react';

export const CompanyQuotaCard = ({
  totalSeatsQuota = 0,
  filledSeatsCount = 0,
  onChangeQuota,
}) => {
  const openSeats = Math.max(0, totalSeatsQuota - filledSeatsCount);
  const utilizationPct = totalSeatsQuota > 0
    ? Math.min(100, Math.round((filledSeatsCount / totalSeatsQuota) * 100))
    : 0;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl p-6 2xl:p-8 3xl:p-10 shadow-2xs space-y-5 2xl:space-y-7">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 2xl:pb-4">
        <div>
          <div className="flex items-center gap-2 2xl:gap-3">
            <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-blue-600" />
            <h2 className="text-base 2xl:text-xl 3xl:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Shield className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
              <span>Private HR Seats & Vacancy Quota</span>
            </h2>
          </div>
          <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1">
            Internal quota allocation tracking how many positions your company can hire across all departments.
          </p>
        </div>

        <span className="px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-blue-50 text-blue-700 border border-blue-200">
          Internal Only 🔒
        </span>
      </div>

      {/* Metric Visuals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 2xl:gap-5">
        <div className="p-3.5 2xl:p-5 rounded-xl 2xl:rounded-2xl bg-slate-50/80 border border-slate-200/60">
          <span className="text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-500 block mb-0.5 2xl:mb-1">
            Total Allocated Quota
          </span>
          <div className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl font-black text-slate-900">
            {totalSeatsQuota} Seats
          </div>
        </div>

        <div className="p-3.5 2xl:p-5 rounded-xl 2xl:rounded-2xl bg-slate-50/80 border border-slate-200/60">
          <span className="text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-500 block mb-0.5 2xl:mb-1">
            Seats Currently Filled
          </span>
          <div className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl font-black text-blue-600">
            {filledSeatsCount} Hired
          </div>
        </div>

        <div className="p-3.5 2xl:p-5 rounded-xl 2xl:rounded-2xl bg-slate-50/80 border border-slate-200/60">
          <span className="text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-500 block mb-0.5 2xl:mb-1">
            Available Openings
          </span>
          <div className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl font-black text-emerald-600">
            {openSeats} Open
          </div>
        </div>
      </div>

      {/* Utilization Bar */}
      <div className="space-y-2 2xl:space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base font-semibold">
          <span className="text-slate-700">Company Capacity Utilization</span>
          <span className="text-blue-600 font-bold">{utilizationPct}% utilized</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 2xl:h-3.5 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 rounded-full"
            style={{ width: `${utilizationPct}%` }}
          />
        </div>
      </div>

      {/* Adjust Quota Control */}
      <div className="pt-2 2xl:pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs 2xl:text-sm 3xl:text-base">
        <div>
          <span className="font-semibold text-slate-800 block">Manage Seat Allotment</span>
          <span className="text-slate-500 text-[11px] 2xl:text-xs 3xl:text-sm">
            Scale your company's concurrent recruitment ceiling
          </span>
        </div>

        <div className="flex items-center gap-2 2xl:gap-3">
          <label className="text-xs 2xl:text-sm font-semibold text-slate-600">Total Seats:</label>
          <input
            type="number"
            min={filledSeatsCount}
            max="100"
            value={totalSeatsQuota}
            onChange={(e) => onChangeQuota(Math.max(filledSeatsCount, parseInt(e.target.value, 10) || 1))}
            className="w-20 2xl:w-24 px-3 py-1.5 2xl:px-4 2xl:py-2 text-center rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyQuotaCard;
