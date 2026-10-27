import React from 'react';
import { useCandidatePortal } from '../context/CandidatePortalContext';
import { ProfileView } from '../components/profile/ProfileView';

export const Profile = () => {
  const portalData = useCandidatePortal();

  return (
    <ProfileView {...portalData}>
      <ProfileView.HeroCard />
      <ProfileView.NavigationTabs />
      <ProfileView.TabContent />
      <ProfileView.EducationModal />
      <ProfileView.ExperienceModal />
    </ProfileView>
  );
};

export default Profile;
