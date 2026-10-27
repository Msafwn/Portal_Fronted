import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Zap, ArrowRight, ExternalLink } from 'lucide-react';

export const ChatJobAttachment = ({ jobs = [] }) => {
  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="mt-3.5 space-y-2.5 w-full">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
        <span className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>AI-Matched Vacancies ({jobs.length})</span>
        </span>
        <Link
          to="/jobs"
          className="text-blue-600 hover:text-blue-700 normal-case font-semibold flex items-center gap-1"
        >
          <span>Explore All Jobs</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Top Row: Title + Match Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {job.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    {job.company}
                  </p>
                </div>
                <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-600" />
                  {job.matchScore}% Match
                </span>
              </div>

              {/* Meta details */}
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate max-w-[120px]">{job.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{job.salary}</span>
                </span>
              </div>

              {/* Skills Tags */}
              {job.skills && job.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {job.skills.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200/60"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="text-[10px] text-slate-400">
                      +{job.skills.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {job.type}
              </span>
              <Link
                to={`/jobs/${job.id}`}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 group-hover:underline"
              >
                <span>View Details</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatJobAttachment;
