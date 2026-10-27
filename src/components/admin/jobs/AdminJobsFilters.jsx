import React from 'react';
import { Search, Filter, RotateCcw, ShieldAlert, Sparkles, CheckCircle2, Clock } from 'lucide-react';

const DISCIPLINES = [
  'ALL',
  'Computer Science & IT',
  'Medical & Healthcare',
  'Engineering & Construction',
  'Business & Finance',
];

const JOB_TYPES = ['ALL', 'Full-time', 'Part-time', 'Internship', 'Remote'];

export const AdminJobsFilters = ({
  search,
  setSearch,
  selectedStatus,
  setSelectedStatus,
  selectedDiscipline,
  setSelectedDiscipline,
  selectedJobType,
  setSelectedJobType,
  sortBy,
  setSortBy,
  onReset,
}) => {
  const statusTabs = [
    { key: 'ALL', label: 'All Vacancies' },
    { key: 'flagged', label: 'Flagged Scams ⚠️', highlight: 'text-rose-700 bg-rose-50 border-rose-200' },
    { key: 'pending', label: 'Pending Review ⏳', highlight: 'text-amber-700 bg-amber-50 border-amber-200' },
    { key: 'approved', label: 'Approved ✓' },
    { key: 'blocked', label: 'Blocked ⛔' },
  ];

  return (
    <div className="bg-white p-4 sm:p-5 2xl:p-6 3xl:p-8 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 2xl:space-y-5">
      {/* Search & Status Quick Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 2xl:gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title, company name, skill (e.g. Python, ETABS), or location..."
            className="w-full pl-10 2xl:pl-12 pr-4 2xl:pr-6 py-2.5 2xl:py-3.5 3xl:py-4 rounded-xl 2xl:rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-900 placeholder:text-slate-400 transition-all outline-hidden"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 2xl:right-4 top-1/2 -translate-y-1/2 text-xs 2xl:text-sm text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 2xl:gap-2.5 overflow-x-auto no-scrollbar py-1">
          {statusTabs.map((tab) => {
            const isActive = selectedStatus === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedStatus(tab.key)}
                className={`px-3 2xl:px-4.5 py-1.5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold shrink-0 transition-all cursor-pointer border ${
                  isActive
                    ? tab.highlight
                      ? `${tab.highlight} shadow-2xs font-extrabold ring-1 ring-rose-400/40`
                      : 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Select Dropdowns & Reset */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 2xl:gap-4 pt-3 2xl:pt-4 border-t border-slate-100 text-xs 2xl:text-sm 3xl:text-base">
        {/* Discipline Filter */}
        <div>
          <label className="block text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 2xl:mb-1.5">
            Faculty Discipline
          </label>
          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="w-full px-3 2xl:px-4 py-2 2xl:py-3 3xl:py-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white text-slate-700 text-xs 2xl:text-sm 3xl:text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden cursor-pointer"
          >
            {DISCIPLINES.map((d) => (
              <option key={d} value={d}>
                {d === 'ALL' ? 'All Disciplines' : d}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 2xl:mb-1.5">
            Work Arrangement
          </label>
          <select
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
            className="w-full px-3 2xl:px-4 py-2 2xl:py-3 3xl:py-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white text-slate-700 text-xs 2xl:text-sm 3xl:text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden cursor-pointer"
          >
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'ALL' ? 'All Job Types' : t}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 2xl:mb-1.5">
            Sort Priority
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 2xl:px-4 py-2 2xl:py-3 3xl:py-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white text-slate-700 text-xs 2xl:text-sm 3xl:text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden cursor-pointer"
          >
            <option value="SCAM_AND_PENDING_FIRST">⚠️ Flagged Scams & Pending First</option>
            <option value="MOST_APPLICANTS">👥 Most Applicants</option>
            <option value="NEWEST">✨ Newest Postings</option>
            <option value="TITLE_AZ">🔤 Job Title (A - Z)</option>
          </select>
        </div>

        {/* Reset Action */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full py-2 2xl:py-3 3xl:py-3.5 px-3 2xl:px-4 rounded-xl 2xl:rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-semibold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer text-xs 2xl:text-sm 3xl:text-base"
          >
            <RotateCcw className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-500" />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobsFilters;
