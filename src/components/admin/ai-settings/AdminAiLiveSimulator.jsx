import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Briefcase,
  GraduationCap,
  Award,
  ChevronRight,
  Calculator,
  Equal,
  Search,
  ArrowUpRight,
  FilterX,
  SlidersHorizontal,
} from 'lucide-react';
import { useAdminPortal } from '../../../context/AdminPortalContext';
import { Pagination } from '../../common/Pagination';

const BENCHMARK_ARCHETYPES = [
  {
    id: 'bench-fresh',
    name: 'Fresh Graduate Archetype',
    type: 'Entry Level Candidate (BS CS)',
    targetJob: 'Associate Software Engineer',
    avatar: '',
    scores: {
      skill: 88,
      experience: 20,
      education: 85,
    },
    note: 'When Skill Weight is increased from 50% to 70%, match score improves because strong technical skills balance lack of corporate tenure.',
  },
  {
    id: 'bench-pro',
    name: 'Senior Professional Archetype',
    type: 'Experienced Professional (5+ Yrs Industry)',
    targetJob: 'Senior Systems Architect',
    avatar: '',
    scores: {
      skill: 80,
      experience: 95,
      education: 70,
    },
    note: 'When Experience Weight is increased, verified industry tenure drives the composite score to the top tier.',
  },
  {
    id: 'bench-academic',
    name: 'Academic Researcher Archetype',
    type: 'Postgraduate Scholar (MS / PhD)',
    targetJob: 'R&D Research Specialist',
    avatar: '',
    scores: {
      skill: 75,
      experience: 40,
      education: 95,
    },
    note: 'When Education Weight is prioritized, advanced degree credentials and academic distinctions elevate composite ranking.',
  },
];

const DISCIPLINES = [
  'ALL',
  'Computer Science & IT',
  'Medical & Healthcare',
  'Engineering & Construction',
  'Business & Finance',
];

export const AdminAiLiveSimulator = () => {
  const { aiSettings, candidates = [] } = useAdminPortal();

  // Compute breakdown scores for any candidate
  const getCandidateScores = (cand) => {
    if (cand.scores) return cand.scores;
    const skill = Math.min(98, Math.max(62, (cand.matchScore || 85) + 3));
    const experience =
      cand.role === 'professional' ? 95 : cand.role === 'fresh_graduate' ? 52 : 22;
    const education =
      cand.cgpa?.includes('3.8') || cand.cgpa?.includes('Honors')
        ? 96
        : cand.cgpa?.includes('3.')
        ? 88
        : 78;
    return { skill, experience, education };
  };

  // Build candidate choices from real candidates if available, otherwise generic benchmarks
  const candidateOptions = useMemo(() => {
    if (Array.isArray(candidates) && candidates.length > 0) {
      return candidates.slice(0, 5).map((c, i) => {
        const scores = getCandidateScores(c);
        return {
          id: c.id || c._id || `cand-${i}`,
          name: c.name || `Candidate #${i + 1}`,
          type: `${c.role === 'student' ? 'Student' : c.role === 'fresh_graduate' ? 'Fresh Graduate' : 'Professional'} • ${c.discipline || 'General'}`,
          targetJob: c.targetRole || 'Target Vacancy',
          avatar: c.avatar || '',
          scores,
          note: `Real candidate loaded from live database. Adjusted algorithm weights recalculate this candidate's match score in real time.`,
        };
      });
    }
    return BENCHMARK_ARCHETYPES;
  }, [candidates]);

  const [selectedCandidate, setSelectedCandidate] = useState(candidateOptions[0]);

  // Sync selectedCandidate when candidateOptions changes
  useEffect(() => {
    if (candidateOptions.length > 0) {
      setSelectedCandidate((prev) => {
        if (!prev) return candidateOptions[0];
        const match = candidateOptions.find((c) => c.id === prev.id);
        return match || candidateOptions[0];
      });
    }
  }, [candidateOptions]);

  // Candidate roster search and pagination state
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredCandidates = candidates.filter((cand) => {
    if (selectedDiscipline !== 'ALL' && cand.discipline !== selectedDiscipline) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const mName = cand.name.toLowerCase().includes(q);
      const mRole = cand.targetRole?.toLowerCase().includes(q);
      const mInst = cand.institution?.toLowerCase().includes(q);
      if (!mName && !mRole && !mInst) return false;
    }
    return true;
  });

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredCandidates.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [filteredCandidates.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCandidates = filteredCandidates.slice(startIndex, startIndex + pageSize);

  // Baseline 50 / 30 / 20 score calculation
  const baselineScore = Math.round(
    (selectedCandidate?.scores?.skill || 80) * 0.5 +
      (selectedCandidate?.scores?.experience || 50) * 0.3 +
      (selectedCandidate?.scores?.education || 75) * 0.2
  );

  // Current live calibrated weights calculation
  const currentSkillContr = (selectedCandidate?.scores?.skill || 80) * (aiSettings.skillWeight / 100);
  const currentExpContr = (selectedCandidate?.scores?.experience || 50) * (aiSettings.experienceWeight / 100);
  const currentEduContr = (selectedCandidate?.scores?.education || 75) * (aiSettings.educationWeight / 100);
  const liveScore = Math.round(currentSkillContr + currentExpContr + currentEduContr);

  const scoreDiff = liveScore - baselineScore;

  return (
    <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 2xl:p-8 3xl:p-10 space-y-5 2xl:space-y-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 2xl:pb-6">
        <div className="flex items-center gap-2.5 2xl:gap-3.5">
          <div className="w-8 h-8 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <Calculator className="w-4 h-4 2xl:w-5 2xl:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 2xl:gap-3">
              <h3 className="text-base sm:text-lg 2xl:text-2xl 3xl:text-3xl font-bold text-slate-900 tracking-tight">
                Live Algorithm Impact Simulator
              </h3>
              <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                FYP Defense Tool
              </span>
            </div>
            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5">
              Move sliders above to see candidate match scores recalculate in real-time.
            </p>
          </div>
        </div>

        {/* Candidate Selector Tabs */}
        <div className="flex items-center gap-1.5 2xl:gap-2.5 overflow-x-auto no-scrollbar py-1">
          {candidateOptions.map((cand) => {
            const isSelected = selectedCandidate?.id === cand.id;
            return (
              <button
                key={cand.id}
                type="button"
                onClick={() => setSelectedCandidate(cand)}
                className={`px-3 2xl:px-4 py-1.5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold shrink-0 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {cand.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Presentation Grid: Responsive Stack on Laptop/Medium Screens */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 2xl:gap-8 items-stretch min-w-0">
        {/* Left Column: Candidate & Job Context */}
        <div className="xl:col-span-4 p-4 sm:p-5 2xl:p-7 3xl:p-8 rounded-2xl 2xl:rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4 2xl:space-y-6 min-w-0">
          <div>
            <div className="flex items-center gap-3 2xl:gap-4">
              {selectedCandidate?.avatar ? (
                <img loading="lazy" decoding="async"
                  src={selectedCandidate.avatar}
                  alt={selectedCandidate.name}
                  className="w-12 h-12 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 rounded-xl 2xl:rounded-2xl object-cover border border-slate-300 shadow-2xs shrink-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-12 h-12 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 rounded-xl 2xl:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-sm 2xl:text-lg 3xl:text-xl shadow-2xs shrink-0">
                  {((selectedCandidate?.name || 'CD')
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('') || 'CD').toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <h4 className="text-sm 2xl:text-lg 3xl:text-xl font-bold text-slate-900 truncate">
                  {selectedCandidate?.name}
                </h4>
                <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-blue-600 font-semibold truncate">
                  {selectedCandidate?.type}
                </p>
              </div>
            </div>

            <div className="mt-4 2xl:mt-6 space-y-2.5 2xl:space-y-4 pt-3 2xl:pt-4 border-t border-slate-200 text-xs 2xl:text-sm 3xl:text-base">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 2xl:gap-2">
                  <Award className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600 shrink-0" />
                  <span>Skill Competency:</span>
                </span>
                <span className="font-extrabold text-blue-700 font-mono">
                  {selectedCandidate?.scores?.skill || 0}%
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 2xl:gap-2">
                  <Briefcase className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-indigo-600 shrink-0" />
                  <span>Work Experience:</span>
                </span>
                <span className="font-extrabold text-indigo-700 font-mono">
                  {selectedCandidate?.scores?.experience || 0}%
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 2xl:gap-2">
                  <GraduationCap className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-purple-600 shrink-0" />
                  <span>Academic Degree:</span>
                </span>
                <span className="font-extrabold text-purple-700 font-mono">
                  {selectedCandidate?.scores?.education || 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 2xl:p-4 bg-white rounded-xl 2xl:rounded-2xl border border-slate-200 text-[11px] 2xl:text-xs 3xl:text-sm text-slate-600 leading-relaxed font-medium">
            💡 {selectedCandidate?.note || 'Live algorithm simulation mode.'}
          </div>
        </div>

        {/* Right Column: Live Mathematical Formulation Breakdown */}
        <div className="xl:col-span-8 p-5 sm:p-6 2xl:p-8 3xl:p-9 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200/90 text-slate-900 flex flex-col justify-between space-y-4 2xl:space-y-6 shadow-2xs min-w-0 overflow-hidden">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 2xl:pb-4 min-w-0">
            <div className="min-w-0">
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold uppercase tracking-wider text-slate-400 block">
                Target Simulated Vacancy
              </span>
              <h4 className="text-sm 2xl:text-lg 3xl:text-xl font-bold text-slate-900 mt-0.5 truncate" title={selectedCandidate?.targetJob}>
                {selectedCandidate?.targetJob}
              </h4>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm uppercase font-bold text-slate-400 block">
                Standard Baseline (50/30/20)
              </span>
              <span className="text-xs 2xl:text-sm 3xl:text-base font-mono font-bold text-slate-700">
                {baselineScore}% Match
              </span>
            </div>
          </div>

          {/* Step-by-Step Mathematical Calculation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 2xl:gap-5 min-w-0">
            <div className="bg-blue-50/70 p-3.5 2xl:p-5 rounded-xl 2xl:rounded-2xl border border-blue-200/80 min-w-0">
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold uppercase tracking-wider text-blue-900 block truncate">
                Skill Factor ({aiSettings.skillWeight}%)
              </span>
              <div className="text-2xl 2xl:text-4xl 3xl:text-5xl font-black font-mono text-blue-700 mt-1">
                {currentSkillContr.toFixed(1)}%
              </div>
              <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-blue-950/70 mt-0.5 truncate">
                {selectedCandidate?.scores?.skill || 0}% × {aiSettings.skillWeight}% weight
              </p>
            </div>

            <div className="bg-indigo-50/70 p-3.5 2xl:p-5 rounded-xl 2xl:rounded-2xl border border-indigo-200/80 min-w-0">
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold uppercase tracking-wider text-indigo-900 block truncate">
                Exp Factor ({aiSettings.experienceWeight}%)
              </span>
              <div className="text-2xl 2xl:text-4xl 3xl:text-5xl font-black font-mono text-indigo-700 mt-1">
                {currentExpContr.toFixed(1)}%
              </div>
              <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-indigo-950/70 mt-0.5 truncate">
                {selectedCandidate?.scores?.experience || 0}% × {aiSettings.experienceWeight}% weight
              </p>
            </div>

            <div className="bg-purple-50/70 p-3.5 2xl:p-5 rounded-xl 2xl:rounded-2xl border border-purple-200/80 min-w-0">
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-bold uppercase tracking-wider text-purple-900 block truncate">
                Edu Factor ({aiSettings.educationWeight}%)
              </span>
              <div className="text-2xl 2xl:text-4xl 3xl:text-5xl font-black font-mono text-purple-700 mt-1">
                {currentEduContr.toFixed(1)}%
              </div>
              <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-purple-950/70 mt-0.5 truncate">
                {selectedCandidate?.scores?.education || 0}% × {aiSettings.educationWeight}% weight
              </p>
            </div>
          </div>

          {/* Visual Score Meter & Final Composite Result */}
          <div className="pt-3 2xl:pt-5 border-t border-slate-100 space-y-2 2xl:space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 font-medium block">
                  Live Calibrated Role Match Score:
                </span>
                <div className="flex items-baseline gap-2.5 2xl:gap-3.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl 2xl:text-5xl 3xl:text-6xl font-black text-slate-900 font-mono tracking-tight">
                    {liveScore}%
                  </span>
                  <span
                    className={`text-xs 2xl:text-sm 3xl:text-base font-bold px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-md 2xl:rounded-lg border ${
                      liveScore >= aiSettings.minMatchThreshold
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {liveScore >= aiSettings.minMatchThreshold
                      ? '✓ Recommends Candidate'
                      : '⛔ Below Cutoff'}
                  </span>
                </div>
              </div>

              {/* Variance Badge */}
              <div className="flex items-center gap-2">
                <div
                  className={`px-3 2xl:px-4 py-1.5 2xl:py-2 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold flex items-center gap-1.5 2xl:gap-2 border shadow-2xs ${
                    scoreDiff > 0
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : scoreDiff < 0
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0" />
                  <span>
                    {scoreDiff > 0
                      ? `+${scoreDiff}% score increase`
                      : scoreDiff < 0
                      ? `${scoreDiff}% score decrease`
                      : 'Exact baseline 50-30-20 match'}
                  </span>
                </div>
              </div>
            </div>

            {/* Smooth Animated Progress Bar */}
            <div className="w-full h-3 2xl:h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
              <div
                style={{ width: `${Math.min(100, Math.max(0, liveScore))}%` }}
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full transition-all duration-300 shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Batch Candidate Recalibration Roster & Algorithm Sensitivity Table */}
      <div className="pt-4 2xl:pt-6 border-t border-slate-100 space-y-3 2xl:space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 2xl:gap-4">
          <div>
            <div className="flex items-center gap-2 2xl:gap-3">
              <h4 className="text-sm 2xl:text-lg 3xl:text-xl font-bold text-slate-900 tracking-tight">
                Candidate Roster Algorithmic Sensitivity Matrix
              </h4>
              <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                Live Dynamic Sync
              </span>
            </div>
            <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-500 mt-0.5">
              Every candidate's composite match score recalculates in real-time as sliders are adjusted above.
            </p>
          </div>

          {/* Search & Discipline Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 2xl:gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400 absolute left-2.5 2xl:left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidate name or role..."
                className="pl-8 2xl:pl-10 pr-3 2xl:pr-4 py-1.5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-xs 2xl:text-sm 3xl:text-base text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden w-full sm:w-56 2xl:w-72 3xl:w-80 transition-all"
              />
            </div>

            <div className="flex items-center gap-1 2xl:gap-1.5 overflow-x-auto no-scrollbar">
              {DISCIPLINES.map((disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => setSelectedDiscipline(disc)}
                  className={`px-2 2xl:px-3 py-1 2xl:py-1.5 rounded-lg 2xl:rounded-xl text-[11px] 2xl:text-xs 3xl:text-sm font-semibold shrink-0 transition-colors cursor-pointer border ${
                    selectedDiscipline === disc
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {disc === 'ALL' ? 'All Faculties' : disc.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-xl 2xl:rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs 2xl:text-sm 3xl:text-base">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold text-[11px] 2xl:text-xs 3xl:text-sm uppercase tracking-wider">
              <tr>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-3 2xl:px-4">Candidate</th>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">Faculty Discipline</th>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4">Target Role</th>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-2 2xl:px-3 text-center">Skill ({aiSettings.skillWeight}%)</th>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-2 2xl:px-3 text-center">Exp ({aiSettings.experienceWeight}%)</th>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-2 2xl:px-3 text-center">Edu ({aiSettings.educationWeight}%)</th>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4 text-center">Base (50/30/20)</th>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4 text-center">Live Calibrated</th>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-2.5 2xl:px-4 text-center">Net Impact</th>
                <th className="py-2.5 2xl:py-3.5 3xl:py-4 px-3 2xl:px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedCandidates.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 2xl:py-12 text-center text-slate-400 text-xs 2xl:text-sm 3xl:text-base">
                    No candidates found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedCandidates.map((cand) => {
                  const scores = getCandidateScores(cand);
                  const candBase = Math.round(
                    scores.skill * 0.5 + scores.experience * 0.3 + scores.education * 0.2
                  );
                  const candLive = Math.round(
                    scores.skill * (aiSettings.skillWeight / 100) +
                      scores.experience * (aiSettings.experienceWeight / 100) +
                      scores.education * (aiSettings.educationWeight / 100)
                  );
                  const diff = candLive - candBase;
                  const isCurrent = selectedCandidate.id === cand.id;

                  return (
                    <tr
                      key={cand.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isCurrent ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      {/* Candidate */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-3 2xl:px-4">
                        <div className="flex items-center gap-2 2xl:gap-3">
                          <img loading="lazy" decoding="async"
                            src={cand.avatar}
                            alt={cand.name}
                            className="w-7 h-7 2xl:w-10 2xl:h-10 rounded-lg 2xl:rounded-xl object-cover border border-slate-200/80 shadow-2xs shrink-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 text-xs 2xl:text-sm 3xl:text-base truncate block">
                              {cand.name}
                            </span>
                            <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-slate-400 truncate block">
                              {cand.roleLabel || cand.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Discipline */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-2.5 2xl:px-4">
                        <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-medium text-slate-700 truncate max-w-[130px] 2xl:max-w-[200px] block">
                          {cand.discipline}
                        </span>
                      </td>

                      {/* Target Role */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-2.5 2xl:px-4">
                        <span className="text-[11px] 2xl:text-xs 3xl:text-sm font-semibold text-slate-800 truncate max-w-[150px] 2xl:max-w-[220px] block">
                          {cand.targetRole}
                        </span>
                      </td>

                      {/* Skill Score */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-2 2xl:px-3 text-center font-mono font-bold text-blue-700 text-xs 2xl:text-sm 3xl:text-base">
                        {scores.skill}%
                      </td>

                      {/* Experience Score */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-2 2xl:px-3 text-center font-mono font-bold text-indigo-700 text-xs 2xl:text-sm 3xl:text-base">
                        {scores.experience}%
                      </td>

                      {/* Education Score */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-2 2xl:px-3 text-center font-mono font-bold text-purple-700 text-xs 2xl:text-sm 3xl:text-base">
                        {scores.education}%
                      </td>

                      {/* Baseline Score */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-2.5 2xl:px-4 text-center font-mono text-xs 2xl:text-sm 3xl:text-base text-slate-500 font-semibold">
                        {candBase}%
                      </td>

                      {/* Live Score */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-2.5 2xl:px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-xs 2xl:text-sm 3xl:text-base font-black font-mono border ${
                            candLive >= aiSettings.minMatchThreshold
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {candLive}%
                        </span>
                      </td>

                      {/* Delta */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-2.5 2xl:px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-0.5 text-[11px] 2xl:text-xs 3xl:text-sm font-bold ${
                            diff > 0
                              ? 'text-emerald-600'
                              : diff < 0
                              ? 'text-rose-600'
                              : 'text-slate-400'
                          }`}
                        >
                          {diff > 0 ? `+${diff}%` : diff < 0 ? `${diff}%` : '0%'}
                        </span>
                      </td>

                      {/* Quick Inspect Button */}
                      <td className="py-2 2xl:py-3 3xl:py-4 px-3 2xl:px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCandidate({
                              id: cand.id,
                              name: cand.name,
                              type: cand.roleLabel || cand.role,
                              targetJob: cand.targetRole,
                              avatar: cand.avatar,
                              scores: scores,
                              note: `Loaded live from candidates registry. Evaluated against target position: ${cand.targetRole}.`,
                            });
                            window.scrollTo({ top: 380, behavior: 'smooth' });
                          }}
                          className={`px-2 2xl:px-3.5 py-1 2xl:py-1.5 rounded-lg 2xl:rounded-xl text-[11px] 2xl:text-xs 3xl:text-sm font-bold border transition-colors cursor-pointer inline-flex items-center gap-1 2xl:gap-1.5 ${
                            isCurrent
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <span>{isCurrent ? 'Active' : 'Test'}</span>
                          <ArrowUpRight className="w-3 h-3 2xl:w-4 2xl:h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Unique Reusable Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredCandidates.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[5, 10, 20]}
            itemLabel="evaluated candidates"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAiLiveSimulator;
