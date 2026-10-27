import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';
import { useUpdateProfileMutation } from '../../../store/api/authApiSlice';
import { setCredentials } from '../../../store/slices/authSlice';
import { CompanyProfileHeader } from './CompanyProfileHeader';
import { CompanyDetailsForm } from './CompanyDetailsForm';
import { CompanyQuotaCard } from './CompanyQuotaCard';
import { CompanyRecruiterCard } from './CompanyRecruiterCard';
import { Save, CheckCircle, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

export const CompanyProfileView = () => {
  const {
    company,
    setCompany,
    recruiter,
    setRecruiter,
  } = useEmployerPortal();

  const dispatch = useDispatch();
  const [updateProfileApi, { isLoading: isApiSaving }] = useUpdateProfileMutation();

  // Local Form States
  const [companyForm, setCompanyForm] = useState({
    name: company.name || 'TechLogix Global Solutions',
    industry: company.industry || 'Enterprise AI & Cloud Engineering',
    tagline: company.tagline || 'Building next-generation intelligent platforms for global scale',
    location: company.location || 'Islamabad, Pakistan (Hybrid / Global)',
    website: company.website || 'https://techlogix-global.example.com',
    about: company.about || 'TechLogix Global Solutions is a leading multinational technology consultancy specializing in enterprise AI, cloud architecture, and mission-critical software engineering.',
    logoInitials: company.logoInitials || 'TL',
    verified: company.verified ?? true,
    tier: company.tier || 'Enterprise Partner',
    totalSeatsQuota: company.totalSeatsQuota || 12,
    filledSeatsCount: company.filledSeatsCount || 5,
  });

  const [recruiterForm, setRecruiterForm] = useState({
    name: recruiter.name || 'Ayesha Malik',
    role: recruiter.role || 'Lead Technical Recruiter & Talent Partner',
    email: recruiter.email || 'ayesha.m@techlogix.io',
    phone: recruiter.phone || '+92 (51) 844-9201',
    avatar: recruiter.avatar || '',
    department: recruiter.department || 'Talent Acquisition & University Relations',
  });

  const [isSaving, setIsSaving] = useState(false);

  // Sync form whenever authenticated company/recruiter changes in context
  useEffect(() => {
    if (company) {
      setCompanyForm((prev) => ({
        ...prev,
        ...company,
      }));
    }
    if (recruiter) {
      setRecruiterForm((prev) => ({
        ...prev,
        ...recruiter,
      }));
    }
  }, [company, recruiter]);

  const handleCompanyFieldChange = (field, value) => {
    setCompanyForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'name' && value.trim()) {
        const words = value.trim().split(/\s+/);
        updated.logoInitials = words.length > 1
          ? (words[0][0] + words[1][0]).toUpperCase()
          : value.slice(0, 2).toUpperCase();
      }
      return updated;
    });
  };

  const handleRecruiterFieldChange = (field, value) => {
    setRecruiterForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        name: recruiterForm.name,
        phone: recruiterForm.phone,
        department: recruiterForm.department,
        headline: recruiterForm.role,
        location: companyForm.location,
        bio: companyForm.about,
        companyProfile: {
          companyName: companyForm.name,
          industry: companyForm.industry,
          website: companyForm.website,
          description: companyForm.about,
          companySize: companyForm.tier || `${companyForm.totalSeatsQuota || 12} seats`,
          tagline: companyForm.tagline,
          logoInitials: companyForm.logoInitials,
          totalSeatsQuota: Number(companyForm.totalSeatsQuota) || 12,
          filledSeatsCount: Number(companyForm.filledSeatsCount) || 0,
        },
      };

      const response = await updateProfileApi(payload).unwrap();
      const updatedUser = response?.data;

      if (updatedUser) {
        dispatch(setCredentials({ user: updatedUser }));
      }

      setCompany(companyForm);
      setRecruiter(recruiterForm);
      toast.success('🎉 Company profile & HR settings saved to database successfully!');
    } catch (err) {
      const msg =
        err?.data?.message ||
        (Array.isArray(err?.data?.errors) && err.data.errors[0]) ||
        err?.message ||
        'Failed to save profile changes.';
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setCompanyForm({
      ...company,
    });
    setRecruiterForm({
      ...recruiter,
    });
    toast.success('Form reset to saved values');
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6 2xl:space-y-8 3xl:space-y-10 animate-in fade-in duration-200">
      {/* 1. Header with Logo & Verified Status */}
      <CompanyProfileHeader company={companyForm} />

      {/* 2. Public Company Details Form */}
      <CompanyDetailsForm
        formData={companyForm}
        onChangeField={handleCompanyFieldChange}
      />

      {/* 3. Private HR Seats Quota Card */}
      <CompanyQuotaCard
        totalSeatsQuota={companyForm.totalSeatsQuota}
        filledSeatsCount={companyForm.filledSeatsCount}
        onChangeQuota={(val) => handleCompanyFieldChange('totalSeatsQuota', val)}
      />

      {/* 4. Recruiter Profile Settings */}
      <CompanyRecruiterCard
        recruiter={recruiterForm}
        onChangeRecruiter={handleRecruiterFieldChange}
      />

      {/* 5. Sticky Action Bar */}
      <div className="bg-white p-4 sm:p-5 2xl:p-7 3xl:p-8 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4 sticky bottom-4 z-20">
        <div className="flex items-center gap-2 text-xs 2xl:text-sm 3xl:text-base text-slate-500">
          <CheckCircle className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-600" />
          <span>All edits are automatically validated before being published to candidate cards.</span>
        </div>

        <div className="flex items-center gap-3 2xl:gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 2xl:px-6 2xl:py-3 rounded-xl 2xl:rounded-2xl text-xs sm:text-sm 2xl:text-base font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span>Reset</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 2xl:px-7 2xl:py-3.5 rounded-xl 2xl:rounded-2xl text-xs sm:text-sm 2xl:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm shadow-blue-500/20 hover:shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4 2xl:w-5 2xl:h-5" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CompanyProfileView;
