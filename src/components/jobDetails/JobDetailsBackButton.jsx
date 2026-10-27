import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const JobDetailsBackButton = ({
  to = '/jobs',
  label = 'Back to Job Feed',
  className = '',
}) => {
  return (
    <div className={className}>
      <Link
        to={to}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{label}</span>
      </Link>
    </div>
  );
};

export default JobDetailsBackButton;
