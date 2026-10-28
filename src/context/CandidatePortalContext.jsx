import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  DEPARTMENT_PROFILES,
  SKILL_GAP_RECOMMENDATIONS,
  PERSONA_OPTIONS,
} from '../constants/portalConstants';
import { axiosPrivate } from '../services/apiClient';

const CandidatePortalContext = createContext(null);

export const getPersonaKeyFromDept = (deptStr) => {
  const dept = (deptStr || '').toLowerCase().trim();
  if (!dept) return 'it';

  // 1. Software / IT / Computer Science / Artificial Intelligence
  if (
    dept.includes('software') ||
    dept.includes('computer') ||
    dept.includes('information technology') ||
    dept.includes('it ') ||
    dept === 'it' ||
    dept.includes('data science') ||
    dept.includes('cyber') ||
    dept.includes('web') ||
    dept.includes('ai')
  ) {
    return 'it';
  }

  // 2. Medical / Healthcare / Pharmacy / Clinical
  if (
    dept.includes('med') ||
    dept.includes('health') ||
    dept.includes('pharm') ||
    dept.includes('clinic') ||
    dept.includes('doctor') ||
    dept.includes('dent') ||
    dept.includes('nurs') ||
    dept.includes('biotech')
  ) {
    return 'medical';
  }

  // 3. Engineering (Civil, Mechanical, Electrical, Structural, Construction)
  if (
    dept.includes('civil') ||
    dept.includes('mech') ||
    dept.includes('electr') ||
    dept.includes('construct') ||
    dept.includes('struct') ||
    dept.includes('architec') ||
    dept.includes('telecom') ||
    dept.includes('engineering')
  ) {
    return 'engineering';
  }

  // 4. Business / Finance / Banking / Accounts / Economics
  if (
    dept.includes('bus') ||
    dept.includes('fin') ||
    dept.includes('bank') ||
    dept.includes('acc') ||
    dept.includes('market') ||
    dept.includes('commerc') ||
    dept.includes('econ') ||
    dept.includes('manage') ||
    dept.includes('audit')
  ) {
    return 'business';
  }

  return 'it';
};

export const CandidatePortalProvider = ({ children, initialUser, initialStats, onLogout }) => {
  // Determine primary persona key based on user's registered department
  const userPrimaryPersonaKey = getPersonaKeyFromDept(initialUser?.department);

  const [activePersonaKey, setActivePersonaKey] = useState(() => userPrimaryPersonaKey);
  const activePersona = DEPARTMENT_PROFILES[activePersonaKey] || DEPARTMENT_PROFILES.it;

  // Candidate Role: 'student' | 'fresh_graduate' | 'experienced'
    const normalizeCandidateRole = (r) => {
    if (!r) return 'fresh_graduate';
    const lower = String(r).toLowerCase().trim();
    if (lower === 'student') return 'student';
    if (lower === 'experienced' || lower === 'professional') return 'experienced';
    return 'fresh_graduate';
  };

  const [candidateRole, setCandidateRole] = useState(() =>
    normalizeCandidateRole(initialUser?.role)
  );
  const [roleFilterTab, setRoleFilterTab] = useState('all');

  const [candidateSkills, setCandidateSkills] = useState(() => {
    if (initialUser?.skills && initialUser.skills.length > 0) {
      return initialUser.skills.map((s) => (typeof s === 'string' ? s : s.name));
    }
    return [];
  });

  const [educationList, setEducationList] = useState(() => {
    if (initialUser?.education && initialUser.education.length > 0) {
      return initialUser.education.map((edu, idx) => ({
        id: edu._id || `edu-${idx}`,
        _id: edu._id,
        degree: edu.degree,
        institute: edu.institute,
        cgpa: edu.gradeOrCgpa || edu.cgpa || '',
        graduationYear: edu.graduationYear || (edu.endYear ? String(edu.endYear) : ''),
        field: edu.field || initialUser.department || '',
        status: edu.status || 'Completed',
      }));
    }
    return [];
  });

  const [experienceList, setExperienceList] = useState(() => {
    if (initialUser?.experience && initialUser.experience.length > 0) {
      return initialUser.experience.map((exp, idx) => ({
        id: exp._id || `exp-${idx}`,
        _id: exp._id,
        type: exp.type || 'experience',
        title: exp.title,
        company: exp.company,
        duration: exp.duration || (exp.current ? 'Present' : exp.startDate ? String(new Date(exp.startDate).getFullYear()) : ''),
        description: exp.description || '',
        link: exp.link || '',
      }));
    }
    return [];
  });

  // Sync state whenever real authenticated user updates in Redux / cookie session
  useEffect(() => {
    if (!initialUser) return;
    if (initialUser.department) {
      const deptKey = getPersonaKeyFromDept(initialUser.department);
      setActivePersonaKey(deptKey);
    }
    if (initialUser.role) {
      setCandidateRole(normalizeCandidateRole(initialUser.role));
    }
    if (initialUser.skills && initialUser.skills.length > 0) {
      setCandidateSkills(
        initialUser.skills.map((s) => (typeof s === 'string' ? s : s.name))
      );
    }
    if (initialUser.education && initialUser.education.length > 0) {
      setEducationList(
        initialUser.education.map((edu, idx) => ({
          id: edu._id || `edu-${idx}`,
          degree: edu.degree,
          institute: edu.institute,
          cgpa: edu.gradeOrCgpa || edu.cgpa || '',
          graduationYear: edu.endYear ? String(edu.endYear) : (edu.graduationYear ? String(edu.graduationYear) : ''),
          field: edu.field || initialUser.department || '',
          status: 'Completed',
        }))
      );
    }
    if (initialUser.experience && initialUser.experience.length > 0) {
      setExperienceList(
        initialUser.experience.map((exp, idx) => ({
          id: exp._id || `exp-${idx}`,
          type: 'experience',
          title: exp.title,
          company: exp.company,
          duration: exp.current ? 'Present' : exp.startDate ? String(new Date(exp.startDate).getFullYear()) : (exp.duration || ''),
          description: exp.description || '',
        }))
      );
    }
  }, [initialUser?.department, initialUser?.role, initialUser?._id, initialUser?.email]);

  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [applicationsList, setApplicationsList] = useState([]);
  const [serverJobs, setServerJobs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [serverDashboardStats, setServerDashboardStats] = useState(null);
  const [serverRoleMatches, setServerRoleMatches] = useState(null);
  const [serverSkillGaps, setServerSkillGaps] = useState(null);
  const [nextInterview, setNextInterview] = useState(null);
  const [liveProfile, setLiveProfile] = useState(null);
  const [serverAtsAnalysis, setServerAtsAnalysis] = useState(null);

  // Live Dashboard, Profile, Applications, Jobs & Role Matches sync from Backend MongoDB Database
  useEffect(() => {
    let isMounted = true;

    const fetchBackendData = async () => {
      try {
        const [dashRes, appsRes, roleRes, jobsRes, profileRes] = await Promise.allSettled([
          axiosPrivate.get('/candidate/dashboard'),
          axiosPrivate.get('/applications/my'),
          axiosPrivate.get('/candidate/role-matches'),
          axiosPrivate.get('/jobs'),
          axiosPrivate.get('/candidate/profile'),
        ]);

        if (isMounted && profileRes.status === 'fulfilled' && profileRes.value.data?.data) {
          const pData = profileRes.value.data.data;
          const u = pData.profile || pData;
          if (u) {
            setLiveProfile(u);
            if (Array.isArray(u.skills) && u.skills.length > 0) {
              setCandidateSkills(u.skills.map((s) => (typeof s === 'string' ? s : s.name)));
            }
            if (Array.isArray(u.education) && u.education.length > 0) {
              setEducationList(
                u.education.map((edu, idx) => ({
                  id: edu._id || `edu-${idx}`,
                  _id: edu._id,
                  degree: edu.degree,
                  institute: edu.institute,
                  cgpa: edu.gradeOrCgpa || edu.cgpa || '3.70 / 4.0',
                  graduationYear: edu.graduationYear || (edu.endYear ? String(edu.endYear) : '2026'),
                  field: edu.field || u.department || 'Computer Science',
                  status: edu.status || 'Completed',
                }))
              );
            }
            if (Array.isArray(u.experience) && u.experience.length > 0) {
              setExperienceList(
                u.experience.map((exp, idx) => ({
                  id: exp._id || `exp-${idx}`,
                  _id: exp._id,
                  type: exp.type || 'experience',
                  title: exp.title,
                  company: exp.company,
                  duration: exp.duration || (exp.current ? 'Present' : '2025 – Present'),
                  description: exp.description || '',
                  link: exp.link || '',
                }))
              );
            }
          }
          if (pData.stats) setServerDashboardStats(pData.stats);
          if (pData.atsAnalysis) setServerAtsAnalysis(pData.atsAnalysis);
        }

        if (isMounted && dashRes.status === 'fulfilled' && dashRes.value.data?.data) {
          const d = dashRes.value.data.data;
          if (d.stats) setServerDashboardStats(d.stats);
          if (d.nextInterview) setNextInterview(d.nextInterview);
          if (Array.isArray(d.appliedJobIds) && d.appliedJobIds.length > 0) {
            setAppliedJobIds((prev) => Array.from(new Set([...prev, ...d.appliedJobIds])));
          }
        }

        if (isMounted && appsRes.status === 'fulfilled' && appsRes.value.data?.data) {
          const appsData = appsRes.value.data.data.applications || appsRes.value.data.data;
          if (Array.isArray(appsData)) {
            const mappedApps = appsData.map((app) => ({
              id: app._id,
              jobTitle: app.job?.title || 'Applied Role',
              company: app.job?.company || 'Recruiting Company',
              department: app.job?.department || initialUser?.department || 'Technology',
              matchScore: app.matchPercentage || 85,
              matchPercentage: app.matchPercentage || 85,
              appliedDate: app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'Recently',
              status: app.status || 'Pending',
              statusVariant:
                app.status === 'Shortlisted'
                  ? 'emerald'
                  : app.status === 'Interview Scheduled'
                  ? 'purple'
                  : app.status === 'Rejected'
                  ? 'rose'
                  : 'blue',
              note:
                app.status === 'Interview Scheduled' && app.interview?.date
                  ? `Interview Scheduled: ${app.interview.date} at ${app.interview.time || '10:00 AM'}`
                  : app.employerNotes || (app.status === 'Shortlisted' ? 'Profile shortlisted by hiring manager' : 'Application under review'),
              interview: app.interview,
            }));
            setApplicationsList(mappedApps);
            const jIds = appsData
              .map((a) => a.job?._id || a.job)
              .filter(Boolean)
              .map(String);
            if (jIds.length > 0) {
              setAppliedJobIds((prev) => Array.from(new Set([...prev, ...jIds])));
            }
          }
        }

        if (isMounted && roleRes.status === 'fulfilled' && roleRes.value.data?.data) {
          const r = roleRes.value.data.data;
          if (Array.isArray(r.roles) && r.roles.length > 0) {
            setServerRoleMatches(r.roles);
          }
          if (Array.isArray(r.skillGaps) && r.skillGaps.length > 0) {
            setServerSkillGaps(r.skillGaps);
          }
        }

        if (isMounted && jobsRes.status === 'fulfilled' && jobsRes.value.data?.data) {
          const rawJobs = jobsRes.value.data.data.jobs || jobsRes.value.data.data || [];
          if (Array.isArray(rawJobs) && rawJobs.length > 0) {
            const candidateSkillSet = new Set(
              (candidateSkills || []).map((s) => (typeof s === 'string' ? s : s?.name || '').toLowerCase().trim())
            );

            const mapped = rawJobs.map((j) => {
              const reqSkills = (j.requiredSkills || []).map((s) => (typeof s === 'string' ? s : s.name));
              const matched = reqSkills.filter((s) => candidateSkillSet.has(s.toLowerCase().trim()));
              const missing = reqSkills.filter((s) => !candidateSkillSet.has(s.toLowerCase().trim()));
              const matchPct = j.matchPercentage || (reqSkills.length > 0 ? Math.round((matched.length / reqSkills.length) * 100) : 80);

              const roleCat = (j.jobType || '').toLowerCase().includes('intern')
                ? 'student'
                : (j.jobType || '').toLowerCase().includes('exp') || (j.jobType || '').toLowerCase().includes('senior')
                ? 'experienced'
                : 'fresh_graduate';

              return {
                id: j._id || j.id,
                _id: j._id || j.id,
                title: j.title,
                company: j.company,
                department: j.department || 'Technology',
                category: j.category || 'Software Engineering',
                jobType: j.jobType || 'Full-Time',
                roleCategory: roleCat,
                workMode: j.workMode || 'Hybrid',
                location: j.location || 'Pakistan',
                salary: j.salary || (j.salaryRange ? `${j.salaryRange.min?.toLocaleString()} - ${j.salaryRange.max?.toLocaleString()} PKR` : 'Market Competitive'),
                deadline: j.deadline ? String(j.deadline).split('T')[0] : 'Open',
                requiredSkills: j.requiredSkills || [],
                skills: reqSkills,
                matchedSkills: j.matchedSkills || matched,
                missingSkills: j.missingSkills || missing,
                matchPercentage: matchPct,
                matchScore: matchPct,
                scoreBreakdown: j.scoreBreakdown || {
                  technical: Math.round(matchPct * 0.5),
                  experience: Math.round(matchPct * 0.3),
                  softSkills: Math.round(matchPct * 0.2),
                },
                applicantsCount: j.applicantsCount || 0,
                status: j.status || 'Open',
                description: j.description || '',
              };
            });
            setServerJobs(mapped);
          }
        }
      } catch (err) {
        console.warn('Live candidate backend sync note:', err.message);
      }
    };

    if (initialUser?._id || initialUser?.email) {
      fetchBackendData();
    }

    return () => {
      isMounted = false;
    };
  }, [initialUser?._id, initialUser?.email]);

  // Switch Candidate Role (Student / Fresh Graduate / Experienced)
  const handleSelectRole = (newRole) => {
    setCandidateRole(newRole);
    setRoleFilterTab('all');
    const roleLabels = {
      student: '🎓 Student (Internships & Scholarships)',
      fresh_graduate: '🚀 Fresh Graduate (Entry-Level & Trainee)',
      experienced: '💼 Experienced Professional (Mid-Senior Roles)',
    };
    toast.success(`Role switched to ${roleLabels[newRole] || newRole}!`, {
      icon: newRole === 'student' ? '🎓' : newRole === 'experienced' ? '💼' : '🚀',
    });
  };

  // Switch target discipline filter (IT, Medical, Engineering, Business)
  const handleSelectPersona = (key) => {
    setActivePersonaKey(key);
    const newPersona = DEPARTMENT_PROFILES[key] || DEPARTMENT_PROFILES.it;
    toast.success(`Target field filter set to ${newPersona.department}`);
  };

  const handleAddEducation = async (newEdu) => {
    try {
      const res = await axiosPrivate.post('/candidate/education', newEdu);
      if (res.data?.data && Array.isArray(res.data.data)) {
        const updated = res.data.data.map((edu, idx) => ({
          id: edu._id || `edu-${idx}`,
          _id: edu._id,
          degree: edu.degree,
          institute: edu.institute,
          cgpa: edu.gradeOrCgpa || edu.cgpa || '',
          graduationYear: edu.graduationYear || (edu.endYear ? String(edu.endYear) : ''),
          field: edu.field || profile?.department || '',
          status: edu.status || 'Completed',
        }));
        setEducationList(updated);
      } else {
        const item = { id: `edu-${Date.now()}`, ...newEdu };
        setEducationList((prev) => [item, ...prev]);
      }
      toast.success(`Degree "${newEdu.degree}" saved to database! 🎓`);
    } catch (err) {
      console.warn('Backend education add:', err.message);
      const item = { id: `edu-${Date.now()}`, ...newEdu };
      setEducationList((prev) => [item, ...prev]);
      toast.success(`Degree "${newEdu.degree}" added!`);
    }
  };

  const handleDeleteEducation = async (id) => {
    try {
      await axiosPrivate.delete(`/candidate/education/${id}`);
      setEducationList((prev) => prev.filter((item) => item.id !== id && item._id !== id));
      toast.success('Degree removed from database.');
    } catch (err) {
      console.warn('Backend education delete:', err.message);
      setEducationList((prev) => prev.filter((item) => item.id !== id && item._id !== id));
      toast.success('Education record removed.');
    }
  };

  const handleAddExperience = async (newExp) => {
    try {
      const res = await axiosPrivate.post('/candidate/experience', newExp);
      if (res.data?.data && Array.isArray(res.data.data)) {
        const updated = res.data.data.map((exp, idx) => ({
          id: exp._id || `exp-${idx}`,
          _id: exp._id,
          type: exp.type || 'experience',
          title: exp.title,
          company: exp.company,
          duration: exp.duration || (exp.current ? 'Present' : ''),
          description: exp.description || '',
          link: exp.link || '',
        }));
        setExperienceList(updated);
      } else {
        const item = { id: `exp-${Date.now()}`, ...newExp };
        setExperienceList((prev) => [item, ...prev]);
      }
      toast.success(`Experience "${newExp.title}" saved to database! 💼`);
    } catch (err) {
      console.warn('Backend experience add:', err.message);
      const item = { id: `exp-${Date.now()}`, ...newExp };
      setExperienceList((prev) => [item, ...prev]);
      toast.success(`Added experience "${newExp.title}"!`);
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await axiosPrivate.delete(`/candidate/experience/${id}`);
      setExperienceList((prev) => prev.filter((item) => (item.id || item._id || item.title) !== id));
      toast.success('Experience record removed from database.');
    } catch (err) {
      console.warn('Backend experience delete:', err.message);
      setExperienceList((prev) => prev.filter((item) => (item.id || item.title) !== id));
      toast.success('Experience record removed.');
    }
  };

  const profile = {
    ...initialUser,
    ...(liveProfile || {}),
    name: liveProfile?.name || initialUser?.name || initialUser?.fullName || 'Candidate',
    headline: liveProfile?.headline !== undefined ? liveProfile.headline : (initialUser?.headline || ''),
    bio: liveProfile?.bio !== undefined ? liveProfile.bio : (initialUser?.bio || ''),
    phone: liveProfile?.phone || initialUser?.phone || '',
    location: liveProfile?.location || initialUser?.location || '',
    email: liveProfile?.email || initialUser?.email || '',
    avatar: liveProfile?.avatar !== undefined ? liveProfile.avatar : (initialUser?.avatar || ''),
    department: liveProfile?.department || initialUser?.department || '',
    role: liveProfile?.role || initialUser?.role || candidateRole || 'fresh_graduate',
    links: liveProfile?.links || initialUser?.links || { github: '', linkedin: '', portfolio: '' },
    resumeUrl: liveProfile?.resumeUrl || initialUser?.resumeUrl || '',
    resumeFileName: liveProfile?.resumeFileName || initialUser?.resumeFileName || '',
    resumeFileSize: liveProfile?.resumeFileSize || initialUser?.resumeFileSize || '',
    skills: candidateSkills,
    education: educationList,
    experience: experienceList,
  };

  // 1. Role-Filtered Jobs strictly from live MongoDB Server Jobs
  const roleFilteredJobs = (serverJobs || []).filter((job) => {
    let matchesRole = false;
    if (candidateRole === 'student') {
      matchesRole =
        job.roleCategory === 'student' ||
        ['Internship', 'Scholarship', 'Part-time', 'internship', 'scholarship', 'part_time'].includes(job.jobType);
    } else if (candidateRole === 'fresh_graduate') {
      matchesRole =
        job.roleCategory === 'fresh_graduate' ||
        ['Entry-Level', 'Trainee', 'entry_level', 'trainee', 'Full-Time', 'full_time'].includes(job.jobType);
    } else if (candidateRole === 'experienced') {
      matchesRole =
        job.roleCategory === 'experienced' ||
        ['Mid-Level', 'Senior Level', 'experienced', 'senior_level', 'mid_level'].includes(job.jobType);
    } else {
      matchesRole = true;
    }

    if (!matchesRole) return false;

    // Sub-tab filter (RoleBasedTabs: Internships, Scholarships, etc.)
    if (roleFilterTab !== 'all') {
      const typeLower = (job.jobType || '').toLowerCase();
      if (roleFilterTab === 'internship' && !typeLower.includes('intern')) return false;
      if (roleFilterTab === 'scholarship' && !typeLower.includes('scholar')) return false;
      if (roleFilterTab === 'part_time' && !typeLower.includes('part')) return false;
      if (roleFilterTab === 'entry_level' && !typeLower.includes('entry')) return false;
      if (roleFilterTab === 'trainee' && !typeLower.includes('train')) return false;
      if (roleFilterTab === 'mid_level' && !typeLower.includes('mid')) return false;
      if (roleFilterTab === 'senior_level' && !typeLower.includes('senior')) return false;
    }

    return true;
  }).sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));

  // 2. Department-Strict Filtered Jobs: Candidate ke registered department ki jobs
  const departmentFilteredJobs = roleFilteredJobs.filter((job) => {
    const candidateDept = (profile?.department || initialUser?.department || '').toLowerCase();
    if (!candidateDept) return true;
    const jobDept = (job.department || '').toLowerCase();
    return jobDept.includes(candidateDept) || candidateDept.includes(jobDept);
  });

  // Final jobs for Dashboard & Feed: Prioritize candidate's exact registered department!
  const finalDashboardJobs =
    departmentFilteredJobs.length > 0 ? departmentFilteredJobs : roleFilteredJobs;

  const calcProfileCompletion = () => {
    let score = 0;
    if (profile.name) score += 20;
    if (profile.headline) score += 10;
    if (candidateSkills.length > 0) score += 25;
    if (educationList.length > 0) score += 20;
    if (experienceList.length > 0) score += 15;
    if (profile.resumeUrl || profile.resumeFileName) score += 10;
    return Math.min(score, 100);
  };

  const stats = {
    matchIndex: serverDashboardStats?.matchIndex ?? (finalDashboardJobs[0]?.matchPercentage || 0),
    profileCompletion: serverDashboardStats?.profileCompletion ?? calcProfileCompletion(),
    ...(initialStats || {}),
    ...(serverDashboardStats || {}),
    totalRecommended: serverDashboardStats?.totalRecommended ?? finalDashboardJobs.length,
    activeApplications: serverDashboardStats?.activeApplications ?? (applicationsList.length || appliedJobIds.length),
    shortlistedCount: serverDashboardStats?.shortlistedCount ?? applicationsList.filter((a) => a.status === 'Shortlisted').length,
    interviewCount: serverDashboardStats?.interviewCount ?? applicationsList.filter((a) => a.status === 'Interview Scheduled').length,
  };

  const handleApply = async (job) => {
    const jId = job.id || job._id;
    if (appliedJobIds.includes(jId)) {
      toast('You have already applied for this role.', { icon: 'ℹ️' });
      return;
    }
    setAppliedJobIds((prev) => [...prev, jId]);

    const newApp = {
      id: `app-${Date.now()}`,
      jobTitle: job.title,
      company: job.company,
      department: job.department,
      matchScore: job.matchPercentage,
      appliedDate: 'Just now',
      status: 'Under Review',
      statusVariant: 'blue',
      note: 'Application successfully received by hiring team.',
    };
    setApplicationsList((prev) => [newApp, ...prev]);

    // Asynchronously submit to backend if real job ID
    if (jId && String(jId).length === 24) {
      try {
        await axiosPrivate.post('/applications', {
          jobId: jId,
          matchPercentage: job.matchPercentage,
          matchedSkills: job.matchedSkills,
          missingSkills: job.missingSkills,
        });
      } catch (e) {
        console.warn('Backend application sync:', e.message);
      }
    }

    toast.success(`Application sent to ${job.company}! Match score: ${job.matchPercentage}%.`);
  };

  const handleAddSkill = async (skill) => {
    if (candidateSkills.length >= 15) {
      toast.error('Maximum 15 skills allowed.');
      return;
    }
    if (!candidateSkills.includes(skill)) {
      setCandidateSkills((prev) => [...prev, skill]);
      try {
        await axiosPrivate.post('/candidate/skills/add', { name: skill });
        toast.success(`Skill "${skill}" saved to database!`);
      } catch (e) {
        console.warn('Backend skill add:', e.message);
        toast.success(`Added ${skill}!`);
      }
    }
  };

  const handleRemoveSkill = async (skill) => {
    setCandidateSkills((prev) => prev.filter((s) => s !== skill));
    try {
      await axiosPrivate.delete(`/candidate/skills/${encodeURIComponent(skill)}`);
      toast.success(`Skill "${skill}" removed from database.`);
    } catch (e) {
      console.warn('Backend skill remove:', e.message);
    }
  };

  return (
    <CandidatePortalContext.Provider
      value={{
        profile,
        stats,
        candidateRole,
        setCandidateRole,
        handleSelectRole,
        roleFilterTab,
        setRoleFilterTab,
        activePersonaKey,
        handleSelectPersona,
        candidateSkills,
        handleAddSkill,
        handleRemoveSkill,
        appliedJobIds,
        handleApply,
        applicationsList,
        educationList,
        handleAddEducation,
        handleDeleteEducation,
        experienceList,
        handleAddExperience,
        handleDeleteExperience,
        jobs: serverRoleMatches || finalDashboardJobs,
        allJobs: serverRoleMatches || roleFilteredJobs,
        skillGaps: serverSkillGaps || [],
        nextInterview,
        serverDashboardStats,
        serverAtsAnalysis,
        sidebarOpen,
        setSidebarOpen,
        searchQuery,
        setSearchQuery,
        personaOptions: PERSONA_OPTIONS,
        userPrimaryPersonaKey,
        userDepartmentName: initialUser?.department || profile.department,
        onLogout,
      }}
    >
      {children}
    </CandidatePortalContext.Provider>
  );
};

export const useCandidatePortal = () => {
  const context = useContext(CandidatePortalContext);
  if (!context) {
    throw new Error('useCandidatePortal must be used within CandidatePortalProvider');
  }
  return context;
};
