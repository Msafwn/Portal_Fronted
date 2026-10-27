import React from 'react';
import { Search, Briefcase, X, ArrowUpDown } from 'lucide-react';

export const EmployerApplicantsFilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedJobId,
  setSelectedJobId,
  jobs = [],
  statusFilter,
  setStatusFilter,
  minMatchFilter,
  setMinMatchFilter,
  sortBy,
  setSortBy,
  filteredCount,
  totalCount,
}) => {
  const statusOptions = [
    { label: 'All Statuses', value: 'All' },
    { label: 'Under Review', value: 'Under Review' },
    { label: 'Shortlisted ⭐', value: 'Shortlisted' },
    { label: 'Interview Scheduled 🗓️', value: 'Interview Scheduled' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  const matchOptions = [
    { label: 'All Scores', value: 0 },
    { label: '⭐ High Match (≥ 80%)', value: 80 },
    { label: 'Good Match (≥ 70%)', value: 70 },
  ];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedJobId !== 'All' ||
    statusFilter !== 'All' ||
    minMatchFilter > 0 ||
    sortBy !== 'match_desc';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedJobId('All');
    setStatusFilter('All');
    setMinMatchFilter(0);
    setSortBy('match_desc');
  };

  return (
    <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 2xl:p-7 3xl:p-8 space-y-4 2xl:space-y-6">
      {/* Row 1: Search + Job Dropdown + Sort By */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 2xl:gap-4">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name, university, skills..."
            className="w-full pl-10 2xl:pl-12 pr-9 2xl:pr-11 py-2.5 2xl:py-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 2xl:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            </button>
          )}
        </div>

        {/* Filter by Job Vacancy */}
        <div className="md:col-span-4 relative">
          <Briefcase className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="w-full pl-10 2xl:pl-12 pr-8 2xl:pr-10 py-2.5 2xl:py-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer font-medium"
          >
            <option value="All">All Job Vacancies ({jobs.length})</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({job.applicantsCount || 0} applicants)
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 2xl:px-3 text-slate-400">
            <svg className="w-4 h-4 2xl:w-5 2xl:h-5 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Sort Selector */}
        <div className="md:col-span-3 relative">
          <ArrowUpDown className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400 absolute left-3 2xl:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-8 2xl:pl-10 pr-8 2xl:pr-10 py-2.5 2xl:py-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer font-medium"
          >
            <option value="match_desc">⭐ Highest AI Match %</option>
            <option value="newest">🕒 Newest Application</option>
            <option value="name_asc">🔤 Name (A - Z)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 2xl:px-3 text-slate-400">
            <svg className="w-4 h-4 2xl:w-5 2xl:h-5 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Rows: Status & AI Match Score */}
      <div className="pt-3 2xl:pt-4 border-t border-slate-100 space-y-3 2xl:space-y-4">
        {/* Row 1: Status Pills + Reset CTA */}
        <div className="flex flex-wrap items-center justify-between gap-2 2xl:gap-3">
          <div className="flex items-center gap-1.5 2xl:gap-2 flex-wrap">
            <span className="text-xs 2xl:text-sm 3xl:text-base font-bold text-slate-500 uppercase tracking-wider mr-1">
              Status:
            </span>
            {statusOptions.map((opt) => {
              const isSelected = statusFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setStatusFilter(opt.value)}
                  className={`px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Reset Filters CTA */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 2xl:gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              <X className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Row 2: AI Score Threshold Chips */}
        <div className="flex items-center gap-1.5 2xl:gap-2 flex-wrap pt-2 2xl:pt-3 border-t border-slate-50">
          <span className="text-xs 2xl:text-sm 3xl:text-base font-bold text-slate-500 uppercase tracking-wider mr-1">
            Match:
          </span>
          {matchOptions.map((opt) => {
            const isSelected = minMatchFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setMinMatchFilter(opt.value)}
                className={`px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Results Summary */}
      <div className="flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base text-slate-500 pt-1">
        <span>
          Showing <strong className="text-slate-800 font-bold">{filteredCount}</strong> of{' '}
          <strong className="text-slate-800 font-bold">{totalCount}</strong> candidates
        </span>
        {hasActiveFilters && (
          <span className="text-blue-600 font-medium bg-blue-50 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md border border-blue-100">
            Filtered view
          </span>
        )}
      </div>
    </div>
  );
};

export default EmployerApplicantsFilterBar;
