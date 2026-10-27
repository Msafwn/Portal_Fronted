import {
  axiosPublic,
  axiosPrivate,
  pythonApiClient,
  webhookClient,
  setAccessToken,
  uploadFile,
  TIMEOUTS,
} from './apiClient';

/**
 * ============================================================================
 * CENTRALIZED AXIOS API SERVICE
 * Connects Frontend with:
 * 1. Express / MongoDB Backend (/api) via axiosPublic & axiosPrivate
 * 2. FastAPI Python NLP & ATS Microservice (/api/evaluate-resume-*)
 * 3. n8n Autonomous Workflow Webhook (/webhook)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. Authentication & User Profile APIs
// ----------------------------------------------------------------------------
export const authApi = {
  // Public: Authenticate user & store in-memory access token
  login: async (credentials) => {
    const res = await axiosPublic.post('/auth/login', credentials, { withCredentials: true });
    const token = res.data?.data?.accessToken || res.data?.accessToken;
    if (token) {
      setAccessToken(token);
    }
    return res.data;
  },

  // Public: Register new candidate or employer
  register: async (userData) => {
    const res = await axiosPublic.post('/auth/register', userData, { withCredentials: true });
    const token = res.data?.data?.accessToken || res.data?.accessToken;
    if (token) {
      setAccessToken(token);
    }
    return res.data;
  },

  // Private: Fetch current authenticated user profile
  getMe: async () => {
    const res = await axiosPrivate.get('/auth/me');
    return res.data;
  },

  // Private: Update candidate/employer profile
  updateProfile: async (profileData) => {
    const res = await axiosPrivate.put('/auth/profile', profileData);
    return res.data;
  },

  // Private: Invalidate session on server and clear local token
  logout: async () => {
    try {
      const res = await axiosPrivate.post('/auth/logout');
      return res.data;
    } finally {
      setAccessToken(null);
    }
  },
};

// ----------------------------------------------------------------------------
// 2. Jobs APIs (Public Browsing vs Private Employer Management)
// ----------------------------------------------------------------------------
export const jobApi = {
  // Public: Candidates can browse active vacancies
  getJobs: async (params = {}) => {
    const res = await axiosPublic.get('/jobs', { params });
    return res.data;
  },

  // Public: Job details
  getJobById: async (jobId) => {
    const res = await axiosPublic.get(`/jobs/${jobId}`);
    return res.data;
  },

  // Private: Employer posts new vacancy
  createJob: async (jobData) => {
    const res = await axiosPrivate.post('/jobs', jobData);
    return res.data;
  },

  // Private: Employer modifies vacancy
  updateJob: async (jobId, jobData) => {
    const res = await axiosPrivate.put(`/jobs/${jobId}`, jobData);
    return res.data;
  },

  // Private: Employer closes / deletes vacancy
  deleteJob: async (jobId) => {
    const res = await axiosPrivate.delete(`/jobs/${jobId}`);
    return res.data;
  },
};

// ----------------------------------------------------------------------------
// 3. Applications APIs (Strictly Private)
// ----------------------------------------------------------------------------
export const applicationApi = {
  // Private: Candidate applies to job
  applyToJob: async ({ jobId, coverNote, resumeUrl, matchPercentage, matchedSkills, missingSkills }) => {
    const res = await axiosPrivate.post('/applications', {
      jobId,
      coverNote,
      resumeUrl,
      matchPercentage,
      matchedSkills,
      missingSkills,
    });
    return res.data;
  },

  // Private: Candidate retrieves their own submission history
  getMyApplications: async () => {
    const res = await axiosPrivate.get('/applications/my');
    return res.data;
  },

  // Private: Employer views applicants for a specific vacancy
  getJobApplicants: async (jobId) => {
    const res = await axiosPrivate.get(`/applications/job/${jobId}`);
    return res.data;
  },

  // Private: Employer shortlists, rejects, or schedules interview
  updateStatus: async (applicationId, status, employerNotes = '') => {
    const res = await axiosPrivate.patch(`/applications/${applicationId}/status`, {
      status,
      employerNotes,
    });
    return res.data;
  },
};

// ----------------------------------------------------------------------------
// 4. Skills Taxonomy APIs (Public)
// ----------------------------------------------------------------------------
export const skillApi = {
  getSkills: async (params = {}) => {
    const res = await axiosPublic.get('/skills', { params });
    return res.data;
  },
  searchSkills: async (query) => {
    const res = await axiosPublic.get('/skills/search', { params: { q: query } });
    return res.data;
  },
};

// ----------------------------------------------------------------------------
// 5. Python FastAPI Microservice APIs (NLP Resume & ATS Parser)
// ----------------------------------------------------------------------------
export const pythonAiApi = {
  // Upload PDF / DOCX file for ATS evaluation with upload progress & cancellation
  evaluateResumeFile: async (file, candidateName = '', jobDescription = '', onProgress = null, signal = null) => {
    const res = await uploadFile(pythonApiClient, '/api/evaluate-resume-file', file, {
      fieldName: 'file',
      extraFields: {
        candidate_name: candidateName,
        job_description: jobDescription,
      },
      onProgress,
      signal,
      timeout: TIMEOUTS.FILE_UPLOAD,
    });
    return res.data;
  },

  // Submit raw resume text for vector & semantic matching
  evaluateResumeText: async ({ candidateName = '', resumeText, jobDescription = '' }) => {
    const res = await pythonApiClient.post('/api/evaluate-resume-text', {
      candidate_name: candidateName,
      resume_text: resumeText,
      job_description: jobDescription,
    });
    return res.data;
  },

  // Health check for Python microservice
  healthCheck: async () => {
    const res = await pythonApiClient.get('/');
    return res.data;
  },
};

export default {
  auth: authApi,
  jobs: jobApi,
  applications: applicationApi,
  skills: skillApi,
  pythonAi: pythonAiApi,
  axiosPublic,
  axiosPrivate,
  setAccessToken,
  uploadFile,
  serializeQueryParams,
};
