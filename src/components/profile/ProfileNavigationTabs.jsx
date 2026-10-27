import React from 'react';
import { User, GraduationCap, Layers, Briefcase, FileText } from 'lucide-react';
import { useProfile } from './ProfileContext';

export const ProfileNavigationTabs = ({ className = '' }) => {
  const { activeTab, setActiveTab, educationList, candidateSkills, experienceList } = useProfile();

  const tabs = [
    { id: 'overview', label: 'Profile Overview & Bio', icon: User },
    { id: 'education', label: `Education & Degrees (${educationList?.length || 0})`, icon: GraduationCap },
    { id: 'skills', label: `Technical Skills (${candidateSkills.length}/15)`, icon: Layers },
    { id: 'experience', label: `Experience & Projects (${experienceList?.length || 0})`, icon: Briefcase },
    { id: 'resume', label: 'Resume & Professional CV', icon: FileText },
  ];

  return (
    <div className={`flex items-center gap-2 2xl:gap-3.5 border-b border-slate-200 pb-2 2xl:pb-3 overflow-x-auto no-scrollbar sm:flex-wrap ${className}`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 2xl:gap-3 px-3.5 2xl:px-5 py-2 2xl:py-3 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base font-bold transition-all cursor-pointer shrink-0 ${
              isActive
                ? 'bg-blue-600 text-white shadow-xs shadow-blue-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon className="w-4 h-4 2xl:w-5 2xl:h-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProfileNavigationTabs;
