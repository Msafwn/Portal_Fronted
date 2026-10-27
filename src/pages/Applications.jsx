import React from 'react';
import { useCandidatePortal } from '../context/CandidatePortalContext';
import { ApplicationsView } from '../components/applications/ApplicationsView';

export const Applications = () => {
  const { applicationsList } = useCandidatePortal();

  return (
    <ApplicationsView applicationsList={applicationsList}>
      <ApplicationsView.Header />
      <ApplicationsView.FilterTabs />
      <ApplicationsView.List />
    </ApplicationsView>
  );
};

export default Applications;
