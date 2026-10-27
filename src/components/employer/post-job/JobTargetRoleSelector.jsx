import React from 'react';
import { GraduationCap, Rocket, Briefcase, Check } from 'lucide-react';

export const JobTargetRoleSelector = ({
  targetRole,
  onChangeTargetRole,
  department = '',
}) => {
  const getExperiencedTags = () => {
    const dept = (department || '').toLowerCase();
    if (dept.includes('medic') || dept.includes('health') || dept.includes('pharm')) {
      return ['Mid-Senior', 'Specialist Doctor', 'Consultant'];
    }
    if (dept.includes('eng') || dept.includes('construct') || dept.includes('civil') || dept.includes('mech')) {
      return ['Mid-Senior', 'Lead Engineer', 'Project Lead'];
    }
    if (dept.includes('bus') || dept.includes('fin') || dept.includes('acc')) {
      return ['Mid-Senior', 'Senior Analyst', 'Finance Lead'];
    }
    return ['Mid-Senior', 'Senior Specialist', 'Team Lead'];
  };

  const roleOptions = [
    {
      id: 'student',
      title: 'Student / Intern',
      stageBadge: 'Intern & Scholar',
      icon: GraduationCap,
      description: 'Ongoing university students seeking hands-on mentorship, summer internships, or part-time roles.',
      matchTags: ['Internships', 'Scholarships', 'Mentorship'],
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'fresh_graduate',
      title: 'Fresh Graduate',
      stageBadge: 'Entry-Level',
      icon: Rocket,
      description: 'Recent degree holders with solid core fundamentals, high adaptability, and rapid learning drive.',
      matchTags: ['Graduate Trainee', 'Junior Role', 'Associate'],
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'experienced',
      title: 'Experienced Professional',
      stageBadge: 'Mid to Senior',
      icon: Briefcase,
      description: 'Seasoned specialists with proven track records, capable of driving systems and leading projects.',
      matchTags: getExperiencedTags(),
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl p-6 2xl:p-8 3xl:p-10 shadow-2xs space-y-4 2xl:space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
              1. Target Candidate Audience
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            Select the career stage to fine-tune the AI Candidate Matching algorithm.
          </p>
        </div>

        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shrink-0 whitespace-nowrap">
          AI Role Engine Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roleOptions.map((role) => {
          const isSelected = targetRole === role.id;
          const Icon = role.icon;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onChangeTargetRole(role.id)}
              className={`relative text-left p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-600/15 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs text-slate-700'
              }`}
            >
              <div>
                {/* Top Row: Icon + Check Indicator */}
                <div className="flex items-center justify-between mb-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/70'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-300 bg-white text-transparent group-hover:border-slate-400'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>

                {/* Title & Stage Badge */}
                <div className="space-y-1 mb-2">
                  <div className="flex items-center justify-between gap-1.5 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      {role.title}
                    </h3>
                    <span
                      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${role.badgeColor}`}
                    >
                      {role.stageBadge}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed min-h-[3rem]">
                  {role.description}
                </p>
              </div>

              {/* Bottom Matching Tags */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                {role.matchTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-600 font-medium border border-slate-200/60 whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JobTargetRoleSelector;
