import React from 'react';
import { Filter } from 'lucide-react';
import { useApplications } from './ApplicationsContext';

export const ApplicationsEmptyState = ({ message, className = '' }) => {
  const { statusFilter } = useApplications();

  return (
    <div className={`p-12 text-center ${className}`}>
      <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
      <h3 className="text-sm font-bold text-slate-800">
        {message || `No applications match "${statusFilter}"`}
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        Select "All" to view all your submitted role applications.
      </p>
    </div>
  );
};

export default ApplicationsEmptyState;
