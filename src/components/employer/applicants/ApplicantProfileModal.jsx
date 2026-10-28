import React from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Calendar,
  Award,
  Video,
  ExternalLink,
} from 'lucide-react';

export const ApplicantProfileModal = ({
  isOpen,
  onClose,
  applicant,
  onShortlist,
  onScheduleClick,
  onReject,
  onRunAiAudit,
}) => {
  if (!isOpen || !applicant) return null;

  const score = applicant.matchScore || 0;
  const breakdown = applicant.scoreBreakdown || {
    technical: Math.round(score * 0.5),
    experience: Math.round(score * 0.3),
    softSkills: Math.round(score * 0.2),
  };

  const isShortlisted = applicant.status === 'Shortlisted';
  const isInterview = applicant.status === 'Interview Scheduled';
  const isRejected = applicant.status === 'Rejected';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl 2xl:max-w-4xl 3xl:max-w-5xl rounded-2xl 2xl:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 2xl:px-8 2xl:py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5 2xl:gap-3.5">
            <span className="text-xs 2xl:text-sm 3xl:text-base font-bold uppercase tracking-wider text-slate-500">
              Candidate Dossier
            </span>
            <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-slate-300" />
            <span className="text-xs 2xl:text-sm 3xl:text-base text-slate-600 font-medium">ID: {applicant.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 2xl:w-6 2xl:h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 2xl:p-8 space-y-6 2xl:space-y-8 overflow-y-auto flex-1 text-xs sm:text-sm 2xl:text-base">
          {/* Top Profile Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <div className="flex items-center gap-3.5">
              {applicant.avatar ? (
                <img
                  src={applicant.avatar}
                  alt={applicant.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-2xs shrink-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-base shadow-2xs shrink-0">
                  {(applicant.name || 'CD')
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')
                    .toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-slate-900">{applicant.name}</h3>
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {applicant.roleTarget || 'Entry-Level'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Applied for: <strong className="text-slate-900">{applicant.appliedJobTitle}</strong>
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {applicant.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {applicant.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Big AI Match Score Badge */}
            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4 shrink-0 flex flex-col items-end">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-sm font-extrabold bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-900 border border-amber-300">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{score}% AI Match</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {score >= 90 ? '🌟 Top 1% Fit' : score >= 80 ? '⭐ Strong Fit' : 'Good Potential'}
              </p>
              {onRunAiAudit && (
                <button
                  type="button"
                  onClick={() => onRunAiAudit(applicant.id)}
                  className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
                  title="Recalculate ATS matching index using Python spaCy + TF-IDF microservice"
                >
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>Python AI ATS Audit</span>
                </button>
              )}
            </div>
          </div>

          {/* AI Semantic Fit Breakdown */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              <span>AI Semantic Fit Breakdown</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Technical Fit */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Technical Competency</span>
                  <span className="font-bold text-slate-900">{breakdown.technical} / 50</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${(breakdown.technical / 50) * 100}%` }}
                  />
                </div>
              </div>

              {/* Experience Fit */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Experience & Depth</span>
                  <span className="font-bold text-slate-900">{breakdown.experience} / 30</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${(breakdown.experience / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* Soft Skills */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">Soft Skills & Communication</span>
                  <span className="font-bold text-slate-900">{breakdown.softSkills} / 20</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${(breakdown.softSkills / 20) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Education & Experience Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Academic Credentials</span>
              </span>
              <p className="text-xs font-bold text-slate-900">{applicant.education}</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Professional Experience</span>
              </span>
              <p className="text-xs font-bold text-slate-900">{applicant.experienceYears}</p>
            </div>
          </div>

          {/* Matched vs Missing Skills */}
          <div className="space-y-3">
            {/* Matched Skills */}
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Matching Skills ({applicant.matchedSkills?.length || 0})</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {applicant.matchedSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1"
                  >
                    <span>✓</span>
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills / Growth Gaps */}
            {applicant.missingSkills && applicant.missingSkills.length > 0 && (
              <div className="pt-1">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Growth Gap / Missing Skills ({applicant.missingSkills.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {applicant.missingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1"
                    >
                      <span>⚠</span>
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interview Details if Scheduled */}
          {applicant.interview && (
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Scheduled Interview Details</span>
              </div>
              <p className="text-xs text-indigo-800">
                <strong>When:</strong> {applicant.interview.date} at {applicant.interview.time}
              </p>
              <p className="text-xs text-indigo-800">
                <strong>Format:</strong> {applicant.interview.mode}
              </p>
              {applicant.interview.linkOrRoom && (
                <p className="text-xs text-indigo-800 break-all">
                  <strong>Room / Link:</strong> {applicant.interview.linkOrRoom}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80">
          <div className="flex items-center gap-2">
            {!isRejected ? (
              <button
                type="button"
                onClick={() => {
                  onReject(applicant.id);
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-white border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                Reject Candidate
              </button>
            ) : (
              <span className="text-xs font-semibold text-rose-600 px-3 py-1.5 bg-rose-50 rounded-lg border border-rose-200">
                Marked as Rejected
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Shortlist Button */}
            {!isShortlisted ? (
              <button
                type="button"
                onClick={() => {
                  onShortlist(applicant.id);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
              >
                ⭐ Shortlist Candidate
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1">
                ✓ Shortlisted
              </span>
            )}

            {/* Schedule Interview CTA */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onScheduleClick(applicant);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfileModal;
