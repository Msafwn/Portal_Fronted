import React from 'react';
import { EmployerDashboardHero } from './EmployerDashboardHero';
import { EmployerKpiStats } from './EmployerKpiStats';
import { EmployerAnalyticsCharts } from './EmployerAnalyticsCharts';
import { EmployerJobsTable } from './EmployerJobsTable';
import { EmployerRecentApplicants } from './EmployerRecentApplicants';

export const EmployerDashboardView = ({ children, className = '' }) => {
  return (
    <div className={`space-y-6 2xl:space-y-8 3xl:space-y-10 animate-in fade-in duration-300 ${className}`}>
      {children || (
        <>
          <EmployerDashboardView.Hero />
          <EmployerDashboardView.KpiStats />
          <EmployerDashboardView.AnalyticsCharts />
          <EmployerDashboardView.JobsTable />
          <EmployerDashboardView.RecentApplicants />
        </>
      )}
    </div>
  );
};

EmployerDashboardView.Hero = EmployerDashboardHero;
EmployerDashboardView.KpiStats = EmployerKpiStats;
EmployerDashboardView.AnalyticsCharts = EmployerAnalyticsCharts;
EmployerDashboardView.JobsTable = EmployerJobsTable;
EmployerDashboardView.RecentApplicants = EmployerRecentApplicants;

export default EmployerDashboardView;
