import React from 'react';
import { GraduationCap, X } from 'lucide-react';
import { useProfile } from './ProfileContext';

export const ProfileEducationModal = () => {
  const {
    showEduModal,
    setShowEduModal,
    eduDegree,
    setEduDegree,
    eduInstitute,
    setEduInstitute,
    eduField,
    setEduField,
    eduYear,
    setEduYear,
    eduCgpa,
    setEduCgpa,
    eduStatus,
    setEduStatus,
    handleSaveEducation,
  } = useProfile();

  if (!showEduModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Add Academic Qualification</h3>
              <p className="text-xs text-slate-500">Degree, Institute & Academic Performance</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowEduModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveEducation} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Degree / Qualification Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. BS Computer Science, FSc Pre-Engineering, MBBS, BBA"
              value={eduDegree}
              onChange={(e) => setEduDegree(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Institute / University / College *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. FAST-NUCES, NUST, UET, Punjab University"
              value={eduInstitute}
              onChange={(e) => setEduInstitute(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Major / Field of Study
              </label>
              <input
                type="text"
                placeholder="e.g. Software Engineering, MBBS, Electrical Engg, BBA"
                value={eduField}
                onChange={(e) => setEduField(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Graduation / Passing Year
              </label>
              <input
                type="text"
                placeholder="e.g. 2026"
                value={eduYear}
                onChange={(e) => setEduYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                CGPA / Percentage / Grade
              </label>
              <input
                type="text"
                placeholder="e.g. 3.75 / 4.0 or 85%"
                value={eduCgpa}
                onChange={(e) => setEduCgpa(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Enrollment Status
              </label>
              <select
                value={eduStatus}
                onChange={(e) => setEduStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
              >
                <option value="Completed">Completed / Graduated</option>
                <option value="Currently Enrolled">Currently Enrolled</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowEduModal(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs cursor-pointer"
            >
              Save Education
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEducationModal;
