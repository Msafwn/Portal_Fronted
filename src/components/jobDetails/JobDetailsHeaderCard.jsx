import React from 'react';
import { Building2, MapPin, Clock, Zap, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import { useJobDetails } from './JobDetailsContext';

export const JobDetailsHeaderCard = ({ className = '' }) => {
  const { job, isApplied, handleApply } = useJobDetails();
  if (!job) return null;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs ${className}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
            {job.department || 'Technology'} • {job.employmentType || job.jobType || 'Full-Time'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {job.title}
          </h1>
          <p className="text-sm text-slate-600 flex items-center gap-2.5 flex-wrap">
            <span className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              {job.company}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {job.location} ({job.workMode || 'On-site'})
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>{job.employmentType || job.jobType || 'Full-Time'}</span>
            </span>
            <span>•</span>
            <span className="text-xs text-slate-500">
              Posted {job.postedTime || 'Recently'}
            </span>
          </p>
        </div>

        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-base font-black bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-200 shadow-2xs">
            <Zap className="w-5 h-5 text-emerald-600 fill-emerald-600" />
            <span>{job.matchPercentage}% AI Match</span>
          </div>
          <span className="text-base font-black text-slate-900">{job.salary}</span>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Profile verified matching algorithm active</span>
        </div>

        <button
          type="button"
          onClick={() => handleApply && handleApply(job)}
          disabled={isApplied}
          className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
            isApplied
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30 cursor-pointer'
          }`}
        >
          {isApplied ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Application Submitted</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Apply with Candidate Profile</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default JobDetailsHeaderCard;
