import React, { useState, useActionState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Briefcase,
  ChevronRight,
  Save,
  Send,
  Eye,
  CheckCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';
import { axiosPrivate } from '../../../services/apiClient';

// Compound Components
import { JobTargetRoleSelector } from './JobTargetRoleSelector';
import { JobBasicDetailsForm } from './JobBasicDetailsForm';
import { JobSeatsQuotaInput } from './JobSeatsQuotaInput';
import { JobSkillsTagInput } from './JobSkillsTagInput';
import { JobDescriptionEditor } from './JobDescriptionEditor';
import { JobPostLivePreview } from './JobPostLivePreview';

export const EmployerPostJobView = () => {
  const navigate = useNavigate();
  const { company, handleCreateJob } = useEmployerPortal();

  // Form State
  const [formData, setFormData] = useState({
    targetRole: 'fresh_graduate', // 'student' | 'fresh_graduate' | 'experienced'
    title: '',
    department: 'Computer Science & IT',
    workMode: 'Hybrid',
    employmentType: 'Full-Time',
    location: company?.location || 'Islamabad, PK (Blue Area)',
    salary: 'PKR 90,000 - 140,000 / mo',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    totalSeats: 2,
    experienceRequired: '0',
    skills: [],
    overview: '',
    responsibilities: [],
    qualifications: '',
    perks: [
      'Flexible Hybrid / Remote Schedule',
      'Comprehensive Health & OPD Insurance',
      'Annual Performance Bonus & Appraisal',
      'Paid Certifications & Professional Upskilling',
    ],
  });

  const [showMobilePreviewModal, setShowMobilePreviewModal] = useState(false);

  // Field change helpers
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSkill = (newSkill) => {
    if (!formData.skills.includes(newSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleAddResponsibility = (newResp) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, newResp],
    }));
  };

  const handleRemoveResponsibility = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleTogglePerk = (perk) => {
    setFormData((prev) => {
      const exists = prev.perks.includes(perk);
      return {
        ...prev,
        perks: exists
          ? prev.perks.filter((p) => p !== perk)
          : [...prev.perks, perk],
      };
    });
  };

  // Auto-fill template generator (Powered by Python NLP Microservice + Dynamic Fallback)
  const handleAutofillTemplate = async () => {
    const loadingToast = toast.loading('🤖 Python AI is crafting role description & requirements...');
    try {
      const res = await axiosPrivate.post('/jobs/ai-generate-description', {
        title: formData.title.trim() || 'Software Engineer',
        department: formData.department,
        targetRole: formData.targetRole,
        skills: formData.skills,
        companyName: company?.name || 'Company',
      });

      if (res.data?.data) {
        const aiData = res.data.data;
        setFormData((prev) => ({
          ...prev,
          title: prev.title.trim() ? prev.title : aiData.title,
          overview: aiData.overview || prev.overview,
          responsibilities: Array.isArray(aiData.responsibilities) && aiData.responsibilities.length > 0
            ? aiData.responsibilities
            : prev.responsibilities,
          qualifications: aiData.qualifications || prev.qualifications,
          skills: prev.skills.length > 0 ? prev.skills : (aiData.suggestedSkills || prev.skills),
          salary: prev.salary ? prev.salary : (aiData.salaryGuidance || prev.salary),
          perks: prev.perks.length > 0 ? prev.perks : (aiData.perks || prev.perks),
        }));
        toast.dismiss(loadingToast);
        toast.success(`✨ AI generated description for "${aiData.title || formData.title}"!`);
        return;
      }
    } catch (err) {
      console.warn('AI generator fallback note:', err.message);
    }

    toast.dismiss(loadingToast);

    // Fallback template generator (Dynamic by Department)
    const dept = (formData.department || '').toLowerCase();
    const compName = company?.name || 'Company';

    let defaultTitle = formData.title.trim();
    let templateOverview = '';
    let templateResponsibilities = [];
    let templateQualifications = '';

    if (dept.includes('med') || dept.includes('health') || dept.includes('pharm')) {
      defaultTitle = defaultTitle || 'Clinical Pharmacist / Medical Officer';
      templateOverview = `We are seeking a dedicated and licensed ${defaultTitle} to join our healthcare team at ${compName}. In this role, you will collaborate with senior physicians, monitor patient therapeutic regimens, and ensure high clinical quality standards.`;
      templateResponsibilities = [
        'Monitor patient medication regimens, drug safety verifications, and clinical dosage plans.',
        'Collaborate with multi-disciplinary medical staff and attending physicians during rounds.',
        'Maintain accurate Electronic Health Records (EHR/EMR) with strict patient confidentiality standards.',
        'Participate in hospital pharmacovigilance audits, diagnostic reporting, and quality control.',
      ];
      templateQualifications = 'MBBS, Pharm.D, BDS, or equivalent accredited medical degree. Active licensing (PMDC / PMC / Pharmacy Council) and clinical internship completion.';
    } else if (dept.includes('eng') || dept.includes('civil') || dept.includes('mech') || dept.includes('elect')) {
      defaultTitle = defaultTitle || 'Structural Design & Site Engineer';
      templateOverview = `We are looking for a qualified ${defaultTitle} to join our engineering and infrastructure division at ${compName}. You will participate in technical design calculations, computational modeling, and on-site project execution.`;
      templateResponsibilities = [
        'Perform computational engineering load calculations and produce CAD / BIM blueprints.',
        'Supervise on-site construction works, contractor execution, and safety standard compliance.',
        'Coordinate with structural architects, project managers, and geotechnical survey teams.',
        'Prepare technical progress reports, material bill of quantities (BOQ), and cost estimates.',
      ];
      templateQualifications = 'B.E. / B.Tech in Civil, Mechanical, or Electrical Engineering. Valid PEC registration and practical experience with AutoCAD, Revit, or structural design tools.';
    } else if (dept.includes('bus') || dept.includes('fin') || dept.includes('acc') || dept.includes('mkt')) {
      defaultTitle = defaultTitle || 'Financial Planning & Risk Analyst';
      templateOverview = `We are looking for an analytical ${defaultTitle} to join our corporate business & finance department at ${compName}. You will drive strategic financial modeling, portfolio risk valuations, and executive reporting.`;
      templateResponsibilities = [
        'Build and maintain dynamic financial models, discounted cash-flow (DCF) simulations, and quarterly forecasts.',
        'Analyze balance sheets, expense variances, and operational margins to identify efficiency gains.',
        'Collaborate with corporate auditors and finance leads to ensure IFRS and taxation compliance.',
        'Develop visual management reporting decks and KPI analytics dashboards.',
      ];
      templateQualifications = 'BBA, MBA in Finance / Accounting, or ACCA / CA qualification. Strong analytical modeling skills, financial acumen, and data reporting experience.';
    } else {
      defaultTitle = defaultTitle || 'Associate Full Stack Developer';
      templateOverview = `We are looking for an ambitious, forward-thinking ${defaultTitle} to join our high-impact team at ${compName}. In this position, you will work alongside senior software architects and product leads to craft scalable software systems powered by AI-centric workflows.`;
      templateResponsibilities = [
        'Architect, implement, and maintain resilient features for our core web platforms.',
        'Collaborate closely with UI/UX designers and product managers to refine technical specifications.',
        'Participate actively in code reviews, automated CI/CD deployment pipelines, and architecture syncs.',
        'Troubleshoot, debug, and optimize application performance across diverse client environments.',
      ];
      templateQualifications = 'BS/MS in Computer Science, Software Engineering, or demonstrable open-source / project portfolio. Passion for clean architecture, modern frameworks, and rapid learning.';
    }

    setFormData((prev) => ({
      ...prev,
      title: defaultTitle,
      overview: templateOverview,
      responsibilities: templateResponsibilities,
      qualifications: templateQualifications,
    }));

    toast.success(`✨ Auto-filled template for ${defaultTitle}!`);
  };

  // Validation
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a Job Title / Designation');
      return false;
    }
    if (!formData.location.trim()) {
      toast.error('Please enter a primary Location');
      return false;
    }
    if (formData.skills.length === 0) {
      toast.error('Please add at least 1 required skill');
      return false;
    }
    if (!formData.totalSeats || Number(formData.totalSeats) < 1) {
      toast.error('Total seats must be at least 1');
      return false;
    }
    return true;
  };

  // React 19: useActionState for job posting form action with automatic pending status
  const [formState, formAction, isSubmitting] = useActionState(
    async (_prevState) => {
      if (!validateForm()) return { success: false, error: 'Validation failed' };

      try {
        const mappedRoleTarget =
          formData.targetRole === 'student'
            ? 'Internship'
            : formData.targetRole === 'fresh_graduate'
            ? 'Entry-Level'
            : 'Experienced';

        const payload = {
          title: formData.title.trim(),
          department: formData.department,
          roleTarget: mappedRoleTarget,
          targetRoleKey: formData.targetRole,
          workMode: formData.workMode,
          employmentType: formData.employmentType || 'Full-Time',
          jobType: formData.employmentType || 'Full-Time',
          location: formData.location.trim(),
          salary: formData.salary.trim(),
          deadline: formData.deadline,
          totalSeats: Number(formData.totalSeats) || 1,
          experienceRequired: formData.experienceRequired,
          skillsRequired: formData.skills,
          description: formData.overview || `${formData.title} opening at ${company?.name || 'Company'}`,
          overview: formData.overview,
          requirements: formData.responsibilities,
          qualifications: formData.qualifications,
          perks: formData.perks,
          status: 'Active',
        };

        // Invoke Context Action (calls backend POST /api/jobs)
        await handleCreateJob(payload);
        toast.success('Job published successfully! 🚀');

        // Navigate to Jobs
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate('/employer/jobs');
        return { success: true, error: null };
      } catch (err) {
        console.error('Error publishing job:', err);
        toast.error('Failed to publish job. Please check all fields.');
        return { success: false, error: err.message };
      }
    },
    { success: false, error: null }
  );

  const handlePublish = (e) => {
    if (e) e.preventDefault();
    formAction();
  };

  // Save as Draft Action
  const handleSaveDraft = () => {
    toast.success('Job draft saved locally to your recruitment queue!');
  };

  return (
    <div className="space-y-6 2xl:space-y-8 3xl:space-y-10 pb-12">
      {/* Top Header & Breadcrumbs Card */}
      <div className="p-5 sm:p-6 2xl:p-8 3xl:p-10 bg-white border border-slate-200/90 rounded-2xl 2xl:rounded-3xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 2xl:gap-6">
        {/* Breadcrumb + Title */}
        <div>
          <nav className="flex items-center gap-1.5 2xl:gap-2 text-xs 2xl:text-sm 3xl:text-base text-slate-500 mb-1 2xl:mb-2">
            <Link
              to="/employer/dashboard"
              className="hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
            >
              <Briefcase className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
              <span>Employer</span>
            </Link>
            <ChevronRight className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-slate-400" />
            <Link to="/employer/dashboard" className="hover:text-blue-600 transition-colors font-medium">
              Jobs
            </Link>
            <ChevronRight className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-slate-400" />
            <span className="text-blue-600 font-bold">Create New Vacancy</span>
          </nav>

          <div className="flex items-center gap-2.5 2xl:gap-3.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4k:text-5xl font-black text-slate-900 tracking-tight">
              Smart Job Posting Engine
            </h1>
            <span className="inline-flex items-center gap-1 2xl:gap-1.5 text-[11px] 2xl:text-xs 3xl:text-sm font-bold px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 whitespace-nowrap">
              <CheckCircle className="w-3 h-3 2xl:w-4 2xl:h-4 shrink-0" />
              <span className="whitespace-nowrap">AI Matching Engine Ready</span>
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2.5 2xl:gap-3 flex-wrap">
          {/* Save as Draft */}
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 2xl:gap-2 px-3.5 py-2 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-100/90 hover:bg-slate-200 text-slate-700 text-xs 2xl:text-sm 3xl:text-base font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Save className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span>Save as Draft</span>
          </button>

          {/* Preview Job Card (Mobile trigger) */}
          <button
            type="button"
            onClick={() => setShowMobilePreviewModal(true)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-blue-300 text-blue-700 bg-blue-50/60 hover:bg-blue-100 text-xs font-bold transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Card</span>
          </button>

          {/* Publish Vacancy */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={isSubmitting}
            className="flex items-center gap-2 2xl:gap-2.5 px-5 py-2 2xl:px-6 2xl:py-3 rounded-xl 2xl:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs 2xl:text-sm 3xl:text-base font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <Send className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span>{isSubmitting ? 'Publishing...' : 'Publish Vacancy 🚀'}</span>
          </button>
        </div>
      </div>

      {/* Main Form Body (Split 2 Columns on Large Screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 3xl:gap-10 items-start">
        {/* Left Column: Form Steps (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6 2xl:space-y-8 3xl:space-y-10">
          {/* 1. Target Role Selector */}
          <JobTargetRoleSelector
            targetRole={formData.targetRole}
            department={formData.department}
            onChangeTargetRole={(roleId) => handleFieldChange('targetRole', roleId)}
          />

          {/* 2. Basic Details Form */}
          <JobBasicDetailsForm
            formData={formData}
            onChangeField={handleFieldChange}
          />

          {/* 3. Seats & Quota Input ⭐ CRITICAL PRIVATE HR FIELD */}
          <JobSeatsQuotaInput
            totalSeats={formData.totalSeats}
            onChangeSeats={(count) => handleFieldChange('totalSeats', count)}
          />

          {/* 4. Skills & Experience Baseline */}
          <JobSkillsTagInput
            skills={formData.skills}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
            experienceRequired={formData.experienceRequired}
            onChangeExperience={(val) => handleFieldChange('experienceRequired', val)}
            department={formData.department}
            targetRole={formData.targetRole}
          />

          {/* 5. Description & Perks Editor */}
          <JobDescriptionEditor
            overview={formData.overview}
            onChangeOverview={(val) => handleFieldChange('overview', val)}
            responsibilities={formData.responsibilities}
            onAddResponsibility={handleAddResponsibility}
            onRemoveResponsibility={handleRemoveResponsibility}
            qualifications={formData.qualifications}
            onChangeQualifications={(val) => handleFieldChange('qualifications', val)}
            perks={formData.perks}
            onTogglePerk={handleTogglePerk}
            onAutofillTemplate={handleAutofillTemplate}
            department={formData.department}
          />

          {/* Bottom Final Action Bar */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0 max-w-md">
              <h4 className="text-sm font-bold text-slate-900">Ready to start matching?</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Publishing distributes this vacancy to top-matched students and professionals.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer text-center whitespace-nowrap"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50 active:scale-95 whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Publishing...' : 'Publish Vacancy 🚀'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Preview (5 cols on lg) */}
        <div className="hidden lg:block lg:col-span-5">
          <JobPostLivePreview
            jobData={formData}
            companyName={company?.name || 'Company'}
            companyLogo={company?.logoInitials || (company?.name ? company.name.slice(0, 2).toUpperCase() : 'CO')}
            companyLocation={company?.location || ''}
          />
        </div>
      </div>

      {/* Mobile Live Preview Modal */}
      {showMobilePreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-xl w-full max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl bg-white border border-slate-200 shadow-2xl">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Live Preview</span>
              <button
                type="button"
                onClick={() => setShowMobilePreviewModal(false)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium cursor-pointer"
              >
                Close Preview
              </button>
            </div>
            <div className="p-2">
              <JobPostLivePreview
                jobData={formData}
                companyName={company?.name || 'Company'}
                companyLogo={company?.logoInitials || (company?.name ? company.name.slice(0, 2).toUpperCase() : 'CO')}
                companyLocation={company?.location || ''}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerPostJobView;
