import React, { useState } from 'react';
import { Zap, CheckCircle2, Target } from 'lucide-react';
import { SIMULATION_ROLES } from '../../constants';

export const LandingLiveDemo = ({ className = '' }) => {
  const [activeRoleKey, setActiveRoleKey] = useState('fullstack');
  const current = SIMULATION_ROLES[activeRoleKey] || SIMULATION_ROLES.fullstack;

  return (
    <section id="demo" className={`py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-24 3xl:py-32 bg-slate-50/70 border-y border-slate-200/80 scroll-mt-16 ${className}`}>
      <div className="max-w-5xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-[1400px] 3xl:max-w-[1700px] 4k:max-w-[2100px] mx-auto px-4 sm:px-6 md:px-8 2xl:px-12 3xl:px-16">
        <div className="text-center max-w-xl md:max-w-2xl 2xl:max-w-2xl 3xl:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 2xl:mb-12">
          <div className="inline-flex items-center gap-1 text-[11px] md:text-xs 2xl:text-xs 3xl:text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 2xl:w-4 2xl:h-4" />
            <span>Live Algorithm Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-4xl 3xl:text-5xl font-extrabold text-slate-900 tracking-tight">
            See How Your Match Score Is Calculated
          </h2>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-sm 3xl:text-base text-slate-500 mt-1 md:mt-1.5 2xl:mt-2">
            Our engine breaks down your match into technical skills, experience verification, and degree background.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-2.5 2xl:gap-3 mb-6 md:mb-8 2xl:mb-10">
          {Object.values(SIMULATION_ROLES).map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRoleKey(role.id)}
              className={`px-3 py-1.5 md:px-4 md:py-2 2xl:px-5 2xl:py-2.5 3xl:px-6 3xl:py-3 rounded-lg md:rounded-xl 2xl:rounded-xl text-xs md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base font-semibold transition-all cursor-pointer ${
                activeRoleKey === role.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {role.tabLabel}
            </button>
          ))}
        </div>

        {/* Simulation Card */}
        <div className="bg-white rounded-2xl md:rounded-2xl 2xl:rounded-3xl border border-slate-200 p-5 sm:p-6 md:p-7 lg:p-8 2xl:p-9 3xl:p-12 shadow-sm max-w-3xl md:max-w-2xl lg:max-w-3xl 2xl:max-w-5xl 3xl:max-w-6xl 4k:max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 md:pb-5 2xl:pb-6 border-b border-slate-100">
            <div>
              <span className="text-[10px] md:text-[11px] 2xl:text-xs 3xl:text-sm font-bold text-blue-600 uppercase tracking-wider">
                Target Position
              </span>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-2xl 3xl:text-3xl font-bold text-slate-900">{current.title}</h3>
              <p className="text-xs md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base text-slate-500">{current.company}</p>
            </div>

            <div className="flex items-center gap-3 md:gap-4 2xl:gap-5">
              <div className="text-right">
                <span className="text-[10px] md:text-[10px] 2xl:text-xs 3xl:text-sm uppercase font-bold text-slate-400 block">Overall Score</span>
                <span className="text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl font-black text-blue-600">{current.matchPercentage}%</span>
              </div>
              <div className="w-11 h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 rounded-xl md:rounded-xl 2xl:rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-extrabold text-xs md:text-sm lg:text-base 2xl:text-lg 3xl:text-xl">
                FIT
              </div>
            </div>
          </div>

          {/* Match Bar */}
          <div className="py-3.5 sm:py-4 md:py-5 2xl:py-6 space-y-1.5 md:space-y-2 2xl:space-y-2.5">
            <div className="flex items-center justify-between text-xs md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base font-semibold">
              <span className="text-slate-700">Role Compatibility Progress</span>
              <span className="text-blue-600 font-bold">{current.matchPercentage}% Match</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 md:h-3 2xl:h-4 3xl:h-5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${current.matchPercentage}%` }}
              />
            </div>
          </div>

          {/* Breakdown 3-Pillars (50-30-20) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 2xl:gap-6 py-2.5 sm:py-3 md:py-4 2xl:py-5 border-y border-slate-100 bg-slate-50/50 rounded-xl md:rounded-xl 2xl:rounded-2xl px-3 sm:px-4 md:px-5 2xl:px-8 my-2 md:my-3 2xl:my-4">
            <div>
              <p className="text-[9px] sm:text-[10px] md:text-[10px] lg:text-xs 2xl:text-xs 3xl:text-sm uppercase font-semibold text-slate-400">Skill Fit (50%)</p>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-lg 3xl:text-xl font-bold text-slate-800">{current.breakdown.skills} / 50 pts</p>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] md:text-[10px] lg:text-xs 2xl:text-xs 3xl:text-sm uppercase font-semibold text-slate-400">Experience (30%)</p>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-lg 3xl:text-xl font-bold text-slate-800">{current.breakdown.experience} / 30 pts</p>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] md:text-[10px] lg:text-xs 2xl:text-xs 3xl:text-sm uppercase font-semibold text-slate-400">Education (20%)</p>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-lg 3xl:text-xl font-bold text-slate-800">{current.breakdown.education} / 20 pts</p>
            </div>
          </div>

          {/* Matched & Missing Chips */}
          <div className="pt-3 md:pt-4 2xl:pt-5 space-y-2.5 md:space-y-3 2xl:space-y-4">
            <div>
              <span className="text-[11px] md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base font-bold text-slate-700 mb-1.5 md:mb-2 2xl:mb-2.5 flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500 shrink-0" />
                <span>Matched Technical Skills ({current.matchedSkills.length})</span>
              </span>
              <div className="flex flex-wrap gap-1.5 md:gap-2 2xl:gap-2.5">
                {current.matchedSkills.map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-1 md:px-3 md:py-1 2xl:px-4 2xl:py-2 rounded-md md:rounded-lg 2xl:rounded-lg text-[11px] md:text-xs 2xl:text-xs 3xl:text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    ✓ {m}
                  </span>
                ))}
              </div>
            </div>

            {current.missingSkills.length > 0 && (
              <div>
                <span className="text-[11px] md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base font-bold text-amber-700 mb-1.5 md:mb-2 2xl:mb-2.5 flex items-center gap-1.5 md:gap-2">
                  <Target className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 shrink-0" />
                  <span>Identified Skill Gaps ({current.missingSkills.length}) — Learn these to reach 99% match</span>
                </span>
                <div className="flex flex-wrap gap-1.5 md:gap-2 2xl:gap-2.5">
                  {current.missingSkills.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 md:px-3 md:py-1 2xl:px-4 2xl:py-2 rounded-md md:rounded-lg 2xl:rounded-lg text-[11px] md:text-xs 2xl:text-xs 3xl:text-sm font-semibold bg-amber-50 text-amber-700 border border-amber-200"
                    >
                      + {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingLiveDemo;
