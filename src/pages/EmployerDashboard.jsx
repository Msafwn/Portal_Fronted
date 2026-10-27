import React from 'react';
import { useEmployerPortal } from '../context/EmployerPortalContext';
import { EmployerDashboardView } from '../components/employer';

export const EmployerDashboard = () => {
  const portalData = useEmployerPortal();

  return (
    <EmployerDashboardView {...portalData}>
      <EmployerDashboardView.Hero />
      <EmployerDashboardView.KpiStats />
      <EmployerDashboardView.AnalyticsCharts />
      <EmployerDashboardView.JobsTable />
      <EmployerDashboardView.RecentApplicants />
    </EmployerDashboardView>
  );
};

export default EmployerDashboard;
