import React from 'react';
import { useRoleMatches } from './RoleMatchesContext';

export const RoleMatchesSectionHeader = ({ className = '' }) => {
  const { jobs } = useRoleMatches();

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
        Ranked Positions ({jobs.length})
      </h2>
      <span className="text-xs text-slate-500">
        Weighted by: <strong>50% Skills + 30% Exp + 20% Edu</strong>
      </span>
    </div>
  );
};

export default RoleMatchesSectionHeader;
