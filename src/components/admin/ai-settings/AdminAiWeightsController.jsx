import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Info,
  Scale,
  BookmarkCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminPortal } from '../../../context/AdminPortalContext';

export const AdminAiWeightsController = () => {
  const {
    aiSettings,
    setAiSettings,
    algorithmPresets,
    updateAiWeights,
    applyAlgorithmPreset,
  } = useAdminPortal();

  // Local draft sliders
  const [skillWeight, setSkillWeight] = useState(aiSettings.skillWeight);
  const [experienceWeight, setExperienceWeight] = useState(aiSettings.experienceWeight);
  const [educationWeight, setEducationWeight] = useState(aiSettings.educationWeight);
  const [minMatchThreshold, setMinMatchThreshold] = useState(aiSettings.minMatchThreshold);

  // Sync when context changes
  useEffect(() => {
    setSkillWeight(aiSettings.skillWeight);
    setExperienceWeight(aiSettings.experienceWeight);
    setEducationWeight(aiSettings.educationWeight);
    setMinMatchThreshold(aiSettings.minMatchThreshold);
  }, [aiSettings]);

  const totalSum = Number(skillWeight) + Number(experienceWeight) + Number(educationWeight);
  const isBalanced = totalSum === 100;

  // Real-time slider update handlers
  const handleSkillChange = (val) => {
    const num = Number(val);
    setSkillWeight(num);
    setAiSettings((prev) => ({ ...prev, skillWeight: num }));
  };

  const handleExpChange = (val) => {
    const num = Number(val);
    setExperienceWeight(num);
    setAiSettings((prev) => ({ ...prev, experienceWeight: num }));
  };

  const handleEduChange = (val) => {
    const num = Number(val);
    setEducationWeight(num);
    setAiSettings((prev) => ({ ...prev, educationWeight: num }));
  };

  const handleThresholdChange = (val) => {
    const num = Number(val);
    setMinMatchThreshold(num);
    setAiSettings((prev) => ({ ...prev, minMatchThreshold: num }));
  };

  // Auto-Normalize weights so they sum to exactly 100%
  const handleAutoNormalize = () => {
    if (totalSum === 0) {
      setSkillWeight(50);
      setExperienceWeight(30);
      setEducationWeight(20);
      setAiSettings((prev) => ({
        ...prev,
        skillWeight: 50,
        experienceWeight: 30,
        educationWeight: 20,
      }));
      toast.success('Normalized to 50 / 30 / 20 default.');
      return;
    }
    const factor = 100 / totalSum;
    const newSkill = Math.round(skillWeight * factor);
    const newExp = Math.round(experienceWeight * factor);
    const newEdu = 100 - newSkill - newExp;

    setSkillWeight(newSkill);
    setExperienceWeight(newExp);
    setEducationWeight(newEdu);
    setAiSettings((prev) => ({
      ...prev,
      skillWeight: newSkill,
      experienceWeight: newExp,
      educationWeight: newEdu,
    }));
    toast.success(`Weights normalized to 100% (${newSkill}% / ${newExp}% / ${newEdu}%) ⚖️`);
  };

  const handleSaveWeights = () => {
    if (!isBalanced) {
      toast.error(`Weights sum is currently ${totalSum}%. Please adjust or click Auto-Normalize so they equal 100%.`);
      return;
    }
    updateAiWeights({
      skillWeight: Number(skillWeight),
      experienceWeight: Number(experienceWeight),
      educationWeight: Number(educationWeight),
      minMatchThreshold: Number(minMatchThreshold),
    });
  };

  return (
    <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 2xl:p-8 3xl:p-9 space-y-6 2xl:space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 2xl:pb-6">
        <div>
          <div className="flex items-center gap-2 2xl:gap-3">
            <div className="w-8 h-8 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Scale className="w-4 h-4 2xl:w-6 2xl:h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-slate-900 tracking-tight">
                Linear Match Formulation Weights
              </h2>
              <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500">
                Configure the three foundational components of the candidate role-matching equation.
              </p>
            </div>
          </div>
        </div>

        {/* Live Sum Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {isBalanced ? (
            <span className="inline-flex items-center gap-1.5 px-3 2xl:px-4 py-1 2xl:py-1.5 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-emerald-600" />
              <span>Sum: {totalSum}% (Convex Balanced)</span>
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 2xl:px-4 py-1 2xl:py-1.5 rounded-full text-xs 2xl:text-sm 3xl:text-base font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-amber-600" />
                <span>Sum: {totalSum}% (≠ 100%)</span>
              </span>
              <button
                type="button"
                onClick={handleAutoNormalize}
                className="px-2.5 2xl:px-3.5 py-1 2xl:py-1.5 text-xs 2xl:text-sm font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg 2xl:rounded-xl cursor-pointer transition-colors"
              >
                Auto-Normalize
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Visual Weight Distribution Bar */}
      <div className="space-y-1.5 2xl:space-y-2">
        <div className="flex items-center justify-between text-xs 2xl:text-sm font-semibold text-slate-600">
          <span>Proportional Influence in Final Ranking</span>
          <span>Target Total: 100%</span>
        </div>
        <div className="h-5 2xl:h-7 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner border border-slate-200/80">
          <div
            style={{ width: `${Math.max(5, (skillWeight / totalSum) * 100)}%` }}
            className="bg-blue-600 h-full flex items-center justify-center text-[10px] 2xl:text-xs font-bold text-white transition-all duration-300 overflow-hidden"
            title={`Skill Match: ${skillWeight}%`}
          >
            Skill {skillWeight}%
          </div>
          <div
            style={{ width: `${Math.max(5, (experienceWeight / totalSum) * 100)}%` }}
            className="bg-indigo-600 h-full flex items-center justify-center text-[10px] 2xl:text-xs font-bold text-white transition-all duration-300 overflow-hidden"
            title={`Experience Match: ${experienceWeight}%`}
          >
            Exp {experienceWeight}%
          </div>
          <div
            style={{ width: `${Math.max(5, (educationWeight / totalSum) * 100)}%` }}
            className="bg-purple-600 h-full flex items-center justify-center text-[10px] 2xl:text-xs font-bold text-white transition-all duration-300 overflow-hidden"
            title={`Education Match: ${educationWeight}%`}
          >
            Edu {educationWeight}%
          </div>
        </div>
      </div>

      {/* 3 Interactive Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 2xl:gap-6">
        {/* Slider 1: Skill Weight */}
        <div className="p-4 2xl:p-6 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3 2xl:space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs 2xl:text-sm font-bold text-blue-900 uppercase tracking-wider">
              1. Skill Match Weight
            </span>
            <span className="text-base 2xl:text-xl font-extrabold text-blue-700 bg-white px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-lg border border-blue-200 shadow-2xs">
              {skillWeight}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={skillWeight}
            onChange={(e) => handleSkillChange(e.target.value)}
            className="w-full h-2 2xl:h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-[11px] 2xl:text-xs text-blue-950/70 leading-relaxed font-medium">
            Evaluates vector cosine similarity between candidate skills and required job proficiencies.
          </p>
        </div>

        {/* Slider 2: Experience Weight */}
        <div className="p-4 2xl:p-6 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-3 2xl:space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs 2xl:text-sm font-bold text-indigo-900 uppercase tracking-wider">
              2. Experience Weight
            </span>
            <span className="text-base 2xl:text-xl font-extrabold text-indigo-700 bg-white px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-lg border border-indigo-200 shadow-2xs">
              {experienceWeight}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={experienceWeight}
            onChange={(e) => handleExpChange(e.target.value)}
            className="w-full h-2 2xl:h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-[11px] 2xl:text-xs text-indigo-950/70 leading-relaxed font-medium">
            Evaluates duration of employment, project complexity, and seniority level alignment.
          </p>
        </div>

        {/* Slider 3: Education Weight */}
        <div className="p-4 2xl:p-6 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-3 2xl:space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs 2xl:text-sm font-bold text-purple-900 uppercase tracking-wider">
              3. Education Weight
            </span>
            <span className="text-base 2xl:text-xl font-extrabold text-purple-700 bg-white px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-lg border border-purple-200 shadow-2xs">
              {educationWeight}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={educationWeight}
            onChange={(e) => handleEduChange(e.target.value)}
            className="w-full h-2 2xl:h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <p className="text-[11px] 2xl:text-xs text-purple-950/70 leading-relaxed font-medium">
            Evaluates degree level (BS / MS / PhD), major discipline, CGPA, and university accreditation.
          </p>
        </div>
      </div>

      {/* Preset Profiles (Quick Switch) */}
      <div className="space-y-2.5 2xl:space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs 2xl:text-sm font-bold uppercase tracking-wider text-slate-500">
            One-Click Algorithmic Calibration Profiles
          </span>
          <span className="text-[11px] 2xl:text-xs text-slate-400">Instantly tune weights for examiner demonstrations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 2xl:gap-4">
          {algorithmPresets.map((preset) => {
            const isCurrent =
              aiSettings.skillWeight === preset.skillWeight &&
              aiSettings.experienceWeight === preset.experienceWeight &&
              aiSettings.educationWeight === preset.educationWeight;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyAlgorithmPreset(preset.id)}
                className={`p-3 2xl:p-4 rounded-xl 2xl:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] 2xl:text-xs font-bold px-1.5 py-0.2 2xl:px-2 2xl:py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {preset.badge}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] 2xl:text-xs font-extrabold text-indigo-700 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 2xl:w-4 2xl:h-4 text-indigo-600" />
                        Active
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs 2xl:text-sm font-bold text-slate-900 leading-snug">{preset.name}</h4>
                  <p className="text-[11px] 2xl:text-xs text-slate-500 mt-1 line-clamp-2">{preset.description}</p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] 2xl:text-xs font-mono font-bold text-indigo-900">
                  <span>{preset.skillWeight}% / {preset.experienceWeight}% / {preset.educationWeight}%</span>
                  <span className="text-[10px] 2xl:text-xs text-indigo-600 font-sans font-medium">Apply &rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Match Cutoff Threshold Slider & Save Footer */}
      <div className="pt-4 2xl:pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 2xl:gap-4 max-w-md 2xl:max-w-lg w-full">
          <span className="text-xs 2xl:text-sm font-semibold text-slate-600 shrink-0">
            Min Cutoff Threshold:
          </span>
          <input
            type="range"
            min="20"
            max="80"
            step="5"
            value={minMatchThreshold}
            onChange={(e) => handleThresholdChange(e.target.value)}
            className="w-full h-1.5 2xl:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <span className="text-xs 2xl:text-sm font-extrabold text-slate-800 shrink-0 bg-slate-100 px-2 2xl:px-3 py-0.5 2xl:py-1 rounded border border-slate-200 font-mono">
            {minMatchThreshold}%
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleSaveWeights}
            disabled={!isBalanced}
            className={`inline-flex items-center gap-2 px-5 py-2.5 2xl:px-7 2xl:py-3.5 rounded-xl 2xl:rounded-2xl text-xs sm:text-sm 2xl:text-base font-bold text-white transition-all shadow-xs ${
              isBalanced
                ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-indigo-600/20'
                : 'bg-slate-300 cursor-not-allowed opacity-60'
            }`}
          >
            <Zap className="w-4 h-4 2xl:w-5 2xl:h-5" />
            <span>Save & Re-Index Algorithm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAiWeightsController;
