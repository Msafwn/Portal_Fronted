import React, { useState } from 'react';
import {
  FileText,
  ListChecks,
  Gift,
  Wand2,
  CheckCircle,
  Plus,
  X,
  Sparkles,
} from 'lucide-react';

export const JobDescriptionEditor = ({
  overview,
  onChangeOverview,
  responsibilities,
  onAddResponsibility,
  onRemoveResponsibility,
  qualifications,
  onChangeQualifications,
  perks,
  onTogglePerk,
  onAutofillTemplate,
  department = '',
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newRespInput, setNewRespInput] = useState('');

  const getPlaceholders = () => {
    const dept = (department || '').toLowerCase();
    if (dept.includes('med') || dept.includes('health') || dept.includes('pharm')) {
      return {
        overview: 'Introduce the medical/clinical mission of this role, patient care standards, hospital department dynamics, and healthcare objectives...',
        responsibility: 'e.g. Conduct clinical patient rounds, verify medication protocols, and maintain electronic health records (EHR)...',
        qualifications: 'e.g. MBBS, Pharm.D, BDS, or Nursing degree with active PMC / PMDC / Pharmacy Council licensing...',
      };
    }
    if (dept.includes('eng') || dept.includes('civil') || dept.includes('mech') || dept.includes('elect')) {
      return {
        overview: 'Introduce the engineering scope of this role, project objectives, computational modeling or site requirements, and team goals...',
        responsibility: 'e.g. Produce CAD / BIM structural calculations, inspect site construction execution, and enforce safety standards...',
        qualifications: 'e.g. B.E. / B.Tech in Civil, Mechanical, or Electrical Engineering with active PEC registration...',
      };
    }
    if (dept.includes('bus') || dept.includes('fin') || dept.includes('acc') || dept.includes('mkt')) {
      return {
        overview: 'Introduce the strategic business mission of this role, financial/market growth objectives, and team collaboration goals...',
        responsibility: 'e.g. Build dynamic financial models, analyze quarterly budget variances, and formulate management KPI reports...',
        qualifications: 'e.g. BBA, MBA, ACCA, or CA qualification with strong analytical financial modeling background...',
      };
    }
    return {
      overview: 'Introduce the mission of this role, how the individual fits into the team, key domain objectives, and what makes your company culture unique...',
      responsibility: 'e.g. Design, implement, and maintain core deliverables and collaborate with cross-functional team members...',
      qualifications: 'e.g. Bachelor’s degree in relevant discipline, or demonstrable practical project experience...',
    };
  };

  const placeholders = getPlaceholders();

  const standardPerksList = [
    'Flexible Hybrid / Remote Schedule',
    'Comprehensive Health & OPD Insurance',
    'Annual Performance Bonus & Appraisal',
    'Paid Certifications & Professional Upskilling',
    'Company Equipment & Hardware Allowance',
    'Gym & Wellness Reimbursement',
    'Provident Fund / EOBI Coverage',
    'Subsidized Catered Lunches',
  ];

  const handleAddResponsibility = () => {
    if (!newRespInput.trim()) return;
    onAddResponsibility(newRespInput.trim());
    setNewRespInput('');
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl p-6 2xl:p-8 3xl:p-10 shadow-2xs space-y-5 2xl:space-y-7">
      {/* Top Header with Template Button */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="truncate">5. Detailed Job Description & Requirements</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            Organize role summary, daily responsibilities, and company incentives.
          </p>
        </div>

        {/* Quick Insert Template Button */}
        <button
          type="button"
          onClick={onAutofillTemplate}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap shadow-2xs active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="whitespace-nowrap">AI Auto-Generate</span>
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 gap-1.5 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold -mb-px border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-700 bg-blue-50/60 rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-t-lg'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Job Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('responsibilities')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold -mb-px border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'responsibilities'
              ? 'border-blue-600 text-blue-700 bg-blue-50/60 rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-t-lg'
          }`}
        >
          <ListChecks className="w-3.5 h-3.5" />
          <span>Key Responsibilities ({responsibilities.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('qualifications')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold -mb-px border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'qualifications'
              ? 'border-blue-600 text-blue-700 bg-blue-50/60 rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-t-lg'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Qualifications & Perks</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">
              Role Summary & Mission Statement <span className="text-rose-500">*</span>
            </label>
            <span className="text-[10px] text-slate-400">
              {overview.length} characters
            </span>
          </div>
          <textarea
            rows="5"
            value={overview}
            onChange={(e) => onChangeOverview(e.target.value)}
            placeholder={placeholders.overview}
            className="w-full p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all leading-relaxed"
          />
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              Tip: High-clarity job summaries receive up to <strong>40% higher match accuracy</strong> from the AI engine.
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Key Responsibilities */}
      {activeTab === 'responsibilities' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Add Key Responsibility Bullet
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newRespInput}
                onChange={(e) => setNewRespInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddResponsibility();
                  }
                }}
                placeholder={placeholders.responsibility}
                className="flex-1 px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
              <button
                type="button"
                onClick={handleAddResponsibility}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          {/* List of Responsibilities */}
          {responsibilities.length > 0 ? (
            <div className="space-y-2 pt-1">
              {responsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-800 group"
                >
                  <div className="flex items-start gap-2.5 flex-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span className="leading-relaxed">{resp}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveResponsibility(idx)}
                    className="text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
              No responsibilities added yet. Click "Auto-fill Standard Template" to load recommended items.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Qualifications & Perks */}
      {activeTab === 'qualifications' && (
        <div className="space-y-5">
          {/* Qualifications text */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Minimum Educational & Degree Qualifications
            </label>
            <textarea
              rows="3"
              value={qualifications}
              onChange={(e) => onChangeQualifications(e.target.value)}
              placeholder={placeholders.qualifications}
              className="w-full p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all leading-relaxed"
            />
          </div>

          {/* Perks & Benefits Checklist */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Included Perks & Compensation Benefits</span>
              <span className="text-[10px] text-slate-400 font-medium">
                {perks.length} benefits selected
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {standardPerksList.map((perk) => {
                const isChecked = perks.includes(perk);
                return (
                  <button
                    key={perk}
                    type="button"
                    onClick={() => onTogglePerk(perk)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold shadow-2xs'
                        : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      <CheckCircle className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{perk}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionEditor;
