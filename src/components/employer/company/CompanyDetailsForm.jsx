import React from 'react';
import { Building2, Globe, MapPin, AlignLeft, Layers } from 'lucide-react';

export const CompanyDetailsForm = ({ formData, onChangeField }) => {
  const industries = [
    'Enterprise AI & Cloud Engineering',
    'Computer Software & Mobile Apps',
    'Medical & Healthcare Services',
    'Hospital & Clinical Medicine',
    'Civil Infrastructure & Construction',
    'Electrical & Industrial Engineering',
    'Banking, Financial Services & FinTech',
    'Business Management & Strategy Consulting',
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl p-6 2xl:p-8 3xl:p-10 shadow-2xs space-y-5 2xl:space-y-7">
      <div className="border-b border-slate-100 pb-3 2xl:pb-4">
        <div className="flex items-center gap-2 2xl:gap-3">
          <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-blue-600" />
          <h2 className="text-base 2xl:text-xl 3xl:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" />
            <span>Company Identity & Public Information</span>
          </h2>
        </div>
        <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1">
          This information is displayed publicly on job vacancy cards and candidate match previews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-6 text-xs sm:text-sm 2xl:text-base">
        {/* Company Name */}
        <div className="space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <span>Company Name</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name || ''}
            onChange={(e) => onChangeField('name', e.target.value)}
            placeholder="e.g. Acme Technologies"
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>

        {/* Industry / Sector */}
        <div className="space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span>Primary Industry / Sector</span>
            <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.industry || ''}
            onChange={(e) => onChangeField('industry', e.target.value)}
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer font-medium"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Tagline */}
        <div className="md:col-span-2 space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <AlignLeft className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span>One-line Elevator Pitch / Tagline</span>
          </label>
          <input
            type="text"
            value={formData.tagline || ''}
            onChange={(e) => onChangeField('tagline', e.target.value)}
            placeholder="e.g. Building next-generation intelligent platforms for global scale"
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span>Headquarters Location & Workplace Mode</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.location || ''}
            onChange={(e) => onChangeField('location', e.target.value)}
            placeholder="e.g. Islamabad, Pakistan (Hybrid / Global)"
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>

        {/* Website */}
        <div className="space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span>Corporate Website</span>
          </label>
          <input
            type="url"
            value={formData.website || ''}
            onChange={(e) => onChangeField('website', e.target.value)}
            placeholder="https://yourcompany.com"
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>

        {/* Company About */}
        <div className="md:col-span-2 space-y-1.5 2xl:space-y-2">
          <label className="font-semibold text-slate-700 flex items-center justify-between">
            <span>About the Organization & Engineering Culture</span>
            <span className="text-slate-400 text-[11px] 2xl:text-xs font-normal">Markdown supported</span>
          </label>
          <textarea
            rows={4}
            value={formData.about || ''}
            onChange={(e) => onChangeField('about', e.target.value)}
            placeholder="Introduce your company missions, product lines, tech stack, and values to prospective graduates..."
            className="w-full px-3.5 py-2.5 2xl:px-4 2xl:py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsForm;
