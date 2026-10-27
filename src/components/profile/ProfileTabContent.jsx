import React from 'react';
import { useProfile } from './ProfileContext';
import { ProfileOverviewTab } from './ProfileOverviewTab';
import { ProfileEducationTab } from './ProfileEducationTab';
import { ProfileSkillsTab } from './ProfileSkillsTab';
import { ProfileExperienceTab } from './ProfileExperienceTab';
import { ProfileResumeTab } from './ProfileResumeTab';

export const ProfileTabContent = () => {
  const { activeTab } = useProfile();

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

export default ProfileTabContent;
