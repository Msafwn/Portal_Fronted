import React from 'react';
import { Briefcase, X } from 'lucide-react';
import { useProfile } from './ProfileContext';

export const ProfileExperienceModal = () => {
  const {
    showExpModal,
    setShowExpModal,
    expType,
    setExpType,
    expTitle,
    setExpTitle,
    expCompany,
    setExpCompany,
    expDuration,
    setExpDuration,
    expLink,
    setExpLink,
    expDescription,
    setExpDescription,
    handleSaveExperience,
  } = useProfile();

  if (!showExpModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {expType === 'project' ? 'Add Academic / Capstone Project' : 'Add Work Experience / Internship'}
              </h3>
              <p className="text-xs text-slate-500">Record industry roles, internships, or technical projects</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowExpModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type selector toggle */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setExpType('experience')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              expType === 'experience'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            💼 Work Experience / Job
          </button>
          <button
            type="button"
            onClick={() => setExpType('project')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              expType === 'project'
                ? 'bg-white text-purple-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🚀 Project / Capstone
          </button>
        </div>

        <form onSubmit={handleSaveExperience} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              {expType === 'project' ? 'Project Title *' : 'Job / Role Title *'}
            </label>
            <input
              type="text"
              required
              placeholder={expType === 'project' ? 'e.g. Smart Career Role Match AI System' : 'e.g. MERN Stack Intern, Junior Data Analyst'}
              value={expTitle}
              onChange={(e) => setExpTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {expType === 'project' ? 'Tech Stack / Org / University' : 'Company / Organization *'}
              </label>
              <input
                type="text"
                required={expType === 'experience'}
                placeholder={expType === 'project' ? 'e.g. React, Node.js, FastAPI' : 'e.g. CodeAlpha, Tech Solutions'}
                value={expCompany}
                onChange={(e) => setExpCompany(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Duration / Period
              </label>
              <input
                type="text"
                placeholder="e.g. Jun 2025 – Sep 2025"
                value={expDuration}
                onChange={(e) => setExpDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              />
            </div>
          </div>

          {expType === 'project' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Live Demo or GitHub Link (Optional)
              </label>
              <input
                type="text"
                placeholder="https://github.com/..."
                value={expLink}
                onChange={(e) => setExpLink(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              {expType === 'project' ? 'Project Highlights & Features' : 'Key Responsibilities & Deliverables'}
            </label>
            <textarea
              rows={3}
              placeholder={expType === 'project' ? 'Describe key problem solved, algorithms used, and architecture...' : 'Briefly describe key tasks and technologies used...'}
              value={expDescription}
              onChange={(e) => setExpDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowExpModal(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs cursor-pointer"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileExperienceModal;
