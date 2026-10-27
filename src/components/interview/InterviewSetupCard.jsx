import React, { useState } from 'react';
import {
  Sparkles,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Filter,
} from 'lucide-react';
import { PRESET_ROLES, DEPARTMENTS } from '../../services/interviewPrepService';
import { useCandidatePortal } from '../../context/CandidatePortalContext';

const InterviewSetupCard = ({ onStartInterview, loading }) => {
  const portal = useCandidatePortal();
  const currentDeptKey = portal?.activePersonaKey || 'it';

  const [activeDeptTab, setActiveDeptTab] = useState(currentDeptKey);
  const [selectedRoleId, setSelectedRoleId] = useState(() => {
    const firstForDept = PRESET_ROLES.find((r) => r.department === currentDeptKey);
    return firstForDept ? firstForDept.id : PRESET_ROLES[0].id;
  });
  const [customRoleTitle, setCustomRoleTitle] = useState('');
  const [customSkills, setCustomSkills] = useState('');
  const [customDepartment, setCustomDepartment] = useState(currentDeptKey);
  const [isCustom, setIsCustom] = useState(false);

  const filteredRoles =
    activeDeptTab === 'all'
      ? PRESET_ROLES
      : PRESET_ROLES.filter((r) => r.department === activeDeptTab);

  const handleStart = () => {
    if (isCustom) {
      if (!customRoleTitle.trim()) return;
      const skillsArray = customSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      onStartInterview({
        id: 'custom-' + Date.now(),
        department: customDepartment,
        departmentLabel:
          DEPARTMENTS.find((d) => d.key === customDepartment)?.label || 'Custom Discipline',
        title: customRoleTitle.trim(),
        icon: '💼',
        experienceLevel: 'Professional Level',
        skills: skillsArray.length ? skillsArray : ['Professional Competency'],
      });
    } else {
      const role = PRESET_ROLES.find((r) => r.id === selectedRoleId) || filteredRoles[0] || PRESET_ROLES[0];
      onStartInterview(role);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2152] via-[#091b42] to-[#06122d] border border-blue-500/25 p-6 sm:p-8 md:p-10 text-white shadow-2xl shadow-blue-950/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
            <span>Universal AI Mock Interview System — All 4 Disciplines</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Crack Your Dream Career with{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              AI Mock Interviews
            </span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100/80 leading-relaxed font-normal">
            Tailored for <strong className="text-cyan-300">IT & Software</strong>, <strong className="text-emerald-300">Medical & Healthcare</strong>, <strong className="text-amber-300">Engineering</strong>, and <strong className="text-purple-300">Business & Finance</strong>. Practice 10 structured questions with real-time AI scoring!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-blue-200/80 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10 Structured Questions
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Real-time 0-10 AI Grading
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Domain-Specific Evaluation
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" /> ~15-20 Min Session
            </span>
          </div>
        </div>
      </div>

      {/* Role Selection Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Select Your Target Discipline & Job Role
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Choose your department below to practice targeted interview scenarios.
            </p>
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-100">
          {DEPARTMENTS.map((dept) => {
            const isActive = activeDeptTab === dept.key;
            return (
              <button
                key={dept.key}
                type="button"
                onClick={() => {
                  setActiveDeptTab(dept.key);
                  setIsCustom(false);
                  const firstInDept = PRESET_ROLES.find(
                    (r) => dept.key === 'all' || r.department === dept.key
                  );
                  if (firstInDept) setSelectedRoleId(firstInDept.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{dept.icon}</span>
                <span>{dept.label}</span>
              </button>
            );
          })}
        </div>

        {/* Preset Cards Grid for Selected Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredRoles.map((role) => {
            const isSelected = !isCustom && selectedRoleId === role.id;
            const deptColor =
              role.department === 'medical'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : role.department === 'engineering'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : role.department === 'business'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-blue-50 text-blue-700 border-blue-200';

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => {
                  setIsCustom(false);
                  setSelectedRoleId(role.id);
                }}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden group flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-md shadow-blue-500/10 ring-2 ring-blue-600/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{role.icon}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${deptColor}`}>
                      {role.departmentLabel}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {role.title}
                  </h3>
                  <span className="inline-block text-[11px] font-medium text-slate-500 mt-0.5">
                    {role.experienceLevel}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                  {role.skills.slice(0, 3).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-[10px] text-slate-600 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                  {role.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-medium">
                      +{role.skills.length - 3}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Role Option Toggle */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setIsCustom(!isCustom)}
            className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
              isCustom
                ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                : 'border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">✨</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Custom Specialized Role (Any Department)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Enter any title across Medical, Engineering, Business, or IT (e.g. Cardiologist, Structural BIM Specialist, Equity Analyst)
                  </p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                isCustom ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {isCustom ? 'Selected' : 'Use Custom'}
              </span>
            </div>

            {isCustom && (
              <div className="mt-4 pt-4 border-t border-blue-200/60 space-y-3" onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Job Title / Position Name *
                    </label>
                    <input
                      type="text"
                      value={customRoleTitle}
                      onChange={(e) => setCustomRoleTitle(e.target.value)}
                      placeholder="e.g. Senior Pediatrician / Geotechnical Lead"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Discipline / Field
                    </label>
                    <select
                      value={customDepartment}
                      onChange={(e) => setCustomDepartment(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-white cursor-pointer"
                    >
                      <option value="it">💻 IT & Software</option>
                      <option value="medical">🩺 Medical & Healthcare</option>
                      <option value="engineering">🏗️ Engineering & Construction</option>
                      <option value="business">📊 Business & Finance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Key Core Competencies & Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={customSkills}
                    onChange={(e) => setCustomSkills(e.target.value)}
                    placeholder="e.g. Pediatric ICU, Patient Triage, Pharmacology, BLS"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-white"
                  />
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Start Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Interactive 10-Question Mock Test with AI instant grading across all fields.</span>
          </div>

          <button
            type="button"
            onClick={handleStart}
            disabled={loading || (isCustom && !customRoleTitle.trim())}
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating 10 AI Questions...</span>
              </>
            ) : (
              <>
                <span>Begin 10-Question Interview</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetupCard;
