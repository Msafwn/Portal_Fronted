import React, { useEffect, useState } from 'react';
import {
  Clock,
  CheckCircle2,
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
      ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
      : currentCategory === 'Behavioral'
      ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
      : 'bg-amber-500/15 text-amber-400 border-amber-500/30';

  return (
    <div className="bg-[#0b1f4c] text-white rounded-2xl border border-[#1e3a7a]/80 p-4 sm:p-5 shadow-xl shadow-blue-950/20 space-y-4">
      {/* Top Row: Role, Category & Live Timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-sm truncate max-w-xs sm:max-w-md">
            {roleTitle}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${categoryColor}`}>
            {currentCategory} Focus
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Timer */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 text-blue-200 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-cyan-300" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          {/* Quick Finish Button if at least 1 answered */}
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={onFinishSession}
              className="px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
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
                  ? 'bg-blue-600 text-white ring-2 ring-cyan-400 shadow-md shadow-blue-500/40 scale-105 z-10'
                  : isAnswered
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/50'
                  : 'bg-white/5 text-blue-200/60 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="leading-none">{idx + 1}</span>
              {isAnswered ? (
                <span className="text-[9px] font-semibold text-emerald-400 leading-none mt-0.5">
                  {score !== undefined ? `${score}p` : '✓'}
                </span>
              ) : (
                <span className="text-[8px] opacity-40 leading-none mt-0.5">
                  {q.type ? q.type[0] : 'Q'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Progress Bar & Navigation Hints */}
      <div className="flex items-center justify-between gap-3 text-xs pt-1 border-t border-white/10">
        <div className="flex items-center gap-2 text-blue-200/70">
          <span>Question {currentIndex + 1} of {questions.length || 10}</span>
          <span className="text-white/20">•</span>
          <span className="text-emerald-400 font-semibold">{answeredCount} Answered ({progressPercent}%)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-blue-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title="Previous question"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onSelectIndex(Math.min((questions.length || 10) - 1, currentIndex + 1))}
            disabled={currentIndex === (questions.length || 10) - 1}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-blue-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
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
