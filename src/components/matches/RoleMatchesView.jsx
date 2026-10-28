import React from 'react';
import { RoleMatchesProvider, useRoleMatches } from './RoleMatchesContext';
import { RoleMatchesHero } from './RoleMatchesHero';
import { RoleMatchesSectionHeader } from './RoleMatchesSectionHeader';
import { RoleMatchesCard } from './RoleMatchesCard';
import { RoleMatchesRankedList } from './RoleMatchesRankedList';
import { RoleMatchesSkillGapRoadmap } from './RoleMatchesSkillGapRoadmap';

export const RoleMatchesView = ({
  jobs = [],
  appliedJobIds = [],
  handleApply,
  skillGaps = [],
  stats = {},
  children,
  className = '',
}) => {
  return (
    <RoleMatchesProvider
      jobs={jobs}
      appliedJobIds={appliedJobIds}
      handleApply={handleApply}
      skillGaps={skillGaps}
      stats={stats}
    >
      <div className={`px-4 sm:px-6 lg:px-8 2xl:px-12 3xl:px-16 py-6 2xl:py-10 space-y-6 2xl:space-y-10 max-w-[2400px] mx-auto ${className}`}>
        {children}
      </div>
    </RoleMatchesProvider>
  );
};

RoleMatchesView.Hero = RoleMatchesHero;
RoleMatchesView.SectionHeader = RoleMatchesSectionHeader;
RoleMatchesView.RankedList = RoleMatchesRankedList;
RoleMatchesView.MatchCard = RoleMatchesCard;
RoleMatchesView.SkillGapRoadmap = RoleMatchesSkillGapRoadmap;

export {
  useRoleMatches,
  RoleMatchesHero,
  RoleMatchesSectionHeader,
  RoleMatchesCard,
  RoleMatchesRankedList,
  RoleMatchesSkillGapRoadmap,
};

export default RoleMatchesView;
