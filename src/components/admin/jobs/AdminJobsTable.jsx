import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  ShieldAlert,
  Ban,
  Eye,
  AlertTriangle,
  Briefcase,
  CheckSquare,
  Square,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { Pagination } from '../../common/Pagination';

export const AdminJobsTable = ({
  jobs = [],
  onViewDossier,
  onApprove,
  onFlag,
  onBlock,
  onBulkApprove,
  onBulkFlag,
  onBulkDelete,
  onResetFilters,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Reset to page 1 if search/filters reduce total pages
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(jobs.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [jobs.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedJobs = jobs.slice(startIndex, startIndex + pageSize);

  // Checkbox helpers
  const allSelected = jobs.length > 0 && selectedIds.length === jobs.length;
  const isSelected = (id) => selectedIds.includes(id);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(jobs.map((j) => j.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getDisciplineBadge = (discipline) => {
    switch (discipline) {
      case 'Computer Science & IT':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Medical & Healthcare':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Engineering & Construction':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Business & Finance':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
            <Clock className="w-3 h-3 text-amber-600" />
            Pending Review
          </span>
        );
      case 'flagged':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap animate-pulse">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            Flagged Scam
          </span>
        );
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300 whitespace-nowrap">
            <Ban className="w-3 h-3 text-slate-600" />
            Blocked
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-50 text-slate-600 border border-slate-200 whitespace-nowrap">
            {status}
          </span>
        );
    }
  };

  const getRiskScoreBadge = (score, status, flagReason) => {
    if (status === 'flagged' || score < 40) {
      return (
        <span
          className="inline-flex items-center gap-1 text-[11px] font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full whitespace-nowrap cursor-help"
          title={flagReason || 'Suspected scam / payment demand'}
        >
          <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
          Scam Alert ({score}%)
        </span>
      );
    }
    if (score < 90) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full whitespace-nowrap">
          <Clock className="w-3 h-3 text-amber-600 shrink-0" />
          Review ({score}%)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full whitespace-nowrap">
        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
        Safe ({score}%)
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/90 border-b border-blue-200/70 p-3 sm:px-4 2xl:p-4 2xl:px-6 flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 2xl:gap-3">
            <span className="w-2 h-2 2xl:w-3 2xl:h-3 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs 2xl:text-sm 3xl:text-base font-bold text-blue-900">
              {selectedIds.length} {selectedIds.length === 1 ? 'vacancy' : 'vacancies'} selected
            </span>
          </div>

          <div className="flex items-center gap-2 2xl:gap-3">
            <button
              onClick={() => {
                onBulkApprove(selectedIds);
                setSelectedIds([]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
              <span>Bulk Approve</span>
            </button>

            <button
              onClick={() => {
                onBulkFlag(selectedIds);
                setSelectedIds([]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
              <span>Bulk Flag Scam</span>
            </button>

            <button
              onClick={() => {
                onBulkDelete(selectedIds);
                setSelectedIds([]);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 2xl:px-3.5 2xl:py-2 rounded-xl 2xl:rounded-2xl border border-slate-300 bg-white text-rose-600 hover:bg-rose-50 text-xs 2xl:text-sm 3xl:text-base font-semibold transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
              <span>Delete</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 2xl:px-3.5 2xl:py-2 rounded-xl 2xl:rounded-2xl border border-slate-300 bg-white text-slate-700 text-xs 2xl:text-sm 3xl:text-base font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Table: responsive, zero horizontal scrollbar on desktop */}
      <div className="w-full overflow-hidden">
        <table className="w-full text-left border-collapse table-auto text-xs 2xl:text-sm 3xl:text-base">
          <thead>
            <tr className="border-b border-slate-200/90 bg-slate-50/70 text-[11px] 2xl:text-xs 3xl:text-sm font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 2xl:py-4 px-3 2xl:px-4 w-8 2xl:w-10 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer 2xl:w-4 2xl:h-4"
                />
              </th>
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 font-bold">Job Vacancy & Employer</th>
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 font-bold">Role & Faculty</th>
              <th className="py-3 2xl:py-4 px-2 2xl:px-3 text-center font-bold">AI Safety</th>
              <th className="py-3 2xl:py-4 px-2 2xl:px-3 text-center font-bold">Applicants</th>
              <th className="py-3 2xl:py-4 px-2 2xl:px-3 text-center font-bold">Status</th>
              <th className="py-3 2xl:py-4 px-3 2xl:px-4 font-bold text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs 2xl:text-sm 3xl:text-base text-slate-700">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 2xl:py-16 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center space-y-2 2xl:space-y-3">
                    <Briefcase className="w-8 h-8 2xl:w-12 2xl:h-12 text-slate-300" />
                    <p className="font-semibold text-slate-700 text-sm 2xl:text-base">No job postings found</p>
                    <p className="text-xs 2xl:text-sm text-slate-400 max-w-sm 2xl:max-w-md">
                      No vacancies match your active search terms or moderation filter options.
                    </p>
                    <button
                      onClick={onResetFilters}
                      className="mt-2 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedJobs.map((j) => {
                const checked = isSelected(j.id);
                const isFlagged = j.moderationStatus === 'flagged';
                return (
                  <tr
                    key={j.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      checked
                        ? 'bg-blue-50/40'
                        : isFlagged
                        ? 'bg-rose-50/30'
                        : ''
                    }`}
                  >
                    {/* Row Checkbox */}
                    <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-3 2xl:px-4 text-center">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSelectOne(j.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer 2xl:w-4 2xl:h-4"
                      />
                    </td>

                    {/* Job Vacancy & Employer */}
                    <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">
                      <div className="flex items-center gap-2 2xl:gap-3">
                        <img
                          src={j.companyLogo}
                          alt={j.company}
                          className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-lg 2xl:rounded-xl object-cover border border-slate-200/80 shadow-2xs shrink-0"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => onViewDossier(j)}
                            className="font-bold text-slate-900 hover:text-blue-600 text-left truncate block cursor-pointer transition-colors text-xs 2xl:text-sm 3xl:text-base"
                            title={j.title}
                          >
                            {j.title}
                          </button>
                          <div className="flex items-center gap-1.5 text-[11px] 2xl:text-xs 3xl:text-sm text-slate-400 mt-0.5 truncate">
                            <span className="font-semibold text-slate-700 truncate">{j.company}</span>
                            <span>•</span>
                            <span className="truncate">{j.location}</span>
                            <span>•</span>
                            <span className="text-blue-600 font-medium truncate">{j.jobType}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role & Faculty */}
                    <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">
                      <div className="flex flex-col gap-0.5 2xl:gap-1">
                        <span className="font-bold text-slate-900 text-xs 2xl:text-sm 3xl:text-base truncate max-w-[170px] 2xl:max-w-[240px]" title={j.targetRole}>
                          {j.targetRole}
                        </span>
                        <span
                          className={`inline-block px-1.5 py-0.2 2xl:px-2 2xl:py-0.5 rounded-md text-[10px] 2xl:text-xs font-semibold border w-fit ${getDisciplineBadge(
                            j.discipline
                          )}`}
                        >
                          {j.discipline}
                        </span>
                      </div>
                    </td>

                    {/* AI Safety */}
                    <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4 text-center">
                      {getRiskScoreBadge(j.riskScore, j.moderationStatus, j.flagReason)}
                    </td>

                    {/* Applicants */}
                    <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-slate-900 text-xs 2xl:text-sm 3xl:text-base">
                          {j.applicantsCount || 0}
                        </span>
                        <span className="text-[10px] 2xl:text-xs text-slate-400 whitespace-nowrap">
                          {j.vacancies || 1} {j.vacancies === 1 ? 'seat' : 'seats'}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4 text-center">
                      {getStatusBadge(j.moderationStatus)}
                    </td>

                    {/* Quick Actions */}
                    <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-3 2xl:px-4 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 2xl:gap-2">
                        {j.moderationStatus !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => onApprove(j.id)}
                            className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                            title="Approve & Publish Vacancy"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                          </button>
                        )}

                        {j.moderationStatus !== 'flagged' && j.moderationStatus !== 'blocked' && (
                          <button
                            type="button"
                            onClick={() => {
                              const reason = window.prompt(
                                `Flag "${j.title}" as suspicious scam/irrelevant post:\nEnter reason for fraud alert:`,
                                'SUSPECTED SCAM: Demands fee from candidates or misleading salary promise.'
                              );
                              if (reason) onFlag(j.id, reason);
                            }}
                            className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                            title="Flag as Scam / Irrelevant Post"
                          >
                            <ShieldAlert className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onViewDossier(j)}
                          className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                          title="View Full Job Audit Dossier"
                        >
                          <Eye className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                        </button>
                      </div>
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
        totalItems={jobs.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 20]}
        itemLabel="vacancies"
      />
    </div>
  );
};

export default AdminJobsTable;
