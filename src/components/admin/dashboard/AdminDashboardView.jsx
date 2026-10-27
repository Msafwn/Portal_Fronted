import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { AdminDashboardHeader } from './AdminDashboardHeader';
import { AdminKpiMetrics } from './AdminKpiMetrics';
import { AdminActivityCharts } from './AdminActivityCharts';
import { AdminSystemHealthCard } from './AdminSystemHealthCard';
import { AdminRecentAuditLog } from './AdminRecentAuditLog';
import { useAdminPortal } from '../../../context/AdminPortalContext';

export const AdminDashboardView = () => {
  const { kpis } = useAdminPortal();

  const operationalModules = [
    {
      to: '/admin/users',
      title: 'Candidate & User Control Desk',
      description: 'Audit registered students, graduates, and professionals. Manage profile activations, role classifications, and security flags.',
      stat: `${kpis.totalCandidates} Candidates`,
      badge: 'Active Roster',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Users,
      accentBorder: 'hover:border-blue-300',
    },
    {
      to: '/admin/employers',
      title: 'Employer Verification Desk',
      description: 'Authenticate corporate credentials, NTN, and recruiter identities to eliminate fraudulent entities before they post vacancies.',
      stat: `${kpis.pendingEmployersCount} Pending Reviews`,
      badge: 'Attention Needed',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Building2,
      accentBorder: 'hover:border-amber-300',
    },
    {
      to: '/admin/jobs',
      title: 'Job Moderation & Compliance',
      description: 'Oversee multi-discipline vacancy listings across all sectors. Inspect AI match score distributions and block spam postings.',
      stat: `${kpis.activeJobsCount} Active Vacancies`,
      badge: 'Compliant',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: ShieldCheck,
      accentBorder: 'hover:border-emerald-300',
    },
  ];

  return (
    <div className="space-y-6 2xl:space-y-8 3xl:space-y-10 animate-in fade-in duration-300">
      {/* 1. Dashboard Executive Header */}
      <AdminDashboardHeader />

      {/* 2. Top Tier Master KPIs */}
      <AdminKpiMetrics />

      {/* 3. ApexCharts Activity Trends & Discipline Segments */}
      <AdminActivityCharts />

      {/* 4. Quick Operational Modules Navigation */}
      <div>
        <div className="flex items-center justify-between mb-3 2xl:mb-4 px-1">
          <div>
            <h3 className="text-sm 2xl:text-base 3xl:text-xl font-bold text-slate-800 tracking-tight">
              Administrative Operation Centers
            </h3>
            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500">
              Direct access to candidate control, corporate vetting, and vacancy moderation desks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-6 3xl:gap-8">
          {operationalModules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <Link
                key={i}
                to={mod.to}
                className={`p-5 2xl:p-7 3xl:p-9 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group ${mod.accentBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 2xl:mb-4">
                    <div className="w-10 h-10 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 rounded-xl 2xl:rounded-2xl bg-slate-100 group-hover:bg-blue-50 text-slate-700 group-hover:text-blue-600 border border-slate-200 group-hover:border-blue-200 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 transition-transform group-hover:scale-110" />
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold border ${mod.badgeColor}`}
                    >
                      {mod.badge}
                    </span>
                  </div>

                  <h4 className="text-sm 2xl:text-base 3xl:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {mod.title}
                  </h4>
                  <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-1 2xl:mt-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 2xl:pt-6 mt-4 2xl:mt-6 border-t border-slate-100 flex items-center justify-between text-xs 2xl:text-sm 3xl:text-base font-semibold">
                  <span className="text-slate-900 font-bold">{mod.stat}</span>
                  <span className="inline-flex items-center gap-1 text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Manage</span>
                    <ArrowRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 5. Core Infrastructure Health & Telemetry */}
      <AdminSystemHealthCard />

      {/* 6. Real-Time Audit Log & Security Events */}
      <AdminRecentAuditLog />
    </div>
  );
};

export default AdminDashboardView;
