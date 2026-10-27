import React from 'react';
import { BarChart3, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ALGORITHM_CRITERIA } from '../../constants';

export const LandingAlgorithm = ({ className = '' }) => {
  return (
    <section id="algorithm" className={`py-12 sm:py-16 md:py-18 lg:py-20 2xl:py-28 3xl:py-36 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden scroll-mt-16 ${className}`}>
      {/* Background glow atmospheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] 2xl:w-[1200px] 3xl:w-[1600px] h-[250px] md:h-[350px] 2xl:h-[500px] bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-60 md:w-80 2xl:w-[500px] h-60 md:h-80 2xl:h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1920px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl md:max-w-xl lg:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 2xl:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-full text-[11px] md:text-xs 2xl:text-xs 3xl:text-sm font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 uppercase tracking-wider mb-2.5 shadow-xs">
            <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400" />
            <span>Approved Academic Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl 4k:text-7xl font-extrabold tracking-tight text-white leading-tight">
            The 50 - 30 - 20 Match Algorithm
          </h2>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base 3xl:text-lg 4k:text-xl text-slate-300/90 mt-1.5 md:mt-2 2xl:mt-3 leading-relaxed">
            Standardized weighted scoring designed for fair, transparent, and accurate career recommendations.
          </p>
        </div>

        {/* Visual Equation Formula Bar */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 2xl:mb-14">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base font-semibold shadow-inner">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-2.5 md:py-1 lg:px-3.5 lg:py-1.5 rounded-lg bg-blue-500/20 text-cyan-300 border border-blue-500/30 text-[10px] sm:text-[11px] md:text-xs 2xl:text-xs">
              50% Skill Fit
            </span>
            <span className="text-slate-400 font-bold text-[10px] sm:text-xs md:text-xs">+</span>
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-2.5 md:py-1 lg:px-3.5 lg:py-1.5 rounded-lg bg-indigo-500/20 text-purple-300 border border-indigo-500/30 text-[10px] sm:text-[11px] md:text-xs 2xl:text-xs">
              30% Experience
            </span>
            <span className="text-slate-400 font-bold text-[10px] sm:text-xs md:text-xs">+</span>
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-2.5 md:py-1 lg:px-3.5 lg:py-1.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] sm:text-[11px] md:text-xs 2xl:text-xs">
              20% Education
            </span>
            <span className="text-slate-400 font-bold text-[10px] sm:text-xs md:text-xs">=</span>
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 md:px-3 md:py-1 lg:px-4 lg:py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[10px] sm:text-[11px] md:text-xs 2xl:text-xs flex items-center gap-1 md:gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
              <span>100% Comprehensive Role Compatibility</span>
            </span>
          </div>
        </div>

        {/* 3 Main Algorithm Cards with Modern Glow and Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-4 lg:gap-6 2xl:gap-8 3xl:gap-10 max-w-6xl 2xl:max-w-[1400px] 3xl:max-w-[1700px] 4k:max-w-[2100px] mx-auto">
          {ALGORITHM_CRITERIA.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="relative group rounded-2xl md:rounded-2xl 2xl:rounded-3xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Ambient Card Glow */}
                <div
                  className={`absolute -inset-0.5 rounded-2xl md:rounded-2xl 2xl:rounded-3xl ${c.glowColor} blur-xl opacity-30 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none`}
                />

                {/* Card Container */}
                <div className={`relative h-full bg-slate-900/80 backdrop-blur-xl border ${c.borderColor} rounded-2xl md:rounded-2xl 2xl:rounded-3xl p-5 sm:p-6 md:p-5 lg:p-7 2xl:p-8 3xl:p-10 flex flex-col justify-between shadow-xl transition-colors`}>
                  <div>
                    {/* Top Row: Percentage & Icon Badge */}
                    <div className="flex items-center justify-between mb-3.5 md:mb-4 lg:mb-5 2xl:mb-6">
                      <div>
                        <span className={`text-3xl sm:text-4xl md:text-3xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-black bg-gradient-to-r ${c.gradientText} bg-clip-text text-transparent block leading-none`}>
                          {c.percentage}
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-[10px] lg:text-xs 2xl:text-xs 3xl:text-sm text-slate-400 font-semibold uppercase tracking-wider block mt-1 md:mt-1.5 2xl:mt-2">
                          Weight Allocation
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-1 md:gap-1.5 2xl:gap-2">
                        <div className={`p-2 sm:p-2.5 md:p-2.5 lg:p-3 2xl:p-3.5 3xl:p-4 rounded-xl md:rounded-xl 2xl:rounded-2xl ${c.badgeStyle} flex items-center justify-center shadow-xs`}>
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8" />
                        </div>
                        <span className={`text-[9px] sm:text-[10px] md:text-[10px] lg:text-xs 2xl:text-xs 3xl:text-sm font-bold px-2 py-0.5 md:px-2 md:py-0.5 lg:px-2.5 lg:py-1 rounded-md 2xl:rounded-lg ${c.badgeStyle}`}>
                          {c.badge}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800/80 h-1.5 sm:h-2 md:h-2 lg:h-2.5 2xl:h-3 3xl:h-3.5 rounded-full overflow-hidden mb-3.5 md:mb-4 lg:mb-5 2xl:mb-6 p-0.5 border border-white/5">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${c.barGradient}`}
                        style={{ width: `${c.numericValue * 2}%` }}
                      />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base sm:text-lg md:text-base lg:text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-white mb-1 md:mb-1.5 2xl:mb-2 tracking-tight">{c.title}</h3>
                    <p className="text-xs md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base text-slate-300/80 leading-relaxed mb-4 md:mb-5 2xl:mb-8">
                      {c.desc}
                    </p>
                  </div>

                  {/* Key Evaluation Factors */}
                  <div className="pt-3.5 md:pt-4 2xl:pt-6 border-t border-white/10 space-y-1.5 md:space-y-2 2xl:space-y-3">
                    <span className="text-[10px] md:text-[10px] lg:text-xs 2xl:text-xs 3xl:text-sm font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Evaluation Factors:
                    </span>
                    {c.points.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 md:gap-2 2xl:gap-2.5 text-[11px] md:text-[11px] lg:text-xs 2xl:text-sm text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 2xl:w-4 2xl:h-4 text-cyan-400 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why this matters callout */}
        <div className="max-w-3xl md:max-w-2xl lg:max-w-3xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto mt-8 sm:mt-10 md:mt-12 2xl:mt-16 p-3.5 sm:p-4 md:p-5 2xl:p-6 rounded-xl md:rounded-xl 2xl:rounded-2xl bg-white/5 border border-white/10 text-center text-xs md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base text-slate-300 flex items-center justify-center gap-2 2xl:gap-3">
          <ShieldCheck className="w-4 h-4 md:w-4 md:h-4 2xl:w-5 2xl:h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Fair Matching Guarantee:</strong> Students and Fresh Graduates are evaluated primarily on their true technical skill capability (50%), preventing unfair rejection by 5-year experience filters.
          </span>
        </div>
      </div>
    </section>
  );
};

export default LandingAlgorithm;
