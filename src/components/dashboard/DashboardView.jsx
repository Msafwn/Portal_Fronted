import React from 'react';
import { DashboardProvider, useDashboard } from './DashboardContext';
import { DashboardRoleSwitcher } from './DashboardRoleSwitcher';
import { DashboardHeroBanner } from './DashboardHeroBanner';
import { DashboardStatCards } from './DashboardStatCards';
import { DashboardRecommendations } from './DashboardRecommendations';
import { DashboardRecentApplications } from './DashboardRecentApplications';

export const DashboardView = ({
  profile,
  stats,
  jobs,
  appliedJobIds,
  handleApply,
  applicationsList,
  nextInterview,
  candidateRole,
  accountRole,
  handleSelectRole,
  roleFilterTab,
  setRoleFilterTab,
  children,
  className = '',
}) => {
  return (
    <DashboardProvider
      profile={profile}
      stats={stats}
      jobs={jobs}
      appliedJobIds={appliedJobIds}
      handleApply={handleApply}
      applicationsList={applicationsList}
      nextInterview={nextInterview}
      candidateRole={candidateRole}
      accountRole={accountRole}
      handleSelectRole={handleSelectRole}
      roleFilterTab={roleFilterTab}
      setRoleFilterTab={setRoleFilterTab}
    >
      <div className={`px-4 sm:px-6 lg:px-8 2xl:px-12 3xl:px-16 py-6 2xl:py-10 space-y-6 2xl:space-y-10 max-w-[2400px] mx-auto ${className}`}>
        {children}
      </div>
    </DashboardProvider>
  );
};

DashboardView.RoleSwitcher = DashboardRoleSwitcher;
DashboardView.HeroBanner = DashboardHeroBanner;
DashboardView.StatCards = DashboardStatCards;
DashboardView.Recommendations = DashboardRecommendations;
DashboardView.RecentApplications = DashboardRecentApplications;

export {
  useDashboard,
  DashboardRoleSwitcher,
  DashboardHeroBanner,
  DashboardStatCards,
  DashboardRecommendations,
  DashboardRecentApplications,
};

export default DashboardView;
