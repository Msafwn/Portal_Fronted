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
    return activePersona.skills;
  });

  const getInitialEducation = (persona) => [
    {
      id: 'edu-1',
      degree: persona.education || 'Bachelor of Science',
      institute: persona.institute || 'National University',
      cgpa: persona.cgpa || '3.70 / 4.0',
      graduationYear: persona.graduationYear || '2026',
      field: persona.department || 'Computer Science',
      status: 'In Progress / Completed',
    },
  ];

  const [educationList, setEducationList] = useState(() => {
    if (initialUser?.education && initialUser.education.length > 0) {
      return initialUser.education.map((edu, idx) => ({
        id: edu._id || `edu-${idx}`,
        degree: edu.degree,
        institute: edu.institute,
        cgpa: edu.gradeOrCgpa || edu.cgpa || '3.60 / 4.0',
        graduationYear: edu.endYear ? String(edu.endYear) : '2026',
        field: initialUser.department || 'Computer Science',
        status: 'Completed',
      }));
    }
    return getInitialEducation(activePersona);
  });

  const [experienceList, setExperienceList] = useState(() => {
    if (initialUser?.experience && initialUser.experience.length > 0) {
      return initialUser.experience.map((exp, idx) => ({
        id: exp._id || `exp-${idx}`,
        type: 'experience',
        title: exp.title,
        company: exp.company,
        duration: exp.current ? 'Present' : exp.startDate ? String(new Date(exp.startDate).getFullYear()) : '2025',
        description: exp.description || 'Hands-on practical deliverables.',
      }));
    }
    return activePersona.experience || [];
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
          cgpa: edu.gradeOrCgpa || edu.cgpa || '3.60 / 4.0',
          graduationYear: edu.endYear ? String(edu.endYear) : '2026',
          field: initialUser.department || 'Computer Science',
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
          duration: exp.current ? 'Present' : exp.startDate ? String(new Date(exp.startDate).getFullYear()) : '2025',
          description: exp.description || 'Hands-on practical deliverables.',
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

  // Live Dashboard, Applications, Jobs & Role Matches sync from Backend API
  useEffect(() => {
    let isMounted = true;

    const fetchBackendData = async () => {
      try {
        const [dashRes, appsRes, roleRes, jobsRes] = await Promise.allSettled([
          axiosPrivate.get('/candidate/dashboard'),
          axiosPrivate.get('/applications/my'),
          axiosPrivate.get('/candidate/role-matches'),
          axiosPrivate.get('/jobs'),
        ]);

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
  }, [initialUser?._id, initialUser?.email, candidateSkills]);

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

  // Switch persona (IT, Medical, Engineering, Business)
  const handleSelectPersona = (key) => {
    setActivePersonaKey(key);
    const newPersona = DEPARTMENT_PROFILES[key] || DEPARTMENT_PROFILES.it;
    setCandidateSkills(newPersona.skills);
    setEducationList(getInitialEducation(newPersona));
    setExperienceList(newPersona.experience || []);
    toast.success(`Switched candidate profile to ${newPersona.name} (${newPersona.department})`);
  };

  const handleAddEducation = (newEdu) => {
    const item = {
      id: `edu-${Date.now()}`,
      ...newEdu,
    };
    setEducationList((prev) => [item, ...prev]);
    toast.success(`Added degree "${item.degree}" successfully!`);
  };

  const handleDeleteEducation = (id) => {
    setEducationList((prev) => prev.filter((item) => item.id !== id));
    toast.success('Education record removed.');
  };

  const handleAddExperience = (newExp) => {
    const item = {
      id: `exp-${Date.now()}`,
      ...newExp,
    };
    setExperienceList((prev) => [item, ...prev]);
    toast.success(`Added experience "${item.title}" successfully!`);
  };

  const handleDeleteExperience = (id) => {
    setExperienceList((prev) => prev.filter((item) => (item.id || item.title) !== id));
    toast.success('Experience record removed.');
  };

  const profile = {
    ...activePersona,
    ...initialUser,
    name: initialUser?.name || initialUser?.fullName || activePersona.name,
    headline: initialUser?.headline || activePersona.headline,
    bio: initialUser?.bio || activePersona.bio,
    phone: initialUser?.phone || activePersona.phone,
    location: initialUser?.location || activePersona.location,
    email: initialUser?.email || activePersona.email,
    avatar: initialUser?.avatar || '',
    department: initialUser?.department || activePersona.department,
    role: initialUser?.role || candidateRole || activePersona.role,
    links: initialUser?.links || activePersona.links || { github: '', linkedin: '', portfolio: '' },
    resumeUrl: initialUser?.resumeUrl || activePersona.resumeUrl || '',
    skills: candidateSkills,
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

  const stats = {
    matchIndex: serverDashboardStats?.matchIndex ?? (finalDashboardJobs[0]?.matchPercentage || 88),
    profileCompletion: serverDashboardStats?.profileCompletion ?? (candidateSkills.length > 0 ? 92 : 60),
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

  const handleAddSkill = (skill) => {
    if (candidateSkills.length >= 15) {
      toast.error('Maximum 15 skills allowed.');
      return;
    }
    if (!candidateSkills.includes(skill)) {
      setCandidateSkills((prev) => [...prev, skill]);
      toast.success(`Added ${skill}! Match index updating.`);
    }
  };

  const handleRemoveSkill = (skill) => {
    setCandidateSkills((prev) => prev.filter((s) => s !== skill));
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
        skillGaps: serverSkillGaps || SKILL_GAP_RECOMMENDATIONS,
        nextInterview,
        serverDashboardStats,
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
