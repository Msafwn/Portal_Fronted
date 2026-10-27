import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Briefcase, ChevronRight } from 'lucide-react';

export const EmployerJobsHeader = ({ totalJobs = 0, activeJobs = 0 }) => {
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
          <span className="text-slate-800 font-semibold">Manage Posted Jobs</span>
        </div>

        <div className="flex items-center gap-3 2xl:gap-4">
          <div className="w-10 h-10 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 rounded-xl 2xl:rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0 shadow-2xs">
            <Briefcase className="w-5 h-5 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 2xl:gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                Posted Vacancies Portfolio
              </h1>
              <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-blue-50 text-blue-700 border border-blue-200">
                <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-blue-500 animate-pulse" />
                {activeJobs} Active • {totalJobs} Total
              </span>
            </div>
            <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-500 mt-0.5 2xl:mt-1">
              Control recruitment status, track candidate pipelines, and manage private seat allocations across all departments.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Link
          to="/employer/post-job"
          className="inline-flex items-center justify-center gap-2 2xl:gap-2.5 px-4 py-2.5 2xl:px-6 2xl:py-3.5 rounded-xl 2xl:rounded-2xl font-semibold text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm shadow-blue-500/20 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 2xl:w-5 2xl:h-5" />
          <span>Post New Vacancy</span>
        </Link>
      </div>
    </div>
  );
};

export default EmployerJobsHeader;
