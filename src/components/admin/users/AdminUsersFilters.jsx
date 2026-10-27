import React from 'react';
import { Search, Filter, X, ArrowUpDown, ChevronDown } from 'lucide-react';

export const AdminUsersFilters = ({
  search,
  setSearch,
  selectedRole,
  setSelectedRole,
  selectedFaculty,
  setSelectedFaculty,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  onReset,
}) => {
  const isFiltered =
    search ||
    selectedRole !== 'ALL' ||
    selectedFaculty !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    sortBy !== 'AI_MATCH';

  return (
    <div className="bg-white p-4 sm:p-5 2xl:p-6 3xl:p-8 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs space-y-3.5 2xl:space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 2xl:gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, email, university, skills, target role..."
            className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base text-slate-800 pl-9 2xl:pl-11 pr-8 2xl:pr-10 py-2.5 2xl:py-3.5 3xl:py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all shadow-2xs"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 2xl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
          {/* Role Filter */}
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-700 pl-3 2xl:pl-4 pr-8 2xl:pr-10 py-2.5 2xl:py-3.5 3xl:py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all cursor-pointer shadow-2xs"
            >
              <option value="ALL">All Roles</option>
              <option value="student">Student</option>
              <option value="fresh_graduate">Fresh Graduate</option>
              <option value="professional">Professional</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400 absolute right-2.5 2xl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Academic Faculty Filter */}
          <div className="relative">
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-700 pl-3 2xl:pl-4 pr-8 2xl:pr-10 py-2.5 2xl:py-3.5 3xl:py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all cursor-pointer shadow-2xs"
            >
              <option value="ALL">All Faculties</option>
              <option value="Computer Science & IT">CS & Information Tech</option>
              <option value="Medical & Healthcare">Medical & Healthcare</option>
              <option value="Engineering & Construction">Engineering & Construction</option>
              <option value="Business & Finance">Business & Finance</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400 absolute right-2.5 2xl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-700 pl-3 2xl:pl-4 pr-8 2xl:pr-10 py-2.5 2xl:py-3.5 3xl:py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all cursor-pointer shadow-2xs"
            >
              <option value="ALL">All Statuses</option>
              <option value="active">Active & Verified</option>
              <option value="pending">Pending Review</option>
              <option value="banned">Suspended / Banned</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400 absolute right-2.5 2xl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort By Filter */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-700 pl-3 2xl:pl-4 pr-8 2xl:pr-10 py-2.5 2xl:py-3.5 3xl:py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all cursor-pointer shadow-2xs"
            >
              <option value="AI_MATCH">Sort: AI Match (Highest)</option>
              <option value="NEWEST">Sort: Newest Registration</option>
              <option value="APPLICATIONS">Sort: Most Applications</option>
              <option value="NAME">Sort: Candidate Name (A-Z)</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400 absolute right-2.5 2xl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 2xl:px-4 py-2.5 2xl:py-3.5 3xl:py-4 rounded-xl 2xl:rounded-2xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs 2xl:text-sm 3xl:text-base font-semibold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsersFilters;
