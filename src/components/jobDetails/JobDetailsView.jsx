import React from 'react';
import { JobDetailsProvider, useJobDetails } from './JobDetailsContext';
import { JobDetailsBackButton } from './JobDetailsBackButton';
import { JobDetailsHeaderCard } from './JobDetailsHeaderCard';
import { JobDetailsAlgorithmReport } from './JobDetailsAlgorithmReport';
import { JobDetailsOverviewCard } from './JobDetailsOverviewCard';

export const JobDetailsView = ({
  job,
  isApplied = false,
  handleApply,
  children,
  className = '',
}) => {
  return (
    <JobDetailsProvider job={job} isApplied={isApplied} handleApply={handleApply}>
      <div className={`px-4 sm:px-6 lg:px-8 py-6 max-w-5xl 2xl:max-w-6xl 4k:max-w-7xl mx-auto space-y-6 2xl:space-y-8 ${className}`}>
        {children}
      </div>
    </JobDetailsProvider>
  );
};

JobDetailsView.BackButton = JobDetailsBackButton;
JobDetailsView.HeaderCard = JobDetailsHeaderCard;
JobDetailsView.AlgorithmReport = JobDetailsAlgorithmReport;
JobDetailsView.OverviewCard = JobDetailsOverviewCard;

export {
  useJobDetails,
  JobDetailsBackButton,
  JobDetailsHeaderCard,
  JobDetailsAlgorithmReport,
  JobDetailsOverviewCard,
};

export default JobDetailsView;
