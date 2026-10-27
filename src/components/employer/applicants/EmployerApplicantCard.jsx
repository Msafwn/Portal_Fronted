import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  XCircle,
  Clock,
  GraduationCap,
  Briefcase,
  Eye,
  Video,
} from 'lucide-react';

export const EmployerApplicantCard = ({
  applicant,
  rank,
  onShortlist,
  onSchedule,
  onReject,
  onViewProfile,
}) => {
  const score = applicant.matchScore || 0;
  const isShortlisted = applicant.status === 'Shortlisted';
  const isRejected = applicant.status === 'Rejected';

  const getScoreBadgeStyles = (val) => {
    if (val >= 90) {
      return {
        pill: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        starColor: 'text-amber-500 fill-amber-400',
        label: 'Top Match (≥ 90%)',
        barColor: 'bg-emerald-500',
      };
    }
    if (val >= 80) {
      return {
        pill: 'bg-blue-50 text-blue-800 border-blue-300',
        starColor: 'text-blue-500 fill-blue-400',
        label: 'Strong Fit (≥ 80%)',
        barColor: 'bg-blue-600',
      };
    }
    if (val >= 70) {
      return {
        pill: 'bg-amber-50 text-amber-800 border-amber-300',
        starColor: 'text-amber-500',
        label: 'Good Potential (≥ 70%)',
        barColor: 'bg-amber-500',
      };
    }
    return {
      pill: 'bg-slate-100 text-slate-700 border-slate-200',
      starColor: 'text-slate-400',
      label: 'Moderate Fit',
      barColor: 'bg-slate-400',
    };
  };

  const scoreStyle = getScoreBadgeStyles(score);

  const getRoleBadgeClasses = (target) => {
    switch (target) {
      case 'Internship':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Entry-Level':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Experienced':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
        return (
          <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-emerald-500" />
            Shortlisted ⭐
          </span>
        );
      case 'Interview Scheduled':
        return (
          <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-indigo-500" />
            Interview Set 🗓️
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-rose-500" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-slate-400" />
            Under Review
          </span>
        );
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl 2xl:rounded-3xl border transition-all overflow-hidden ${
        score >= 90
          ? 'border-emerald-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs'
          : 'border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="p-5 sm:p-6 2xl:p-8 3xl:p-10 space-y-4 2xl:space-y-6">
        {/* Top Row: Rank + AI Match Score + Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 2xl:gap-4 border-b border-slate-100 pb-3 2xl:pb-4">
          <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
            <span className="w-6 h-6 2xl:w-8 2xl:h-8 rounded-lg 2xl:rounded-xl bg-slate-100 text-slate-700 text-xs 2xl:text-sm 3xl:text-base font-bold flex items-center justify-center border border-slate-200 shrink-0">
              #{rank}
            </span>
            <div
              className={`inline-flex items-center gap-1.5 2xl:gap-2 px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-extrabold border ${scoreStyle.pill}`}
            >
              <Sparkles className={`w-3.5 h-3.5 2xl:w-4 2xl:h-4 ${scoreStyle.starColor}`} />
              <span className="text-sm 2xl:text-base 3xl:text-lg font-black">{score}% Match</span>
              <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-medium opacity-80">• {scoreStyle.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            {getStatusBadge(applicant.status)}
          </div>
        </div>

        {/* Candidate Profile Info Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 2xl:gap-6">
          <div className="flex items-start gap-3.5 2xl:gap-5">
            <img
              src={applicant.avatar}
              alt={applicant.name}
              className="w-12 h-12 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 rounded-xl 2xl:rounded-2xl object-cover border border-slate-200 shrink-0 shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
                <h3 className="font-bold text-base 2xl:text-xl 3xl:text-2xl text-slate-900 leading-snug">
                  {applicant.name}
                </h3>
                <span
                  className={`px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg text-xs 2xl:text-sm 3xl:text-base font-semibold border ${getRoleBadgeClasses(
                    applicant.roleTarget
                  )}`}
                >
                  {applicant.roleTarget}
                </span>
              </div>

              <div className="flex items-center gap-2 2xl:gap-3 text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-1 2xl:mt-1.5 flex-wrap">
                <span className="font-semibold text-slate-800">
                  {applicant.appliedJobTitle}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                  Applied {applicant.appliedDate}
                </span>
              </div>

              {/* Education & Experience Chips */}
              <div className="flex items-center gap-3 2xl:gap-4 text-xs 2xl:text-sm 3xl:text-base text-slate-600 mt-2 2xl:mt-3 flex-wrap">
                <span className="inline-flex items-center gap-1 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
                  {applicant.education}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-medium">
                  <Briefcase className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                  {applicant.experienceYears}
                </span>
              </div>
            </div>
          </div>

          {/* AI Semantic Match Quick Bar */}
          <div className="md:w-56 2xl:md:w-72 3xl:md:w-80 bg-slate-50/80 rounded-xl 2xl:rounded-2xl p-3 2xl:p-4 border border-slate-200/60 shrink-0">
            <div className="flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base mb-1 2xl:mb-1.5">
              <span className="text-slate-600 font-medium">AI Semantic Alignment</span>
              <span className="font-bold text-slate-900">{score}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 2xl:h-3 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${scoreStyle.barColor}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] 2xl:text-xs 3xl:text-sm text-slate-500 mt-1.5 2xl:mt-2">
              <span>Tech: {applicant.scoreBreakdown?.technical || 45}/50</span>
              <span>Exp: {applicant.scoreBreakdown?.experience || 25}/30</span>
            </div>
          </div>
        </div>

        {/* Skills Alignment: Matched vs Missing */}
        <div className="space-y-2 2xl:space-y-3 pt-1 border-t border-slate-100">
          {/* Matched Skills */}
          <div className="flex items-center gap-1.5 2xl:gap-2 flex-wrap">
            <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-bold text-emerald-800 uppercase tracking-wider mr-1">
              Verified Matches:
            </span>
            {applicant.matchedSkills?.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg text-xs 2xl:text-sm 3xl:text-base font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center gap-1"
              >
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{skill}</span>
              </span>
            ))}
          </div>

          {/* Missing / Gap Skills */}
          {applicant.missingSkills && applicant.missingSkills.length > 0 && (
            <div className="flex items-center gap-1.5 2xl:gap-2 flex-wrap">
              <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-bold text-amber-800 uppercase tracking-wider mr-1">
                Gaps to Upskill:
              </span>
              {applicant.missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg text-xs 2xl:text-sm 3xl:text-base font-medium bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center gap-1"
                >
                  <span className="text-amber-500">⚠</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Scheduled Interview Banner if Applicable */}
        {applicant.interview && (
          <div className="p-3 2xl:p-4 rounded-xl 2xl:rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base">
            <div className="flex items-center gap-2 text-indigo-900">
              <Video className="w-4 h-4 2xl:w-5 2xl:h-5 text-indigo-600 shrink-0" />
              <span>
                Interview set for <strong>{applicant.interview.date}</strong> at{' '}
                <strong>{applicant.interview.time}</strong> ({applicant.interview.mode})
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer: 1-Click Decisions */}
      <div className="px-5 py-3.5 2xl:px-8 2xl:py-5 bg-slate-50/90 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 2xl:gap-4">
        {/* Left Secondary: View Full Dossier */}
        <button
          onClick={() => onViewProfile(applicant)}
          className="inline-flex items-center justify-center gap-1.5 2xl:gap-2 px-3.5 py-1.5 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-500" />
          <span>View Full Dossier</span>
        </button>

        {/* Right Action Group: Shortlist / Schedule / Reject */}
        <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
          {/* Reject Button */}
          {!isRejected && (
            <button
              onClick={() => onReject(applicant.id)}
              title="Reject Application"
              className="inline-flex items-center gap-1 2xl:gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-rose-600 hover:text-rose-700 bg-white border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              <span>Reject</span>
            </button>
          )}

          {/* Shortlist Toggle */}
          <button
            onClick={() => onShortlist(applicant.id)}
            className={`inline-flex items-center gap-1.5 2xl:gap-2 px-3.5 py-1.5 2xl:px-5 2xl:py-2 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold transition-all cursor-pointer ${
              isShortlisted
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span>{isShortlisted ? 'Shortlisted ✓' : 'Shortlist ⭐'}</span>
          </button>

          {/* Schedule Interview */}
          <button
            onClick={() => onSchedule(applicant)}
            className="inline-flex items-center gap-1.5 2xl:gap-2 px-4 py-1.5 2xl:px-6 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-100" />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerApplicantCard;
