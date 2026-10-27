import React, { createContext, useContext, useMemo } from 'react';

const DashboardContext = createContext(null);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('Dashboard subcomponents must be used within DashboardView / DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({
  profile = {},
  stats = {},
  jobs = [],
  appliedJobIds = [],
  handleApply,
  applicationsList = [],
  nextInterview = null,
  candidateRole = 'fresh_graduate',
  accountRole,
  handleSelectRole,
  roleFilterTab = 'all',
  setRoleFilterTab,
  children,
}) => {
  const roleConfig = useMemo(
    () => ({
      student: {
        badge: '🎓 Student Portal',
        welcomeSub:
          '🎓 Curated internships, research scholarships, and part-time opportunities tailored for your growth.',
        statLabel: 'Available Internships & Grants',
        tabs: [
          { label: '📚 All Opportunities', value: 'all' },
          { label: '🎓 Internships', value: 'internship' },
          { label: '🏆 Scholarships', value: 'scholarship' },
          { label: '⏰ Part-Time', value: 'part_time' },
        ],
      },
      fresh_graduate: {
        badge: '🚀 Fresh Graduate Portal',
        welcomeSub:
          '🚀 Curated entry-level roles, corporate trainee programs, and high-impact tracks tailored for you.',
        statLabel: 'Entry-Level & Trainee Jobs',
        tabs: [
          { label: '📚 All Jobs', value: 'all' },
          { label: '🚀 Entry-Level', value: 'entry_level' },
          { label: '🎯 Trainee Programs', value: 'trainee' },
        ],
      },
      experienced: {
        badge: '💼 Experienced Portal',
        welcomeSub:
          '💼 Curated mid-to-senior level positions, technical leadership roles, and executive opportunities.',
        statLabel: 'Mid & Senior Positions',
        tabs: [
          { label: '📚 All Roles', value: 'all' },
          { label: '💼 Mid-Level', value: 'mid_level' },
          { label: '👔 Senior Level', value: 'senior_level' },
        ],
      },
    }),
    []
  );

  const currentRoleConfig = roleConfig[candidateRole] || roleConfig.fresh_graduate;
  const topRecommendations = jobs.slice(0, 4);
  const recentApplications = applicationsList.slice(0, 2);

  const getJobTypeBadge = (jobType) => {
    switch (jobType) {
      case 'Internship':
        return { label: '🎓 Internship', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'Scholarship':
        return { label: '🏆 Scholarship', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'Part-time':
        return { label: '⏰ Part-Time', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'Trainee':
        return { label: '🎯 Trainee Program', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'Entry-Level':
        return { label: '🚀 Entry-Level', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'Mid-Level':
        return { label: '💼 Mid-Level', color: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'Senior Level':
        return { label: '👔 Senior Level', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      default:
        return { label: jobType || 'Standard Role', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        profile,
        stats,
        jobs,
        appliedJobIds,
        handleApply,
        applicationsList,
        candidateRole,
        accountRole: accountRole || profile?.accountRole || (profile?.role === 'professional' ? 'experienced' : profile?.role) || 'student',
        handleSelectRole,
        roleFilterTab,
        setRoleFilterTab,
        roleConfig,
        currentRoleConfig,
        topRecommendations,
        recentApplications,
        nextInterview,
        getJobTypeBadge,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
