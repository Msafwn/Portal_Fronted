import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  PlusCircle,
  Users,
  Sparkles,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';

export const EmployerDashboardHero = () => {
  const { company, recruiter } = useEmployerPortal();

  return (
    <div className="p-6 2xl:p-9 3xl:p-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl 2xl:rounded-3xl relative overflow-hidden shadow-sm">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-0 right-0 w-80 2xl:w-[32rem] h-80 2xl:h-[32rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 2xl:gap-8">
        <div className="space-y-2 2xl:space-y-3.5 max-w-2xl 2xl:max-w-4xl">
          <div className="inline-flex items-center gap-1.5 2xl:gap-2 px-2.5 2xl:px-4 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-white/10 text-cyan-300 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-cyan-300" />
            <span>Enterprise Talent Suite{company?.industry ? ` • ${company.industry}` : ''}</span>
          </div>

          <h1 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-black text-white">
            Welcome, {recruiter?.name || 'Recruiter'}! 👋
          </h1>

          <p className="text-xs 2xl:text-base 3xl:text-lg text-cyan-200 font-medium">
            AI-Weighted Candidate Scoring (50-30-20), Private HR Seats Quota, & Multi-Tier Role Matching.
          </p>

          <p className="text-xs 2xl:text-base 3xl:text-lg text-blue-100 flex items-center gap-2 2xl:gap-3 flex-wrap pt-0.5">
            <span className="font-semibold text-white">{company?.name || 'Employer Portal'}</span>
            {company?.location && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 2xl:w-4 2xl:h-4 text-blue-300" /> {company.location}
                </span>
              </>
            )}
            {company?.verified && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 2xl:w-4 2xl:h-4 text-cyan-300" /> Verified Partner
                </span>
              </>
            )}
          </p>
        </div>

        {/* Banner Action Buttons */}
        <div className="flex items-center gap-2.5 2xl:gap-4 flex-wrap">
          <Link
            to="/employer/post-job"
            className="inline-flex items-center gap-1.5 2xl:gap-2 px-4 2xl:px-6 py-2.5 2xl:py-3.5 rounded-xl 2xl:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs 2xl:text-base font-bold shadow-md shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4 2xl:w-5 2xl:h-5" />
            <span>Post New Role</span>
          </Link>

          <Link
            to="/employer/applicants"
            className="inline-flex items-center gap-1.5 2xl:gap-2 px-4 2xl:px-6 py-2.5 2xl:py-3.5 rounded-xl 2xl:rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs 2xl:text-base font-bold shadow-sm transition-all"
          >
            <Users className="w-4 h-4 2xl:w-5 2xl:h-5 text-cyan-300" />
            <span>Review Applicants</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardHero;
