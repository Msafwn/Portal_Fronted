import React from 'react';
import { Headphones } from 'lucide-react';

export const SupportHeader = ({ className = '' }) => {
  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden ${className}`}>
      <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-200 border border-white/15 backdrop-blur-xs">
          <Headphones className="w-3.5 h-3.5 text-blue-400" />
          <span>24/7 Candidate Support Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
          How can our AI & Technical Team{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            assist your career?
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
          Need guidance regarding your 50-30-20 match score, missing skills roadmap, or job applications? Submit a support ticket or explore instant solutions below.
        </p>
      </div>
    </div>
  );
};

export default SupportHeader;
