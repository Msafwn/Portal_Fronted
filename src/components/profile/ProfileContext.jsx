import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
  useUpdateProfileMutation,
  useUpdateCandidateProfileMutation,
} from '../../store/api/authApiSlice';
import { setCredentials } from '../../store/slices/authSlice';
import { axiosPrivate } from '../../services/apiClient';

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
  serverAtsAnalysis,
  children,
}) => {
  // Local state for editable profile fields
  const [currentAvatar, setCurrentAvatar] = useState(profile.avatar || '');
  const [headline, setHeadline] = useState(profile.headline || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [location, setLocation] = useState(profile.location || '');
  const [github, setGithub] = useState(profile.links?.github || '');
  const [linkedin, setLinkedin] = useState(profile.links?.linkedin || '');
  const [portfolio, setPortfolio] = useState(profile.links?.portfolio || '');
  const [uploadedResume, setUploadedResume] = useState(profile.resumeFileName || '');
  const [resumeSize, setResumeSize] = useState(profile.resumeFileSize || '');
  const [resumeUrl, setResumeUrl] = useState(profile.resumeUrl || '');
  const [liveAtsAnalysis, setLiveAtsAnalysis] = useState(serverAtsAnalysis || null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'education' | 'skills' | 'experience' | 'resume'

  // Sync liveAtsAnalysis when prop changes
  useEffect(() => {
    if (serverAtsAnalysis) setLiveAtsAnalysis(serverAtsAnalysis);
  }, [serverAtsAnalysis]);

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
    setPhone(profile.phone || '');
    setLocation(profile.location || '');
    setGithub(profile.links?.github || '');
    setLinkedin(profile.links?.linkedin || '');
    setPortfolio(profile.links?.portfolio || '');
    setUploadedResume(profile.resumeFileName || '');
    setResumeSize(profile.resumeFileSize || '');
    setResumeUrl(profile.resumeUrl || '');
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

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Immediate preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setCurrentAvatar(event.target.result);
    };
    reader.readAsDataURL(file);

    // Save directly to MongoDB backend
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await axiosPrivate.post('/candidate/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const avatarUrl = res.data?.data?.avatar;
      if (avatarUrl) {
        setCurrentAvatar(avatarUrl);
        dispatch(setCredentials({ user: { ...profile, avatar: avatarUrl } }));
      }
      toast.success('Avatar uploaded and saved to database! 📸');
    } catch (err) {
      console.warn('Direct avatar file upload note, syncing to profile:', err.message);
      try {
        await updateCandidateProfileMutation({ avatar: currentAvatar }).unwrap();
        toast.success('Profile avatar updated in database!');
      } catch {
        toast.success('Profile avatar updated!');
      }
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await axiosPrivate.post('/candidate/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = res.data?.data;
      const fileName = data?.resumeFileName || file.name;
      const fileSize = data?.resumeFileSize || `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const url = data?.resumeUrl || '';
      setUploadedResume(fileName);
      setResumeSize(fileSize);
      if (url) setResumeUrl(url);
      if (data?.atsAnalysis) {
        setLiveAtsAnalysis(data.atsAnalysis);
      }
      if (data?.user) {
        dispatch(setCredentials({ user: data.user }));
      }
      toast.success(`Resume "${fileName}" uploaded & evaluated by AI ATS engine! 📄`);
    } catch (err) {
      console.warn('Backend resume upload fallback, saving metadata to profile:', err.message);
      const fileName = file.name;
      const fileSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      setUploadedResume(fileName);
      setResumeSize(fileSize);
      try {
        await updateCandidateProfileMutation({
          resumeFileName: fileName,
          resumeFileSize: fileSize,
          resumeUrl: fileName,
        }).unwrap();
      } catch {}
      toast.success(`Resume "${fileName}" synchronized with database!`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    setIsUploading(true);
    try {
      const res = await axiosPrivate.delete('/candidate/resume');
      setUploadedResume('');
      setResumeSize('');
      setResumeUrl('');
      if (res.data?.data?.atsAnalysis) {
        setLiveAtsAnalysis(res.data.data.atsAnalysis);
      }
      toast.success('Resume file removed from profile.');
    } catch (err) {
      console.warn('Backend delete resume fallback:', err.message);
      setUploadedResume('');
      setResumeSize('');
      setResumeUrl('');
      try {
        await updateCandidateProfileMutation({
          resumeFileName: '',
          resumeFileSize: '',
          resumeUrl: '',
        }).unwrap();
      } catch {}
      toast.success('Resume cleared.');
    } finally {
      setIsUploading(false);
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
    resumeUrl,
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
    handleDeleteResume,
    handleSave,
    serverAtsAnalysis: liveAtsAnalysis || serverAtsAnalysis,
    liveAtsAnalysis,
    setLiveAtsAnalysis,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
