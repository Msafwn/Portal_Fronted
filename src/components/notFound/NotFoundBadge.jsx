import React from 'react';
import { FileQuestion } from 'lucide-react';

export const NotFoundBadge = ({ text = 'Error 404 • Page Not Found', className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs ${className}`}>
      <FileQuestion className="w-3 h-3 text-rose-500" />
      <span>{text}</span>
    </div>
  );
};

export default NotFoundBadge;
