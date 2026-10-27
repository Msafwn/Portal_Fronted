import React from 'react';
import { useCandidatePortal } from '../context/CandidatePortalContext';
import { JobFeedView } from '../components/jobFeed/JobFeedView';

export const JobFeed = () => {
  const {
    jobs,
    allJobs,
    appliedJobIds,
    handleApply,
    profile,
    candidateRole,
    handleSelectRole,
  } = useCandidatePortal();

  return (
    <JobFeedView
      jobs={jobs}
      allJobs={allJobs}
      appliedJobIds={appliedJobIds}
      handleApply={handleApply}
      profile={profile}
      candidateRole={candidateRole}
      handleSelectRole={handleSelectRole}
    >
      <JobFeedView.RoleSwitcher />
      <JobFeedView.HeroHeader />
      <JobFeedView.FiltersBar />
      <JobFeedView.Grid />
    </JobFeedView>
  );
};

export default JobFeed;
