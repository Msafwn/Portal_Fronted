import React, { useState } from 'react';
import {
  X,
  Briefcase,
  Building2,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Ban,
  Trash2,
  Sparkles,
  AlertTriangle,
  Calendar,
  DollarSign,
  Tag,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminJobDossierModal = ({
  job,
  isOpen,
  onClose,
  onApprove,
  onFlag,
  onBlock,
  onDelete,
}) => {
  const [customFlagReason, setCustomFlagReason] = useState('');
  const [showFlagInput, setShowFlagInput] = useState(false);

  if (!isOpen || !job) return null;

  const handleApprove = () => {
    onApprove(job.id);
    onClose();
  };

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    const reason =
      customFlagReason.trim() ||
      'SUSPECTED SCAM: Demands application/security deposit fee or unverified contact.';
    onFlag(job.id, reason);
    setShowFlagInput(false);
    setCustomFlagReason('');
    onClose();
  };

  const handleBlock = () => {
    const reason = window.prompt(
      'Permanent Block Reason for this job vacancy:',
      'Violated platform security standards and job integrity policies.'
    );
    if (reason) {
      onBlock(job.id, reason);
      onClose();
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete the job vacancy "${job.title}"?`
      )
    ) {
      onDelete(job.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl 2xl:max-w-4xl 3xl:max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 2xl:p-8 3xl:p-9 bg-slate-50 border-b border-slate-200/80 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 2xl:gap-5">
            {job.companyLogo ? (
              <img loading="lazy" decoding="async"
                src={job.companyLogo}
                alt={job.company}
                className="w-12 h-12 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 rounded-xl 2xl:rounded-2xl object-cover border border-slate-200 shrink-0 mt-0.5"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-12 h-12 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 rounded-xl 2xl:rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                <Building2 className="w-6 h-6 2xl:w-8 2xl:h-8" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 2xl:gap-3 flex-wrap mb-1 2xl:mb-2">
                <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  {job.discipline}
                </span>
                <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-slate-200 text-slate-700">
                  {job.jobType}
                </span>
                {job.moderationStatus === 'flagged' && (
                  <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-extrabold bg-rose-100 text-rose-800 border border-rose-200 animate-pulse">
                    ⚠️ SCAM ALERT
                  </span>
                )}
                {job.moderationStatus === 'approved' && (
                  <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ✓ APPROVED
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-slate-900 leading-snug">
                {job.title}
              </h2>
              <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-600 mt-0.5 2xl:mt-1.5 font-medium flex items-center gap-1.5 2xl:gap-2">
                <Building2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400" />
                <span>{job.company}</span>
                <span>•</span>
                <MapPin className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400" />
                <span>{job.location}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 2xl:p-2.5 rounded-xl border border-slate-200 hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 2xl:w-5 2xl:h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 2xl:p-8 3xl:p-9 overflow-y-auto space-y-5 2xl:space-y-7 text-xs 2xl:text-sm 3xl:text-base text-slate-700">
          {/* AI Security & Fraud Detection Banner */}
          <div
            className={`p-4 2xl:p-6 rounded-2xl border ${
              job.moderationStatus === 'flagged' || job.riskScore < 40
                ? 'bg-rose-50/90 border-rose-200 text-rose-900'
                : 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5 2xl:mb-2.5">
              <div className="flex items-center gap-1.5 2xl:gap-2 font-extrabold text-xs 2xl:text-base">
                {job.moderationStatus === 'flagged' || job.riskScore < 40 ? (
                  <>
                    <AlertTriangle className="w-4 h-4 2xl:w-5 2xl:h-5 text-rose-600" />
                    <span>AI Fraud & Scam Sentinel Warning</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-600" />
                    <span>AI Authenticity & Safe Verification Pass</span>
                  </>
                )}
              </div>
              <span className="font-extrabold text-xs 2xl:text-sm px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-md bg-white/80 shadow-2xs">
                Safety Score: {job.riskScore}%
              </span>
            </div>
            {job.flagReason ? (
              <p className="text-xs 2xl:text-sm font-semibold text-rose-800 leading-relaxed bg-white/70 p-2.5 2xl:p-3.5 rounded-xl border border-rose-200">
                🚨 {job.flagReason}
              </p>
            ) : (
              <p className="text-xs 2xl:text-sm text-slate-600">
                Corporate credentials authenticated. Vacancy description complies with platform non-discrimination and zero-fee policies.
              </p>
            )}
          </div>

          {/* Key Vacancy Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 2xl:gap-4 bg-slate-50 p-3.5 2xl:p-5 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[10px] 2xl:text-xs font-bold uppercase text-slate-400 block">Target Role</span>
              <span className="font-bold text-slate-800 text-xs 2xl:text-sm 3xl:text-base">{job.targetRole}</span>
            </div>
            <div>
              <span className="text-[10px] 2xl:text-xs font-bold uppercase text-slate-400 block">Salary Package</span>
              <span className="font-bold text-blue-700 text-xs 2xl:text-sm 3xl:text-base">{job.salary}</span>
            </div>
            <div>
              <span className="text-[10px] 2xl:text-xs font-bold uppercase text-slate-400 block">Experience Level</span>
              <span className="font-bold text-slate-800 text-xs 2xl:text-sm 3xl:text-base">{job.experienceLevel}</span>
            </div>
            <div>
              <span className="text-[10px] 2xl:text-xs font-bold uppercase text-slate-400 block">Applications</span>
              <span className="font-bold text-slate-800 text-xs 2xl:text-sm 3xl:text-base">
                {job.applicantsCount || 0} ({job.vacancies || 1} Openings)
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs 2xl:text-base font-bold uppercase tracking-wider text-slate-500 mb-1.5 2xl:mb-2">
              Vacancy Overview
            </h4>
            <p className="leading-relaxed text-slate-700 bg-white p-3 2xl:p-4 rounded-xl 2xl:rounded-2xl border border-slate-200">
              {job.description}
            </p>
          </div>

          {/* Key Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="text-xs 2xl:text-base font-bold uppercase tracking-wider text-slate-500 mb-1.5 2xl:mb-2">
                Eligibility & Qualifications
              </h4>
              <ul className="space-y-1.5 2xl:space-y-2 bg-slate-50 p-3 2xl:p-4 rounded-xl 2xl:rounded-2xl border border-slate-200/80">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          {job.skills && job.skills.length > 0 && (
            <div>
              <h4 className="text-xs 2xl:text-base font-bold uppercase tracking-wider text-slate-500 mb-1.5 2xl:mb-2">
                Indexed Skill Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5 2xl:gap-2.5">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold bg-blue-50 text-blue-700 border border-blue-200/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Custom Flag Input Box */}
          {showFlagInput && (
            <form onSubmit={handleFlagSubmit} className="p-3.5 2xl:p-5 bg-rose-50 rounded-2xl border border-rose-200 space-y-2 2xl:space-y-3">
              <label className="block text-xs 2xl:text-sm font-bold text-rose-800">
                Specify Scam / Violation Alert Reason:
              </label>
              <textarea
                rows={2}
                value={customFlagReason}
                onChange={(e) => setCustomFlagReason(e.target.value)}
                placeholder="e.g. Asking candidates for registration fee, fake WhatsApp number, misleading compensation..."
                className="w-full p-2.5 2xl:p-3.5 text-xs 2xl:text-sm rounded-xl border border-rose-300 focus:outline-hidden focus:ring-1 focus:ring-rose-500 bg-white"
                required
              />
              <div className="flex justify-end gap-2 2xl:gap-3">
                <button
                  type="button"
                  onClick={() => setShowFlagInput(false)}
                  className="px-3 py-1.5 2xl:px-4 2xl:py-2 text-xs 2xl:text-sm text-slate-600 hover:bg-slate-200 rounded-lg 2xl:rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 2xl:px-4 2xl:py-2 text-xs 2xl:text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg 2xl:rounded-xl cursor-pointer"
                >
                  Confirm Scam Flag
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer Moderation Controls */}
        <div className="p-4 sm:p-5 2xl:p-6 3xl:p-8 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-2.5 flex-wrap">
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 py-2 2xl:px-4 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
            <span>Delete Listing</span>
          </button>

          <div className="flex items-center gap-2 2xl:gap-3">
            {job.moderationStatus !== 'flagged' && !showFlagInput && (
              <button
                onClick={() => setShowFlagInput(true)}
                className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 py-2 2xl:px-4 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                <span>Flag as Scam</span>
              </button>
            )}

            {job.moderationStatus !== 'blocked' && (
              <button
                onClick={handleBlock}
                className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 py-2 2xl:px-4 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
              >
                <Ban className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                <span>Block Job</span>
              </button>
            )}

            {job.moderationStatus !== 'approved' && (
              <button
                onClick={handleApprove}
                className="inline-flex items-center gap-1.5 2xl:gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5" />
                <span>Approve & Publish</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobDossierModal;
