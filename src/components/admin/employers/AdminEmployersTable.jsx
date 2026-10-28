import React, { useState, useEffect } from 'react';
import {
  Eye,
  ShieldCheck,
  ShieldAlert,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Briefcase,
  FilterX,
  ExternalLink,
} from 'lucide-react';
import { Pagination } from '../../common/Pagination';

export const AdminEmployersTable = ({
  employers,
  onViewDossier,
  onVerify,
  onSuspend,
  onBulkVerify,
  onBulkSuspend,
  onResetFilters,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Reset to page 1 if search/filter shrinks total pages
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(employers.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [employers.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEmployers = employers.slice(startIndex, startIndex + pageSize);

  const isAllSelected =
    employers.length > 0 && selectedIds.length === employers.length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(employers.map((emp) => emp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'suspended':
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />;
      case 'pending':
        return <Clock className="w-3 h-3 text-amber-600 shrink-0" />;
      case 'suspended':
      default:
        return <ShieldAlert className="w-3 h-3 text-rose-600 shrink-0" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/90 border-b border-blue-200/70 p-3 sm:px-4 2xl:p-4 2xl:px-6 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 2xl:gap-3">
            <span className="w-2 h-2 2xl:w-3 2xl:h-3 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs 2xl:text-sm 3xl:text-base font-bold text-blue-900">
              {selectedIds.length} enterprise{selectedIds.length > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center gap-2 2xl:gap-3">
            <button
              onClick={() => {
                onBulkVerify(selectedIds);
                setSelectedIds([]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
              <span>Bulk Approve</span>
            </button>

            <button
              onClick={() => {
                onBulkSuspend(selectedIds);
                setSelectedIds([]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
              <span>Bulk Suspend</span>
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

      {/* Table Container - no horizontal scrollbar, 100% responsive */}
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
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 font-bold">Enterprise & Tax ID</th>
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 font-bold">Industry Field</th>
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 font-bold">Recruiter Contact</th>
              <th className="py-3 2xl:py-4 px-2 2xl:px-3 text-center font-bold">Vacancies</th>
              <th className="py-3 2xl:py-4 px-2.5 2xl:px-4 text-center font-bold">Status</th>
              <th className="py-3 2xl:py-4 px-3 2xl:px-4 font-bold text-right">KYC Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paginatedEmployers.map((emp) => {
              const isSelected = selectedIds.includes(emp.id);
              return (
                <tr
                  key={emp.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isSelected ? 'bg-blue-50/40' : ''
                  }`}
                >
                  {/* Row Checkbox */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-3 2xl:px-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectRow(emp.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer 2xl:w-4 2xl:h-4"
                    />
                  </td>

                  {/* Company Identity + Tax ID in subtitle */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">
                    <div className="flex items-center gap-2.5 2xl:gap-3.5">
                      {emp.logo ? (
                        <img loading="lazy" decoding="async"
                          src={emp.logo}
                          alt={emp.name}
                          className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-lg 2xl:rounded-xl object-cover border border-slate-200/80 shadow-2xs shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-lg 2xl:rounded-xl bg-blue-600 text-white font-bold text-xs 2xl:text-base flex items-center justify-center shadow-2xs shrink-0">
                          {emp.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <button
                          onClick={() => onViewDossier(emp)}
                          className="font-bold text-slate-900 hover:text-blue-600 transition-colors text-xs 2xl:text-sm 3xl:text-base text-left truncate block cursor-pointer"
                        >
                          {emp.name}
                        </button>
                        <div className="flex items-center gap-1.5 text-[11px] 2xl:text-xs 3xl:text-sm text-slate-400 mt-0.5 truncate">
                          <span>{emp.headquarters}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-600 font-medium">
                            {emp.ntnNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Industry Field */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">
                    <span className="inline-flex items-center px-2 py-0.5 2xl:px-2.5 2xl:py-1 rounded-md text-[11px] 2xl:text-xs 3xl:text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-200/70 whitespace-nowrap">
                      {emp.industry}
                    </span>
                  </td>

                  {/* Recruiter Identity */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-800 text-xs 2xl:text-sm 3xl:text-base block truncate">
                        {emp.recruiterName}
                      </span>
                      <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-400 font-medium truncate">
                        {emp.recruiterEmail}
                      </p>
                    </div>
                  </td>

                  {/* Active Jobs */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2 2xl:px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-800 bg-slate-100 px-2 py-0.5 2xl:px-2.5 2xl:py-1 rounded-md text-[11px] 2xl:text-xs 3xl:text-sm">
                      <Briefcase className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-slate-500" />
                      <span>{emp.activeJobsCount || 0}</span>
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-[10px] 2xl:text-xs font-bold border ${getStatusBadgeStyle(
                        emp.verificationStatus
                      )}`}
                    >
                      {getStatusIcon(emp.verificationStatus)}
                      <span>
                        {emp.verificationStatus === 'pending'
                          ? 'PENDING'
                          : emp.verificationStatus.toUpperCase()}
                      </span>
                    </span>
                  </td>

                  {/* Action Controls */}
                  <td className="py-2.5 2xl:py-3.5 3xl:py-4 px-3 2xl:px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1 2xl:gap-1.5">
                      {/* View Dossier */}
                      <button
                        type="button"
                        onClick={() => onViewDossier(emp)}
                        className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Audit Company Dossier & Legal Docs"
                      >
                        <Eye className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                      </button>

                      {/* Quick Action depending on status */}
                      {emp.verificationStatus === 'pending' && (
                        <button
                          type="button"
                          onClick={() => onVerify(emp.id)}
                          className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                          title="Approve & Authorize Company"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                        </button>
                      )}

                      {emp.verificationStatus === 'verified' && (
                        <button
                          type="button"
                          onClick={() => onSuspend(emp.id)}
                          className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                          title="Suspend / Restrict Company"
                        >
                          <ShieldAlert className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                        </button>
                      )}

                      {emp.verificationStatus === 'suspended' && (
                        <button
                          type="button"
                          onClick={() => onVerify(emp.id)}
                          className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                          title="Re-activate / Restore Company"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
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
      {employers.length === 0 && (
        <div className="py-12 px-4 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">
            No Corporate Entities Found
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria, clearing verification filters, or resetting industry selections.
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
        totalItems={employers.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 20]}
        itemLabel="enterprises"
      />
    </div>
  );
};

export default AdminEmployersTable;
