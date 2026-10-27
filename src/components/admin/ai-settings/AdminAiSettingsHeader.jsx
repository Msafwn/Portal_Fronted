import React from 'react';
import { Cpu, Download, RotateCcw, ChevronRight, Sparkles, CheckCircle2, Sliders, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminPortal } from '../../../context/AdminPortalContext';
import { exportAlgorithmSpecPdf } from '../../../utils/pdfExport';

export const AdminAiSettingsHeader = () => {
  const {
    aiSettings,
    algorithmPresets,
    skillsTaxonomy,
    resetAlgorithmDefaults,
    refreshAiSettings,
    adminProfile,
  } = useAdminPortal();

  const handleRefresh = async () => {
    try {
      if (refreshAiSettings) {
        await refreshAiSettings();
      }
      toast.success('AI algorithm calibration & taxonomy refreshed! 🔄');
    } catch {
      toast.error('Failed to sync algorithm settings');
    }
  };

  const handleExportPdf = () => {
    try {
      toast.loading('Compiling Algorithm Formulation Spec PDF...', { id: 'pdf-ai' });
      exportAlgorithmSpecPdf(aiSettings, algorithmPresets, skillsTaxonomy.length, adminProfile);
      toast.success('Algorithm Specification PDF downloaded! 📄', { id: 'pdf-ai' });
    } catch (err) {
      toast.error('Failed to export algorithm PDF.', { id: 'pdf-ai' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs">
      <div>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs 2xl:text-sm 3xl:text-base text-slate-500 font-medium mb-1.5 2xl:mb-2.5">
          <span className="text-blue-600 font-bold">Admin Console</span>
          <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
          <span className="text-slate-800 font-semibold">AI Intelligence Engine</span>
          <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
          <span className="text-slate-500">Algorithm Control Desk</span>
        </div>

        <div className="flex items-center gap-3 2xl:gap-4">
          <div className="w-10 h-10 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 rounded-xl 2xl:rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 flex items-center justify-center shrink-0 shadow-2xs">
            <Cpu className="w-5 h-5 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 2xl:gap-3.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                AI Engine & Algorithm Control Desk
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Sliders className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-indigo-600" />
                Live Calibration Active
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-emerald-600" />
                {aiSettings.skillWeight}% Skill • {aiSettings.experienceWeight}% Exp • {aiSettings.educationWeight}% Edu
              </span>
            </div>
            <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-500 mt-0.5 2xl:mt-1.5 max-w-4xl 3xl:max-w-6xl">
              Live weights calibration for Skill (50%), Experience (30%), Education (20%), real-time candidate score simulation, and semantic skills taxonomy registry.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 2xl:gap-3.5 shrink-0 self-start md:self-center">
        <button
          onClick={handleRefresh}
          className="p-2 2xl:p-3 rounded-xl 2xl:rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shadow-2xs"
          title="Refresh AI Settings from Database"
        >
          <RefreshCw className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-500" />
        </button>

        <button
          onClick={resetAlgorithmDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-2 2xl:px-4.5 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs sm:text-sm 2xl:text-base font-semibold transition-colors cursor-pointer shadow-2xs"
          title="Reset to 50/30/20 FYP Proposal Standard"
        >
          <RotateCcw className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-500" />
          <span>Reset FYP Baseline</span>
        </button>

        <button
          onClick={handleExportPdf}
          className="inline-flex items-center gap-2 px-4 py-2 2xl:px-6 2xl:py-3.5 3xl:px-7 3xl:py-4 rounded-xl 2xl:rounded-2xl text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6" />
          <span>Export Algorithm Spec (PDF)</span>
        </button>
      </div>
    </div>
  );
};

export default AdminAiSettingsHeader;
