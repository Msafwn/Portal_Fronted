import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
  useUpdateProfileMutation,
  useUpdateCandidateProfileMutation,
} from '../../store/api/authApiSlice';
import { setCredentials } from '../../store/slices/authSlice';

const ProfileContext = createContext(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('Profile subcomponents must be used within ProfileView / ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({
  profile = {},
  candidateSkills = [],
  handleAddSkill,
  handleRemoveSkill,
  stats = {},
  educationList = [],
  handleAddEducation,
  handleDeleteEducation,
  experienceList = [],
  handleAddExperience,
  handleDeleteExperience,
  children,
}) => {
  // Local state for editable profile fields
  const [currentAvatar, setCurrentAvatar] = useState(profile.avatar || '');
  const [headline, setHeadline] = useState(profile.headline || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [phone, setPhone] = useState(profile.phone || '+92 300 1234567');
  const [location, setLocation] = useState(profile.location || 'Islamabad, Pakistan');
  const [github, setGithub] = useState(profile.links?.github || '');
  const [linkedin, setLinkedin] = useState(profile.links?.linkedin || '');
  const [portfolio, setPortfolio] = useState(profile.links?.portfolio || '');
  const [uploadedResume, setUploadedResume] = useState(profile.resumeFileName || 'Resume_2026.pdf');
  const [resumeSize, setResumeSize] = useState(profile.resumeFileSize || '1.4 MB');
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'education' | 'skills' | 'experience' | 'resume'

  // Education modal & form state
  const [showEduModal, setShowEduModal] = useState(false);
  const [eduDegree, setEduDegree] = useState('');
  const [eduInstitute, setEduInstitute] = useState('');
  const [eduField, setEduField] = useState('');
  const [eduCgpa, setEduCgpa] = useState('');
  const [eduYear, setEduYear] = useState('');
  const [eduStatus, setEduStatus] = useState('Completed');

  // Experience modal & form state
  const [showExpModal, setShowExpModal] = useState(false);
  const [expType, setExpType] = useState('experience'); // 'experience' | 'project'
  const [expTitle, setExpTitle] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expDuration, setExpDuration] = useState('');
  const [expDescription, setExpDescription] = useState('');
  const [expLink, setExpLink] = useState('');

  // Sync when profile prop changes
  useEffect(() => {
    setCurrentAvatar(profile.avatar || '');
    setHeadline(profile.headline || '');
    setBio(profile.bio || '');
    setPhone(profile.phone || '+92 300 1234567');
    setLocation(profile.location || 'Islamabad, Pakistan');
    setGithub(profile.links?.github || '');
    setLinkedin(profile.links?.linkedin || '');
    setPortfolio(profile.links?.portfolio || '');
    setUploadedResume(profile.resumeFileName || 'Resume_2026.pdf');
    setResumeSize(profile.resumeFileSize || '1.4 MB');
  }, [profile]);

  const handleSaveEducation = (e) => {
    e.preventDefault();
    if (!eduDegree.trim() || !eduInstitute.trim()) {
      toast.error('Degree name and Institute are required.');
      return;
    }
    if (handleAddEducation) {
      handleAddEducation({
        degree: eduDegree.trim(),
        institute: eduInstitute.trim(),
        field: eduField.trim() || profile.department,
        cgpa: eduCgpa.trim() || '3.70 / 4.0',
        graduationYear: eduYear.trim() || '2026',
        status: eduStatus,
      });
    }
    setEduDegree('');
    setEduInstitute('');
    setEduField('');
    setEduCgpa('');
    setEduYear('');
    setShowEduModal(false);
  };

  const handleSaveExperience = (e) => {
    e.preventDefault();
    if (!expTitle.trim()) {
      toast.error(expType === 'project' ? 'Project Title is required.' : 'Job Title is required.');
      return;
    }
    if (handleAddExperience) {
      handleAddExperience({
        type: expType,
        title: expTitle.trim(),
        company: expCompany.trim() || (expType === 'project' ? 'Academic / Portfolio Project' : 'Company'),
        duration: expDuration.trim() || '2025 – Present',
        description: expDescription.trim() || 'Hands-on practical deliverables and accomplishments.',
        link: expLink.trim(),
      });
    }
    setExpTitle('');
    setExpCompany('');
    setExpDuration('');
    setExpDescription('');
    setExpLink('');
    setShowExpModal(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentAvatar(event.target.result);
        toast.success('Profile avatar updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setUploadedResume(file.name);
        setResumeSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
        setIsUploading(false);
        toast.success(`Resume "${file.name}" uploaded and synced with your profile!`);
      }, 1200);
    }
  };

  const [updateCandidateProfileMutation, { isLoading: isSavingProfile }] =
    useUpdateCandidateProfileMutation();
  const dispatch = useDispatch();

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const payload = {
        name: profile.name,
        headline,
        bio,
        phone,
        location,
        avatar: currentAvatar,
        links: { github, linkedin, portfolio },
        resumeUrl: uploadedResume,
        resumeFileName: uploadedResume,
        resumeFileSize: resumeSize,
        skills: candidateSkills,
        education: educationList,
        experience: experienceList,
      };
      const response = await updateCandidateProfileMutation(payload).unwrap();
      const updatedUser = response?.data?.profile || response?.data;
      if (updatedUser) {
        dispatch(setCredentials({ user: updatedUser }));
      }
      toast.success('Profile and credentials updated successfully to database! 🎉');
    } catch (err) {
      toast.error(
        err?.data?.message || 'Failed to update profile. Please try again.'
      );
    }
  };

  const value = {
    isSaving: isSavingProfile,
    profile,
    candidateSkills,
    handleAddSkill,
    handleRemoveSkill,
    stats,
    educationList,
    handleAddEducation,
    handleDeleteEducation,
    experienceList,
    handleAddExperience,
    handleDeleteExperience,
    currentAvatar,
    setCurrentAvatar,
    headline,
    setHeadline,
    bio,
    setBio,
    phone,
    setPhone,
    location,
    setLocation,
    github,
    setGithub,
    linkedin,
    setLinkedin,
    portfolio,
    setPortfolio,
    uploadedResume,
    resumeSize,
    isUploading,
    activeTab,
    setActiveTab,
    showEduModal,
    setShowEduModal,
    eduDegree,
    setEduDegree,
    eduInstitute,
    setEduInstitute,
    eduField,
    setEduField,
    eduCgpa,
    setEduCgpa,
    eduYear,
    setEduYear,
    eduStatus,
    setEduStatus,
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
    expDescription,
    setExpDescription,
    expLink,
    setExpLink,
    handleSaveEducation,
    handleSaveExperience,
    handlePhotoUpload,
    handleResumeUpload,
    handleSave,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
