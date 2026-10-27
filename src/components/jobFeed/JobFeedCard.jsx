import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Clock, Zap, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useJobFeed } from './JobFeedContext';

const getJobTypeBadge = (jobType) => {
  switch (jobType) {
    case 'Internship':
      return { label: '🎓 Internship', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'Scholarship':
      return { label: '🏆 Scholarship', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'Part-time':
      return { label: '⏰ Part-Time', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    case 'Trainee':
      return { label: '🎯 Trainee Program', color: 'bg-purple-50 text-purple-700 border-purple-200' };
    case 'Entry-Level':
      return { label: '🚀 Entry-Level', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    case 'Mid-Level':
      return { label: '💼 Mid-Level', color: 'bg-sky-50 text-sky-700 border-sky-200' };
    case 'Senior Level':
      return { label: '👔 Senior Level', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    default:
      return { label: jobType || 'Standard Role', color: 'bg-slate-100 text-slate-700 border-slate-200' };
  }
};

export const JobFeedCard = ({ job, className = '' }) => {
  const { appliedJobIds, handleApply } = useJobFeed();
  if (!job) return null;

  const isApplied = appliedJobIds.includes(job.id);
  const badge = getJobTypeBadge(job.jobType);

  return (
    <div className={`bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200 p-5 2xl:p-7 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${className}`}>
      <div className="space-y-3 2xl:space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 2xl:space-y-2">
            <div className="flex items-center gap-1.5 2xl:gap-2 flex-wrap">
              <span className={`text-[10px] 2xl:text-xs font-bold px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full border ${badge.color}`}>
                {badge.label}
              </span>
              <span className="text-[10px] 2xl:text-xs font-bold text-slate-500 uppercase tracking-wider">
                {job.department}
              </span>
            </div>
            <h3 className="text-base 2xl:text-xl font-bold text-slate-900 leading-snug">
              {job.title}
            </h3>
            <p className="text-xs 2xl:text-base text-slate-600 font-medium flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
              <span>{job.company}</span>
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 2xl:px-3.5 py-1 2xl:py-1.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base font-black bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <Zap className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-600 fill-emerald-600" />
              <span>{job.matchPercentage}%</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 2xl:gap-3 text-xs 2xl:text-base text-slate-500 pt-1 flex-wrap">
          <span className="flex items-center gap-1 2xl:gap-1.5">
            <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
            <span>{job.location}</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 font-semibold text-indigo-700 bg-indigo-50 px-2 2xl:px-2.5 py-0.5 2xl:py-1 rounded-md 2xl:rounded-lg border border-indigo-200/80 text-[11px] 2xl:text-xs">
            <Clock className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-indigo-600" />
            <span>{job.employmentType || job.jobType || 'Full-Time'}</span>
          </span>
          <span>•</span>
          <span className="font-semibold text-slate-700">{job.salary}</span>
        </div>

        {/* Required Skills Chips */}
        <div className="flex flex-wrap gap-1 2xl:gap-1.5 pt-1">
          {(job.matchedSkills || []).slice(0, 3).map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 px-1.5 2xl:px-2.5 py-0.5 2xl:py-1 rounded text-[10px] 2xl:text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
            >
              <CheckCircle2 className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 text-emerald-600" />
              {s}
            </span>
          ))}
          {(job.missingSkills || []).slice(0, 2).map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 px-1.5 2xl:px-2.5 py-0.5 2xl:py-1 rounded text-[10px] 2xl:text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200"
            >
              <AlertCircle className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 text-amber-600" />
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 2xl:pt-6 mt-4 2xl:mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          to={`/jobs/${job.id}`}
          className="text-xs 2xl:text-base font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
        >
          <span>View Details</span>
          <ArrowRight className="w-3 h-3 2xl:w-4 2xl:h-4" />
        </Link>

        <button
          type="button"
          onClick={() => handleApply && handleApply(job)}
          disabled={isApplied}
          className={`px-3 2xl:px-5 py-1.5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base font-semibold transition-all ${
            isApplied
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-600/30 cursor-pointer'
          }`}
        >
          {isApplied ? 'Applied' : 'Quick Apply'}
        </button>
      </div>
    </div>
  );
};

export default JobFeedCard;
