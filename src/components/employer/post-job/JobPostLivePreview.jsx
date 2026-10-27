import React, { useState } from 'react';
import {
  Eye,
  Lock,
  Building2,
  MapPin,
  Banknote,
  Calendar,
  Briefcase,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const JobPostLivePreview = ({
  jobData,
  companyName = 'TechLogix Global Solutions',
  companyLogo = 'TL',
  companyLocation = 'Islamabad HQ, Pakistan',
}) => {
  const [previewTab, setPreviewTab] = useState('candidate'); // 'candidate' | 'recruiter'

  const roleLabels = {
    student: '🎓 Student / Internship',
    fresh_graduate: '🚀 Fresh Graduate / Entry-Level',
    experienced: '💼 Experienced Professional',
  };

  const roleBadges = {
    student: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    fresh_graduate: 'bg-blue-50 text-blue-700 border-blue-200',
    experienced: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const formatDeadline = (dateStr) => {
    if (!dateStr) return 'Nov 15, 2026';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (months[monthIndex] && !isNaN(day)) {
          return `${months[monthIndex]} ${day}, ${year}`;
        }
      }
    } catch {
      // fallback
    }
    return dateStr;
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl shadow-sm overflow-hidden sticky top-6">
      {/* Top Bar with Live Preview Tabs */}
      <div className="p-3.5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Live Preview Monitor
          </span>
        </div>

        {/* Tab Switcher: Public vs Recruiter */}
        <div className="flex bg-slate-200/70 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setPreviewTab('candidate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              previewTab === 'candidate'
                ? 'bg-blue-600 text-white shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Candidate View</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewTab('recruiter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              previewTab === 'recruiter'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Recruiter View</span>
          </button>
        </div>
      </div>

      {/* Preview Content Area */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* ================= Candidate Public View ================= */}
        {previewTab === 'candidate' && (
          <div className="space-y-4">
            {/* Candidate Transparency Guarantee */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Candidate public card experience</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Quota Protected (100% Hidden)
              </span>
            </div>

            {/* Candidate Job Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3.5">
              {/* Header: Logo, Badges, Title & Company */}
              <div className="space-y-2.5">
                {/* Row 1: Logo & Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-xs shrink-0">
                    {companyLogo}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Actively Hiring
                    </span>
                    {roleLabels[jobData.targetRole] && (
                      <span
                        className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md border shrink-0 ${
                          roleBadges[jobData.targetRole] || 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {roleLabels[jobData.targetRole]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Title & Company - 100% Full Width (Never squished) */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {jobData.title || 'Associate Full Stack Engineer'}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600 flex-wrap">
                    <span className="font-semibold text-slate-800">
                      {companyName}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 font-medium">
                      {jobData.department || 'Engineering'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Meta Row: Wrap layout with full values visible, no truncation */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-700">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{jobData.location || companyLocation}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-medium">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{jobData.workMode || 'Hybrid'}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-50/90 border border-indigo-200 text-indigo-800 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{jobData.employmentType || 'Full-Time'}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-800 font-bold">
                  <Banknote className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{jobData.salary || 'Competitive'}</span>
                </div>
              </div>

              {/* Overview snippet */}
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200">
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {jobData.overview ||
                    'Provide a compelling overview of this role to attract high-caliber candidates through the AI recommendation feed...'}
                </p>
              </div>

              {/* Required Skills Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 block">
                  Required Match Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(jobData.skills || []).length > 0 ? (
                    jobData.skills.map((s) => (
                      <span
                        key={s}
                        className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No skills listed yet</span>
                  )}
                </div>
              </div>

              {/* Action Button Mock */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 flex items-center gap-1.5 whitespace-nowrap shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    Apply before:{' '}
                    <strong className="text-slate-700 font-semibold">
                      {formatDeadline(jobData.deadline)}
                    </strong>
                  </span>
                </span>

                <button
                  type="button"
                  disabled
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs opacity-90 cursor-default whitespace-nowrap shrink-0"
                >
                  <Send className="w-3 h-3" />
                  <span>Apply with AI</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= Recruiter Internal View ================= */}
        {previewTab === 'recruiter' && (
          <div className="space-y-4">
            {/* Recruiter Header Notice */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-900">
                  Internal HR Command & Tracking View
                </div>
                <div className="text-[11px] text-amber-800">
                  Includes confidential capacity headcount, matching pipeline configuration, and quota controls.
                </div>
              </div>
            </div>

            {/* Recruiter Dashboard Card */}
            <div className="p-5 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-4 relative overflow-hidden">
              {/* Title & Quota Badge */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] text-amber-700 font-mono uppercase font-bold tracking-wider mb-1">
                    INTERNAL REQ #{(jobData.title || 'ROLE').substring(0, 4).toUpperCase()}-2026
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {jobData.title || 'Untitled Role'}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {jobData.department} • {jobData.location || companyLocation}
                  </div>
                </div>

                {/* Prominent Private HR Indicator */}
                <div className="bg-amber-50 text-amber-800 border border-amber-200/90 font-semibold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 shadow-2xs shrink-0">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  <span>Total Seats: {jobData.totalSeats || 1}</span>
                </div>
              </div>

              {/* Internal Metrics Breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">
                    Headcount Quota
                  </div>
                  <div className="text-lg font-extrabold text-amber-800 mt-0.5 flex items-baseline gap-1">
                    <span>{jobData.totalSeats || 1}</span>
                    <span className="text-[11px] font-normal text-slate-500">Open Vacancies</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Hidden from public feed
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">
                    Role Match Engine
                  </div>
                  <div className="text-xs font-bold text-blue-700 mt-1">
                    {roleLabels[jobData.targetRole]}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Exp: {jobData.experienceRequired || '0'} yrs baseline
                  </div>
                </div>
              </div>

              {/* Internal Responsibilities Checklist Preview */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-700 block">
                  Responsibilities Checklist ({jobData.responsibilities?.length || 0}):
                </span>
                <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                  {(jobData.responsibilities || []).length > 0 ? (
                    jobData.responsibilities.map((r, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span className="line-clamp-1">{r}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-400 italic">No responsibilities added</div>
                  )}
                </div>
              </div>

              {/* Recruiter Ownership Footnote */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Status: Ready for Instant Publishing</span>
                </span>
                <span className="text-amber-700 font-mono text-[10px] font-bold">
                  CONFIDENTIAL HR METRICS
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostLivePreview;
