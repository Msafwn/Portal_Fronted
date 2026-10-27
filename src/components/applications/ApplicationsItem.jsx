import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export const ApplicationsItem = ({ app, className = '' }) => {
  if (!app) return null;

  const isShortlisted = (app.status || '').toLowerCase().includes('shortlist');
  const isInterview = (app.note || '').toLowerCase().includes('interview');

  return (
    <div className={`p-5 sm:p-6 2xl:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors ${className}`}>
      <div className="space-y-1.5 2xl:space-y-2 flex-1">
        <div className="flex items-center gap-2.5 2xl:gap-3 flex-wrap">
          <span className="text-[10px] 2xl:text-xs font-bold text-blue-600 uppercase tracking-wider">
            {app.department || 'Technology'}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs 2xl:text-sm text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
            Applied: {app.appliedDate || 'Recently'}
          </span>
          <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {app.matchScore || app.matchPercentage || 85}% Match Index
          </span>
        </div>

        <h3 className="text-base 2xl:text-xl font-bold text-slate-900 leading-snug">
          {app.jobTitle}
        </h3>

        <p className="text-xs 2xl:text-base text-slate-600 font-semibold flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
          <span>{app.company}</span>
        </p>

        {app.note && (
          <div className="pt-1">
            <p className="text-xs 2xl:text-base text-slate-700 bg-slate-100/80 px-3 2xl:px-4 py-1.5 2xl:py-2 rounded-lg 2xl:rounded-xl inline-block font-medium">
              <strong>Recruiter Note:</strong> {app.note}
            </p>
          </div>
        )}
      </div>

      <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-2 2xl:gap-3 shrink-0 pt-2 sm:pt-0">
        <span
          className={`inline-flex items-center gap-1.5 px-3 2xl:px-4 py-1.5 2xl:py-2 rounded-full text-xs 2xl:text-base font-bold ${
            isShortlisted
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              : isInterview
              ? 'bg-purple-100 text-purple-800 border border-purple-200'
              : 'bg-blue-100 text-blue-800 border border-blue-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
          <span>{app.status}</span>
        </span>

        <Link
          to="/jobs"
          className="text-xs 2xl:text-base font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
        >
          <span>Explore more roles</span>
          <ArrowRight className="w-3 h-3 2xl:w-4 2xl:h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ApplicationsItem;
