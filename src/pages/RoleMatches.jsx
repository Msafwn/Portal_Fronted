import React from 'react';
import { useCandidatePortal } from '../context/CandidatePortalContext';
import { RoleMatchesView } from '../components/matches/RoleMatchesView';

export const RoleMatches = () => {
  const { jobs, appliedJobIds, handleApply, skillGaps } = useCandidatePortal();

  return (
    <RoleMatchesView
      jobs={jobs}
      appliedJobIds={appliedJobIds}
      handleApply={handleApply}
      skillGaps={skillGaps}
    >
      <RoleMatchesView.Hero />
      <RoleMatchesView.RankedList />
      <RoleMatchesView.SkillGapRoadmap />
    </RoleMatchesView>
  );
};

export default RoleMatches;
