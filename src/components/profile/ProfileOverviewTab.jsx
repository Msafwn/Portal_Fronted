import React from 'react';
import { Save, Plus, GraduationCap, Trash2, CheckCircle2, Globe, Link2 } from 'lucide-react';
import { useProfile } from './ProfileContext';

export const ProfileOverviewTab = ({ className = '' }) => {
  const {
    isSaving,
    bio,
    setBio,
    headline,
    setHeadline,
    location,
    setLocation,
    phone,
    setPhone,
    github,
    setGithub,
    linkedin,
    setLinkedin,
    portfolio,
    setPortfolio,
    handleSave,
    educationList,
    setShowEduModal,
    handleDeleteEducation,
    profile,
    stats,
    candidateSkills,
  } = useProfile();

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      <div className="lg:col-span-2 space-y-6">
        {/* Bio Card */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Professional Summary
            </h2>
            <span className="text-[11px] text-slate-400">AI Profile Narrative</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              About Me / Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share a concise professional summary highlighting your career goals and competencies..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white leading-relaxed resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Headline / Target Role
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. MERN Developer"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Location / City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Islamabad, Pakistan"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 1234567"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                GitHub / Code Repo
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                LinkedIn Profile
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Portfolio Website
              </label>
              <input
                type="text"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer shadow-xs ${
                isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Save className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
              <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>

        {/* Academic Credentials Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Academic Qualifications (20% Algorithm Weight)
              </h2>
              <span className="text-[11px] text-slate-400">Accredited degrees and diplomas</span>
            </div>
            <button
              type="button"
              onClick={() => setShowEduModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          </div>

          <div className="space-y-3">
            {educationList && educationList.length > 0 ? (
              educationList.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-xs text-slate-600 font-semibold">{edu.institute}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 pt-0.5 flex-wrap">
                        <span>
                          CGPA: <strong className="text-blue-600 font-black">{edu.cgpa}</strong>
                        </span>
                        <span>•</span>
                        <span>Class of {edu.graduationYear}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">{edu.status || 'Completed'}</span>
                      </div>
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
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                No education credentials listed yet. Click "Add Degree" to add your academic background.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Status & Strength Highlights */}
      <div className="space-y-6">
        {/* Profile Strength Checklist */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Profile Completeness
            </h3>
            <span className="text-xs font-extrabold text-blue-600">
              {stats?.profileCompletion || profile.stats?.profileCompletion || 92}%
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${stats?.profileCompletion || profile.stats?.profileCompletion || 92}%` }}
              className="bg-blue-600 h-full rounded-full"
            />
          </div>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Personal information verified</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Technical skills added ({candidateSkills.length} skills)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Academic credentials recorded</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Resume PDF uploaded & parsed</span>
            </div>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Connected Profiles
          </h3>
          <div className="space-y-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-600" />
                  <span>GitHub Repository</span>
                </span>
                <span className="text-[10px] text-blue-600 font-bold">Linked</span>
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn Profile</span>
                </span>
                <span className="text-[10px] text-blue-600 font-bold">Linked</span>
              </a>
            )}
            {portfolio && (
              <a
                href={portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>Portfolio Site</span>
                </span>
                <span className="text-[10px] text-blue-600 font-bold">Linked</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverviewTab;
