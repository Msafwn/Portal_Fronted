import React, { useState, useEffect } from 'react';
import {
  Tag,
  Plus,
  Search,
  Trash2,
  Sparkles,
  Layers,
  Check,
  CheckCircle2,
  FolderTree,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminPortal } from '../../../context/AdminPortalContext';
import { Pagination } from '../../common/Pagination';

const CATEGORIES = [
  'ALL',
  'Computer Science & IT',
  'Emerging AI & Data',
  'Medical & Healthcare',
  'Engineering & Construction',
  'Business & Finance',
];

const QUICK_PRESETS = [
  { name: 'Next.js', category: 'Computer Science & IT', aliases: 'nextjs, ssr', multiplier: 1.1 },
  { name: 'Docker', category: 'Computer Science & IT', aliases: 'container, docker-compose', multiplier: 1.1 },
  { name: 'Flutter', category: 'Computer Science & IT', aliases: 'dart, flutter-mobile', multiplier: 1.0 },
  { name: 'Kubernetes', category: 'Computer Science & IT', aliases: 'k8s, cloud-cluster', multiplier: 1.2 },
  { name: 'LangChain & RAG', category: 'Emerging AI & Data', aliases: 'rag, llm-pipeline', multiplier: 1.25 },
  { name: 'TailwindCSS', category: 'Computer Science & IT', aliases: 'tailwind, utility-css', multiplier: 1.0 },
];

export const AdminAiSkillsTaxonomy = () => {
  const { skillsTaxonomy, addTaxonomySkill, removeTaxonomySkill } = useAdminPortal();

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // New Skill Form State
  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState('Computer Science & IT');
  const [newAliases, setNewAliases] = useState('');
  const [newMultiplier, setNewMultiplier] = useState('1.0');

  const filteredSkills = skillsTaxonomy.filter((s) => {
    if (selectedCategory !== 'ALL' && s.category !== selectedCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchAlias = s.aliases?.some((a) => a.toLowerCase().includes(q));
      if (!matchName && !matchAlias) return false;
    }
    return true;
  });

  // Clamp pagination when filters change
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredSkills.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [filteredSkills.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSkills = filteredSkills.slice(startIndex, startIndex + pageSize);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) {
      toast.error('Please enter a skill name.');
      return;
    }

    // Check duplicate
    if (
      skillsTaxonomy.some(
        (s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase()
      )
    ) {
      toast.error(`Skill "${newSkillName}" already exists in the taxonomy!`);
      return;
    }

    addTaxonomySkill({
      name: newSkillName,
      category: newCategory,
      aliases: newAliases,
      weightMultiplier: newMultiplier,
    });

    setNewSkillName('');
    setNewAliases('');
    setNewMultiplier('1.0');
  };

  const handleAddQuickPreset = (preset) => {
    if (
      skillsTaxonomy.some(
        (s) => s.name.toLowerCase() === preset.name.toLowerCase()
      )
    ) {
      toast.error(`Skill "${preset.name}" is already indexed!`);
      return;
    }

    addTaxonomySkill({
      name: preset.name,
      category: preset.category,
      aliases: preset.aliases,
      weightMultiplier: preset.multiplier,
    });
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Computer Science & IT':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Emerging AI & Data':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Medical & Healthcare':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Engineering & Construction':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Business & Finance':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 2xl:p-8 3xl:p-10 space-y-6 2xl:space-y-8">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 2xl:pb-6">
        <div className="flex items-center gap-2.5 2xl:gap-3.5">
          <div className="w-8 h-8 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <FolderTree className="w-4 h-4 2xl:w-5 2xl:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 2xl:gap-3">
              <h3 className="text-base sm:text-lg 2xl:text-2xl 3xl:text-3xl font-bold text-slate-900 tracking-tight">
                Skills Taxonomy & Vectorizer Registry
              </h3>
              <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                {skillsTaxonomy.length} Skills Indexed
              </span>
            </div>
            <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5">
              Admin-managed semantic vocabulary. Add new trending skills (e.g. Next.js, Docker, Flutter) to enable instant AI recognition.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Add Trending Presets Banner */}
      <div className="bg-slate-50 p-3.5 2xl:p-5 rounded-2xl 2xl:rounded-3xl border border-slate-200/80 space-y-2 2xl:space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs 2xl:text-sm 3xl:text-base font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 2xl:gap-2">
            <Sparkles className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span>1-Click Trending Skill Ingestion:</span>
          </span>
          <span className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-400">Click to instantly index into vocabulary</span>
        </div>

        <div className="flex flex-wrap gap-2 2xl:gap-3">
          {QUICK_PRESETS.map((preset) => {
            const alreadyAdded = skillsTaxonomy.some(
              (s) => s.name.toLowerCase() === preset.name.toLowerCase()
            );

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleAddQuickPreset(preset)}
                disabled={alreadyAdded}
                className={`inline-flex items-center gap-1 2xl:gap-1.5 px-3 2xl:px-4 py-1.5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-bold transition-all border ${
                  alreadyAdded
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-700 border-slate-200 hover:border-blue-300 shadow-2xs cursor-pointer'
                }`}
              >
                {alreadyAdded ? (
                  <Check className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-600" />
                ) : (
                  <Plus className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
                )}
                <span>{preset.name}</span>
                <span className="text-[10px] 2xl:text-xs text-slate-400 font-normal">({preset.multiplier}x)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Custom Skill Form */}
      <form
        onSubmit={handleAddSubmit}
        className="p-4 2xl:p-6 rounded-2xl 2xl:rounded-3xl bg-indigo-50/40 border border-indigo-100 space-y-3 2xl:space-y-4"
      >
        <span className="text-xs 2xl:text-sm 3xl:text-base font-bold uppercase tracking-wider text-indigo-900 block">
          Register Custom Skill in Vectorizer
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 2xl:gap-5 text-xs 2xl:text-sm 3xl:text-base">
          <div className="sm:col-span-4">
            <label className="block text-[11px] 2xl:text-xs 3xl:text-sm font-bold text-slate-600 mb-1 2xl:mb-2">
              Skill Title *
            </label>
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. Next.js 15, Terraform, PyTorch Lightning"
              className="w-full px-3 2xl:px-4 py-2 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white text-slate-800 text-xs 2xl:text-sm 3xl:text-base focus:ring-1 focus:ring-indigo-500 outline-hidden"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] 2xl:text-xs 3xl:text-sm font-bold text-slate-600 mb-1 2xl:mb-2">
              Faculty Category
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 2xl:px-4 py-2 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white text-slate-800 text-xs 2xl:text-sm 3xl:text-base focus:ring-1 focus:ring-indigo-500 outline-hidden"
            >
              {CATEGORIES.filter((c) => c !== 'ALL').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] 2xl:text-xs 3xl:text-sm font-bold text-slate-600 mb-1 2xl:mb-2">
              Synonyms / Aliases
            </label>
            <input
              type="text"
              value={newAliases}
              onChange={(e) => setNewAliases(e.target.value)}
              placeholder="e.g. next, ssr, react-framework"
              className="w-full px-3 2xl:px-4 py-2 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white text-slate-800 text-xs 2xl:text-sm 3xl:text-base focus:ring-1 focus:ring-indigo-500 outline-hidden"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2 2xl:py-3 px-3 2xl:px-4 rounded-xl 2xl:rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs 2xl:text-sm 3xl:text-base shadow-xs transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 2xl:gap-2"
            >
              <Plus className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              <span>Index Skill</span>
            </button>
          </div>
        </div>
      </form>

      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 2xl:gap-4 pt-2">
        <div className="relative flex-1 max-w-md 2xl:max-w-xl">
          <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute left-3 2xl:left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search indexed skills by name or synonym..."
            className="w-full pl-9 2xl:pl-12 pr-3 2xl:pr-4 py-2 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-white text-xs 2xl:text-sm 3xl:text-base text-slate-800 focus:ring-1 focus:ring-blue-500 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1 2xl:gap-1.5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 2xl:px-4 py-1 2xl:py-2 rounded-lg 2xl:rounded-xl text-xs 2xl:text-sm 3xl:text-base font-semibold shrink-0 transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Faculties' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Interactive Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-2.5 2xl:gap-4">
        {filteredSkills.length === 0 ? (
          <div className="col-span-full py-8 2xl:py-12 text-center text-slate-400 text-xs 2xl:text-sm 3xl:text-base">
            No indexed skills match your search.
          </div>
        ) : (
          paginatedSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-2.5 2xl:p-4 rounded-xl 2xl:rounded-2xl border border-slate-200/90 bg-white hover:border-blue-200 hover:shadow-2xs transition-all flex items-start justify-between gap-2 2xl:gap-3"
            >
              <div className="min-w-0">
                <span className="font-bold text-slate-900 text-xs 2xl:text-sm 3xl:text-base truncate block" title={skill.name}>
                  {skill.name}
                </span>
                <span
                  className={`inline-block px-1.5 2xl:px-2.5 py-0.5 rounded text-[10px] 2xl:text-xs 3xl:text-sm font-semibold border mt-1 truncate max-w-full ${getCategoryBadge(
                    skill.category
                  )}`}
                >
                  {skill.category}
                </span>
                <div className="flex items-center gap-1 text-[10px] 2xl:text-xs 3xl:text-sm text-slate-400 mt-1">
                  <span>Weight: {skill.weightMultiplier}x</span>
                  {skill.aliases && skill.aliases.length > 0 && (
                    <span>• {skill.aliases[0]}</span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeTaxonomySkill(skill.id)}
                className="text-slate-300 hover:text-rose-600 transition-colors p-1 2xl:p-1.5 cursor-pointer shrink-0"
                title="Remove from taxonomy"
              >
                <Trash2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Unique Reusable Pagination */}
      {filteredSkills.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredSkills.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[8, 12, 24, 48]}
          itemLabel="skills"
          className="rounded-xl 2xl:rounded-2xl border border-slate-200/80 shadow-2xs"
        />
      )}
    </div>
  );
};

export default AdminAiSkillsTaxonomy;
