import React from 'react';
import { Download, RefreshCw, ChevronRight, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminPortal } from '../../../context/AdminPortalContext';
import { exportSystemAuditPdf } from '../../../utils/pdfExport';
import { AuroraBackground } from '../../reactbits/AuroraBackground';
import { ParticlesBackground } from '../../reactbits/ParticlesBackground';

export const AdminDashboardHeader = () => {
  const { kpis, chartsData, auditLog, adminProfile, refreshDashboard } = useAdminPortal();

  const handleExportSystemAudit = () => {
    try {
      toast.loading('Generating executive PDF audit report...', { id: 'pdf-audit' });
      exportSystemAuditPdf(kpis, chartsData, auditLog, adminProfile);
      toast.success('System Audit PDF downloaded successfully! 📄', { id: 'pdf-audit' });
    } catch {
      toast.error('Failed to generate PDF. Please try again.', { id: 'pdf-audit' });
    }
  };

  const handleRefresh = async () => {
    try {
      if (refreshDashboard) {
        await refreshDashboard();
      }
      toast.success('Live system telemetry refreshed successfully! 🔄');
    } catch {
      toast.error('Could not refresh telemetry feed');
    }
  };

  return (
    <AuroraBackground
      colorVariant="clean-blue"
      speed="slow"
      opacity={0.25}
      className="bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs relative overflow-hidden"
    >
      {/* Subtle ReactBits Particle Constellation */}
      <ParticlesBackground
        particleCount={20}
        particleColor="rgba(59, 130, 246, 0.28)"
        lineColor="rgba(99, 102, 241, 0.08)"
        speed={0.35}
        interactive={true}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 2xl:gap-6">
        <div>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm 3xl:text-base text-slate-500 font-medium mb-1.5 2xl:mb-2">
            <span className="text-blue-600 font-bold">Admin Console</span>
            <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
            <span className="text-slate-800 font-semibold">System Reports & Platform Intelligence</span>
          </div>

          <div className="flex items-center gap-3 2xl:gap-4">
            <div className="w-10 h-10 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 rounded-xl 2xl:rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shrink-0 shadow-2xs">
              <Activity className="w-5 h-5 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 2xl:gap-3.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                  System Reports & Statistics
                </h1>
                <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/90 backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Telemetry Active</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-500 mt-0.5 2xl:mt-1">
                Welcome, <strong className="text-slate-800 font-bold">{adminProfile.name}</strong> • High-level overview of candidate registrations, employer authentications, active vacancies, and AI recommendation metrics.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 2xl:gap-3.5 shrink-0 self-start md:self-center">
          <button
            onClick={handleRefresh}
            className="p-2.5 2xl:p-3.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white/90 hover:bg-white text-slate-600 transition-colors cursor-pointer shadow-2xs"
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-500" />
          </button>

          <button
            onClick={handleExportSystemAudit}
            className="inline-flex items-center gap-2 2xl:gap-2.5 px-4 py-2.5 2xl:px-6 2xl:py-3.5 rounded-xl 2xl:rounded-2xl text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs hover:shadow transition-all cursor-pointer hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 2xl:w-5 2xl:h-5" />
            <span>Export System Audit</span>
          </button>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default AdminDashboardHeader;
