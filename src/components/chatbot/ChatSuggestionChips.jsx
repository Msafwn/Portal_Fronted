import React from 'react';
import { Sparkles, Briefcase, Compass, ShieldAlert, FileText } from 'lucide-react';

export const CHAT_SUGGESTIONS = [
  {
    id: 'sug-jobs',
    icon: Briefcase,
    label: 'Top Matching Jobs',
    prompt: 'Recommend top matching job vacancies for my current skills.',
    color: 'hover:border-blue-300 hover:bg-blue-50/60 text-blue-700',
  },
  {
    id: 'sug-roadmap',
    icon: Compass,
    label: '30-Day Learning Roadmap',
    prompt: 'Generate a structured 30-day learning roadmap for Full-Stack Developer.',
    color: 'hover:border-indigo-300 hover:bg-indigo-50/60 text-indigo-700',
  },
  {
    id: 'sug-interview',
    icon: Sparkles,
    label: 'Mock Interview Prep',
    prompt: 'Give me 3 technical interview screening questions for my target role.',
    color: 'hover:border-emerald-300 hover:bg-emerald-50/60 text-emerald-700',
  },
  {
    id: 'sug-skills',
    icon: FileText,
    label: 'Skill Gap & ATS Audit',
    prompt: 'Analyze my skill gaps and tell me how to optimize my candidate profile for higher ATS match score.',
    color: 'hover:border-purple-300 hover:bg-purple-50/60 text-purple-700',
  },
];

export const ChatSuggestionChips = ({ onSelectPrompt, disabled }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full min-w-0">
      {CHAT_SUGGESTIONS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPrompt(item.prompt)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 shadow-2xs transition-all whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${item.color}`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ChatSuggestionChips;
