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
  label = 'Key Skills (Optional)',
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

  const deptKey = resolveDeptKey(department);
  const currentList = DEPARTMENT_SKILLS[deptKey] || DEPARTMENT_SKILLS.it;
  const quickSuggestions = currentList.filter(
    (item) => !skills.includes(item.name)
  );

  return (
    <div className={`space-y-0.5 ${className}`}>
      {/* Label Row */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-[10px] 2xl:text-xs font-semibold uppercase tracking-wider text-slate-600 mb-0.5">
            {label}
          </label>
        )}
        <span
          className={`text-[9px] 2xl:text-xs font-medium transition-colors ${
            isMax ? 'text-amber-600 font-bold' : 'text-slate-400'
          }`}
        >
          {skills.length}/{maxSkills}
        </span>
      </div>

      {/* Input + Add Button */}
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isMax}
          placeholder={isMax ? 'Max reached' : 'Type skill & press Enter'}
          className="w-full bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 px-2.5 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
        />
        <button
          type="button"
          onClick={handleManualAdd}
          disabled={!customInput.trim() || isMax}
          className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-colors shrink-0 cursor-pointer shadow-2xs"
        >
          Add
        </button>
      </div>

      {/* Selected Skills Chips */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1 max-h-12 overflow-y-auto pt-0.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(skill)}
                className="hover:text-blue-900 cursor-pointer transition-colors"
                aria-label={`Remove ${skill}`}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Quick Suggestions (Compact chips) */}
      {skills.length < 3 && quickSuggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 pt-0.5">
          <span className="text-[9px] text-slate-400 font-semibold uppercase shrink-0">
            Add:
          </span>
          {quickSuggestions.slice(0, 3).map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => !isMax && onAddSkill(item.name)}
              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 border border-slate-200 cursor-pointer transition-colors shrink-0"
            >
              +{item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillPicker;
