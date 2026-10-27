import React from 'react';
import { Zap } from 'lucide-react';
import { useRoleMatches } from './RoleMatchesContext';

export const RoleMatchesHero = ({ className = '' }) => {
  const { jobs } = useRoleMatches();
  const topScore = jobs[0]?.matchPercentage || 94;

  return (
    <div className={`bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl 2xl:rounded-3xl p-6 2xl:p-9 3xl:p-12 relative overflow-hidden shadow-sm ${className}`}>
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 2xl:gap-8">
        <div>
          <div className="inline-flex items-center gap-1.5 2xl:gap-2 px-2.5 2xl:px-4 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-white/10 text-cyan-300 border border-white/15 mb-2 2xl:mb-3">
            <Zap className="w-3 h-3 2xl:w-4 2xl:h-4 text-cyan-300 fill-cyan-300" />
            <span>AI Weighted Scoring Engine (50 / 30 / 20)</span>
          </div>
          <h1 className="text-xl sm:text-2xl 2xl:text-4xl 3xl:text-5xl font-black">
            AI Role Matches & Missing Skills
          </h1>
          <p className="text-xs 2xl:text-base 3xl:text-lg text-blue-100 mt-1 2xl:mt-2 max-w-xl 2xl:max-w-3xl 3xl:max-w-4xl">
            Ranked strictly by highest algorithmic compatibility. Green indicates
            verified matched skills; orange highlights missing skills to bridge
            for a higher score.
          </p>
        </div>
        <div className="p-3.5 2xl:p-6 3xl:p-7 rounded-xl 2xl:rounded-2xl bg-white/10 border border-white/20 text-center shrink-0">
          <span className="text-2xl 2xl:text-4xl 3xl:text-5xl font-black text-white block">
            {topScore}%
          </span>
          <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-cyan-300 font-bold uppercase tracking-wider">
            Top Compatibility Fit
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoleMatchesHero;
