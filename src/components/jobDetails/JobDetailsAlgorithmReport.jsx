import React, { useMemo } from 'react';
import { useJobDetails } from './JobDetailsContext';

export const JobDetailsAlgorithmReport = React.memo(({ className = '' }) => {
  const { job } = useJobDetails();
  if (!job) return null;

  // Memoize 50-30-20 algorithm breakdown score
  const breakdown = useMemo(() => {
    return job.breakdown || {
      skillsScore: Math.round((job.matchPercentage || 0) * 0.5),
      experienceScore: Math.round((job.matchPercentage || 0) * 0.3),
      educationScore: Math.round((job.matchPercentage || 0) * 0.2),
    };
  }, [job.breakdown, job.matchPercentage]);

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            50-30-20 Algorithm Match Report
          </h2>
          <p className="text-xs text-slate-500">
            Objective evaluation across technical skills, experience record, and academic background.
          </p>
        </div>
        <span className="text-lg font-black text-blue-600">
          {job.matchPercentage}/100
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900">Skills Compatibility</span>
            <span className="text-xs font-black text-blue-700">
              {breakdown.skillsScore} / 50
            </span>
          </div>
          <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${(breakdown.skillsScore / 50) * 100}%` }}
              className="bg-blue-600 h-full"
            />
          </div>
          <p className="text-[11px] text-blue-800 leading-tight">
            Matched {job.matchedSkills?.length || 0} core technical competencies requested by {job.company}.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900">Experience Alignment</span>
            <span className="text-xs font-black text-indigo-700">
              {breakdown.experienceScore} / 30
            </span>
          </div>
          <div className="w-full bg-indigo-200 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${(breakdown.experienceScore / 30) * 100}%` }}
              className="bg-indigo-600 h-full"
            />
          </div>
          <p className="text-[11px] text-indigo-800 leading-tight">
            Experience level ({job.jobType}) closely matches your status.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-900">Education Requirement</span>
            <span className="text-xs font-black text-teal-700">
              {breakdown.educationScore} / 20
            </span>
          </div>
          <div className="w-full bg-teal-200 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${(breakdown.educationScore / 20) * 100}%` }}
              className="bg-teal-600 h-full"
            />
          </div>
          <p className="text-[11px] text-teal-800 leading-tight">
            Academic qualification aligns with degree requirement in {job.department}.
          </p>
        </div>
      </div>
    </div>
  );
});

export default JobDetailsAlgorithmReport;
