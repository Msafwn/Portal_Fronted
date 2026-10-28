import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useAdminPortal } from '../../../context/AdminPortalContext';
import { Pagination } from '../../common/Pagination';

export const AdminRecentAuditLog = () => {
  const { auditLog } = useAdminPortal();
  const [filterType, setFilterType] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredLogs = auditLog.filter((item) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'SUCCESS') return item.type === 'success';
    if (filterType === 'WARNING') return item.type === 'warning';
    if (filterType === 'INFO') return item.type === 'info';
    return true;
  });

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [filteredLogs.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + pageSize);

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'danger':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-emerald-600 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-amber-600 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 2xl:space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 2xl:pb-4">
        <div>
          <div className="flex items-center gap-2 2xl:gap-3">
            <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-blue-600" />
            <h3 className="font-bold text-base 2xl:text-xl 3xl:text-2xl text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
              <span>Real-Time System Audit Trail</span>
            </h3>
          </div>
          <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1">
            Immutable log of administrator approvals, automated AI security detections, and verification status changes
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 2xl:gap-2 flex-wrap">
          {['ALL', 'SUCCESS', 'WARNING', 'INFO'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-2.5 py-1 2xl:px-4 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold transition-all cursor-pointer ${
                filterType === f
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'ALL' ? 'All Activity' : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table / Feed */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-xs 2xl:text-sm 3xl:text-base table-auto">
          <thead>
            <tr className="border-b border-slate-200/80 text-[11px] 2xl:text-xs 3xl:text-sm font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-2.5 2xl:pb-4 font-bold">Action / Category</th>
              <th className="pb-2.5 2xl:pb-4 font-bold">Event Details</th>
              <th className="pb-2.5 2xl:pb-4 font-bold">Initiated By</th>
              <th className="pb-2.5 2xl:pb-4 font-bold">Timestamp</th>
              <th className="pb-2.5 2xl:pb-4 font-bold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 2xl:py-12 text-center text-slate-400 text-xs 2xl:text-sm 3xl:text-base">
                  No verified audit trail operations recorded yet. Live actions will appear here.
                </td>
              </tr>
            ) : (
              paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 2xl:py-4 pr-3 font-bold text-slate-800 whitespace-nowrap">
                    <div className="flex items-center gap-2 2xl:gap-2.5">
                      {getStatusIcon(log.type)}
                      <span>{log.action}</span>
                    </div>
                  </td>
                  <td className="py-3 2xl:py-4 pr-3 text-slate-600 font-medium">
                    {log.detail}
                  </td>
                  <td className="py-3 2xl:py-4 pr-3 text-slate-500 font-medium whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg font-semibold">
                      {log.actor}
                    </span>
                  </td>
                  <td className="py-3 2xl:py-4 pr-3 text-slate-400 font-medium whitespace-nowrap">
                    <div className="flex items-center gap-1 2xl:gap-1.5">
                      <Clock className="w-3 h-3 2xl:w-4 2xl:h-4 text-slate-400" />
                      <span>{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="py-3 2xl:py-4 pl-3 text-right whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold border ${getBadgeStyle(
                        log.type
                      )}`}
                    >
                      {log.type.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Unique Reusable Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredLogs.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 20]}
        itemLabel="operations"
      />

      {/* Footer Actions */}
      <div className="pt-2 2xl:pt-4 border-t border-slate-100 flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base text-slate-500">
        <span>Showing {filteredLogs.length} verified operations</span>
        <Link
          to="/admin/logs"
          className="inline-flex items-center gap-1.5 text-blue-600 font-bold hover:text-blue-700 transition-colors"
        >
          <span>View Full Audit Sentinel & Reports</span>
          <ExternalLink className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
        </Link>
      </div>
    </div>
  );
};

export default AdminRecentAuditLog;
