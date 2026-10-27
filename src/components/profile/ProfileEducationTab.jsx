import React from 'react';
import { Plus, GraduationCap, Trash2, Save } from 'lucide-react';
import { useProfile } from './ProfileContext';

export const ProfileEducationTab = ({ className = '' }) => {
  const { educationList, profile, setShowEduModal, handleDeleteEducation, handleSave, isSaving } = useProfile();

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Academic Degrees & Credentials (20% Weight)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Formal education records, universities, and academic metrics utilized for qualification filtering.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowEduModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educationList && educationList.length > 0 ? (
          educationList.map((edu) => (
            <div
              key={edu.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-xs text-slate-600 font-semibold">{edu.institute}</p>
                  </div>
                </div>
                {educationList.length > 1 && handleDeleteEducation && (
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Degree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium">
                  Major: <strong>{edu.field || profile.department}</strong>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                  CGPA: {edu.cgpa}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  Graduation: {edu.graduationYear}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {edu.status || 'Completed'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium mb-3">No education credentials added yet.</p>
            <button
              type="button"
              onClick={() => setShowEduModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Degree</span>
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
          <span>{isSaving ? 'Saving to Database...' : 'Save Education to Profile'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileEducationTab;
