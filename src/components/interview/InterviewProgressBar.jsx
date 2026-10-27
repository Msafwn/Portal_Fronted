import React, { useEffect, useState } from 'react';
import {
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

const InterviewProgressBar = ({
  questions = [],
  currentIndex = 0,
  onSelectIndex,
  answers = {},
  onFinishSession,
  roleTitle,
}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k]?.submitted
  ).length;
  const progressPercent = Math.round((answeredCount / (questions.length || 10)) * 100);

  const currentQ = questions[currentIndex] || {};
  const currentCategory = currentQ.type || 'Technical';

  const categoryColor =
    currentCategory === 'Technical'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : currentCategory === 'Behavioral'
      ? 'bg-purple-50 text-purple-700 border-purple-200'
      : 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs space-y-3">
      {/* Top Row: Role, Category & Live Timer */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-bold text-slate-900 text-xs sm:text-sm truncate max-w-xs sm:max-w-md">
            {roleTitle}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${categoryColor}`}>
            {currentCategory} Focus
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Live Timer */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          {/* Quick Finish Button if at least 1 answered */}
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={onFinishSession}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Scorecard ({answeredCount}/10)</span>
            </button>
          )}
        </div>
      </div>

      {/* Question 1-10 Step Buttons */}
      <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
        {questions.map((q, idx) => {
          const isAnswered = !!answers[q.id]?.submitted;
          const isCurrent = idx === currentIndex;
          const score = answers[q.id]?.score;

          return (
            <button
              key={q.id || idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              title={`Question ${idx + 1}: ${q.type} (${isAnswered ? `Score: ${score}/10` : 'Unanswered'})`}
              className={`h-9 sm:h-10 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition-all duration-150 cursor-pointer relative overflow-hidden ${
                isCurrent
                  ? 'bg-blue-600 text-white ring-2 ring-blue-500/40 shadow-sm z-10'
                  : isAnswered
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100/80'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span className={`leading-none text-xs sm:text-sm font-bold ${
                isCurrent ? 'text-white' : isAnswered ? 'text-emerald-900' : 'text-slate-800'
              }`}>
                {idx + 1}
              </span>
              {isAnswered ? (
                <span className="text-[9px] font-bold text-emerald-600 leading-none mt-0.5">
                  {score !== undefined ? `${score}p` : '✓'}
                </span>
              ) : (
                <span className={`text-[9px] font-semibold leading-none mt-0.5 uppercase ${
                  isCurrent ? 'text-blue-100' : 'text-slate-400'
                }`}>
                  {q.type ? q.type[0] : 'Q'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Progress Bar & Navigation Hints */}
      <div className="flex items-center justify-between gap-2 text-xs pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <span>Question {currentIndex + 1} of {questions.length || 10}</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-600 font-semibold">{answeredCount} Answered ({progressPercent}%)</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
            title="Previous question"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onSelectIndex(Math.min((questions.length || 10) - 1, currentIndex + 1))}
            disabled={currentIndex === (questions.length || 10) - 1}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
            title="Next question"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewProgressBar;
