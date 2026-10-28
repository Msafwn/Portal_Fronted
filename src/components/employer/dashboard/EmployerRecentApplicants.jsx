import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Star,
  GraduationCap,
  Briefcase,
  ChevronRight,
  Clock,
  Check,
  Users,
} from 'lucide-react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';

export const EmployerRecentApplicants = () => {
  const {
    applicants,
    handleUpdateApplicantStatus,
  } = useEmployerPortal();

  // Sort candidates by AI Match Score descending (Highest match first)
  const sortedApplicants = [...applicants].sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 2xl:p-7 3xl:p-9 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 2xl:gap-3.5">
          <div className="p-2 2xl:p-3 3xl:p-3.5 rounded-xl 2xl:rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
            <Sparkles className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 2xl:gap-3">
              <h2 className="text-base 2xl:text-xl 3xl:text-2xl font-bold text-slate-900 tracking-tight">
                Top AI-Ranked Applicants
              </h2>
              <span className="px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                50-30-20 Engine
              </span>
            </div>
            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1">
              Ranked automatically by Technical Skills (50%), Relevant Experience (30%), & Academic Fit (20%)
            </p>
          </div>
        </div>

        <Link
          to="/employer/applicants"
          className="text-xs 2xl:text-sm 3xl:text-base text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Full Candidate Review Desk</span>
          <ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5" />
        </Link>
      </div>

      {/* Candidate Cards List */}
      <div className="divide-y divide-slate-100">
        {sortedApplicants.length === 0 ? (
          <div className="p-8 2xl:p-12 text-center bg-slate-50/50">
            <Users className="w-8 h-8 2xl:w-10 2xl:h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm 2xl:text-base font-bold text-slate-700">No applicants yet</h4>
            <p className="text-xs 2xl:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
              Candidates applying to your posted vacancies will appear here automatically ranked by AI match score.
            </p>
          </div>
        ) : (
          sortedApplicants.map((candidate) => {
            const isShortlisted = candidate.status === 'Shortlisted';
          const breakdown = candidate.scoreBreakdown || {
            technical: Math.round((candidate.matchScore || 75) * 0.5),
            experience: Math.round((candidate.matchScore || 75) * 0.3),
            softSkills: Math.round((candidate.matchScore || 75) * 0.2),
          };

          return (
            <div
              key={candidate.id || candidate._id}
              className="p-4 sm:p-5 2xl:p-7 3xl:p-8 hover:bg-slate-50/70 transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5 2xl:gap-7"
            >
              {/* Left Column: Candidate Info & Applied Job */}
              <div className="flex items-start gap-4 2xl:gap-5 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  {candidate.avatar ? (
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-12 h-12 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 rounded-xl 2xl:rounded-2xl object-cover ring-2 ring-slate-200 shadow-xs"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 rounded-xl 2xl:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-sm 2xl:text-base 3xl:text-xl shadow-xs shrink-0">
                      {(candidate.name || 'CD')
                        .trim()
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                  )}
                  {candidate.matchScore >= 90 && (
                    <span
                      title="Exceptional Match"
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 2xl:w-6 2xl:h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-slate-950 font-bold shadow-xs"
                    >
                      <Star className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 fill-current" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 2xl:gap-3 flex-wrap mb-1 2xl:mb-1.5">
                    <h3 className="font-bold text-sm 2xl:text-base 3xl:text-xl text-slate-900 hover:text-blue-600 transition-colors truncate">
                      {candidate.name}
                    </h3>
                    <span className="text-[10px] 2xl:text-xs 3xl:text-sm px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {candidate.experienceYears}
                    </span>
                    <span className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 2xl:w-4 2xl:h-4 text-slate-400" />
                      {candidate.appliedDate}
                    </span>
                  </div>

                  {/* Applied Position */}
                  <div className="text-xs 2xl:text-sm 3xl:text-base text-slate-600 font-medium flex items-center gap-1.5 2xl:gap-2 mb-1 2xl:mb-1.5 truncate">
                    <Briefcase className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600 flex-shrink-0" />
                    <span className="truncate">Applied for: <span className="text-slate-900 font-bold">{candidate.appliedJobTitle}</span></span>
                  </div>

                  {/* Education / University Fit */}
                  <div className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 flex items-center gap-1.5 2xl:gap-2 truncate">
                    <GraduationCap className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{candidate.education}</span>
                  </div>

                  {/* Skills Match vs Missing Chips */}
                  <div className="mt-2.5 2xl:mt-3.5 flex items-center gap-1.5 2xl:gap-2 flex-wrap">
                    <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold text-slate-500 mr-0.5">Matched:</span>
                    {candidate.matchedSkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 2xl:gap-1.5 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        <Check className="w-2.5 h-2.5 2xl:w-3.5 2xl:h-3.5 text-emerald-600" />
                        {skill}
                      </span>
                    ))}

                    {candidate.missingSkills?.length > 0 && (
                      <>
                        <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold text-slate-500 ml-1.5 mr-0.5">Gap:</span>
                        {candidate.missingSkills.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 2xl:gap-1.5 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-rose-50 text-rose-700 border border-rose-200"
                          >
                            <span className="text-rose-500">✕</span>
                            {skill}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Middle: 50-30-20 AI Score Pill & Breakdown */}
              <div className="flex-shrink-0 bg-slate-50 rounded-xl 2xl:rounded-2xl p-3 2xl:p-4 3xl:p-5 border border-slate-200 min-w-[210px] 2xl:min-w-[260px] 3xl:min-w-[300px]">
                <div className="flex items-center justify-between gap-3 mb-2 2xl:mb-3">
                  <div className="flex items-center gap-1.5 2xl:gap-2">
                    <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
                    <span className="text-xs 2xl:text-sm 3xl:text-base font-bold text-slate-800">AI Match Score</span>
                  </div>
                  <span
                    className={`text-sm 2xl:text-base 3xl:text-lg font-black px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-lg 2xl:rounded-xl border shadow-2xs ${
                      candidate.matchScore >= 90
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : candidate.matchScore >= 80
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    }`}
                  >
                    {candidate.matchScore}%
                  </span>
                </div>

                {/* 50-30-20 Weighted Pills */}
                <div className="grid grid-cols-3 gap-1.5 2xl:gap-2.5 text-center text-[10px] 2xl:text-xs pt-1 2xl:pt-2 border-t border-slate-200/80">
                  <div className="bg-white rounded-lg 2xl:rounded-xl p-1 2xl:p-2 border border-slate-200/60 shadow-2xs">
                    <div className="text-slate-500 text-[9px] 2xl:text-[11px] 3xl:text-xs uppercase font-bold">Tech (50)</div>
                    <div className="text-emerald-700 font-extrabold text-xs 2xl:text-sm 3xl:text-base">
                      {breakdown.technical}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg 2xl:rounded-xl p-1 2xl:p-2 border border-slate-200/60 shadow-2xs">
                    <div className="text-slate-500 text-[9px] 2xl:text-[11px] 3xl:text-xs uppercase font-bold">Exp (30)</div>
                    <div className="text-blue-700 font-extrabold text-xs 2xl:text-sm 3xl:text-base">
                      {breakdown.experience}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg 2xl:rounded-xl p-1 2xl:p-2 border border-slate-200/60 shadow-2xs">
                    <div className="text-slate-500 text-[9px] 2xl:text-[11px] 3xl:text-xs uppercase font-bold">Fit (20)</div>
                    <div className="text-indigo-700 font-extrabold text-xs 2xl:text-sm 3xl:text-base">
                      {breakdown.softSkills}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Quick 1-Click Shortlist Action */}
              <div className="flex lg:flex-col items-center justify-end gap-2 2xl:gap-3 flex-shrink-0">
                {isShortlisted ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs 2xl:text-sm 3xl:text-base font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-600" />
                    Shortlisted ⭐
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleUpdateApplicantStatus(candidate.id || candidate.applicationId, 'Shortlisted')}
                    className="flex-1 lg:w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs 2xl:text-sm 3xl:text-base font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    <span>Shortlist</span>
                  </button>
                )}

                <Link
                  to={candidate.appliedJobId ? `/employer/applicants?jobId=${candidate.appliedJobId}` : '/employer/applicants'}
                  className="flex-1 lg:w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs 2xl:text-sm 3xl:text-base font-bold transition-all"
                >
                  <span>Review Profile</span>
                </Link>
              </div>
            </div>
          );
        })
      )}
      </div>

      {/* Footer */}
      <div className="p-3.5 2xl:p-5 3xl:p-6 bg-slate-50/70 border-t border-slate-200 text-center text-xs 2xl:text-sm 3xl:text-base">
        <Link
          to="/employer/applicants"
          className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1"
        >
          <span>Open Full AI Applicant Ranking Desk & Schedule Interviews</span>
          <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
        </Link>
      </div>
    </div>
  );
};

export default EmployerRecentApplicants;
