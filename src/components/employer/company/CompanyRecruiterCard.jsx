import React from 'react';
import { User, Mail, Phone, Briefcase } from 'lucide-react';

export const CompanyRecruiterCard = ({ recruiter = {}, onChangeRecruiter }) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl p-6 2xl:p-8 3xl:p-10 shadow-2xs space-y-5 2xl:space-y-7">
      <div className="border-b border-slate-100 pb-3 2xl:pb-4">
        <div className="flex items-center gap-2 2xl:gap-3">
          <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-blue-600" />
          <h2 className="text-base 2xl:text-xl 3xl:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <User className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
            <span>Lead Recruiter & Talent Partner Information</span>
          </h2>
        </div>
        <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1">
          Designated primary contact for university relations, candidate interviews, and offer communications.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 2xl:gap-6 p-4 2xl:p-6 rounded-xl 2xl:rounded-2xl bg-slate-50/70 border border-slate-200/60 mb-2">
        <img
          src={recruiter.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'}
          alt={recruiter.name}
          className="w-14 h-14 2xl:w-20 2xl:h-20 rounded-2xl 2xl:rounded-3xl object-cover border-2 border-white shadow-xs shrink-0"
        />
        <div>
          <div className="flex items-center gap-2 2xl:gap-3">
            <h3 className="text-base 2xl:text-xl 3xl:text-2xl font-bold text-slate-900">{recruiter.name}</h3>
            <span className="px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg text-[11px] 2xl:text-xs 3xl:text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Recruiter
            </span>
          </div>
          <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-600 mt-0.5">{recruiter.role}</p>
          <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-400 mt-0.5">{recruiter.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-6 text-xs sm:text-sm 2xl:text-base">
        {/* Recruiter Name */}
        <div className="space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span>Full Name</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={recruiter.name || ''}
            onChange={(e) => onChangeRecruiter('name', e.target.value)}
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>

        {/* Recruiter Role */}
        <div className="space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span>Designation / Role Title</span>
          </label>
          <input
            type="text"
            value={recruiter.role || ''}
            onChange={(e) => onChangeRecruiter('role', e.target.value)}
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>

        {/* Recruiter Email */}
        <div className="space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span>Work Email</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={recruiter.email || ''}
            onChange={(e) => onChangeRecruiter('email', e.target.value)}
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>

        {/* Recruiter Phone */}
        <div className="space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span>Direct Phone / Mobile</span>
          </label>
          <input
            type="tel"
            value={recruiter.phone || ''}
            onChange={(e) => onChangeRecruiter('phone', e.target.value)}
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyRecruiterCard;
