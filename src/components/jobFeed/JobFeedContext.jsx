import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const JobFeedContext = createContext(null);

export const useJobFeed = () => {
  const context = useContext(JobFeedContext);
  if (!context) {
    throw new Error('JobFeed subcomponents must be used within JobFeedView / JobFeedProvider');
  }
  return context;
};

export const JobFeedProvider = ({
  jobs = [],
  allJobs = [],
  appliedJobIds = [],
  handleApply,
  profile = {},
  candidateRole = 'fresh_graduate',
  handleSelectRole,
  children,
}) => {
  const [selectedDept, setSelectedDept] = useState(
    profile.department || 'All Fields'
  );

  useEffect(() => {
    if (profile.department) {
      setSelectedDept(profile.department);
    }
  }, [profile.department]);

  const [selectedScope, setSelectedScope] = useState('role');
  const [selectedMode, setSelectedMode] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const workModes = ['All', 'Hybrid', 'On-site', 'Remote'];
  const sourceJobs = selectedScope === 'role' ? jobs : allJobs || jobs;

  // Memoized Job Filters: prevents re-calculating on unrelated re-renders
  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sourceJobs.filter((job) => {
      const matchesDept =
        selectedDept === 'All Fields' || job.department === selectedDept;
      const matchesMode =
        selectedMode === 'All' || job.workMode === selectedMode;
      const matchesSearch =
        !q ||
        job.title?.toLowerCase().includes(q) ||
        job.company?.toLowerCase().includes(q) ||
        (job.matchedSkills || []).some((s) => s.toLowerCase().includes(q));
      return matchesDept && matchesMode && matchesSearch;
    });
  }, [sourceJobs, selectedDept, selectedMode, searchQuery]);

  const contextValue = useMemo(() => ({
    jobs: filteredJobs,
    appliedJobIds,
    handleApply,
    profile,
    candidateRole,
    handleSelectRole,
    selectedDept,
    setSelectedDept,
    selectedScope,
    setSelectedScope,
    selectedMode,
    setSelectedMode,
    searchQuery,
    setSearchQuery,
    workModes,
  }), [
    filteredJobs,
    appliedJobIds,
    handleApply,
    profile,
    candidateRole,
    handleSelectRole,
    selectedDept,
    selectedScope,
    selectedMode,
    searchQuery,
  ]);

  return (
    <JobFeedContext.Provider value={contextValue}>
      {children}
    </JobFeedContext.Provider>
  );
};

export default JobFeedContext;
