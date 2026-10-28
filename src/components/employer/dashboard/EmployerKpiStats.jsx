import React from 'react';
import {
  Briefcase,
  Users,
  CheckCircle2,
  PieChart,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';

export const EmployerKpiStats = () => {
  const { kpiStats, jobs = [], applicants = [] } = useEmployerPortal();

  const activeDeptCount = new Set(jobs.map((j) => j.department).filter(Boolean)).size;
  const highMatchCount = applicants.filter((a) => (a.matchScore || a.matchPercentage || 0) >= 80).length;
  const inInterviewCount = applicants.filter((a) => a.status === 'Interview Scheduled').length;
  const avgFit = applicants.length > 0
    ? `${(applicants.reduce((sum, a) => sum + (a.matchScore || a.matchPercentage || 0), 0) / applicants.length).toFixed(1)}% Fit`
    : '0% Fit';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 2xl:gap-6 3xl:gap-8">
      {/* 1. Active Jobs Card */}
      <div className="p-4 sm:p-5 2xl:p-7 3xl:p-9 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3 2xl:mb-4">
            <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold uppercase tracking-normal text-slate-500 whitespace-nowrap truncate min-w-0">
              Active Job Openings
            </span>
            <div className="p-2 2xl:p-3 3xl:p-3.5 rounded-xl 2xl:rounded-2xl bg-blue-50 text-blue-600 shrink-0">
              <Briefcase className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 2xl:gap-3 mb-1.5 2xl:mb-2 flex-wrap">
            <span className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
              {kpiStats.activeJobsCount}
            </span>
            <span className="text-xs 2xl:text-sm 3xl:text-base text-emerald-700 font-bold flex items-center bg-emerald-50 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full border border-emerald-200 whitespace-nowrap">
              <ArrowUpRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 mr-0.5" />
              {kpiStats.activeJobsCount} Open
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base text-slate-500 border-t border-slate-100 pt-2.5 2xl:pt-4 mt-3 2xl:mt-4 whitespace-nowrap">
          <span>Departments</span>
          <span className="text-slate-800 font-semibold">{activeDeptCount} Active</span>
        </div>
      </div>

      {/* 2. Total Applicants Pool */}
      <div className="p-4 sm:p-5 2xl:p-7 3xl:p-9 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3 2xl:mb-4">
            <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold uppercase tracking-normal text-slate-500 whitespace-nowrap truncate min-w-0">
              Total Candidates
            </span>
            <div className="p-2 2xl:p-3 3xl:p-3.5 rounded-xl 2xl:rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
              <Users className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 2xl:gap-3 mb-1.5 2xl:mb-2 flex-wrap">
            <span className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
              {kpiStats.totalApplicantsCount}
            </span>
            <span className="text-xs 2xl:text-sm 3xl:text-base text-indigo-700 font-bold flex items-center bg-indigo-50 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full border border-indigo-200 whitespace-nowrap">
              <Sparkles className="w-3 h-3 2xl:w-4 2xl:h-4 mr-1" />
              {highMatchCount} High Match
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base text-slate-500 border-t border-slate-100 pt-2.5 2xl:pt-4 mt-3 2xl:mt-4 whitespace-nowrap">
          <span>AI Scoring</span>
          <span className="text-blue-600 font-semibold">50-30-20 Engine</span>
        </div>
      </div>

      {/* 3. Shortlisted Talent */}
      <div className="p-4 sm:p-5 2xl:p-7 3xl:p-9 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3 2xl:mb-4">
            <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold uppercase tracking-normal text-slate-500 whitespace-nowrap truncate min-w-0">
              Shortlisted Talent
            </span>
            <div className="p-2 2xl:p-3 3xl:p-3.5 rounded-xl 2xl:rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
              <CheckCircle2 className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 2xl:gap-3 mb-1.5 2xl:mb-2 flex-wrap">
            <span className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
              {kpiStats.shortlistedCount}
            </span>
            <span className="text-xs 2xl:text-sm 3xl:text-base text-emerald-700 font-bold flex items-center bg-emerald-50 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full border border-emerald-200 whitespace-nowrap">
              <TrendingUp className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 mr-0.5" />
              {inInterviewCount} in Interview
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base text-slate-500 border-t border-slate-100 pt-2.5 2xl:pt-4 mt-3 2xl:mt-4 whitespace-nowrap">
          <span>Average Match</span>
          <span className="text-emerald-700 font-semibold">{avgFit}</span>
        </div>
      </div>

      {/* 4. Private HR Seats Quota Card */}
      <div className="p-4 sm:p-5 2xl:p-7 3xl:p-9 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3 2xl:mb-4">
            <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold uppercase tracking-normal text-slate-500 whitespace-nowrap truncate min-w-0">
              Private Seats Quota
            </span>
            <div className="p-2 2xl:p-3 3xl:p-3.5 rounded-xl 2xl:rounded-2xl bg-blue-50 text-blue-600 shrink-0">
              <PieChart className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
            </div>
          </div>

          {/* Quota Numbers */}
          <div className="mb-1.5 2xl:mb-2">
            <div className="text-base 2xl:text-xl font-bold text-slate-900 tracking-tight flex items-baseline gap-1 2xl:gap-2 whitespace-nowrap">
              <span className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-blue-600">{kpiStats.filledSeats}</span>
              <span className="text-slate-400 font-normal">/</span>
              <span className="text-slate-700 font-semibold">{kpiStats.totalSeats} Seats Filled</span>
            </div>
            <p className="text-xs 2xl:text-sm 3xl:text-base text-emerald-700 font-semibold mt-0.5 2xl:mt-1 flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-emerald-500 shrink-0 inline-block"></span>
              {kpiStats.openVacancies} Vacancies Open
            </p>
          </div>
        </div>

        {/* Seat Utilization Bar */}
        <div className="border-t border-slate-100 pt-2.5 2xl:pt-4 mt-3 2xl:mt-4 space-y-1.5 2xl:space-y-2">
          <div className="flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base whitespace-nowrap font-medium">
            <span className="text-slate-500">Utilization</span>
            <span className="text-blue-600 font-bold">{kpiStats.utilizationPct}%</span>
          </div>
          <div className="w-full h-2 2xl:h-3 3xl:h-3.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
              style={{ width: `${kpiStats.utilizationPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerKpiStats;
