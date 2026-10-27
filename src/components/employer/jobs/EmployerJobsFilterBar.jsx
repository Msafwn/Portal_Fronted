import React from 'react';
import { Search, X, Building2 } from 'lucide-react';

export const EmployerJobsFilterBar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  departmentFilter,
  setDepartmentFilter,
  roleTargetFilter,
  setRoleTargetFilter,
  jobsCount,
  totalJobsCount,
}) => {
  const statusOptions = [
    { label: 'All Openings', value: 'All' },
    { label: 'Active', value: 'Active' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Closed', value: 'Closed' },
  ];

  const sectorOptions = [
    { label: 'All Sectors & Departments', value: 'All' },
    { label: 'Computer Science & IT', value: 'Computer Science & IT' },
    { label: 'Medical & Healthcare', value: 'Medical & Healthcare' },
    { label: 'Engineering & Construction', value: 'Engineering & Construction' },
    { label: 'Business & Finance', value: 'Business & Finance' },
  ];

  const roleTargetOptions = [
    { label: 'All Career Levels', value: 'All' },
    { label: '🎓 Internship', value: 'Internship' },
    { label: '🚀 Entry-Level', value: 'Entry-Level' },
    { label: '💼 Experienced', value: 'Experienced' },
  ];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    departmentFilter !== 'All' ||
    roleTargetFilter !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setDepartmentFilter('All');
    setRoleTargetFilter('All');
  };

  return (
    <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 2xl:p-7 3xl:p-8 space-y-4 2xl:space-y-6">
      {/* Top row: Search input + Sector Dropdown */}
      <div className="flex flex-col md:flex-row gap-3 2xl:gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, department, skills, or location..."
            className="w-full pl-10 2xl:pl-12 pr-9 2xl:pr-11 py-2.5 2xl:py-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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

        {/* Sector / Department Dropdown */}
        <div className="w-full md:w-64 2xl:md:w-80 3xl:md:w-96 shrink-0">
          <div className="relative">
            <Building2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute left-3 2xl:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full pl-9 2xl:pl-11 pr-8 2xl:pr-10 py-2.5 2xl:py-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              {sectorOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 2xl:px-3 text-slate-400">
              <svg className="w-4 h-4 2xl:w-5 2xl:h-5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter rows: Status & Role Target */}
      <div className="pt-3 2xl:pt-4 border-t border-slate-100 space-y-3 2xl:space-y-4">
        {/* Row 1: Status Pills + Reset button */}
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

          {/* Reset Filters CTA if any filter is active */}
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

        {/* Row 2: Role Target Filter Chips */}
        <div className="flex items-center gap-1.5 2xl:gap-2 flex-wrap pt-2 2xl:pt-3 border-t border-slate-50">
          <span className="text-xs 2xl:text-sm 3xl:text-base font-bold text-slate-500 uppercase tracking-wider mr-1">
            Target:
          </span>
          {roleTargetOptions.map((opt) => {
            const isSelected = roleTargetFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setRoleTargetFilter(opt.value)}
                className={`px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-medium whitespace-nowrap border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Results Summary count */}
      <div className="flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base text-slate-500 pt-1">
        <span>
          Showing <strong className="text-slate-800 font-bold">{jobsCount}</strong> of{' '}
          <strong className="text-slate-800 font-bold">{totalJobsCount}</strong> posted vacancies
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

export default EmployerJobsFilterBar;
