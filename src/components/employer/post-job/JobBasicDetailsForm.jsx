import React from 'react';
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  Banknote,
  Clock,
  FileText,
  GraduationCap,
} from 'lucide-react';

export const JobBasicDetailsForm = ({ formData, onChangeField }) => {
  const departmentGroups = [
    {
      group: '💻 Computer Science & IT',
      items: [
        'Computer Science & IT',
        'Software Engineering & AI',
        'Data Science & Analytics',
        'Cybersecurity & Networks',
      ],
    },
    {
      group: '🏥 Medical & Healthcare',
      items: [
        'Medical & Healthcare',
        'Pharmacy & Clinical Medicine',
        'Nursing & Patient Care',
        'Biomedical & Lab Sciences',
      ],
    },
    {
      group: '🏗️ Engineering & Construction',
      items: [
        'Civil & Structural Engineering',
        'Electrical & Embedded Systems',
        'Mechanical & Industrial Engineering',
        'Architecture & Urban Planning',
      ],
    },
    {
      group: '💼 Business & Finance',
      items: [
        'Business & Finance',
        'Accounting & Financial Modeling',
        'Marketing & Brand Strategy',
        'Human Resources & Talent Management',
      ],
    },
  ];

  const getDynamicTitlePlaceholder = (dept) => {
    const lower = (dept || '').toLowerCase();
    if (lower.includes('med') || lower.includes('health') || lower.includes('pharm')) {
      return 'e.g. Clinical Medical Officer / Pharmacist / Resident Doctor';
    }
    if (lower.includes('eng') || lower.includes('civil') || lower.includes('mech') || lower.includes('elect')) {
      return 'e.g. Structural Design Engineer / Site Engineer (AutoCAD & ETABS)';
    }
    if (lower.includes('business') || lower.includes('finance') || lower.includes('account')) {
      return 'e.g. Financial Analyst / Management Trainee / Accounts Associate';
    }
    return 'e.g. Associate Full Stack Engineer (React & FastAPI)';
  };

  const workModes = [
    { id: 'Onsite', label: 'Onsite', desc: 'At Office HQ' },
    { id: 'Hybrid', label: 'Hybrid', desc: 'Remote + Office' },
    { id: 'Remote', label: 'Remote', desc: '100% Work from Anywhere' },
  ];

  const employmentTypes = [
    { id: 'Full-Time', label: 'Full-Time', icon: Briefcase, desc: 'Standard (~40 hrs/wk)' },
    { id: 'Part-Time', label: 'Part-Time', icon: Clock, desc: 'Flexible (~20 hrs/wk)' },
    { id: 'Contract', label: 'Contract', icon: FileText, desc: 'Project-based / Fixed term' },
    { id: 'Internship', label: 'Internship', icon: GraduationCap, desc: 'Mentored training role' },
  ];

  const quickSalaries = [
    'PKR 60,000 - 90,000 / mo',
    'PKR 90,000 - 140,000 / mo',
    'PKR 150,000 - 250,000 / mo',
    'Competitive / Market Leading',
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl p-6 2xl:p-8 3xl:p-10 shadow-2xs space-y-5 2xl:space-y-7">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              2. Job Details & Work Arrangements
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Specify job title, department category, workspace mode, and compensation structure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Title */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Job Title / Designation</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => onChangeField('title', e.target.value)}
            placeholder={getDynamicTitlePlaceholder(formData.department)}
            className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>

        {/* Department Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>Department / Category</span>
            <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.department}
            onChange={(e) => onChangeField('department', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer font-medium"
          >
            {departmentGroups.map((grp) => (
              <optgroup key={grp.group} label={grp.group}>
                {grp.items.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Primary Location / City</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => onChangeField('location', e.target.value)}
            placeholder="e.g. Islamabad, PK (Blue Area HQ)"
            className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>

        {/* Work Mode Pills */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Work Mode / Flexibility <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {workModes.map((mode) => {
              const isSelected = formData.workMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onChangeField('workMode', mode.id)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white shadow-xs'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="text-xs font-bold">{mode.label}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {mode.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Employment Schedule / Type */}
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Employment Schedule / Type</span>
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">Shows Full-Time / Part-Time badge to candidates</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {employmentTypes.map((type) => {
              const isSelected = (formData.employmentType || 'Full-Time') === type.id;
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => onChangeField('employmentType', type.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-600 ring-1 ring-blue-600/30 text-blue-900 shadow-2xs'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold">{type.label}</span>
                  </div>
                  <div className={`text-[10px] ${isSelected ? 'text-blue-700 font-medium' : 'text-slate-500'}`}>
                    {type.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Salary Range */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5 text-emerald-600" />
              <span>Offered Compensation (PKR)</span>
            </label>
            <span className="text-[10px] text-slate-400">Publicly visible</span>
          </div>
          <input
            type="text"
            value={formData.salary}
            onChange={(e) => onChangeField('salary', e.target.value)}
            placeholder="e.g. PKR 90,000 - 140,000 / mo or Competitive"
            className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickSalaries.map((sal) => (
              <button
                key={sal}
                type="button"
                onClick={() => onChangeField('salary', sal)}
                className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                  formData.salary === sal
                    ? 'bg-blue-50 text-blue-700 border-blue-200 font-bold'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {sal}
              </button>
            ))}
          </div>
        </div>

        {/* Application Deadline */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Application Deadline Date</span>
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            required
            value={formData.deadline}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => onChangeField('deadline', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
          <p className="text-[10px] text-slate-500">
            System automatically unpublishes expired jobs after 11:59 PM PKT.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobBasicDetailsForm;
