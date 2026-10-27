import React from 'react';
import { Plus, Briefcase, Calendar, Trash2, Building2, Globe, Save } from 'lucide-react';
import { useProfile } from './ProfileContext';

export const ProfileExperienceTab = ({ className = '' }) => {
  const { experienceList, setExpType, setShowExpModal, handleDeleteExperience, handleSave, isSaving } = useProfile();

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Work Experience & Capstone Projects (30% Weight)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Practical industry jobs, internships, academic research, and technical projects.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setExpType('experience');
            setShowExpModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Experience / Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {experienceList && experienceList.length > 0 ? (
          experienceList.map((exp, idx) => {
            const isProject =
              exp.type === 'project' ||
              exp.title?.toLowerCase().includes('project') ||
              exp.title?.toLowerCase().includes('capstone') ||
              exp.title?.toLowerCase().includes('lead');
            return (
              <div
                key={exp.id || idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 hover:bg-white hover:shadow-xs transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{exp.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        isProject
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {isProject ? 'Project' : 'Work Experience'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </span>
                    {experienceList.length > 0 && handleDeleteExperience && (
                      <button
                        type="button"
                        onClick={() => handleDeleteExperience(exp.id || exp.title)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{exp.company}</span>
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {exp.description}
                </p>
                {exp.link && (
                  <div className="pt-1">
                    <a
                      href={exp.link.startsWith('http') ? exp.link : `https://${exp.link}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>View Project / Repository</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 mb-3">No work experience or projects recorded.</p>
            <button
              type="button"
              onClick={() => {
                setExpType('experience');
                setShowExpModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Experience or Project</span>
            </button>
          </div>
        )}
      </div>

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
          <span>{isSaving ? 'Saving to Database...' : 'Save Experience to Profile'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileExperienceTab;
