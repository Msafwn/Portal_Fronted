import React from 'react';
import {
  Award,
  Trophy,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Home,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InterviewSummaryScorecard = ({
  role,
  questions = [],
  answers = {},
  onRetake,
  onChangeRole,
}) => {
  // Compute total and category scores
  let totalScore = 0;
  let answeredCount = 0;
  let technicalTotal = 0;
  let technicalPossible = 0;
  let behavioralTotal = 0;
  let behavioralPossible = 0;
  let situationalTotal = 0;
  let situationalPossible = 0;

  questions.forEach((q) => {
    const qAns = answers[q.id];
    const score = qAns?.score || 0;
    if (qAns?.submitted) {
      answeredCount++;
      totalScore += score;
    }

    if (q.type === 'Technical') {
      technicalPossible += 10;
      if (qAns?.submitted) technicalTotal += score;
    } else if (q.type === 'Behavioral') {
      behavioralPossible += 10;
      if (qAns?.submitted) behavioralTotal += score;
    } else {
      situationalPossible += 10;
      if (qAns?.submitted) situationalTotal += score;
    }
  });

  const maxScore = questions.length * 10;
  const scorePercent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  let grade = 'B';
  let readiness = 'Competitive Candidate';
  let badgeTheme = 'bg-blue-500/20 text-blue-300 border-blue-500/30';

  if (scorePercent >= 85) {
    grade = 'A+';
    readiness = 'Exceeds High Bar (Ready for Senior Tech Round)';
    badgeTheme = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  } else if (scorePercent >= 75) {
    grade = 'A';
    readiness = 'Solid Candidate (Strong Foundation)';
    badgeTheme = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
  } else if (scorePercent >= 60) {
    grade = 'B+';
    readiness = 'Promising (Needs Technical Polish)';
    badgeTheme = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  } else {
    grade = 'C';
    readiness = 'Further Preparation Recommended';
    badgeTheme = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      {/* Grand Hero Score Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2152] via-[#091b42] to-[#06122d] border border-blue-500/30 p-6 sm:p-8 md:p-10 text-white shadow-2xl shadow-blue-950/40">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 -mb-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Interview Session Scorecard</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Mock Interview Assessment
            </h1>

            <p className="text-sm text-blue-200/80 max-w-lg">
              Target Role: <strong className="text-white">{role?.title}</strong> ({answeredCount} of {questions.length} questions completed).
            </p>

            <div className="pt-2">
              <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold border ${badgeTheme}`}>
                {readiness}
              </span>
            </div>
          </div>

          {/* Radial Total Score Badge */}
          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md min-w-[180px]">
            <span className="text-xs uppercase tracking-wider text-blue-300 font-bold mb-1">
              Overall Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">{totalScore}</span>
              <span className="text-lg font-bold text-blue-300/70">/{maxScore}</span>
            </div>
            <div className="mt-2 text-xs font-extrabold px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Grade {grade} ({scorePercent}%)
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Technical */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Technical</span>
            <span className="text-xs font-bold text-slate-400">5 Questions</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {technicalTotal} <span className="text-xs font-semibold text-slate-400">/{technicalPossible || 50} pts</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${technicalPossible > 0 ? (technicalTotal / technicalPossible) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Behavioral */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Behavioral</span>
            <span className="text-xs font-bold text-slate-400">3 Questions</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {behavioralTotal} <span className="text-xs font-semibold text-slate-400">/{behavioralPossible || 30} pts</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${behavioralPossible > 0 ? (behavioralTotal / behavioralPossible) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Situational */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Situational</span>
            <span className="text-xs font-bold text-slate-400">2 Questions</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {situationalTotal} <span className="text-xs font-semibold text-slate-400">/{situationalPossible || 20} pts</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full transition-all duration-500"
              style={{ width: `${situationalPossible > 0 ? (situationalTotal / situationalPossible) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question by Question Detailed Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Question-by-Question Evaluation Audit
        </h3>

        <div className="divide-y divide-slate-100">
          {questions.map((q, idx) => {
            const ans = answers[q.id];
            const isDone = !!ans?.submitted;

            return (
              <div key={q.id || idx} className="py-4 first:pt-1 last:pb-1 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Q{idx + 1}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {q.type}
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {q.question}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    {isDone ? (
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                        {ans.score} / 10 pts
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold">
                        Skipped
                      </span>
                    )}
                  </div>
                </div>

                {isDone && ans.answer && (
                  <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-600 space-y-1">
                    <strong className="text-slate-800 block">Your Answer:</strong>
                    <p className="line-clamp-2 italic">{ans.answer}</p>
                    {ans.feedback?.verdict && (
                      <span className="inline-block mt-1 text-[10px] font-bold text-blue-600">
                        Verdict: {ans.feedback.verdict}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRetake}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake This Role</span>
          </button>

          <button
            type="button"
            onClick={onChangeRole}
            className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Choose Different Role</span>
          </button>
        </div>

        <Link
          to="/dashboard"
          className="px-5 py-2.5 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Candidate Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default InterviewSummaryScorecard;
