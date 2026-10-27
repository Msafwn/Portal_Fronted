import React from 'react';
import { JobFeedProvider, useJobFeed } from './JobFeedContext';
import { JobFeedRoleSwitcher } from './JobFeedRoleSwitcher';
import { JobFeedHeroHeader } from './JobFeedHeroHeader';
import { JobFeedFiltersBar } from './JobFeedFiltersBar';
import { JobFeedCard } from './JobFeedCard';
import { JobFeedGrid } from './JobFeedGrid';

export const JobFeedView = ({
  jobs = [],
  allJobs = [],
  appliedJobIds = [],
  handleApply,
  profile = {},
  candidateRole = 'fresh_graduate',
  handleSelectRole,
  children,
  className = '',
}) => {
  return (
    <JobFeedProvider
      jobs={jobs}
      allJobs={allJobs}
      appliedJobIds={appliedJobIds}
      handleApply={handleApply}
      profile={profile}
      candidateRole={candidateRole}
      handleSelectRole={handleSelectRole}
    >
      <div className={`px-4 sm:px-6 lg:px-8 2xl:px-12 3xl:px-16 py-6 2xl:py-10 space-y-6 2xl:space-y-10 max-w-[2400px] mx-auto ${className}`}>
        {children}
      </div>
    </JobFeedProvider>
  );
};

JobFeedView.RoleSwitcher = JobFeedRoleSwitcher;
JobFeedView.HeroHeader = JobFeedHeroHeader;
JobFeedView.FiltersBar = JobFeedFiltersBar;
JobFeedView.JobCard = JobFeedCard;
JobFeedView.Grid = JobFeedGrid;

export {
  useJobFeed,
  JobFeedRoleSwitcher,
  JobFeedHeroHeader,
  JobFeedFiltersBar,
  JobFeedCard,
  JobFeedGrid,
};

export default JobFeedView;
