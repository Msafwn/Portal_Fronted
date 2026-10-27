import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Sparkles,
  Edit3,
  Trash2,
  Share2,
  CheckCircle2,
  PauseCircle,
  XCircle,
  ChevronDown,
  Briefcase,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Pagination } from '../../common/Pagination';

export const EmployerJobsCardList = ({
  jobs = [],
  onUpdateStatus,
  onDeleteJob,
  onEditJob,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(jobs.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [jobs.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedJobs = jobs.slice(startIndex, startIndex + pageSize);

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

  const getStatusBadgeConfig = (status) => {
    switch (status) {
      case 'Active':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'Active',
          icon: CheckCircle2,
        };
      case 'Paused':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Paused',
          icon: PauseCircle,
        };
      case 'Closed':
        return {
          bg: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
          label: 'Closed',
          icon: XCircle,
        };
      default:
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          label: status,
          icon: CheckCircle2,
        };
    }
  };

  const handleCopyJobLink = (job) => {
    const fakeUrl = `${window.location.origin}/jobs/${job.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fakeUrl);
    }
    toast.success(`Shareable link for "${job.title}" copied! 📋`);
  };

  const formatDeadlineDate = (dateStr) => {
    if (!dateStr) return 'Rolling basis';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs p-12 2xl:p-16 3xl:p-20 text-center">
        <div className="w-14 h-14 2xl:w-18 2xl:h-18 3xl:w-20 3xl:h-20 rounded-2xl 2xl:rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 2xl:mb-6 border border-blue-100">
          <Briefcase className="w-7 h-7 2xl:w-9 2xl:h-9 3xl:w-10 3xl:h-10" />
        </div>
        <h3 className="text-base sm:text-lg 2xl:text-2xl 3xl:text-3xl font-bold text-slate-800 mb-1 2xl:mb-2">
          No Vacancies Found
        </h3>
        <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-500 max-w-md 2xl:max-w-xl mx-auto mb-6 2xl:mb-8">
          We couldn't find any job postings matching your selected filters or search keyword.
        </p>
        <Link
          to="/employer/post-job"
          className="inline-flex items-center gap-2 2xl:gap-3 px-5 py-2.5 2xl:px-7 2xl:py-3.5 rounded-xl 2xl:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm 2xl:text-base 3xl:text-lg shadow-xs transition-all cursor-pointer"
        >
          <Briefcase className="w-4 h-4 2xl:w-5 2xl:h-5" />
          <span>Create New Vacancy</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 2xl:space-y-6 3xl:space-y-8">
      {paginatedJobs.map((job) => {
        const statusConfig = getStatusBadgeConfig(job.status);
        const totalSeats = Number(job.totalSeats) || 1;
        const filledSeats = Number(job.filledSeats) || 0;
        const seatPercentage = Math.min(100, Math.round((filledSeats / totalSeats) * 100));

        return (
          <div
            key={job.id}
            className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all overflow-hidden"
          >
            <div className="p-5 sm:p-6 2xl:p-8 3xl:p-10 space-y-4 2xl:space-y-6">
              {/* Row 1: Header (Title, Badges, Status Dropdown) */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 2xl:gap-4">
                <div className="flex items-start gap-3 2xl:gap-4">
                  <span className="text-2xl 2xl:text-3xl 3xl:text-4xl p-2 2xl:p-3 rounded-xl 2xl:rounded-2xl bg-slate-50 border border-slate-200/60 shrink-0">
                    {job.targetIcon || '💼'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
                      <h3 className="font-bold text-base sm:text-lg 2xl:text-2xl 3xl:text-3xl text-slate-900 leading-snug">
                        {job.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg text-xs 2xl:text-sm 3xl:text-base font-semibold border ${getRoleBadgeClasses(
                          job.roleTarget
                        )}`}
                      >
                        {job.roleTarget}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 2xl:gap-3 text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-1 2xl:mt-1.5 flex-wrap">
                      <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md">
                        {job.department}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                        Posted {job.postedDate || 'recently'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Switcher Dropdown */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <div className="relative inline-block text-left">
                    <select
                      value={job.status}
                      onChange={(e) => onUpdateStatus(job.id, e.target.value)}
                      className={`text-xs 2xl:text-sm 3xl:text-base font-bold px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl border appearance-none pr-7 2xl:pr-9 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${statusConfig.bg}`}
                    >
                      <option value="Active">🟢 Active</option>
                      <option value="Paused">🟡 Paused</option>
                      <option value="Closed">🔴 Closed</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 absolute right-2 2xl:right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>
                </div>
              </div>

              {/* Row 2: Metadata Pills (Location, Salary, Deadline) */}
              <div className="flex items-center gap-x-4 2xl:gap-x-6 gap-y-2 text-xs 2xl:text-sm 3xl:text-base text-slate-600 flex-wrap pt-1">
                <span className="inline-flex items-center gap-1 2xl:gap-1.5">
                  <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                  {job.location || 'Islamabad, PK (Hybrid)'}
                </span>
                <span className="inline-flex items-center gap-1 2xl:gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-500" />
                  <span className="font-medium text-slate-700">{job.salary || 'Market Competitive'}</span>
                </span>
                <span className="inline-flex items-center gap-1 2xl:gap-1.5">
                  <Calendar className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-500" />
                  <span>Deadline: <strong className="text-slate-800">{formatDeadlineDate(job.deadline)}</strong></span>
                </span>
              </div>

              {/* Row 3: Skills Chips */}
              {job.skillsRequired && job.skillsRequired.length > 0 && (
                <div className="flex items-center gap-1.5 2xl:gap-2 flex-wrap pt-1">
                  <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold text-slate-400 uppercase tracking-wider mr-1">
                    Skills:
                  </span>
                  {job.skillsRequired.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-md 2xl:rounded-lg text-xs 2xl:text-sm 3xl:text-base font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Row 4: Private HR Seats Quota & Applicant Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6 pt-3 2xl:pt-4 border-t border-slate-100">
                {/* Seats Quota Progress */}
                <div className="bg-slate-50/70 rounded-xl 2xl:rounded-2xl p-3 2xl:p-5 border border-slate-200/60">
                  <div className="flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base mb-1.5 2xl:mb-2">
                    <span className="font-semibold text-slate-700">
                      Private HR Seat Allocation
                    </span>
                    <span className="font-bold text-slate-900">
                      {filledSeats} / {totalSeats} Seats Filled ({seatPercentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 2xl:h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        seatPercentage >= 100
                          ? 'bg-amber-500'
                          : seatPercentage > 50
                          ? 'bg-blue-600'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${seatPercentage}%` }}
                    />
                  </div>
                  <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-500 mt-1 2xl:mt-1.5">
                    {totalSeats - filledSeats > 0
                      ? `${totalSeats - filledSeats} open seat(s) remaining for offer letters`
                      : 'All allocated seats are filled for this opening'}
                  </p>
                </div>

                {/* Candidate Ingestion & AI High Match Box */}
                <div className="bg-slate-50/70 rounded-xl 2xl:rounded-2xl p-3 2xl:p-5 border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-700 block">
                      Candidate Pipeline
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5 2xl:mt-1">
                      <span className="text-lg 2xl:text-2xl 3xl:text-3xl font-bold text-slate-900">
                        {job.applicantsCount || 0}
                      </span>
                      <span className="text-xs 2xl:text-sm 3xl:text-base text-slate-500">Total Applicants</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      <Sparkles className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-500" />
                      {job.highMatchCount || 0} High Match ⭐
                    </span>
                    <span className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-500 block mt-0.5">
                      ≥ 80% AI Compatibility
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 5: Action Toolbar Footer */}
            <div className="px-5 py-3.5 2xl:px-8 2xl:py-5 bg-slate-50/90 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 2xl:gap-4">
              {/* Left Secondary Controls */}
              <div className="flex items-center gap-2 2xl:gap-3">
                {/* Share Link */}
                <button
                  onClick={() => handleCopyJobLink(job)}
                  title="Copy Share Link"
                  className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-500" />
                  <span>Share</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => onEditJob(job)}
                  title="Edit Vacancy Details"
                  className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-500" />
                  <span>Edit</span>
                </button>

                {/* Archive / Delete Confirm */}
                {deleteConfirmId === job.id ? (
                  <div className="flex items-center gap-1.5 2xl:gap-2 animate-in fade-in">
                    <span className="text-xs 2xl:text-sm 3xl:text-base font-semibold text-rose-600">
                      Archive role?
                    </span>
                    <button
                      onClick={() => {
                        onDeleteJob(job.id);
                        setDeleteConfirmId(null);
                      }}
                      className="px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-md 2xl:rounded-lg text-xs 2xl:text-sm 3xl:text-base font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-md 2xl:rounded-lg text-xs 2xl:text-sm 3xl:text-base font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(job.id)}
                    title="Archive Vacancy"
                    className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-rose-600 hover:text-rose-700 bg-white border border-rose-200/80 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    <span>Archive</span>
                  </button>
                )}
              </div>

              {/* Right Primary CTA: Direct "View Applicants" */}
              <Link
                to={`/employer/applicants?jobId=${job.id}`}
                className="inline-flex items-center justify-center gap-2 2xl:gap-2.5 px-4 py-2 2xl:px-6 2xl:py-3 rounded-xl 2xl:rounded-2xl text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xs hover:shadow transition-all cursor-pointer group"
              >
                <Users className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-100 group-hover:scale-110 transition-transform" />
                <span>View Applicants ({job.applicantsCount || 0})</span>
                <span className="text-blue-200">→</span>
              </Link>
            </div>
          </div>
        );
      })}

      {/* Unique Reusable Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={jobs.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 20]}
        itemLabel="vacancies"
        className="rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs mt-4 2xl:mt-6"
      />
    </div>
  );
};

export default EmployerJobsCardList;
