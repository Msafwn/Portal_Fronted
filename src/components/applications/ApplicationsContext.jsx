import React, { createContext, useContext, useState } from 'react';

const ApplicationsContext = createContext(null);

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('Applications subcomponents must be used within ApplicationsView / ApplicationsProvider');
  }
  return context;
};

export const ApplicationsProvider = ({ applicationsList = [], children }) => {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredApps = applicationsList.filter((app) => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Interview')
      return (app.status || '').toLowerCase().includes('interview');
    return (app.status || '').toLowerCase().includes(statusFilter.toLowerCase());
  });

  return (
    <ApplicationsContext.Provider
      value={{
        applicationsList,
        statusFilter,
        setStatusFilter,
        filteredApps,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export default ApplicationsContext;
