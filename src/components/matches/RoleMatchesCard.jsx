import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Zap, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useRoleMatches } from './RoleMatchesContext';

export const RoleMatchesCard = ({ job, idx, className = '' }) => {
  const { appliedJobIds, handleApply } = useRoleMatches();
  if (!job) return null;

  const isApplied = appliedJobIds.includes(job.id);
  const breakdown = job.breakdown || {
    skillsScore: Math.round(job.matchPercentage * 0.5),
    experienceScore: Math.round(job.matchPercentage * 0.3),
    educationScore: Math.round(job.matchPercentage * 0.2),
  };

  return (
    <div className={`bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 hover:border-blue-400 p-5 2xl:p-7 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 2xl:gap-8 ${className}`}>
      <div className="space-y-3 2xl:space-y-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 2xl:gap-3 mb-1">
              <span className="text-[10px] 2xl:text-xs font-bold px-2 2xl:px-3 py-0.5 2xl:py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                Rank #{idx + 1} • {job.department || 'Technology'}
              </span>
              <span className="text-xs 2xl:text-sm text-slate-400 font-medium">
                {job.workMode || 'On-site'}
              </span>
            </div>
            <h3 className="text-base 2xl:text-2xl font-bold text-slate-900 leading-tight">
              {job.title}
            </h3>
            <p className="text-xs 2xl:text-base text-slate-600 font-medium flex items-center gap-2 mt-0.5">
              <Building2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
              <span>{job.company}</span>
              <span className="text-slate-300">•</span>
              <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
              <span>{job.location}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-900 font-bold">{job.salary}</span>
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 2xl:px-4 py-1.5 2xl:py-2 rounded-xl 2xl:rounded-2xl text-sm 2xl:text-lg font-black bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <Zap className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-600 fill-emerald-600" />
              <span>{job.matchPercentage}%</span>
            </span>
          </div>
        </div>

        <div className="p-2.5 2xl:p-4 rounded-xl 2xl:rounded-2xl bg-slate-50 border border-slate-100 space-y-1 2xl:space-y-2 max-w-2xl 2xl:max-w-4xl">
          <div className="flex items-center justify-between text-[10px] 2xl:text-xs font-semibold text-slate-600">
            <span>Algorithm Breakdown:</span>
            <span className="text-blue-700 font-bold">{job.matchPercentage}/100</span>
          </div>
          <div className="w-full bg-slate-200 h-2 2xl:h-2.5 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${breakdown.skillsScore || 0}%` }}
              className="bg-blue-600 h-full"
            />
            <div
              style={{ width: `${breakdown.experienceScore || 0}%` }}
              className="bg-indigo-500 h-full"
            />
            <div
              style={{ width: `${breakdown.educationScore || 0}%` }}
              className="bg-teal-500 h-full"
            />
          </div>
          <div className="flex items-center justify-between text-[9px] 2xl:text-xs">
            <span className="text-blue-700 font-medium">
              Skills (50%): {breakdown.skillsScore || 0}/50
            </span>
            <span className="text-indigo-700 font-medium">
              Experience (30%): {breakdown.experienceScore || 0}/30
            </span>
            <span className="text-teal-700 font-medium">
              Education (20%): {breakdown.educationScore || 0}/20
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-4 max-w-2xl 2xl:max-w-4xl pt-1">
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-lg 2xl:rounded-xl p-2.5 2xl:p-4">
            <span className="text-[10px] 2xl:text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1 2xl:mb-2">
              Matched Skills ({job.matchedSkills?.length || 0})
            </span>
            <div className="flex flex-wrap gap-1 2xl:gap-1.5">
              {(job.matchedSkills || []).map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-1.5 2xl:px-2.5 py-0.5 2xl:py-1 rounded text-[10px] 2xl:text-xs font-semibold bg-white text-emerald-800 border border-emerald-200"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 text-emerald-600" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg 2xl:rounded-xl p-2.5 2xl:p-4">
            <span className="text-[10px] 2xl:text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1 2xl:mb-2">
              Missing Skills ({job.missingSkills?.length || 0})
            </span>
            <div className="flex flex-wrap gap-1 2xl:gap-1.5">
              {(job.missingSkills || []).map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-1.5 2xl:px-2.5 py-0.5 2xl:py-1 rounded text-[10px] 2xl:text-xs font-semibold bg-white text-amber-800 border border-amber-200"
                >
                  <AlertCircle className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 text-amber-600" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-stretch justify-end gap-2.5 2xl:gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
        <Link
          to={`/jobs/${job.id}`}
          className="w-full sm:w-auto lg:w-full min-w-[130px] text-center px-4 2xl:px-6 py-2.5 2xl:py-3 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          View Details
        </Link>

        <button
          type="button"
          onClick={() => handleApply && handleApply(job)}
          disabled={isApplied}
          className={`w-full sm:w-auto lg:w-full min-w-[130px] inline-flex items-center justify-center gap-1.5 px-4 2xl:px-6 py-2.5 2xl:py-3 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base font-semibold transition-all ${
            isApplied
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-600/30 cursor-pointer'
          }`}
        >
          {isApplied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              <span>Applied</span>
            </>
          ) : (
            <>
              <span>Quick Apply</span>
              <ArrowRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RoleMatchesCard;
