import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Building2, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { useDashboard } from './DashboardContext';

export const DashboardRecommendations = ({ className = '' }) => {
  const {
    jobs,
    profile,
    currentRoleConfig,
    roleFilterTab,
    setRoleFilterTab,
    topRecommendations,
    appliedJobIds,
    handleApply,
    getJobTypeBadge,
  } = useDashboard();

  return (
    <div className={`space-y-4 2xl:space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 2xl:gap-3">
            <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-bold uppercase tracking-wider text-slate-800">
              AI Role Recommendations
            </h2>
            <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs font-bold bg-blue-100 text-blue-700">
              Sorted by Match % (Highest First)
            </span>
          </div>
          <p className="text-xs 2xl:text-base 3xl:text-lg text-slate-500 mt-0.5">
            Personalized for your {profile.department} discipline and active {currentRoleConfig.badge}.
          </p>
        </div>
        <Link
          to="/jobs"
          className="text-xs 2xl:text-base 3xl:text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 shrink-0"
        >
          <span>View All ({jobs.length})</span>
          <ArrowRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
        </Link>
      </div>

      {/* Role-Based Filter Tabs */}
      <div className="flex items-center gap-2 2xl:gap-3 overflow-x-auto no-scrollbar pb-1">
        {currentRoleConfig.tabs.map((tab) => {
          const isActive = roleFilterTab === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setRoleFilterTab(tab.value)}
              className={`px-3.5 2xl:px-5 py-1.5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs font-bold scale-[1.02]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Job Cards Grid */}
      {topRecommendations.length === 0 ? (
        <div className="p-8 2xl:p-12 bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200 text-center space-y-2 2xl:space-y-4">
          <Briefcase className="w-8 h-8 2xl:w-12 2xl:h-12 text-slate-400 mx-auto" />
          <h3 className="text-sm 2xl:text-lg font-bold text-slate-700">No roles found for this filter tab</h3>
          <p className="text-xs 2xl:text-base text-slate-500">Try selecting "All" or toggle another candidate role above.</p>
          <button
            onClick={() => setRoleFilterTab('all')}
            className="px-3 2xl:px-5 py-1.5 2xl:py-2.5 rounded-lg 2xl:rounded-xl text-xs 2xl:text-base font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            Reset to All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4k:grid-cols-5 gap-4 2xl:gap-6 3xl:gap-8">
          {topRecommendations.map((job) => {
            const isApplied = appliedJobIds.includes(job.id);
            const typeBadge = getJobTypeBadge(job.jobType);

            const matchColor =
              job.matchPercentage >= 80
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : job.matchPercentage >= 60
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-rose-50 text-rose-800 border-rose-200';

            const breakdown = job.breakdown || {
              skillsScore: Math.round(job.matchPercentage * 0.5),
              experienceScore: Math.round(job.matchPercentage * 0.3),
              educationScore: Math.round(job.matchPercentage * 0.2),
            };

            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all p-5 2xl:p-6 3xl:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Department & Job Type Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] 2xl:text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 2xl:px-2.5 py-0.5 2xl:py-1 rounded-md text-[10px] 2xl:text-xs font-bold border ${typeBadge.color}`}
                    >
                      {typeBadge.label}
                    </span>
                  </div>

                  {/* Title + Match % */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl font-bold text-slate-900 leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-xs 2xl:text-sm text-slate-600 font-medium flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400 shrink-0" />
                        <span>{job.company}</span>
                        <span className="text-slate-300">•</span>
                        <span>{job.location} ({job.workMode})</span>
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 2xl:px-3 py-1 2xl:py-1.5 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm font-black border shrink-0 ${matchColor}`}
                    >
                      <Zap className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 fill-current" />
                      {job.matchPercentage}% Match
                    </span>
                  </div>

                  {/* Algorithm Progress Breakdown */}
                  <div className="p-2.5 2xl:p-3.5 rounded-xl 2xl:rounded-2xl bg-slate-50/80 border border-slate-100 mb-3 space-y-1 2xl:space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] 2xl:text-xs font-semibold text-slate-600">
                      <span>Compatibility Weighting:</span>
                      <span className="text-blue-600 font-bold">{job.matchPercentage}/100</span>
                    </div>
                    <div className="w-full bg-slate-200/70 h-2 2xl:h-2.5 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${breakdown.skillsScore}%` }}
                        className="bg-blue-600 h-full"
                        title="Skills Match Score"
                      />
                      <div
                        style={{ width: `${breakdown.experienceScore}%` }}
                        className="bg-indigo-500 h-full"
                        title="Experience Match Score"
                      />
                      <div
                        style={{ width: `${breakdown.educationScore}%` }}
                        className="bg-teal-500 h-full"
                        title="Education Match Score"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] 2xl:text-[11px] text-slate-400">
                      <span className="text-blue-700 font-medium">Skills: {breakdown.skillsScore}/50</span>
                      <span className="text-indigo-700 font-medium">Exp: {breakdown.experienceScore}/30</span>
                      <span className="text-teal-700 font-medium">Edu: {breakdown.educationScore}/20</span>
                    </div>
                  </div>

                  {/* Matched Skills Chips */}
                  <div className="space-y-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1 2xl:gap-1.5">
                      <span className="text-[10px] 2xl:text-xs text-emerald-700 font-bold mr-1">Matched:</span>
                      {(job.matchedSkills || []).map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-0.5 px-1.5 2xl:px-2 py-0.5 2xl:py-1 rounded text-[10px] 2xl:text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 2xl:w-3 2xl:h-3" />
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Missing Skills Warning */}
                    {job.missingSkills && job.missingSkills.length > 0 && (
                      <div className="p-2.5 2xl:p-3.5 rounded-xl 2xl:rounded-2xl bg-amber-50/90 border border-amber-200 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 2xl:w-5 2xl:h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-xs 2xl:text-sm text-amber-900 leading-tight">
                          <span className="font-bold">⚠️ Missing Skills:</span>{' '}
                          <span className="font-semibold text-amber-800">{job.missingSkills.join(', ')}</span>
                          <p className="text-[10px] 2xl:text-xs text-amber-700 mt-0.5">
                            In skills ko seekhne se aapka match score <strong>90%+</strong> ho sakta hai!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Salary & Apply Buttons */}
                <div className="pt-3 2xl:pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs 2xl:text-base font-bold text-slate-800">{job.salary}</span>
                  <div className="flex items-center gap-2 2xl:gap-3">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="px-2.5 2xl:px-4 py-1.5 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleApply && handleApply(job)}
                      disabled={isApplied}
                      className={`inline-flex items-center gap-1 2xl:gap-1.5 px-3.5 2xl:px-5 py-1.5 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm font-semibold transition-all ${
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardRecommendations;
