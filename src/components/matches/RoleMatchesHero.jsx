import React from 'react';
import { Zap } from 'lucide-react';
import { useRoleMatches } from './RoleMatchesContext';

export const RoleMatchesHero = ({ className = '' }) => {
  const { jobs } = useRoleMatches();
  const topScore = jobs[0]?.matchPercentage || 94;

  return (
    <div className={`bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 lg:p-5 relative overflow-hidden shadow-sm ${className}`}>
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-cyan-300 border border-white/15 mb-1.5">
            <Zap className="w-3 h-3 text-cyan-300 fill-cyan-300" />
            <span>AI Weighted Scoring Engine (50 / 30 / 20)</span>
          </div>
          <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white">
            AI Role Matches & Missing Skills
          </h1>
          <p className="text-[11px] sm:text-xs text-blue-100/90 mt-1 max-w-xl leading-relaxed">
            Ranked strictly by highest algorithmic compatibility. Green indicates
            verified matched skills; orange highlights missing skills to bridge
            for a higher score.
          </p>
        </div>
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 border border-white/20 text-center shrink-0 min-w-[120px] self-start md:self-auto">
          <span className="text-xl sm:text-2xl font-bold text-white block leading-tight">
            {topScore}%
          </span>
          <span className="text-[9px] sm:text-[10px] text-cyan-300 font-bold uppercase tracking-wider block mt-0.5">
            Top Compatibility Fit
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoleMatchesHero;
