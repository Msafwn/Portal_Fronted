import React from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const InterviewFeedbackCard = ({
  feedback,
  onNextQuestion,
  isLastQuestion = false,
  onFinishSession,
}) => {
  if (!feedback) return null;

  const { score = 5, verdict = 'Satisfactory', strengths = [], improvements = [], badgeColor } = feedback;

  const scorePercentage = score * 10;
  const strokeDashoffset = 251.2 - (251.2 * scorePercentage) / 100;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-[#071536] text-white rounded-3xl border border-blue-500/30 p-6 sm:p-7 shadow-xl shadow-blue-950/30 space-y-6 animate-fade-in">
      {/* Top Banner: Score Gauge + Verdict */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-5 border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* Radial Circular Score Gauge */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-white/10"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                className={score >= 8 ? 'stroke-emerald-400' : score >= 6 ? 'stroke-blue-400' : 'stroke-amber-400'}
                strokeWidth="5"
                strokeDasharray="175.9"
                strokeDashoffset={175.9 - (175.9 * scorePercentage) / 100}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base font-extrabold leading-none text-white">{score}</span>
              <span className="text-[9px] text-blue-200/60 leading-none">/10</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColor || 'bg-blue-500/20 text-blue-300'}`}>
                {verdict}
              </span>
              <span className="text-xs text-blue-300/70 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-300" /> AI Graded
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Performance Feedback on this Question
            </h3>
          </div>
        </div>

        {/* Next Question CTA */}
        <div className="w-full sm:w-auto">
          {isLastQuestion ? (
            <button
              type="button"
              onClick={onFinishSession}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Complete Interview & View Scorecard</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onNextQuestion}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Strengths & Improvements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2.5">
          <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            What You Did Well
          </h4>
          <ul className="space-y-1.5 text-xs text-emerald-100/90">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-400 text-sm leading-none mt-0.5">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2.5">
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            Areas to Strengthen
          </h4>
          <ul className="space-y-1.5 text-xs text-amber-100/90">
            {improvements.map((imp, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-amber-400 text-sm leading-none mt-0.5">•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterviewFeedbackCard;
