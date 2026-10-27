import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, ChevronRight, Globe, MapPin } from 'lucide-react';

export const CompanyProfileHeader = ({ company = {} }) => {
  return (
    <div className="bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs space-y-4 2xl:space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm 3xl:text-base text-slate-500 font-medium">
        <Link
          to="/employer/dashboard"
          className="hover:text-blue-600 transition-colors"
        >
          Employer Portal
        </Link>
        <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
        <span className="text-slate-800 font-semibold">Company Profile & Branding</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 2xl:gap-6 pt-1">
        <div className="flex items-start sm:items-center gap-4 2xl:gap-6">
          {/* Company Logo Badge */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 rounded-2xl 2xl:rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 border-2 border-white">
            {company.logoInitials || 'TL'}
          </div>

          <div>
            <div className="flex items-center gap-2 2xl:gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-slate-900 tracking-tight">
                {company.name || 'Company Profile'}
              </h1>
              {company.verified && (
                <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-600" />
                  Verified Employer
                </span>
              )}
              <span className="px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {company.tier || 'Enterprise Partner'}
              </span>
            </div>

            <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-slate-500 mt-1 2xl:mt-1.5">
              {company.tagline || 'Building next-generation intelligent platforms for global scale'}
            </p>

            <div className="flex items-center gap-4 2xl:gap-6 text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-2 2xl:mt-3 flex-wrap">
              <span className="flex items-center gap-1 text-slate-600">
                <Building2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                {company.industry || 'Multi-Discipline Employer'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                {company.location || 'Islamabad, Pakistan'}
              </span>
              {company.website && (
                <>
                  <span>•</span>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline font-medium"
                  >
                    <Globe className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                    <span>Website</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileHeader;
