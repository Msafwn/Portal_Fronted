import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export const DEPARTMENT_SKILLS = {
  all: [
    { name: 'Python', dept: 'IT' },
    { name: 'React', dept: 'IT' },
    { name: 'Clinical Care', dept: 'Med' },
    { name: 'AutoCAD', dept: 'Eng' },
    { name: 'Financial Analysis', dept: 'Biz' },
  ],
  engineering: [
    { name: 'AutoCAD', dept: 'Eng' },
    { name: 'ETABS', dept: 'Eng' },
    { name: 'Structural Analysis', dept: 'Eng' },
    { name: 'SolidWorks', dept: 'Eng' },
    { name: 'MATLAB', dept: 'Eng' },
    { name: 'Project Estimation', dept: 'Eng' },
  ],
  medical: [
    { name: 'Patient Triage', dept: 'Med' },
    { name: 'Clinical Care', dept: 'Med' },
    { name: 'Emergency Medicine', dept: 'Med' },
    { name: 'Pharmacology', dept: 'Med' },
    { name: 'Diagnostics', dept: 'Med' },
    { name: 'ICU Protocols', dept: 'Med' },
  ],
  it: [
    { name: 'React', dept: 'IT' },
    { name: 'Node.js', dept: 'IT' },
    { name: 'Python', dept: 'IT' },
    { name: 'Machine Learning', dept: 'IT' },
    { name: 'TypeScript', dept: 'IT' },
    { name: 'SQL', dept: 'IT' },
  ],
  business: [
    { name: 'Financial Analysis', dept: 'Biz' },
    { name: 'Accounting', dept: 'Biz' },
    { name: 'Financial Modeling', dept: 'Biz' },
    { name: 'IFRS Reporting', dept: 'Biz' },
    { name: 'Project Management', dept: 'Biz' },
    { name: 'Marketing', dept: 'Biz' },
  ],
};

const resolveDeptKey = (deptStr) => {
  const lower = (deptStr || '').toLowerCase();
  if (lower.includes('medic') || lower.includes('health')) return 'medical';
  if (lower.includes('engin') || lower.includes('construct')) return 'engineering';
  if (lower.includes('busin') || lower.includes('financ')) return 'business';
  return 'it';
};

export const SkillPicker = ({
  skills = [],
  onAddSkill,
  onRemoveSkill,
  department = '',
  label = 'Professional Skills',
  maxSkills = 15,
  className = '',
}) => {
  const [customInput, setCustomInput] = useState('');

  const isMax = skills.length >= maxSkills;

  const addSkillString = (text) => {
    if (isMax) return;
    const rawTokens = text.split(/[,;\n]+/);
    let count = skills.length;
    rawTokens.forEach((token) => {
      const trimmed = token.trim();
      if (trimmed && !skills.includes(trimmed) && count < maxSkills) {
        onAddSkill(trimmed);
        count++;
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (customInput.trim() && !isMax) {
        addSkillString(customInput);
        setCustomInput('');
      }
    }
  };

  const handleManualAdd = () => {
    if (customInput.trim() && !isMax) {
      addSkillString(customInput);
      setCustomInput('');
    }
  };

  // Resolve department key from prop or default to IT
  const deptKey = resolveDeptKey(department);
  const currentList = DEPARTMENT_SKILLS[deptKey] || DEPARTMENT_SKILLS.it;
  const quickSuggestions = currentList.filter(
    (item) => !skills.includes(item.name)
  );

  return (
    <div className={`space-y-1.5 2xl:space-y-3 ${className}`}>
      {/* Label Row */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-[10px] 2xl:text-xs 3xl:text-sm font-semibold uppercase tracking-wider text-slate-600">
            {label}
          </label>
        )}
        <span
          className={`text-[9px] 2xl:text-xs 3xl:text-sm font-semibold transition-colors ${
            isMax ? 'text-amber-600' : 'text-slate-400'
          }`}
        >
          {skills.length}/{maxSkills} {isMax ? '(Max 15 reached)' : 'selected'}
        </span>
      </div>

      {/* Selected Skills Badges Area - ONLY rendered when skills exist */}
      {skills.length > 0 && (
        <div className="p-2 md:p-2.5 2xl:p-3 bg-slate-50/80 border border-slate-200 rounded-lg md:rounded-xl 2xl:rounded-xl max-h-20 md:max-h-24 2xl:max-h-32 overflow-y-auto flex flex-wrap gap-1.5 md:gap-2 2xl:gap-2 items-center">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 md:gap-1.5 2xl:gap-1.5 px-2 md:px-2.5 2xl:px-3 py-1 md:py-1 2xl:py-1 rounded-md md:rounded-lg 2xl:rounded-lg text-[11px] md:text-xs 2xl:text-xs 3xl:text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(skill)}
                className="hover:text-blue-900 transition-colors cursor-pointer p-0.5"
                aria-label={`Remove ${skill}`}
              >
                <X className="w-3 h-3 md:w-3.5 md:h-3.5 2xl:w-3.5 2xl:h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Text Input + Add Button (Single clean input row) */}
      <div className="flex items-center gap-2 md:gap-2.5 2xl:gap-2.5">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isMax}
          placeholder={
            isMax
              ? 'Maximum 15 skills reached'
              : 'Type skill & press Enter or click suggestions below...'
          }
          className={`flex-1 border rounded-lg md:rounded-xl 2xl:rounded-xl text-xs sm:text-sm md:text-sm 2xl:text-base 3xl:text-lg px-2.5 sm:px-3 md:px-3.5 2xl:px-4 py-2 sm:py-2.5 md:py-2.5 2xl:py-2.5 3xl:py-3.5 focus:outline-none transition-colors ${
            isMax
              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600'
          }`}
        />
        <button
          type="button"
          onClick={handleManualAdd}
          disabled={!customInput.trim() || isMax}
          className="px-3.5 sm:px-4 md:px-5 2xl:px-5 py-2 sm:py-2.5 md:py-2.5 2xl:py-2.5 3xl:py-3.5 text-xs sm:text-sm md:text-sm 2xl:text-base 3xl:text-lg font-semibold rounded-lg md:rounded-xl 2xl:rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          Add
        </button>
      </div>

      {/* Dynamic Department Skill Suggestions */}
      {quickSuggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 2xl:gap-2 pt-0.5 2xl:pt-1">
          <span className="text-[9px] 2xl:text-xs 3xl:text-sm font-semibold text-slate-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {quickSuggestions.slice(0, 5).map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => !isMax && onAddSkill(item.name)}
              disabled={isMax}
              className={`inline-flex items-center gap-0.5 2xl:gap-1 px-2 2xl:px-3 py-0.5 2xl:py-1 rounded 2xl:rounded-lg text-[10px] 2xl:text-xs 3xl:text-sm font-medium border border-slate-200 transition-colors shrink-0 ${
                isMax
                  ? 'opacity-40 cursor-not-allowed bg-slate-50 text-slate-400'
                  : 'bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 cursor-pointer'
              }`}
            >
              <Plus className="w-2.5 h-2.5 2xl:w-3.5 2xl:h-3.5 text-slate-400" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillPicker;
