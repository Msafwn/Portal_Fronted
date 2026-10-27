import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useJobDetails } from './JobDetailsContext';

export const JobDetailsOverviewCard = ({ className = '' }) => {
  const { job } = useJobDetails();
  if (!job) return null;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs ${className}`}>
      <h2 className="text-base font-bold text-slate-900">Role Overview & Scope</h2>
      <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

      <h3 className="text-sm font-bold text-slate-900 pt-2">
        Candidate Skills Comparison
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-2">
            Verified Matched Skills ({job.matchedSkills?.length || 0})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(job.matchedSkills || []).map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-white text-emerald-800 border border-emerald-300"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-2">
            Skills to Learn ({job.missingSkills?.length || 0})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(job.missingSkills || []).map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-white text-amber-800 border border-amber-300"
              >
                <AlertCircle className="w-3 h-3 text-amber-600" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsOverviewCard;
