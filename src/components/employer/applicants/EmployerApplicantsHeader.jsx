import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, X, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { exportPipelineToPdf } from '../../../utils/pipelinePdfExport';

export const EmployerApplicantsHeader = ({
  totalApplicants = 0,
  highMatchCount = 0,
  activeJobFilterTitle = null,
  onClearJobFilter = () => {},
  applicants = [],
  company = null,
}) => {
  const handleExportPdf = () => {
    toast.success('Preparing Executive Candidate PDF Report... 📄');
    exportPipelineToPdf({
      applicants,
      company: company || { name: 'TechLogix Global Solutions', industry: 'Enterprise AI & Cloud Engineering' },
      activeJobTitle: activeJobFilterTitle,
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 2xl:gap-6 bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs">
      <div>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm 3xl:text-base text-slate-500 font-medium mb-1.5 2xl:mb-2">
          <Link
            to="/employer/dashboard"
            className="hover:text-blue-600 transition-colors"
          >
            Employer Portal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
          <Link
            to="/employer/jobs"
            className="hover:text-blue-600 transition-colors"
          >
            Manage Jobs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
          <span className="text-slate-800 font-semibold">Applicant Review & Shortlisting</span>
        </div>

        <div className="flex items-center gap-3 2xl:gap-4">
          <div className="w-10 h-10 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 rounded-xl 2xl:rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-5 h-5 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 2xl:gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                Applicant Review & Shortlisting Desk
              </h1>
              <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <Sparkles className="w-3 h-3 2xl:w-4 2xl:h-4 text-amber-500" />
                AI-Ranked Pipeline
              </span>
            </div>
            <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-500 mt-0.5 2xl:mt-1">
              Review candidates sorted by AI Semantic Match Score. 1-Click Shortlist, Schedule Interviews, and track hiring stages.
            </p>
          </div>
        </div>

        {/* Active Job Filter Indicator Pill */}
        {activeJobFilterTitle && (
          <div className="mt-3 2xl:mt-4 inline-flex items-center gap-2 2xl:gap-3 px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-lg 2xl:rounded-xl bg-blue-50 border border-blue-200 text-xs 2xl:text-sm 3xl:text-base text-blue-800 font-medium">
            <span>Filtered for: <strong className="font-bold">{activeJobFilterTitle}</strong></span>
            <button
              onClick={onClearJobFilter}
              className="text-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
              title="Clear job filter"
            >
              <X className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5 2xl:gap-3 shrink-0 self-start md:self-center">
        <button
          onClick={handleExportPdf}
          title="Download printable executive candidate pipeline report as PDF"
          className="inline-flex items-center gap-1.5 2xl:gap-2 px-3.5 py-2 2xl:px-5 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/80 text-blue-700 text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
        >
          <FileText className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
          <span>Export PDF Report</span>
        </button>

        <Link
          to="/employer/post-job"
          className="inline-flex items-center justify-center gap-1.5 2xl:gap-2 px-4 py-2 2xl:px-6 2xl:py-3 rounded-xl 2xl:rounded-2xl font-semibold text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <span>Post New Vacancy</span>
        </Link>
      </div>
    </div>
  );
};

export default EmployerApplicantsHeader;
