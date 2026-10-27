import React from 'react';
import { useApplications } from './ApplicationsContext';

export const ApplicationsFilterTabs = ({
  options = ['All', 'Shortlisted', 'Under Review', 'Interview'],
  className = '',
}) => {
  const { statusFilter, setStatusFilter } = useApplications();

  return (
    <div className={`flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap pb-1 ${className}`}>
      <span className="text-xs font-bold text-slate-400 mr-2 uppercase tracking-wider">
        Filter Status:
      </span>
      {options.map((st) => (
        <button
          key={st}
          type="button"
          onClick={() => setStatusFilter(st)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            statusFilter === st
              ? 'bg-blue-600 text-white shadow-xs shadow-blue-600/30'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          {st}
        </button>
      ))}
    </div>
  );
};

export default ApplicationsFilterTabs;
