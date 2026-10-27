import React from 'react';
import { useCandidatePortal } from '../context/CandidatePortalContext';
import { DashboardView } from '../components/dashboard/DashboardView';

export const Dashboard = () => {
  const portalData = useCandidatePortal();

  return (
    <DashboardView {...portalData}>
      <DashboardView.RoleSwitcher />
      <DashboardView.HeroBanner />
      <DashboardView.StatCards />
      <DashboardView.Recommendations />
      <DashboardView.RecentApplications />
    </DashboardView>
  );
};

export default Dashboard;
