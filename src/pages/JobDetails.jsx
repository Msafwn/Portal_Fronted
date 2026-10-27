import React from 'react';
import { useParams } from 'react-router-dom';
import { useCandidatePortal } from '../context/CandidatePortalContext';
import { JobDetailsView } from '../components/jobDetails/JobDetailsView';

export const JobDetails = () => {
  const { id } = useParams();
  const { jobs, appliedJobIds, handleApply } = useCandidatePortal();

  const job = jobs.find((j) => j.id === id) || jobs[0];
  const isApplied = appliedJobIds.includes(job?.id);

  if (!job) return null;

  return (
    <JobDetailsView job={job} isApplied={isApplied} handleApply={handleApply}>
      <JobDetailsView.BackButton />
      <JobDetailsView.HeaderCard />
      <JobDetailsView.AlgorithmReport />
      <JobDetailsView.OverviewCard />
    </JobDetailsView>
  );
};

export default JobDetails;
