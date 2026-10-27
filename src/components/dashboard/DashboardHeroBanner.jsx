import React from 'react';
import { Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { useDashboard } from './DashboardContext';
import { AuroraBackground } from '../reactbits/AuroraBackground';
import { ParticlesBackground } from '../reactbits/ParticlesBackground';

export const DashboardHeroBanner = ({ className = '' }) => {
  const { profile, stats, currentRoleConfig } = useDashboard();

  return (
    <AuroraBackground
      colorVariant="dark-galaxy"
      speed="slow"
      opacity={0.85}
      className={`p-6 2xl:p-9 3xl:p-12 bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white rounded-2xl 2xl:rounded-3xl relative shadow-md border border-blue-900/40 ${className}`}
    >
      {/* ReactBits Floating Constellation Particles */}
      <ParticlesBackground
        particleCount={25}
        particleColor="rgba(56, 189, 248, 0.45)"
        lineColor="rgba(99, 102, 241, 0.15)"
        speed={0.4}
        interactive={true}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 2xl:gap-8">
        <div className="space-y-2 2xl:space-y-4 max-w-xl 2xl:max-w-3xl 3xl:max-w-4xl">
          <div className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 2xl:px-4 py-1 2xl:py-1.5 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-white/10 text-cyan-300 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-cyan-300" />
            <span>{currentRoleConfig.badge} • {profile.department}</span>
          </div>

          <h1 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-black text-white tracking-tight">
            Welcome, {profile.name}! 👋
          </h1>

          <p className="text-xs 2xl:text-base 3xl:text-lg text-cyan-200 font-medium">
            {currentRoleConfig.welcomeSub}
          </p>

          <p className="text-xs 2xl:text-base 3xl:text-lg text-blue-100 flex items-center gap-2 2xl:gap-3 flex-wrap pt-0.5">
            <span className="font-semibold text-white">{profile.headline}</span>
            <span>•</span>
            <span className="flex items-center gap-1 2xl:gap-1.5">
              <MapPin className="w-3 h-3 2xl:w-4 2xl:h-4 text-cyan-300" /> {profile.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 2xl:gap-1.5">
              <GraduationCap className="w-3 h-3 2xl:w-4 2xl:h-4 text-cyan-300" /> {profile.education}
            </span>
          </p>

          <div className="pt-1 2xl:pt-2 flex flex-wrap gap-1.5 2xl:gap-2.5 items-center">
            <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-cyan-200 font-medium mr-1">Skills:</span>
            {(profile.skills || []).slice(0, 7).map((s) => (
              <span key={s} className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-lg 2xl:rounded-xl bg-white/10 hover:bg-white/15 text-blue-100 text-[10px] 2xl:text-xs 3xl:text-sm border border-white/10 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Compatibility Score Card */}
        <div className="p-3.5 2xl:p-6 3xl:p-7 rounded-xl 2xl:rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-3.5 2xl:gap-5 shrink-0 shadow-lg">
          <div className="w-13 h-13 2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center font-black text-slate-950 text-base 2xl:text-2xl 3xl:text-3xl shadow-sm ring-2 2xl:ring-4 ring-cyan-300/30">
            {stats.matchIndex}%
          </div>
          <div>
            <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold uppercase tracking-wider text-cyan-300 block">
              Compatibility Score
            </span>
            <h4 className="text-xs 2xl:text-lg 3xl:text-xl font-bold text-white">Top Tier Fit</h4>
            <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-blue-200">50% Skills + 30% Exp + 20% Edu</span>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default DashboardHeroBanner;
