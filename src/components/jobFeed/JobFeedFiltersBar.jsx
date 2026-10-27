import React from 'react';
import { Search } from 'lucide-react';
import { DEPARTMENT_FILTERS } from '../../constants';
import { useJobFeed } from './JobFeedContext';

export const JobFeedFiltersBar = ({ className = '' }) => {
  const {
    selectedDept,
    setSelectedDept,
    selectedScope,
    setSelectedScope,
    selectedMode,
    setSelectedMode,
    searchQuery,
    setSearchQuery,
    workModes,
    candidateRole,
  } = useJobFeed();

  return (
    <div className={`space-y-4 2xl:space-y-6 ${className}`}>
      {/* Search Bar + Scope Switch */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 2xl:gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by job title, company, or required skill (e.g., React, Python)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 2xl:pl-13 pr-4 2xl:pr-6 py-2.5 2xl:py-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white text-xs 2xl:text-base 3xl:text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 2xl:gap-2 p-1 2xl:p-1.5 bg-slate-200/60 rounded-xl 2xl:rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setSelectedScope('role')}
            className={`px-3 2xl:px-5 py-1.5 2xl:py-2.5 rounded-lg 2xl:rounded-xl text-xs 2xl:text-base font-bold transition-all cursor-pointer ${
              selectedScope === 'role'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Curated for {candidateRole === 'student' ? 'Student' : candidateRole === 'experienced' ? 'Exp' : 'Grad'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedScope('all')}
            className={`px-3 2xl:px-5 py-1.5 2xl:py-2.5 rounded-lg 2xl:rounded-xl text-xs 2xl:text-base font-bold transition-all cursor-pointer ${
              selectedScope === 'all'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All System Jobs
          </button>
        </div>
      </div>

      {/* Department & Workmode Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 2xl:gap-4 pt-1">
        <div className="flex items-center gap-1.5 2xl:gap-2.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs 2xl:text-base font-bold text-slate-400 mr-1 uppercase tracking-wider shrink-0">
            Sector:
          </span>
          {DEPARTMENT_FILTERS.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`px-3 2xl:px-4 py-1 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-base font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 2xl:gap-2.5 shrink-0">
          <span className="text-xs 2xl:text-base font-bold text-slate-400 uppercase tracking-wider">
            Mode:
          </span>
          {workModes.map((wm) => (
            <button
              key={wm}
              type="button"
              onClick={() => setSelectedMode(wm)}
              className={`px-2.5 2xl:px-4 py-1 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-base font-semibold transition-all cursor-pointer ${
                selectedMode === wm
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {wm}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobFeedFiltersBar;
