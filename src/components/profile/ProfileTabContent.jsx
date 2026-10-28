import React, { Suspense, lazy } from 'react';
import { useProfile } from './ProfileContext';
import { Loader2 } from 'lucide-react';

const ProfileOverviewTab = lazy(() =>
  import('./ProfileOverviewTab').then((m) => ({ default: m.ProfileOverviewTab }))
);
const ProfileEducationTab = lazy(() =>
  import('./ProfileEducationTab').then((m) => ({ default: m.ProfileEducationTab }))
);
const ProfileSkillsTab = lazy(() =>
  import('./ProfileSkillsTab').then((m) => ({ default: m.ProfileSkillsTab }))
);
const ProfileExperienceTab = lazy(() =>
  import('./ProfileExperienceTab').then((m) => ({ default: m.ProfileExperienceTab }))
);
const ProfileResumeTab = lazy(() =>
  import('./ProfileResumeTab').then((m) => ({ default: m.ProfileResumeTab }))
);

const TabLoader = () => (
  <div className="bg-white rounded-3xl border border-slate-200 p-12 flex flex-col items-center justify-center text-slate-400">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
    <span className="text-xs font-semibold text-slate-500">Loading profile section...</span>
  </div>
);

export const ProfileTabContent = () => {
  const { activeTab } = useProfile();

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <ProfileOverviewTab />;
      case 'education':
        return <ProfileEducationTab />;
      case 'skills':
        return <ProfileSkillsTab />;
      case 'experience':
        return <ProfileExperienceTab />;
      case 'resume':
        return <ProfileResumeTab />;
      default:
        return <ProfileOverviewTab />;
    }
  };

  return <Suspense fallback={<TabLoader />}>{renderTab()}</Suspense>;
};

export default ProfileTabContent;
