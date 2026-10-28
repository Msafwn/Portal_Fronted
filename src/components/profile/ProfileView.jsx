import React from 'react';
import { ProfileProvider, useProfile } from './ProfileContext';
import { ProfileHeroCard } from './ProfileHeroCard';
import { ProfileNavigationTabs } from './ProfileNavigationTabs';
import { ProfileTabContent } from './ProfileTabContent';
import { ProfileEducationModal } from './ProfileEducationModal';
import { ProfileExperienceModal } from './ProfileExperienceModal';

export const ProfileView = ({
  profile,
  candidateSkills,
  handleAddSkill,
  handleRemoveSkill,
  stats,
  educationList,
  handleAddEducation,
  handleDeleteEducation,
  experienceList,
  handleAddExperience,
  handleDeleteExperience,
  serverAtsAnalysis,
  children,
  className = '',
}) => {
  return (
    <ProfileProvider
      profile={profile}
      candidateSkills={candidateSkills}
      handleAddSkill={handleAddSkill}
      handleRemoveSkill={handleRemoveSkill}
      stats={stats}
      educationList={educationList}
      handleAddEducation={handleAddEducation}
      handleDeleteEducation={handleDeleteEducation}
      experienceList={experienceList}
      handleAddExperience={handleAddExperience}
      handleDeleteExperience={handleDeleteExperience}
      serverAtsAnalysis={serverAtsAnalysis}
    >
      <div className={`px-4 sm:px-6 lg:px-8 2xl:px-12 3xl:px-16 py-6 2xl:py-10 max-w-5xl 2xl:max-w-7xl 3xl:max-w-[1800px] 4k:max-w-[2200px] mx-auto space-y-6 2xl:space-y-10 ${className}`}>
        {children}
      </div>
    </ProfileProvider>
  );
};

// Compound subcomponent attachments
ProfileView.HeroCard = ProfileHeroCard;
ProfileView.NavigationTabs = ProfileNavigationTabs;
ProfileView.TabContent = ProfileTabContent;
ProfileView.EducationModal = ProfileEducationModal;
ProfileView.ExperienceModal = ProfileExperienceModal;

// Individual export for maximum flexibility
export {
  useProfile,
  ProfileHeroCard,
  ProfileNavigationTabs,
  ProfileTabContent,
  ProfileEducationModal,
  ProfileExperienceModal,
};

export default ProfileView;
