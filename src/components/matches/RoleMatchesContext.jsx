import React, { createContext, useContext, useMemo } from 'react';

const RoleMatchesContext = createContext(null);

export const useRoleMatches = () => {
  const context = useContext(RoleMatchesContext);
  if (!context) {
    throw new Error('RoleMatches subcomponents must be used within RoleMatchesView / RoleMatchesProvider');
  }
  return context;
};

export const RoleMatchesProvider = ({
  jobs = [],
  appliedJobIds = [],
  handleApply,
  skillGaps = [],
  children,
}) => {
  // Memoize recommendation sorting: only re-sorts when input jobs list changes
  const sortedMatches = useMemo(() => {
    return [...jobs].sort(
      (a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0)
    );
  }, [jobs]);

  const contextValue = useMemo(() => ({
    jobs: sortedMatches,
    appliedJobIds,
    handleApply,
    skillGaps,
  }), [sortedMatches, appliedJobIds, handleApply, skillGaps]);

  return (
    <RoleMatchesContext.Provider value={contextValue}>
      {children}
    </RoleMatchesContext.Provider>
  );
};

export default RoleMatchesContext;
