import React from 'react';
import { Sparkles } from 'lucide-react';

export const PageLoader = ({ message = 'Loading Smart Career System...' }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white select-none">
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer glowing pulsing ring */}
        <div className="absolute w-20 h-20 bg-blue-500/20 rounded-full animate-ping" />
        <div className="absolute w-16 h-16 bg-indigo-500/30 rounded-2xl animate-pulse blur-xs" />
        
        {/* Spinning border ring */}
        <div className="w-16 h-16 rounded-2xl border-2 border-blue-500/20 border-t-blue-400 animate-spin" />
        
        {/* Center Sparkles Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-cyan-400 animate-bounce" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <span>Smart Career AI</span>
        </h3>
        <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">
          {message}
        </p>
      </div>

      {/* Modern micro-progress bar */}
      <div className="w-48 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 w-full animate-pulse" />
      </div>
    </div>
  );
};

export default PageLoader;
