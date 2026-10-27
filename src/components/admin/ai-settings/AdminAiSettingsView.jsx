import React from 'react';
import { AdminAiSettingsHeader } from './AdminAiSettingsHeader';
import { AdminAiWeightsController } from './AdminAiWeightsController';
import { AdminAiLiveSimulator } from './AdminAiLiveSimulator';
import { AdminAiSkillsTaxonomy } from './AdminAiSkillsTaxonomy';

export const AdminAiSettingsView = () => {
  return (
    <div className="space-y-6 2xl:space-y-8 3xl:space-y-10 animate-in fade-in duration-300">
      {/* 1. Header with Status & Algorithm Spec PDF Export */}
      <AdminAiSettingsHeader />

      {/* 2. Interactive 3 Sliders (Skill 50%, Experience 30%, Education 20%) & Presets */}
      <AdminAiWeightsController />

      {/* 3. Live Candidate vs Job Impact Simulator (Interactive FYP Defense Demonstration) */}
      <AdminAiLiveSimulator />

      {/* 4. Skills Taxonomy & Semantic Vectorizer Registry (1-Click Trending Skills) */}
      <AdminAiSkillsTaxonomy />
    </div>
  );
};

export default AdminAiSettingsView;
