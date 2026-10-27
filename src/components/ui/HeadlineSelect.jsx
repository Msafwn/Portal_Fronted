import React from 'react';
import { Briefcase } from 'lucide-react';

export const POPULAR_HEADLINES = [
  'Full Stack Developer (MERN / MEAN)',
  'Frontend Developer (React / Next.js)',
  'Backend Developer (Node.js / Express)',
  'Mobile App Developer (Flutter / React Native)',
  'AI / Machine Learning Engineer',
  'Data Analyst / Data Scientist',
  'Software Quality Assurance (SQA)',
  'Cloud & DevOps Engineer',
  'UI/UX Designer',
  'Cybersecurity Analyst',
  'Other (Custom Role)',
];

export const HeadlineSelect = ({
  value = '',
  onChange,
  customValue = '',
  onCustomChange,
  label = 'Target Role',
  required = false,
  error,
  className = '',
}) => {
  const isCustom = value === 'Other (Custom Role)';

  return (
    <div className={`space-y-0.5 ${className}`}>
      {label && (
        <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
          <Briefcase className="w-3.5 h-3.5" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`w-full bg-white border rounded-lg text-xs text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 pl-8 pr-2.5 py-1.5 cursor-pointer ${
            error ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-300'
          }`}
        >
          <option value="">Select target role...</option>
          {POPULAR_HEADLINES.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>

      {isCustom && (
        <input
          type="text"
          value={customValue}
          onChange={(e) => onCustomChange && onCustomChange(e.target.value)}
          placeholder="Type your custom role title..."
          className="w-full mt-1 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
        />
      )}

      {error && (
        <p className="text-[10px] text-rose-500 font-medium leading-tight mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default HeadlineSelect;

