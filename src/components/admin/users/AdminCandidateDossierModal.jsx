import React, { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Trash2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export const AdminCandidateDossierModal = ({
  candidate,
  isOpen,
  onClose,
  onToggleStatus,
  onDelete,
}) => {
  if (!isOpen || !candidate) return null;

  const [banReasonInput, setBanReasonInput] = useState('');
  const [showBanInput, setShowBanInput] = useState(false);

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'student':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'fresh_graduate':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'professional':
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'banned':
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white w-full max-w-2xl 2xl:max-w-4xl 3xl:max-w-5xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 2xl:p-8 3xl:p-9 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/60">
          <div className="flex items-center gap-3.5 2xl:gap-5">
            {candidate.avatar ? (
              <img loading="lazy" decoding="async"
                src={candidate.avatar}
                alt={candidate.name}
                className="w-14 h-14 2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 rounded-2xl object-cover border-2 border-white shadow-xs"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-14 h-14 2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 rounded-2xl bg-blue-600 text-white font-bold text-lg 2xl:text-3xl flex items-center justify-center shadow-xs">
                {(candidate.name || 'C').charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
                <h3 className="text-lg 2xl:text-2xl 3xl:text-3xl font-bold text-slate-900 tracking-tight">
                  {candidate.name}
                </h3>
                <span
                  className={`px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold border ${getStatusBadgeStyle(
                    candidate.status
                  )}`}
                >
                  {candidate.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1.5">
                Candidate ID: <strong className="font-mono text-slate-700">{candidate.id}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 2xl:p-3 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 2xl:w-6 2xl:h-6" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 2xl:p-8 3xl:p-9 space-y-5 2xl:space-y-7 overflow-y-auto no-scrollbar flex-1 text-xs 2xl:text-sm 3xl:text-base">
          {/* Suspension Banner (If Banned) */}
          {candidate.status === 'banned' && (
            <div className="p-3.5 2xl:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5 2xl:gap-3.5">
              <ShieldAlert className="w-4 h-4 2xl:w-5 2xl:h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs 2xl:text-sm 3xl:text-base text-rose-900">Account Access Suspended</p>
                <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-rose-700 mt-0.5">
                  {candidate.banReason || 'Administrative restriction placed by Super Admin.'}
                </p>
              </div>
            </div>
          )}

          {/* Quick Contact & Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 2xl:gap-4">
            <div className="p-3 2xl:p-4 rounded-xl 2xl:rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Email Address
              </span>
              <div className="flex items-center gap-1.5 2xl:gap-2 text-slate-800 font-semibold truncate">
                <Mail className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400 shrink-0" />
                <span className="truncate">{candidate.email}</span>
              </div>
            </div>

            <div className="p-3 2xl:p-4 rounded-xl 2xl:rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Contact Phone
              </span>
              <div className="flex items-center gap-1.5 2xl:gap-2 text-slate-800 font-semibold truncate">
                <Phone className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400 shrink-0" />
                <span>{candidate.phone || 'Not Specified'}</span>
              </div>
            </div>

            <div className="p-3 2xl:p-4 rounded-xl 2xl:rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold text-slate-400 uppercase tracking-wider block mb-1">
                City / Location
              </span>
              <div className="flex items-center gap-1.5 2xl:gap-2 text-slate-800 font-semibold truncate">
                <MapPin className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400 shrink-0" />
                <span>{candidate.city || 'Pakistan'}</span>
              </div>
            </div>
          </div>

          {/* Academic Role & Faculty Credentials */}
          <div className="p-4 2xl:p-6 rounded-2xl bg-white border border-slate-200 space-y-3 2xl:space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-base 3xl:text-lg">
              <GraduationCap className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
              <span>Academic Credentials & Faculty</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 2xl:gap-4 text-xs 2xl:text-sm 3xl:text-base">
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">Academic Classification:</span>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-xs 2xl:text-sm font-bold border ${getRoleBadgeStyle(
                    candidate.role
                  )}`}
                >
                  {candidate.roleLabel || candidate.role}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">University / Institution:</span>
                <span className="font-semibold text-slate-800 mt-1 block">
                  {candidate.institution}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">Academic Faculty / Field:</span>
                <span className="font-semibold text-slate-800 mt-1 block">
                  {candidate.discipline}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">GPA / Distinction:</span>
                <span className="font-semibold text-slate-800 mt-1 block">
                  {candidate.cgpa || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* AI Career Matching Metrics */}
          <div className="p-4 2xl:p-6 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3 2xl:space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-base 3xl:text-lg">
                <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
                <span>AI Role Match Telemetry</span>
              </h4>
              <span className="text-sm 2xl:text-lg 3xl:text-xl font-extrabold text-blue-600">
                {candidate.matchScore}% Match
              </span>
            </div>

            <div className="w-full bg-blue-200/50 h-2.5 2xl:h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${candidate.matchScore}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] 2xl:text-xs 3xl:text-sm text-slate-600">
              <span>Target Role: <strong className="text-slate-900 font-semibold">{candidate.targetRole}</strong></span>
              <span>Applications Submitted: <strong className="text-slate-900 font-semibold">{candidate.applicationsCount}</strong></span>
            </div>
          </div>

          {/* Technical & Domain Skills */}
          <div className="p-4 2xl:p-6 rounded-2xl bg-white border border-slate-200 space-y-2 2xl:space-y-3">
            <h4 className="font-bold text-slate-900 text-xs 2xl:text-base 3xl:text-lg">
              Verified Technical Skills ({candidate.skills.length})
            </h4>
            <div className="flex flex-wrap gap-1.5 2xl:gap-2.5">
              {candidate.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 2xl:px-3.5 2xl:py-1.5 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Candidate Bio */}
          {candidate.bio && (
            <div className="p-4 2xl:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 2xl:space-y-2">
              <h4 className="font-bold text-slate-900 text-xs 2xl:text-base 3xl:text-lg">Candidate Statement</h4>
              <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-600 leading-relaxed">{candidate.bio}</p>
            </div>
          )}
        </div>

        {/* Footer Administrative Action Controls */}
        <div className="p-4 sm:p-5 2xl:p-6 3xl:p-8 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => {
              if (window.confirm(`Are you sure you want to permanently delete candidate ${candidate.name}?`)) {
                onDelete(candidate.id);
                onClose();
              }
            }}
            className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 py-2 2xl:px-4 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-rose-600 hover:bg-rose-50 text-xs 2xl:text-sm 3xl:text-base font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4 2xl:w-5 2xl:h-5" />
            <span>Purge Record</span>
          </button>

          <div className="flex items-center gap-2 2xl:gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs 2xl:text-sm 3xl:text-base font-semibold transition-colors cursor-pointer"
            >
              Close Dossier
            </button>

            {candidate.status === 'banned' ? (
              <button
                onClick={() => {
                  onToggleStatus(candidate.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 2xl:gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 2xl:w-5 2xl:h-5" />
                <span>Re-Activate Candidate</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onToggleStatus(candidate.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 2xl:gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 2xl:w-5 2xl:h-5" />
                <span>Suspend Candidate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCandidateDossierModal;
