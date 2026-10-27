import React, { useState, useEffect } from 'react';
import {
  Eye,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Users,
  Search,
  FilterX,
} from 'lucide-react';
import { Pagination } from '../../common/Pagination';

export const AdminUsersTable = ({
  candidates,
  onViewDossier,
  onToggleStatus,
  onBulkActivate,
  onBulkBan,
  onResetFilters,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Reset to page 1 if search/filter shrinks total pages
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(candidates.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [candidates.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCandidates = candidates.slice(startIndex, startIndex + pageSize);

  const isAllSelected =
    candidates.length > 0 && selectedIds.length === candidates.length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(candidates.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'student':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'fresh_graduate':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'professional':
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'banned':
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  const getMatchScoreBadge = (score) => {
    if (score >= 90) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (score >= 80) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/90 border-b border-blue-200/70 p-3 sm:px-4 2xl:p-4 2xl:px-6 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 2xl:gap-3">
            <span className="w-2 h-2 2xl:w-3 2xl:h-3 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs 2xl:text-sm 3xl:text-base font-bold text-blue-900">
              {selectedIds.length} candidate{selectedIds.length > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center gap-2 2xl:gap-3">
            <button
              onClick={() => {
                onBulkActivate(selectedIds);
                setSelectedIds([]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
              <span>Activate Selected</span>
            </button>

            <button
              onClick={() => {
                onBulkBan(selectedIds);
                setSelectedIds([]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
              <span>Suspend Selected</span>
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

      {/* Candidates Table - no horizontal scrollbar, 100% responsive */}
      <div className="w-full overflow-hidden">
        <table className="w-full text-left text-xs 2xl:text-sm 3xl:text-base table-auto">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] 2xl:text-xs 3xl:text-sm font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 2xl:py-4 px-3 2xl:px-4 w-8 2xl:w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer 2xl:w-4 2xl:h-4"
                />
              </th>
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 font-bold">Candidate Profile</th>
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 font-bold">Academic Classification</th>
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 font-bold">Target Role & University</th>
              <th className="py-3 2xl:py-4 px-2 2xl:px-3 font-bold text-center">AI Match</th>
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 font-bold text-center">Status</th>
              <th className="py-3 2xl:py-4 px-3 2xl:px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paginatedCandidates.map((cand) => {
              const isSelected = selectedIds.includes(cand.id);
              return (
                <tr
                  key={cand.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isSelected ? 'bg-blue-50/40' : ''
                  }`}
                >
                  {/* Row Checkbox */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-3 2xl:px-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectRow(cand.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer 2xl:w-4 2xl:h-4"
                    />
                  </td>

                  {/* Candidate Identity */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">
                    <div className="flex items-center gap-2.5 2xl:gap-3.5">
                      {cand.avatar ? (
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-lg 2xl:rounded-xl object-cover border border-slate-200/80 shadow-2xs shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-lg 2xl:rounded-xl bg-blue-600 text-white font-bold text-xs 2xl:text-base flex items-center justify-center shadow-2xs shrink-0">
                          {cand.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <button
                          onClick={() => onViewDossier(cand)}
                          className="font-bold text-slate-900 hover:text-blue-600 transition-colors text-xs 2xl:text-sm 3xl:text-base text-left truncate block cursor-pointer"
                        >
                          {cand.name}
                        </button>
                        <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-400 font-medium truncate">
                          {cand.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role & Faculty */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">
                    <div className="space-y-0.5 2xl:space-y-1">
                      <span
                        className={`inline-block px-2 py-0.5 2xl:px-2.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs font-bold border ${getRoleBadgeStyle(
                          cand.role
                        )}`}
                      >
                        {cand.roleLabel || cand.role}
                      </span>
                      <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-600 font-medium truncate">
                        {cand.discipline}
                      </p>
                    </div>
                  </td>

                  {/* Target Role & University */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-800 text-xs 2xl:text-sm 3xl:text-base block truncate">
                        {cand.targetRole}
                      </span>
                      <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-400 font-medium truncate">
                        {cand.institution}
                      </p>
                    </div>
                  </td>

                  {/* AI Match Score */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2 2xl:px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 2xl:px-2.5 2xl:py-1 rounded-full text-[11px] 2xl:text-xs 3xl:text-sm font-bold border ${getMatchScoreBadge(
                        cand.matchScore
                      )}`}
                    >
                      <Sparkles className="w-3 h-3 2xl:w-4 2xl:h-4" />
                      <span>{cand.matchScore}%</span>
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 2xl:px-2.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs font-bold border ${getStatusBadgeStyle(
                        cand.status
                      )}`}
                    >
                      {cand.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Administrative Action Controls */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-3 2xl:px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1 2xl:gap-1.5">
                      {/* View Dossier */}
                      <button
                        type="button"
                        onClick={() => onViewDossier(cand)}
                        className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                        title="View Full Candidate Dossier"
                      >
                        <Eye className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                      </button>

                      {/* Ban / Activate Toggle */}
                      {cand.status === 'banned' ? (
                        <button
                          type="button"
                          onClick={() => onToggleStatus(cand.id)}
                          className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                          title="Re-activate Candidate"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onToggleStatus(cand.id)}
                          className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                          title="Suspend / Restrict Candidate"
                        >
                          <ShieldAlert className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {candidates.length === 0 && (
        <div className="py-12 px-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">
            No Candidates Match Your Filters
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria, clearing faculty selections, or resetting role filters.
          </p>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            <FilterX className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Unique Reusable Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={candidates.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 20]}
        itemLabel="candidates"
      />
    </div>
  );
};

export default AdminUsersTable;
