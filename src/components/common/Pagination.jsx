import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Layers,
} from 'lucide-react';

/**
 * Unique Enterprise Pagination Component
 * Features:
 * - Smart page window with ellipsis (...)
 * - Rows per page dynamic selector
 * - Range counter ("Showing 1 to 5 of 28")
 * - First/Previous/Next/Last navigation
 * - Responsive styling with zero overflow
 */
export const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  pageSize = 5,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  itemLabel = 'records',
  className = '',
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startItem = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endItem = Math.min(safeCurrentPage * pageSize, totalItems);

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1; // Number of pages to show around current page

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (safeCurrentPage > delta + 2) {
        pages.push('ellipsis-start');
      }

      const start = Math.max(2, safeCurrentPage - delta);
      const end = Math.min(totalPages - 1, safeCurrentPage + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (safeCurrentPage < totalPages - (delta + 1)) {
        pages.push('ellipsis-end');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div
      className={`px-4 py-3 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 ${className}`}
    >
      {/* Left: Range and Total Information */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>
            Showing <strong className="font-bold text-slate-900">{startItem}</strong> to{' '}
            <strong className="font-bold text-slate-900">{endItem}</strong> of{' '}
            <strong className="font-bold text-slate-900">{totalItems}</strong> {itemLabel}
          </span>
        </div>

        {/* Page Size Dropdown */}
        {onPageSizeChange && (
          <div className="flex items-center gap-1 pl-3 border-l border-slate-200">
            <span className="text-[11px] text-slate-400">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                if (onPageChange) onPageChange(1);
              }}
              className="py-1 px-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white text-xs font-semibold text-slate-700 cursor-pointer focus:border-blue-500 focus:outline-hidden transition-colors"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: Unique Page Controls */}
      <div className="flex items-center gap-1 self-center sm:self-auto">
        {/* First Page */}
        <button
          type="button"
          onClick={() => onPageChange && onPageChange(1)}
          disabled={safeCurrentPage === 1}
          className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed text-slate-600 transition-colors cursor-pointer"
          title="First Page"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange && onPageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed text-slate-600 transition-colors cursor-pointer"
          title="Previous Page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-1">
          {pages.map((p, idx) => {
            if (p === 'ellipsis-start' || p === 'ellipsis-end') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-slate-400 select-none font-bold"
                >
                  •••
                </span>
              );
            }

            const isActive = p === safeCurrentPage;

            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange && onPageChange(p)}
                className={`min-w-[28px] h-7 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-500/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange && onPageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === totalPages}
          className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed text-slate-600 transition-colors cursor-pointer"
          title="Next Page"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => onPageChange && onPageChange(totalPages)}
          disabled={safeCurrentPage === totalPages}
          className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed text-slate-600 transition-colors cursor-pointer"
          title="Last Page"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
