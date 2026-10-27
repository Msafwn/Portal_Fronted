import React from 'react';
import { Briefcase } from 'lucide-react';
import { useJobFeed } from './JobFeedContext';

export const JobFeedHeroHeader = ({ className = '' }) => {
  const { jobs, candidateRole } = useJobFeed();

  const roleLabel =
    candidateRole === 'student'
      ? 'Student (Internships & Scholarships)'
      : candidateRole === 'experienced'
      ? 'Experienced Professional'
      : 'Fresh Graduate (Entry-Level)';

  return (
    <div className={`bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl 2xl:rounded-3xl p-6 2xl:p-9 3xl:p-12 relative overflow-hidden shadow-sm ${className}`}>
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 2xl:gap-8">
        <div>
          <div className="inline-flex items-center gap-1.5 2xl:gap-2 px-2.5 2xl:px-4 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-white/10 text-cyan-300 border border-white/15 mb-2 2xl:mb-3">
            <Briefcase className="w-3 h-3 2xl:w-4 2xl:h-4 text-cyan-300" />
            <span>Active Position Feed • {roleLabel}</span>
          </div>
          <h1 className="text-xl sm:text-2xl 2xl:text-4xl 3xl:text-5xl font-black">
            Intelligent Role & Job Feed
          </h1>
          <p className="text-xs 2xl:text-base 3xl:text-lg text-blue-100 mt-1 2xl:mt-2 max-w-xl 2xl:max-w-3xl 3xl:max-w-4xl">
            Explore active openings across companies. Every position displays your real-time compatibility score calculated by our 50-30-20 algorithm.
          </p>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-xl 2xl:rounded-2xl px-4 2xl:px-7 py-3 2xl:py-5 shrink-0 text-center">
          <span className="text-2xl 2xl:text-4xl 3xl:text-5xl font-black text-white block">
            {jobs.length}
          </span>
          <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-blue-200 uppercase tracking-wider font-semibold">
            Filtered Positions
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobFeedHeroHeader;
