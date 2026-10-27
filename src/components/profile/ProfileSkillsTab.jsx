import React from 'react';
import { Save } from 'lucide-react';
import { SkillPicker } from '../ui/SkillPicker';
import { useProfile } from './ProfileContext';

export const ProfileSkillsTab = ({ className = '' }) => {
  const { candidateSkills, handleAddSkill, handleRemoveSkill, handleSave, isSaving } = useProfile();

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs ${className}`}>
      <div>
        <h2 className="text-base font-bold text-slate-900">
          Verified Technical Skills (50% Weight)
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Add or remove skills to reflect your practical abilities. The 50-30-20 algorithm updates matching scores in real-time.
        </p>
      </div>

      <SkillPicker
        skills={candidateSkills}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
        label="Current Skills (Max 15)"
        maxSkills={15}
      />

      <div className="pt-3 border-t border-slate-100 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-sm transition-all cursor-pointer ${
            isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
          }`}
        >
          <Save className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
          <span>{isSaving ? 'Saving to Database...' : 'Save Skills to Profile'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSkillsTab;
