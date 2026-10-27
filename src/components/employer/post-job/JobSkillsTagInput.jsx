import React, { useState, useMemo, useEffect } from 'react';
import {
  Award,
  Plus,
  X,
  Sparkles,
  Layers,
  Clock,
} from 'lucide-react';

const DEPARTMENT_SKILL_CATEGORIES = [
  {
    id: 'cs',
    name: 'Computer Science & IT',
    shortName: '💻 CS & IT',
    matchKeywords: ['computer', 'software', 'it', 'cyber', 'data', 'web', 'ai', 'cloud', 'tech'],
    placeholder: 'Type a tech skill (e.g. React.js, Python, Docker, SQL, FastAPI) and press Enter...',
    skills: [
      'React.js',
      'Node.js',
      'TypeScript',
      'Python',
      'MongoDB',
      'PostgreSQL',
      'Tailwind CSS',
      'Docker',
      'FastAPI',
      'REST APIs',
      'Git & GitHub',
      'Next.js',
      'Machine Learning',
      'Cybersecurity',
      'AWS Cloud',
      'GraphQL',
    ],
  },
  {
    id: 'medical',
    name: 'Medical & Healthcare',
    shortName: '🏥 Medical & Health',
    matchKeywords: ['med', 'health', 'pharm', 'nurs', 'bio', 'clinic', 'doctor'],
    placeholder: 'Type a healthcare skill (e.g. Patient Care, Clinical Pharmacology, EHR, Triage) and press Enter...',
    skills: [
      'Clinical Pharmacology',
      'Patient Diagnostics',
      'EHR/EMR Systems',
      'Patient Care',
      'Pharmacovigilance',
      'Emergency Triage',
      'ICU Protocols',
      'Medical Terminology',
      'Drug Safety & Audits',
      'HL7 Standards',
      'Biostatistics',
      'Infection Control',
      'Vital Signs Monitoring',
      'Medical Ethics',
      'Prescription Review',
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering & Construction',
    shortName: '🏗️ Engineering',
    matchKeywords: ['eng', 'civil', 'mech', 'elect', 'arch', 'struct', 'construct'],
    placeholder: 'Type an engineering skill (e.g. AutoCAD, ETABS, SolidWorks, MATLAB, BIM) and press Enter...',
    skills: [
      'AutoCAD',
      'Structural Analysis',
      'ETABS',
      'Revit / BIM',
      'Civil 3D',
      'MATLAB / Simulink',
      'SolidWorks',
      'PLC Programming',
      'Circuit Design',
      'Site Supervision',
      'Bill of Quantities (BOQ)',
      'Primavera P6',
      'Project Scheduling',
      'HVAC Systems',
      'Quality Control (QC)',
    ],
  },
  {
    id: 'business',
    name: 'Business & Finance',
    shortName: '💼 Business & Finance',
    matchKeywords: ['bus', 'fin', 'acc', 'mkt', 'market', 'hr', 'human', 'talent', 'corp', 'sales'],
    placeholder: 'Type a business skill (e.g. Financial Modeling, QuickBooks, SEO, Talent Acquisition) and press Enter...',
    skills: [
      'Financial Modeling',
      'Advanced Excel',
      'QuickBooks',
      'Audit & Taxation',
      'SEO / SEM',
      'Google Analytics',
      'Digital Marketing',
      'Talent Acquisition',
      'HR Policies & Compliance',
      'Payroll Management',
      'Budget Forecasting',
      'SAP ERP',
      'Market Research',
      'Content Strategy',
      'Risk Management',
    ],
  },
  {
    id: 'core',
    name: 'Core & Leadership',
    shortName: '🌟 Core & Leadership',
    matchKeywords: ['general', 'all', 'core', 'soft'],
    placeholder: 'Type a professional competency (e.g. Leadership, Agile, Communication) and press Enter...',
    skills: [
      'Problem Solving',
      'Team Leadership',
      'Communication',
      'Analytical Thinking',
      'Agile / Scrum',
      'Project Management',
      'Client Management',
      'Critical Thinking',
      'Conflict Resolution',
      'Technical Documentation',
    ],
  },
];

export const JobSkillsTagInput = ({
  skills,
  onAddSkill,
  onRemoveSkill,
  experienceRequired,
  onChangeExperience,
  department = '',
  targetRole = 'fresh_graduate',
}) => {
  const [skillInput, setSkillInput] = useState('');

  // Helper to find matching category by department string
  const getMatchingCategoryId = (deptName) => {
    const lower = (deptName || '').toLowerCase();
    for (const cat of DEPARTMENT_SKILL_CATEGORIES) {
      if (cat.id === 'core') continue;
      if (cat.matchKeywords.some((keyword) => lower.includes(keyword))) {
        return cat.id;
      }
    }
    return 'cs';
  };

  const [activeCategory, setActiveCategory] = useState(() => getMatchingCategoryId(department));

  // Sync category if department changes in step 2
  useEffect(() => {
    if (department) {
      setActiveCategory(getMatchingCategoryId(department));
    }
  }, [department]);

  const currentCategory = useMemo(() => {
    return DEPARTMENT_SKILL_CATEGORIES.find((c) => c.id === activeCategory) || DEPARTMENT_SKILL_CATEGORIES[0];
  }, [activeCategory]);

  const availableSuggestions = useMemo(() => {
    return (currentCategory?.skills || []).filter(
      (s) => !skills.some((existing) => existing.toLowerCase() === s.toLowerCase())
    );
  }, [currentCategory, skills]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAdd = () => {
    const trimmed = skillInput.trim().replace(/^,+|,+$/g, '');
    if (!trimmed) return;
    if (!skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      onAddSkill(trimmed);
    }
    setSkillInput('');
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl p-6 2xl:p-8 3xl:p-10 shadow-2xs space-y-5 2xl:space-y-7">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>4. Required Skills & Competencies Baseline</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            These keywords power the AI Semantic Match Engine to rank candidate resumes.
          </p>
        </div>
      </div>

      {/* Experience Required Dropdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Minimum Professional Experience Required</span>
          <span className="text-rose-500">*</span>
        </label>
        <select
          value={experienceRequired}
          onChange={(e) => onChangeExperience(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
        >
          <option value="0">0 Years (Fresh Graduate / Student / Internship)</option>
          <option value="1">1 Year (Junior / Entry-Level)</option>
          <option value="2">2 Years (Mid-Junior)</option>
          <option value="3">3 - 5 Years (Mid-Senior Specialist)</option>
          <option value="5+">5+ Years (Senior / Lead / Specialist)</option>
        </select>
      </div>

      {/* Skills Chip Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Target Required Skills & Domain Keywords</span>
            <span className="text-rose-500">*</span>
          </label>
          <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/80">
            {skills.length} skills added
          </span>
        </div>

        {/* Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={currentCategory.placeholder}
            className="flex-1 px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Active Skills Chips */}
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-2xs group transition-all"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => onRemoveSkill(skill)}
                  className="text-blue-400 hover:text-rose-600 transition-colors cursor-pointer"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
            No skills added yet. Add at least 3 skills to trigger AI resume matching.
          </div>
        )}

        {/* Recommended Suggestions by Department */}
        <div className="pt-2 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Recommended Skills by Department (Click to add):</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Category: <strong className="text-slate-800">{currentCategory.name}</strong>
            </span>
          </div>

          {/* Department Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-wrap">
            {DEPARTMENT_SKILL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-bold'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  <span>{cat.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Available Skills Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {availableSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onAddSkill(suggestion)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100/90 text-slate-700 border border-slate-200/90 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all flex items-center gap-1 cursor-pointer font-medium active:scale-95 shadow-2xs"
              >
                <Plus className="w-3 h-3 text-blue-500 shrink-0" />
                <span>{suggestion}</span>
              </button>
            ))}
            {availableSuggestions.length === 0 && (
              <span className="text-xs text-slate-400 italic py-1">
                All recommended skills from {currentCategory.name} have been added!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSkillsTagInput;
