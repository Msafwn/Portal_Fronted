import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  PlusCircle,
  MapPin,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';
import { Pagination } from '../../common/Pagination';

export const EmployerJobsTable = () => {
  const {
    jobs,
    selectedRoleFilter,
    setSelectedRoleFilter,
    handleToggleJobStatus,
  } = useEmployerPortal();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const roleFilterOptions = [
    { label: 'All Openings', value: 'All' },
    { label: '🎓 Internship', value: 'Internship' },
    { label: '🚀 Entry-Level', value: 'Entry-Level' },
    { label: '💼 Experienced', value: 'Experienced' },
  ];

  const filteredJobs = jobs.filter((job) => {
    if (selectedRoleFilter === 'All') return true;
    return job.roleTarget === selectedRoleFilter;
  });

  // Clamp pagination when filters change
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredJobs.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [filteredJobs.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + pageSize);

  // Role badge light theme styles
  const getRoleBadgeClasses = (target) => {
    switch (target) {
      case 'Internship':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Entry-Level':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Experienced':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Header with Title and Filter Tabs */}
      <div className="p-4 sm:p-5 2xl:p-7 3xl:p-9 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 2xl:gap-3">
            <h2 className="text-base 2xl:text-xl 3xl:text-2xl font-bold text-slate-900 tracking-tight">Active Job Openings & Seat Status</h2>
            <span className="px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base bg-blue-50 text-blue-700 border border-blue-200 font-bold">
              {jobs.length} Total
            </span>
          </div>
          <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1">
            Monitor per-role applicant flow and private company seat allocations in real-time
          </p>
        </div>

        {/* Filter Pills & Post Job Button */}
        <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
          <div className="flex items-center bg-slate-100 p-1 2xl:p-1.5 rounded-xl 2xl:rounded-2xl border border-slate-200">
            {roleFilterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedRoleFilter(opt.value)}
                className={`px-2.5 py-1 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedRoleFilter === opt.value
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <Link
            to="/employer/post-job"
            className="flex items-center gap-1.5 2xl:gap-2 px-3 py-1.5 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs 2xl:text-sm 3xl:text-base font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5 2xl:w-5 2xl:h-5" />
            <span>Post Job</span>
          </Link>
        </div>
      </div>

      {/* Jobs Table List - 100% Width Fits Without Horizontal Scrolling */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] 2xl:text-xs 3xl:text-sm font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-2.5 px-4 2xl:py-4 2xl:px-6">Role & Department</th>
              <th className="py-2.5 px-3 2xl:py-4 2xl:px-5">Role Target</th>
              <th className="py-2.5 px-3 2xl:py-4 2xl:px-5">Seat Utilization</th>
              <th className="py-2.5 px-3 2xl:py-4 2xl:px-5">Applicants</th>
              <th className="py-2.5 px-3 2xl:py-4 2xl:px-5">Status</th>
              <th className="py-2.5 px-4 2xl:py-4 2xl:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs 2xl:text-sm 3xl:text-base">
            {paginatedJobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  <Briefcase className="w-8 h-8 2xl:w-10 2xl:h-10 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-slate-700">No job openings found</p>
                  <p className="text-xs text-slate-400 mt-0.5">Click "Post Job" above to create your first vacancy.</p>
                </td>
              </tr>
            ) : (
              paginatedJobs.map((job) => {
              const seatPercent = Math.min(100, Math.round((job.filledSeats / job.totalSeats) * 100));

              return (
                <tr
                  key={job.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Title & Info */}
                  <td className="py-3 px-4 2xl:py-5 2xl:px-6 max-w-[240px] 2xl:max-w-[360px]">
                    <div className="font-bold text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {job.title}
                    </div>
                    <div className="flex items-center gap-1.5 2xl:gap-2 text-[11px] 2xl:text-xs 3xl:text-sm text-slate-500 mt-0.5 truncate">
                      <span className="truncate">{job.department}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 truncate shrink-0">
                        <MapPin className="w-3 h-3 2xl:w-4 2xl:h-4 text-slate-400 shrink-0" />
                        {job.location}
                      </span>
                    </div>
                  </td>

                  {/* Role Target Badge */}
                  <td className="py-3 px-3 2xl:py-5 2xl:px-5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 2xl:gap-1.5 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-[11px] 2xl:text-xs 3xl:text-sm font-bold border whitespace-nowrap ${getRoleBadgeClasses(
                        job.roleTarget
                      )}`}
                    >
                      <span>{job.targetIcon}</span>
                      <span>{job.roleTarget}</span>
                    </span>
                  </td>

                  {/* Seat Utilization Progress Bar */}
                  <td className="py-3 px-3 2xl:py-5 2xl:px-5 min-w-[130px] 2xl:min-w-[180px]">
                    <div className="space-y-1 2xl:space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] 2xl:text-xs 3xl:text-sm font-semibold">
                        <span className="text-slate-800">
                          {job.filledSeats}/{job.totalSeats} Seats
                        </span>
                        <span className="text-blue-600 font-bold">
                          {seatPercent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 2xl:h-2.5 3xl:h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            seatPercent >= 75
                              ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                              : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                          }`}
                          style={{ width: `${seatPercent}%` }}
                        />
                      </div>
                      <div className="text-[10px] 2xl:text-xs 3xl:text-sm text-slate-500">
                        {job.totalSeats - job.filledSeats} vacancy open
                      </div>
                    </div>
                  </td>

                  {/* Applicants Count */}
                  <td className="py-3 px-3 2xl:py-5 2xl:px-5 whitespace-nowrap">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm 2xl:text-base 3xl:text-lg font-extrabold text-slate-900">
                        {job.applicantsCount}
                      </span>
                      <span className="text-slate-500 text-[11px] 2xl:text-xs 3xl:text-sm">applied</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] 2xl:text-xs 3xl:text-sm text-emerald-700 font-bold mt-0.5">
                      <Sparkles className="w-3 h-3 2xl:w-4 2xl:h-4 text-emerald-600 shrink-0" />
                      <span>{job.highMatchCount} High-Match</span>
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-3 2xl:py-5 2xl:px-5 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleToggleJobStatus(job.id || job._id)}
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-[11px] 2xl:text-xs 3xl:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                        job.status === 'Active' || job.status === 'Open'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                      }`}
                      title="Click to toggle status"
                    >
                      <span
                        className={`w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full shrink-0 ${
                          job.status === 'Active' || job.status === 'Open' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      <span>{job.status === 'Open' ? 'Active' : job.status}</span>
                    </button>
                  </td>

                  {/* Quick Actions */}
                  <td className="py-3 px-4 2xl:py-5 2xl:px-6 text-right whitespace-nowrap">
                    <Link
                      to={`/employer/applicants?jobId=${job.id || job._id}`}
                      className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-1 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl bg-slate-100 hover:bg-slate-200/90 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs 2xl:text-sm 3xl:text-base font-bold transition-all shadow-2xs whitespace-nowrap"
                    >
                      <Users className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600 shrink-0" />
                      <span>Review</span>
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
          </tbody>
        </table>
      </div>

      {/* Unique Reusable Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredJobs.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 20]}
        itemLabel="vacancies"
      />

      {/* Table Footer */}
      <div className="p-3.5 2xl:p-5 3xl:p-6 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base text-slate-500">
        <span>Showing {filteredJobs.length} of {jobs.length} listed positions</span>
        <Link
          to="/employer/jobs"
          className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
        >
          <span>Manage All Posted Jobs</span>
          <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
        </Link>
      </div>
    </div>
  );
};

export default EmployerJobsTable;
