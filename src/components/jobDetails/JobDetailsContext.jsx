import React, { createContext, useContext } from 'react';

const JobDetailsContext = createContext(null);

export const useJobDetails = () => {
  const context = useContext(JobDetailsContext);
  if (!context) {
    throw new Error('JobDetails subcomponents must be used within JobDetailsView / JobDetailsProvider');
  }
  return context;
};

export const JobDetailsProvider = ({
  job,
  isApplied = false,
  handleApply,
  children,
}) => {
  return (
    <JobDetailsContext.Provider value={{ job, isApplied, handleApply }}>
      {children}
    </JobDetailsContext.Provider>
  );
};

export default JobDetailsContext;
