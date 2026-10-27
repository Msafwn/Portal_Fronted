import React from 'react';
import { Building2, Download, RefreshCw, ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminPortal } from '../../../context/AdminPortalContext';
import { exportEmployersPdf } from '../../../utils/pdfExport';

export const AdminEmployersHeader = ({ totalCount, pendingCount, onRefresh }) => {
  const { employers, adminProfile } = useAdminPortal();

  const handleExportPdf = () => {
    try {
      toast.loading('Compiling and formatting Corporate Registry PDF...', { id: 'pdf-emp' });
      exportEmployersPdf(employers, adminProfile);
      toast.success('Corporate Registry PDF downloaded successfully! 📄', { id: 'pdf-emp' });
    } catch (err) {
      toast.error('Failed to export PDF.', { id: 'pdf-emp' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs">
      <div>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs 2xl:text-sm 3xl:text-base text-slate-500 font-medium mb-1.5 2xl:mb-2.5">
          <span className="text-blue-600 font-bold">Admin Console</span>
          <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
          <span className="text-slate-800 font-semibold">Employer Management</span>
          <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
          <span className="text-slate-500">Company Verification Desk</span>
        </div>

        <div className="flex items-center gap-3 2xl:gap-4">
          <div className="w-10 h-10 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 rounded-xl 2xl:rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0 shadow-2xs">
            <Building2 className="w-5 h-5 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 2xl:gap-3.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                Employer & Company Verification Desk
              </h1>
              {pendingCount > 0 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-amber-500 animate-pulse" />
                  {pendingCount} Awaiting Review
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-emerald-600" />
                  All Companies Vetted
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-500 mt-0.5 2xl:mt-1.5 max-w-4xl 3xl:max-w-6xl">
              Review corporate credentials, authenticate FBR NTN & SECP registrations, and approve legitimate employers before they post vacancies.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 2xl:gap-3.5 shrink-0 self-start md:self-center">
        <button
          onClick={onRefresh}
          className="p-2.5 2xl:p-3.5 3xl:p-4 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shadow-2xs"
          title="Refresh Corporate Roster"
        >
          <RefreshCw className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 text-slate-500" />
        </button>

        <button
          onClick={handleExportPdf}
          className="inline-flex items-center gap-2 px-4 py-2.5 2xl:px-6 2xl:py-3.5 3xl:px-7 3xl:py-4 rounded-xl 2xl:rounded-2xl text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
          <span>Export PDF Directory</span>
        </button>
      </div>
    </div>
  );
};

export default AdminEmployersHeader;
