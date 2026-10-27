import React from 'react';
import { Sparkles } from 'lucide-react';
import { useRoleMatches } from './RoleMatchesContext';

export const RoleMatchesSkillGapRoadmap = ({ className = '' }) => {
  const { skillGaps } = useRoleMatches();

  if (!skillGaps || skillGaps.length === 0) return null;

  return (
    <div className={`bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200 p-6 2xl:p-9 3xl:p-10 space-y-4 2xl:space-y-6 shadow-2xs ${className}`}>
      <div className="flex items-center gap-2 2xl:gap-3 text-blue-600">
        <Sparkles className="w-4 h-4 2xl:w-6 2xl:h-6" />
        <h3 className="text-sm 2xl:text-lg 3xl:text-xl font-bold text-slate-900">
          Bridge Missing Skills to Unlock Higher Matches
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-6 3xl:gap-8">
        {skillGaps.map((gap) => (
          <div
            key={gap.id}
            className="p-3.5 2xl:p-6 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 2xl:space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] 2xl:text-xs font-bold uppercase text-slate-400">
                {gap.category}
              </span>
              <span className="text-[10px] 2xl:text-xs font-bold px-2 2xl:px-3 py-0.5 2xl:py-1 rounded bg-emerald-100 text-emerald-800">
                {gap.impact}
              </span>
            </div>
            <h4 className="text-xs 2xl:text-base 3xl:text-lg font-bold text-slate-900">{gap.skill}</h4>
            <p className="text-[11px] 2xl:text-sm text-slate-600">
              Unlocks: <strong>{gap.rolesUnlocked}</strong>
            </p>
            <p className="text-[10px] 2xl:text-xs text-blue-600 font-semibold pt-1 2xl:pt-2 border-t border-slate-200">
              {gap.resource}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleMatchesSkillGapRoadmap;
