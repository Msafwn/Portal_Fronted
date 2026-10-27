import React from 'react';
import {
  X,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  ShieldCheck,
  ShieldAlert,
  Clock,
  CheckCircle2,
  ExternalLink,
  Trash2,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminEmployerDossierModal = ({
  employer,
  isOpen,
  onClose,
  onVerify,
  onSuspend,
  onDelete,
}) => {
  if (!isOpen || !employer) return null;

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'suspended':
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  const handleSimulateDocDownload = (docName) => {
    toast.success(`Opening verified copy of "${docName}" for forensic inspection... 📄`);
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
            {employer.logo ? (
              <img
                src={employer.logo}
                alt={employer.name}
                className="w-14 h-14 2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 rounded-2xl object-cover border-2 border-white shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 rounded-2xl bg-blue-600 text-white font-bold text-lg 2xl:text-3xl flex items-center justify-center shadow-xs">
                {employer.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
                <h3 className="text-lg 2xl:text-2xl 3xl:text-3xl font-bold text-slate-900 tracking-tight">
                  {employer.name}
                </h3>
                <span
                  className={`px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold border ${getStatusBadgeStyle(
                    employer.verificationStatus
                  )}`}
                >
                  {employer.verificationStatus.toUpperCase()}
                </span>
              </div>
              <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1.5">
                Industry Field: <strong className="text-slate-800 font-semibold">{employer.industry}</strong>
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
          {/* Suspension Banner (If Blocked) */}
          {employer.verificationStatus === 'suspended' && (
            <div className="p-3.5 2xl:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5 2xl:gap-3.5">
              <ShieldAlert className="w-4 h-4 2xl:w-5 2xl:h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs 2xl:text-sm 3xl:text-base text-rose-900">Corporate Account Suspended / Blacklisted</p>
                <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-rose-700 mt-0.5">
                  {employer.rejectionReason || 'Failed anti-fraud KYC inspection.'}
                </p>
              </div>
            </div>
          )}

          {/* Pending Review Alert Banner */}
          {employer.verificationStatus === 'pending' && (
            <div className="p-3.5 2xl:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-2.5 2xl:gap-3.5">
              <Clock className="w-4 h-4 2xl:w-5 2xl:h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs 2xl:text-sm 3xl:text-base text-amber-900">Awaiting Super Admin Authorization</p>
                <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-amber-700 mt-0.5">
                  This employer cannot post active job listings until legal tax and incorporation credentials are authenticated.
                </p>
              </div>
            </div>
          )}

          {/* Corporate Legal & Tax Credentials Card */}
          <div className="p-4 2xl:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 2xl:space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-base 3xl:text-lg">
              <Building2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
              <span>Legal Registration & Tax Credentials</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 2xl:gap-4 text-xs 2xl:text-sm 3xl:text-base">
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">FBR NTN Number:</span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block bg-white px-2.5 py-1 2xl:px-3 2xl:py-1.5 rounded-lg border border-slate-200 w-fit">
                  {employer.ntnNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">SECP Incorporation ID:</span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block bg-white px-2.5 py-1 2xl:px-3 2xl:py-1.5 rounded-lg border border-slate-200 w-fit">
                  {employer.secpRegNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">Headquarters Location:</span>
                <span className="font-semibold text-slate-800 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                  <span>{employer.headquarters}</span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">Official Corporate Website:</span>
                <a
                  href={employer.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 hover:text-blue-700 mt-1 inline-flex items-center gap-1 truncate"
                >
                  <Globe className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                  <span className="truncate">{employer.website}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Recruiter / Authorized Signatory Card */}
          <div className="p-4 2xl:p-6 rounded-2xl bg-white border border-slate-200 space-y-3 2xl:space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-base 3xl:text-lg">
              <Mail className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
              <span>Primary Recruiter / Company Representative</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 2xl:gap-4">
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">Representative Name:</span>
                <span className="font-semibold text-slate-900 mt-0.5 block">
                  {employer.recruiterName}
                </span>
                <span className="text-[10px] 2xl:text-xs text-slate-500 font-medium">
                  {employer.recruiterRole}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">Work Email:</span>
                <span className="font-semibold text-slate-900 mt-0.5 block truncate">
                  {employer.recruiterEmail}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] 2xl:text-xs">Direct Phone:</span>
                <span className="font-semibold text-slate-900 mt-0.5 block">
                  {employer.recruiterPhone}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Documents Checklist */}
          <div className="p-4 2xl:p-6 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-2.5 2xl:space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-base 3xl:text-lg">
              <FileText className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
              <span>Submitted Verification Documents</span>
            </h4>
            <div className="space-y-1.5 2xl:space-y-2">
              {employer.documents?.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 2xl:p-3.5 rounded-xl 2xl:rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 2xl:gap-3">
                    {doc.verified ? (
                      <CheckCircle2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 2xl:w-5 2xl:h-5 text-amber-500 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-800 text-xs 2xl:text-sm 3xl:text-base">
                      {doc.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSimulateDocDownload(doc.name)}
                    className="text-[11px] 2xl:text-xs 3xl:text-sm text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3 2xl:w-4 2xl:h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Company Description */}
          {employer.description && (
            <div className="p-4 2xl:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 2xl:space-y-2">
              <h4 className="font-bold text-slate-900 text-xs 2xl:text-base 3xl:text-lg">Enterprise Summary</h4>
              <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-600 leading-relaxed">
                {employer.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer Administrative Action Controls */}
        <div className="p-4 sm:p-5 2xl:p-6 3xl:p-8 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => {
              if (window.confirm(`Permanently remove company record for ${employer.name}?`)) {
                onDelete(employer.id);
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
              Close
            </button>

            {employer.verificationStatus !== 'suspended' && (
              <button
                onClick={() => {
                  onSuspend(employer.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 2xl:gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 2xl:w-5 2xl:h-5" />
                <span>Reject / Suspend Entity</span>
              </button>
            )}

            {employer.verificationStatus !== 'verified' && (
              <button
                onClick={() => {
                  onVerify(employer.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 2xl:gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 2xl:w-5 2xl:h-5" />
                <span>Approve & Authorize Enterprise</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployerDossierModal;
