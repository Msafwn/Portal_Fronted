import React from 'react';
import { Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { useDashboard } from './DashboardContext';
import { AuroraBackground } from '../reactbits/AuroraBackground';
import { ParticlesBackground } from '../reactbits/ParticlesBackground';

export const DashboardHeroBanner = ({ className = '' }) => {
  const { profile, stats, currentRoleConfig } = useDashboard();

  const educationDisplay =
    typeof profile?.education === 'string'
      ? profile.education
      : Array.isArray(profile?.education) && profile.education.length > 0
      ? `${profile.education[0]?.degree || ''}${
          profile.education[0]?.institute ? ` • ${profile.education[0]?.institute}` : ''
        }`
      : '';

  const skillNames = (profile?.skills || [])
    .map((s) => (typeof s === 'string' ? s : s?.name || ''))
    .filter(Boolean);

  const roleBadgeText = currentRoleConfig?.badge || 'Candidate Portal';
  const departmentText = profile?.department || '';

  return (
    <AuroraBackground
      colorVariant="dark-galaxy"
      speed="slow"
      opacity={0.85}
      className={`p-3.5 sm:p-4 lg:p-5 bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white rounded-xl sm:rounded-2xl relative shadow-sm border border-blue-900/40 ${className}`}
    >
      <ParticlesBackground
        particleCount={20}
        particleColor="rgba(56, 189, 248, 0.45)"
        lineColor="rgba(99, 102, 241, 0.15)"
        speed={0.4}
        interactive={true}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1 sm:space-y-1.5 max-w-xl 2xl:max-w-2xl">
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-cyan-300 border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>{roleBadgeText}{departmentText ? ` • ${departmentText}` : ''}</span>
            </div>
          </div>

          <h1 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight">
            Welcome, {profile?.name || 'Candidate'}! 👋
          </h1>

          <p className="text-[11px] sm:text-xs text-cyan-200/90 font-medium leading-relaxed">
            {currentRoleConfig?.welcomeSub || 'Curated opportunities and matching roles tailored for your career path.'}
          </p>

          <p className="text-[11px] text-blue-100 flex items-center gap-1.5 flex-wrap pt-0.5">
            {profile?.headline && <span className="font-semibold text-white">{profile.headline}</span>}
            {profile?.location && (
              <>
                {profile?.headline && <span className="text-blue-300/50">•</span>}
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-300" /> {profile.location}
                </span>
              </>
            )}
            {educationDisplay && (
              <>
                {(profile?.headline || profile?.location) && <span className="text-blue-300/50">•</span>}
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-cyan-300" /> {educationDisplay}
                </span>
              </>
            )}
          </p>

          <div className="pt-0.5 flex flex-wrap gap-1 items-center">
            <span className="text-[11px] text-cyan-200/90 font-medium mr-1">Skills:</span>
            {skillNames.length > 0 ? (
              skillNames.slice(0, 6).map((skillName, idx) => (
                <span key={`${skillName}-${idx}`} className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/15 text-blue-100 text-[10px] sm:text-[11px] border border-white/10 transition-colors">
                  {skillName}
                </span>
              ))
            ) : (
              <span className="text-[10px] sm:text-[11px] text-cyan-200/60 italic">No skills added yet (add in Profile)</span>
            )}
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-2.5 sm:gap-3 shrink-0 shadow-md self-start md:self-auto">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-slate-950 text-xs sm:text-sm shadow-xs ring-2 ring-cyan-300/30 shrink-0">
            {stats?.matchIndex || 0}%
          </div>
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-cyan-300 block truncate">
              Compatibility Score
            </span>
            <h4 className="text-[11px] sm:text-xs font-bold text-white">AI Algorithmic Fit</h4>
            <span className="text-[9px] sm:text-[10px] text-blue-200/90 block truncate">50% Skills + 30% Exp + 20% Edu</span>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default DashboardHeroBanner;
