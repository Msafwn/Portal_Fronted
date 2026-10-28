import React from 'react';
import { Target, CheckCircle2, TrendingUp } from 'lucide-react';

export const RegisterLeftBanner = ({
  headline = 'Join the Future of AI Role Matching',
  tagline = 'Create your role-based profile today. Receive personalized skill gap recommendations and get discovered by top industry employers across all sectors.',
  className = '',
}) => {
  return (
    <div className={`hidden lg:flex lg:w-5/12 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white p-6 lg:p-7 xl:p-10 2xl:p-16 3xl:p-20 flex-col justify-center relative overflow-hidden h-full shrink-0 ${className}`}>
      <div className="absolute top-0 right-0 w-60 lg:w-80 2xl:w-[600px] h-60 lg:h-80 2xl:h-[600px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 lg:w-80 2xl:w-[600px] h-60 lg:h-80 2xl:h-[600px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-sm 2xl:max-w-lg 3xl:max-w-xl 4k:max-w-2xl mx-auto w-full space-y-4 lg:space-y-5 2xl:space-y-8">
        <div className="flex items-center gap-2.5 2xl:gap-4">
          <img loading="lazy" decoding="async"
            src="/logo.png"
            alt="Smart Career AI Logo"
            className="w-8 h-8 lg:w-9 lg:h-9 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 rounded-lg 2xl:rounded-xl object-contain bg-white/15 backdrop-blur-md p-1 2xl:p-1.5 border border-white/25 shadow-sm"
          />
          <div>
            <h2 className="text-sm lg:text-base 2xl:text-xl 3xl:text-2xl font-bold tracking-tight text-white leading-tight">
              Smart Career AI
            </h2>
            <p className="text-[10px] lg:text-xs 2xl:text-xs 3xl:text-sm text-blue-200">Role Match & Recommendation</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 2xl:gap-2 px-2.5 py-0.5 2xl:px-4 2xl:py-1.5 rounded-full text-[10px] lg:text-xs 2xl:text-xs 3xl:text-sm font-medium bg-white/10 text-blue-100 border border-white/15">
          <Target className="w-3 h-3 2xl:w-4 2xl:h-4 text-blue-300" />
          <span>Smart Career Portal 2026</span>
        </div>

        <div>
          <h1 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl font-extrabold tracking-tight leading-snug mb-1.5 lg:mb-2 2xl:mb-4 text-white">
            {headline}
          </h1>
          <p className="text-xs lg:text-sm 2xl:text-base 3xl:text-lg text-blue-100/90 leading-relaxed">
            {tagline}
          </p>
        </div>

        <div className="p-3.5 2xl:p-6 3xl:p-7 rounded-xl 2xl:rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
          <div className="flex items-center justify-between text-xs 2xl:text-base mb-1.5 2xl:mb-3">
            <span className="font-semibold text-white text-[11px] 2xl:text-sm 3xl:text-base flex items-center gap-1.5 2xl:gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-emerald-400" />
              Dynamic Match Algorithm
            </span>
            <span className="px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md 2xl:rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[10px] 2xl:text-xs 3xl:text-sm border border-emerald-500/30">
              95% Match
            </span>
          </div>
          <div className="w-full bg-white/15 h-1.5 2xl:h-3 3xl:h-4 rounded-full overflow-hidden mb-2 2xl:mb-3">
            <div className="bg-emerald-400 h-full rounded-full w-[95%]" />
          </div>
          <div className="flex items-center justify-between text-[10px] 2xl:text-xs 3xl:text-sm text-blue-200">
            <span>Core: Skills + Education + Experience</span>
            <span className="text-emerald-300 font-medium">Top Fit</span>
          </div>
        </div>

        <div className="space-y-2 2xl:space-y-3.5 pt-1">
          <div className="flex items-center gap-2.5 2xl:gap-4 p-2.5 2xl:p-4 rounded-lg 2xl:rounded-xl bg-white/5 border border-white/10 text-xs 2xl:text-sm">
            <Target className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-blue-300 shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px] 2xl:text-sm 3xl:text-base">Zero Blind Applications</p>
              <p className="text-[10px] 2xl:text-xs 3xl:text-sm text-blue-200">Apply only where your skills match to maximize interview selection</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 2xl:gap-4 p-2.5 2xl:p-4 rounded-lg 2xl:rounded-xl bg-white/5 border border-white/10 text-xs 2xl:text-sm">
            <TrendingUp className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-blue-300 shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px] 2xl:text-sm 3xl:text-base">Role-Tailored Portals</p>
              <p className="text-[10px] 2xl:text-xs 3xl:text-sm text-blue-200">Dedicated tracks for Students, Fresh Grads, Pros & Employers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLeftBanner;
