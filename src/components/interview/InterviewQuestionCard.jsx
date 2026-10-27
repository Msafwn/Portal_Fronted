import React, { useState } from 'react';
import {
  HelpCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Target,
  Sparkles,
} from 'lucide-react';

const InterviewQuestionCard = ({ question, index, totalQuestions = 10 }) => {
  const [showHints, setShowHints] = useState(false);

  if (!question) return null;

  const typeColor =
    question.type === 'Technical'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : question.type === 'Behavioral'
      ? 'bg-purple-50 text-purple-700 border-purple-200'
      : 'bg-amber-50 text-amber-700 border-amber-200';

  const diffColor =
    question.difficulty === 'Hard'
      ? 'bg-rose-50 text-rose-700 border-rose-200'
      : 'bg-emerald-50 text-emerald-700 border-emerald-200';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-4">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-extrabold flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            Question {index + 1} of {totalQuestions}
          </span>
          <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${typeColor}`}>
            {question.type}
          </span>
          <span className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold border ${diffColor}`}>
            {question.difficulty}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowHints(!showHints)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{showHints ? 'Hide Hints' : 'Need a Hint?'}</span>
          {showHints ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Question Text */}
      <div className="pt-1">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Collapsible Hints & Guidelines */}
      {showHints && question.sampleHints && (
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-2 animate-fade-in">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>AI Advice: Key Concepts to Address</span>
          </div>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            {question.sampleHints}
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestionCard;
