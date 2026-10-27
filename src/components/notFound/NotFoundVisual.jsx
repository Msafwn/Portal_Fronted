import React from 'react';
import { Compass } from 'lucide-react';

export const NotFoundVisual = ({ className = '' }) => {
  return (
    <div className={`relative my-1 flex items-center justify-center select-none ${className}`}>
      {/* 404 Number Typography */}
      <div className="text-6xl sm:text-7xl font-black tracking-tighter text-slate-200/90 leading-none">
        4<span className="text-blue-600/30">0</span>4
      </div>

      {/* Floating Center Tech Compass */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 border-2 border-white animate-pulse">
          <Compass className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundVisual;
