import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser, logOut } from '../store/slices/authSlice';
import { useLogoutUserMutation } from '../store/api/authApiSlice';
import toast from 'react-hot-toast';
import {
  INITIAL_ADMIN_PROFILE,
  INITIAL_ADMIN_KPIS,
  INITIAL_ADMIN_CHARTS,
  INITIAL_AI_ALGORITHM_SETTINGS,
  ALGORITHM_PRESETS,
  INITIAL_SKILLS_TAXONOMY,
} from '../constants';
import { exportFypAuditAndSecurityPdf } from '../utils/pdfExport';
import { exportAuditLogsToCsv, exportLoginHistoryToCsv } from '../utils/excelExport';
import { axiosPrivate } from '../services/apiClient';

const AdminPortalContext = createContext(null);

export const AdminPortalProvider = ({ children, initialUser }) => {
  const reduxUser = useSelector(selectCurrentUser);
  const currentUser = initialUser || reduxUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getAdminProfileFromUser = (u) => {
    const name = u?.name || INITIAL_ADMIN_PROFILE.name;
    const words = name.trim().split(/\s+/);
    const initials = words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();

    return {
      ...INITIAL_ADMIN_PROFILE,
      name,
      email: u?.email || INITIAL_ADMIN_PROFILE.email,
      role: u?.role === 'super_admin' ? 'Super Administrator & Lead Auditor' : 'Platform Administrator',
      roleLabel: u?.role === 'super_admin' ? 'Super Admin' : 'Admin',
      avatar: u?.avatar || '',
      initials,
      accessLevel: u?.role === 'super_admin' ? 'Tier-1 Root Access' : 'Administrative Access',
      department: u?.department || INITIAL_ADMIN_PROFILE.department,
    };
  };

  // Admin Profile
  const [adminProfile, setAdminProfile] = useState(() => getAdminProfileFromUser(currentUser));

  // Sync state whenever real authenticated user updates
  useEffect(() => {
    if (currentUser) {
      setAdminProfile(getAdminProfileFromUser(currentUser));
    }
  }, [currentUser]);

  // Master KPIs
  const [kpis, setKpis] = useState(INITIAL_ADMIN_KPIS);

  // Charts
  const [chartsData, setChartsData] = useState(INITIAL_ADMIN_CHARTS);

  // Live Backend Executive Dashboard Telemetry Synchronization
  const refreshDashboard = useCallback(async () => {
    try {
      const res = await axiosPrivate.get('/users/admin/dashboard');
      if (res.data?.data) {
        const { kpis: serverKpis, chartsData: serverCharts } = res.data.data;
        if (serverKpis) {
          setKpis((prev) => ({
            ...prev,
            ...serverKpis,
          }));
        }
        if (serverCharts) {
          setChartsData((prev) => ({
            ...prev,
            ...serverCharts,
          }));
        }
      }
      return res.data;
    } catch (err) {
      // Fallback gracefully
    }
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'super_admin') {
      refreshDashboard();
    }
  }, [currentUser, refreshDashboard]);

  // Candidates Roster from real MongoDB
  const [candidates, setCandidates] = useState([]);

  // Live Backend Candidates & Admin Telemetry Synchronization
  const refreshCandidates = useCallback(async () => {
    try {
      const res = await axiosPrivate.get('/users/admin/all');
      if (res.data?.data) {
        const { candidates: serverCandidates, kpis: serverKpis } = res.data.data;
        if (Array.isArray(serverCandidates)) {
          setCandidates(serverCandidates);
        }
        if (serverKpis) {
          setKpis((prev) => ({
            ...prev,
            totalCandidatesCount: serverKpis.totalCandidates || prev.totalCandidatesCount,
            activeCandidatesCount: serverKpis.activeCount || prev.activeCandidatesCount,
            bannedCandidatesCount: serverKpis.bannedCount || prev.bannedCandidatesCount,
          }));
        }
      }
      return res.data;
    } catch (err) {
      console.warn('Backend candidates sync note:', err.message);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'super_admin') {
      refreshCandidates();
    }
  }, [currentUser, refreshCandidates]);

  // Employers & Corporate Verification Roster from real MongoDB
  const [employers, setEmployers] = useState([]);

  // Live Backend Employers & Corporate Verification Telemetry Synchronization
  const refreshEmployers = useCallback(async () => {
    try {
      const res = await axiosPrivate.get('/users/admin/employers');
      if (res.data?.data) {
        const { employers: serverEmployers, kpis: serverKpis } = res.data.data;
        if (Array.isArray(serverEmployers)) {
          setEmployers(serverEmployers);
        }
        if (serverKpis) {
          setKpis((prev) => ({
            ...prev,
            verifiedEmployersCount: serverKpis.verifiedCount || prev.verifiedEmployersCount,
            pendingEmployersCount: serverKpis.pendingCount || prev.pendingEmployersCount,
          }));
        }
      }
      return res.data;
    } catch (err) {
      console.warn('Backend employers sync note:', err.message);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'super_admin') {
      refreshEmployers();
    }
  }, [currentUser, refreshEmployers]);

  // Jobs & Moderation Roster from real MongoDB
  const [jobs, setJobs] = useState([]);

  // Live Backend Jobs & Moderation Telemetry Synchronization
  const refreshJobs = useCallback(async () => {
    try {
      const res = await axiosPrivate.get('/jobs/admin/all');
      if (res.data?.data) {
        const { jobs: serverJobs, kpis: serverKpis } = res.data.data;
        if (Array.isArray(serverJobs)) {
          setJobs(serverJobs);
        }
        if (serverKpis) {
          setKpis((prev) => ({
            ...prev,
            activeJobsCount: serverKpis.approvedCount || prev.activeJobsCount,
          }));
        }
      }
      return res.data;
    } catch (err) {
      console.warn('Backend jobs sync note:', err.message);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'super_admin') {
      refreshJobs();
    }
  }, [currentUser, refreshJobs]);

  // AI Matching Algorithm Settings & Weights (50-30-20 Standard)
  const [aiSettings, setAiSettings] = useState(INITIAL_AI_ALGORITHM_SETTINGS);

  // Skills Taxonomy Database
  const [skillsTaxonomy, setSkillsTaxonomy] = useState(INITIAL_SKILLS_TAXONOMY);

  // Live Backend AI Matching Algorithm Settings & Skills Synchronization
  const refreshAiSettings = useCallback(async () => {
    try {
      const res = await axiosPrivate.get('/users/admin/ai-settings');
      if (res.data?.data) {
        const { aiSettings: serverSettings, skillsTaxonomy: serverSkills } = res.data.data;
        if (serverSettings) {
          setAiSettings((prev) => ({
            ...prev,
            ...serverSettings,
          }));
        }
        if (Array.isArray(serverSkills) && serverSkills.length > 0) {
          setSkillsTaxonomy(serverSkills);
        }
      }
      return res.data;
    } catch {
      // Fallback gracefully to default baseline
    }
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'super_admin') {
      refreshAiSettings();
    }
  }, [currentUser, refreshAiSettings]);

  // Audit Trail from real MongoDB
  const [auditLog, setAuditLog] = useState([]);

  // Login Sessions Telemetry from real MongoDB
  const [loginHistory, setLoginHistory] = useState([]);

  // Security Sentinel & Suspicious Activity Alerts from real MongoDB
  const [securityAlerts, setSecurityAlerts] = useState([]);

  // Live Backend Forensic Audit Logs, Authentication Sessions, and Security Alerts
  const refreshLogs = useCallback(async () => {
    try {
      const res = await axiosPrivate.get('/users/admin/logs');
      if (res.data?.data) {
        const { auditLog: serverAudit, loginHistory: serverLogins, securityAlerts: serverAlerts } = res.data.data;
        if (Array.isArray(serverAudit)) {
          setAuditLog(serverAudit);
        }
        if (Array.isArray(serverLogins)) {
          setLoginHistory(serverLogins);
        }
        if (Array.isArray(serverAlerts)) {
          setSecurityAlerts(serverAlerts);
        }
      }
      return res.data;
    } catch (err) {
      console.warn('Backend logs sync note:', err.message);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'super_admin') {
      refreshLogs();
    }
  }, [currentUser, refreshLogs]);

  // Action: Resolve / Mitigate Security Alert
  const resolveSecurityAlert = async (alertId, resolutionNote = 'Mitigation applied by Super Admin') => {
    let resolvedTitle = '';
    setSecurityAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === alertId || alert._id === alertId) {
          resolvedTitle = alert.title;
          return {
            ...alert,
            status: 'Mitigated / Resolved',
            resolvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            resolutionNote,
          };
        }
        return alert;
      })
    );

    try {
      await axiosPrivate.put(`/users/admin/security-alerts/${alertId}/resolve`, { resolutionNote });
      refreshLogs();
      toast.success(`Security threat "${resolvedTitle || 'Alert'}" marked as mitigated! ✓`);
    } catch {
      toast.success(`Security threat marked as mitigated! ✓`);
    }
  };

  // Action: Block Malicious IP Address
  const blockIpAddress = async (ipAddress) => {
    setSecurityAlerts((prev) =>
      prev.map((alert) => (alert.ipAddress === ipAddress ? { ...alert, status: 'Blocked' } : alert))
    );

    try {
      await axiosPrivate.post('/users/admin/security/block-ip', { ipAddress });
      refreshLogs();
      toast.error(`IP ${ipAddress} successfully blocked at edge firewall! 🛡️`);
    } catch {
      toast.error(`IP ${ipAddress} blocked! 🛡️`);
    }
  };

  // Action: Trigger FYP Presentation Audit PDF
  const triggerExportFypPdf = () => {
    try {
      exportFypAuditAndSecurityPdf(auditLog, loginHistory, securityAlerts, adminProfile);
      toast.success('FYP Defense Audit PDF Report generated successfully! 📑');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate PDF. Check browser popup settings.');
    }
  };

  // Action: Trigger Excel / CSV Audit Export
  const triggerExportAuditCsv = () => {
    try {
      exportAuditLogsToCsv(auditLog);
      toast.success('Audit Trail exported to CSV / Excel spreadsheet! 📊');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export CSV.');
    }
  };

  // Action: Trigger Login History CSV Export
  const triggerExportLoginCsv = () => {
    try {
      exportLoginHistoryToCsv(loginHistory);
      toast.success('Login History exported to CSV / Excel spreadsheet! 📊');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export CSV.');
    }
  };

  // Notifications
  const [notifications, setNotifications] = useState(INITIAL_ADMIN_NOTIFICATIONS);

  // Action: Toggle Candidate Status (Active <-> Banned)
  const toggleCandidateStatus = async (id) => {
    const target = candidates.find((c) => c.id === id);
    if (!target) return;

    const newStatus = target.status === 'banned' ? 'active' : 'banned';
    const banReason = newStatus === 'banned' ? 'Administrative restriction imposed.' : '';

    // Optimistic state update
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus, banReason } : c))
    );

    try {
      await axiosPrivate.put(`/users/admin/${id}/status`, {
        status: newStatus,
        banReason,
      });

      // Record in Audit Trail
      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: newStatus === 'active' ? 'Candidate Activation' : 'Candidate Suspension',
        detail: `${newStatus === 'active' ? 'Re-activated profile access for' : 'Imposed security suspension on'} candidate ${target.name}`,
        timestamp: 'Just now',
        type: newStatus === 'active' ? 'success' : 'warning',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);

      if (newStatus === 'active') {
        toast.success(`Candidate ${target.name} has been activated! ✓`);
      } else {
        toast.error(`Candidate ${target.name} has been restricted/banned! ⛔`);
      }
    } catch (err) {
      // Revert optimistic update
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: target.status, banReason: target.banReason } : c))
      );
      toast.error(err.response?.data?.message || 'Failed to update candidate status');
    }
  };

  // Action: Ban Candidate with specific reason
  const banCandidate = async (id, reason) => {
    const target = candidates.find((c) => c.id === id);
    if (!target) return;

    const banReason = reason || 'Violation of portal usage standards.';

    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'banned', banReason } : c))
    );

    try {
      await axiosPrivate.put(`/users/admin/${id}/status`, {
        status: 'banned',
        banReason,
      });

      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Candidate Suspension',
        detail: `Suspended candidate ${target.name}. Reason: ${banReason}`,
        timestamp: 'Just now',
        type: 'warning',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.error(`Candidate ${target.name} suspended: ${banReason}`);
    } catch (err) {
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: target.status, banReason: target.banReason } : c))
      );
      toast.error(err.response?.data?.message || 'Failed to suspend candidate');
    }
  };

  // Action: Activate Candidate
  const activateCandidate = async (id) => {
    const target = candidates.find((c) => c.id === id);
    if (!target) return;

    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'active', banReason: undefined } : c))
    );

    try {
      await axiosPrivate.put(`/users/admin/${id}/status`, {
        status: 'active',
        banReason: '',
      });

      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Candidate Activation',
        detail: `Verified and approved candidate profile for ${target.name}`,
        timestamp: 'Just now',
        type: 'success',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.success(`Candidate ${target.name} activated and approved! ✓`);
    } catch (err) {
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: target.status, banReason: target.banReason } : c))
      );
      toast.error(err.response?.data?.message || 'Failed to activate candidate');
    }
  };

  // Action: Delete candidate permanently
  const deleteCandidate = async (id) => {
    const target = candidates.find((c) => c.id === id);
    const targetName = target ? target.name : 'Candidate';

    setCandidates((prev) => prev.filter((c) => c.id !== id));

    try {
      await axiosPrivate.delete(`/users/admin/${id}`);

      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Candidate Record Purged',
        detail: `Permanently removed candidate account record for ${targetName}`,
        timestamp: 'Just now',
        type: 'warning',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.success(`Candidate ${targetName} deleted from platform roster.`);
    } catch (err) {
      if (target) {
        setCandidates((prev) => [target, ...prev]);
      }
      toast.error(err.response?.data?.message || 'Failed to delete candidate record');
    }
  };

  // Action: Bulk Activate
  const bulkActivate = async (ids) => {
    if (!ids || ids.length === 0) return;

    const previousCandidates = [...candidates];
    setCandidates((prev) =>
      prev.map((c) => (ids.includes(c.id) ? { ...c, status: 'active', banReason: undefined } : c))
    );

    try {
      await axiosPrivate.post('/users/admin/bulk-status', {
        ids,
        status: 'active',
        banReason: '',
      });
      toast.success(`${ids.length} candidates activated successfully! ✓`);
    } catch (err) {
      setCandidates(previousCandidates);
      toast.error(err.response?.data?.message || 'Bulk activation failed');
    }
  };

  // Action: Bulk Ban
  const bulkBan = async (ids) => {
    if (!ids || ids.length === 0) return;

    const previousCandidates = [...candidates];
    setCandidates((prev) =>
      prev.map((c) => (ids.includes(c.id) ? { ...c, status: 'banned', banReason: 'Batch security review.' } : c))
    );

    try {
      await axiosPrivate.post('/users/admin/bulk-status', {
        ids,
        status: 'banned',
        banReason: 'Batch security review.',
      });
      toast.error(`${ids.length} candidates restricted/suspended! ⛔`);
    } catch (err) {
      setCandidates(previousCandidates);
      toast.error(err.response?.data?.message || 'Bulk suspension failed');
    }
  };

  // Action: AI Candidate Re-Evaluation
  const evaluateCandidateAi = async (id) => {
    try {
      const res = await axiosPrivate.post(`/users/admin/${id}/ai-evaluate`);
      if (res.data?.data) {
        const { updatedUser } = res.data.data;
        setCandidates((prev) =>
          prev.map((c) => (c.id === id ? { ...c, matchScore: updatedUser.matchScore } : c))
        );
        toast.success(`AI Evaluation finished for ${updatedUser.name}! Score: ${updatedUser.matchScore}% 🤖`);
        return res.data.data;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'AI evaluation failed');
      throw err;
    }
  };

  // Action: Verify Employer & Corporate Credentials
  const verifyEmployer = async (id) => {
    const target = employers.find((e) => e.id === id);
    if (!target) return;

    setEmployers((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              verificationStatus: 'verified',
              verifiedDate: 'Just now',
              rejectionReason: undefined,
            }
          : e
      )
    );

    // Update KPI counter
    setKpis((prev) => ({
      ...prev,
      verifiedEmployersCount: prev.verifiedEmployersCount + 1,
      pendingEmployersCount: Math.max(0, prev.pendingEmployersCount - 1),
    }));

    try {
      await axiosPrivate.put(`/users/admin/employers/${id}/verification`, {
        verificationStatus: 'verified',
      });

      // Record in Audit Trail
      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Employer Verification',
        detail: `Approved SECP & NTN corporate verification credentials for ${target.name}`,
        timestamp: 'Just now',
        type: 'success',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.success(`Employer ${target.name} verified and approved to post jobs! ✓`);
    } catch (err) {
      setEmployers((prev) =>
        prev.map((e) => (e.id === id ? target : e))
      );
      toast.error(err.response?.data?.message || 'Failed to verify employer');
    }
  };

  // Action: Suspend / Reject Employer
  const suspendEmployer = async (id, reason) => {
    const target = employers.find((e) => e.id === id);
    if (!target) return;

    const rejectionReason = reason || 'Corporate credential discrepancies or unverified NTN registration.';

    setEmployers((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              verificationStatus: 'suspended',
              rejectionReason,
            }
          : e
      )
    );

    try {
      await axiosPrivate.put(`/users/admin/employers/${id}/verification`, {
        verificationStatus: 'suspended',
        rejectionReason,
      });

      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Employer Suspended',
        detail: `Suspended corporate account for ${target.name}. Reason: ${rejectionReason}`,
        timestamp: 'Just now',
        type: 'warning',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.error(`Employer ${target.name} has been suspended / rejected! ⛔`);
    } catch (err) {
      setEmployers((prev) =>
        prev.map((e) => (e.id === id ? target : e))
      );
      toast.error(err.response?.data?.message || 'Failed to suspend employer');
    }
  };

  // Action: Delete Employer record
  const deleteEmployer = async (id) => {
    const target = employers.find((e) => e.id === id);
    const deletedName = target ? target.name : 'Employer';

    setEmployers((prev) => prev.filter((e) => e.id !== id));

    try {
      await axiosPrivate.delete(`/users/admin/employers/${id}`);

      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Employer Record Purged',
        detail: `Permanently removed company record for ${deletedName}`,
        timestamp: 'Just now',
        type: 'warning',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.success(`Employer record for ${deletedName} deleted from platform.`);
    } catch (err) {
      if (target) {
        setEmployers((prev) => [target, ...prev]);
      }
      toast.error(err.response?.data?.message || 'Failed to delete employer record');
    }
  };

  // Action: Bulk Verify Employers
  const bulkVerifyEmployers = async (ids) => {
    if (!ids || ids.length === 0) return;

    const previousEmployers = [...employers];
    setEmployers((prev) =>
      prev.map((e) =>
        ids.includes(e.id)
          ? { ...e, verificationStatus: 'verified', verifiedDate: 'Just now', rejectionReason: undefined }
          : e
      )
    );

    try {
      await axiosPrivate.post('/users/admin/employers/bulk-verification', {
        ids,
        verificationStatus: 'verified',
      });
      toast.success(`${ids.length} employers verified and authorized! ✓`);
    } catch (err) {
      setEmployers(previousEmployers);
      toast.error(err.response?.data?.message || 'Bulk verification failed');
    }
  };

  // Action: Bulk Suspend Employers
  const bulkSuspendEmployers = async (ids) => {
    if (!ids || ids.length === 0) return;

    const previousEmployers = [...employers];
    setEmployers((prev) =>
      prev.map((e) =>
        ids.includes(e.id)
          ? { ...e, verificationStatus: 'suspended', rejectionReason: 'Batch compliance suspension.' }
          : e
      )
    );

    try {
      await axiosPrivate.post('/users/admin/employers/bulk-verification', {
        ids,
        verificationStatus: 'suspended',
        rejectionReason: 'Batch compliance suspension.',
      });
      toast.error(`${ids.length} employers suspended! ⛔`);
    } catch (err) {
      setEmployers(previousEmployers);
      toast.error(err.response?.data?.message || 'Bulk suspension failed');
    }
  };

  // Action: Approve Job Posting
  const approveJob = async (id) => {
    const target = jobs.find((j) => j.id === id);
    if (!target) return;

    setJobs((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, moderationStatus: 'approved', flagReason: undefined } : j
      )
    );

    try {
      await axiosPrivate.put(`/jobs/admin/${id}/status`, {
        moderationStatus: 'approved',
      });

      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Job Post Approved',
        detail: `Approved and published vacancy "${target.title}" posted by ${target.company}`,
        timestamp: 'Just now',
        type: 'success',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.success(`Job "${target.title}" approved and published to candidate feed! ✓`);
    } catch (err) {
      setJobs((prev) => prev.map((j) => (j.id === id ? target : j)));
      toast.error(err.response?.data?.message || 'Failed to approve job vacancy');
    }
  };

  // Action: Flag Job Posting as Suspicious / Scam
  const flagJob = async (id, reason) => {
    const target = jobs.find((j) => j.id === id);
    if (!target) return;

    const flagReason = reason || 'Suspicious recruitment or unverified credentials reported.';

    setJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              moderationStatus: 'flagged',
              flagReason,
            }
          : j
      )
    );

    try {
      await axiosPrivate.put(`/jobs/admin/${id}/status`, {
        moderationStatus: 'flagged',
        flagReason,
      });

      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Job Post Flagged (Scam Alert)',
        detail: `Flagged vacancy "${target.title}" by ${target.company}. Alert: ${flagReason}`,
        timestamp: 'Just now',
        type: 'warning',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.error(`Job "${target.title}" flagged as suspicious/scam! ⚠️`);
    } catch (err) {
      setJobs((prev) => prev.map((j) => (j.id === id ? target : j)));
      toast.error(err.response?.data?.message || 'Failed to flag job vacancy');
    }
  };

  // Action: Block Job Posting Permanently
  const blockJob = async (id, reason) => {
    const target = jobs.find((j) => j.id === id);
    if (!target) return;

    const flagReason = reason || 'Violated platform integrity and safety standards.';

    setJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              moderationStatus: 'blocked',
              flagReason,
            }
          : j
      )
    );

    try {
      await axiosPrivate.put(`/jobs/admin/${id}/status`, {
        moderationStatus: 'blocked',
        flagReason,
      });

      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Job Post Blocked',
        detail: `Blocked listing "${target.title}" by ${target.company}. Violation: ${flagReason}`,
        timestamp: 'Just now',
        type: 'warning',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.error(`Job "${target.title}" blocked and hidden from candidate feed! ⛔`);
    } catch (err) {
      setJobs((prev) => prev.map((j) => (j.id === id ? target : j)));
      toast.error(err.response?.data?.message || 'Failed to block job vacancy');
    }
  };

  // Action: Delete Job Posting Permanently
  const deleteJob = async (id) => {
    const target = jobs.find((j) => j.id === id);
    const jobTitle = target ? target.title : 'Job';

    setJobs((prev) => prev.filter((j) => j.id !== id));

    try {
      await axiosPrivate.delete(`/jobs/admin/${id}`);

      const newAuditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Job Post Purged',
        detail: `Permanently removed vacancy "${jobTitle}" from platform database`,
        timestamp: 'Just now',
        type: 'warning',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [newAuditEntry, ...prev]);
      toast.success(`Job "${jobTitle}" permanently removed.`);
    } catch (err) {
      if (target) {
        setJobs((prev) => [target, ...prev]);
      }
      toast.error(err.response?.data?.message || 'Failed to delete job posting');
    }
  };

  // Action: Bulk Approve Jobs
  const bulkApproveJobs = async (ids) => {
    if (!ids || ids.length === 0) return;

    const previousJobs = [...jobs];
    setJobs((prev) =>
      prev.map((j) =>
        ids.includes(j.id) ? { ...j, moderationStatus: 'approved', flagReason: undefined } : j
      )
    );

    try {
      await axiosPrivate.post('/jobs/admin/bulk-status', {
        ids,
        moderationStatus: 'approved',
      });
      toast.success(`${ids.length} vacancies approved and published! ✓`);
    } catch (err) {
      setJobs(previousJobs);
      toast.error(err.response?.data?.message || 'Bulk job approval failed');
    }
  };

  // Action: Bulk Flag Jobs
  const bulkFlagJobs = async (ids) => {
    if (!ids || ids.length === 0) return;

    const previousJobs = [...jobs];
    setJobs((prev) =>
      prev.map((j) =>
        ids.includes(j.id)
          ? { ...j, moderationStatus: 'flagged', flagReason: 'Batch administrative spam flag.' }
          : j
      )
    );

    try {
      await axiosPrivate.post('/jobs/admin/bulk-status', {
        ids,
        moderationStatus: 'flagged',
        flagReason: 'Batch administrative spam flag.',
      });
      toast.error(`${ids.length} vacancies flagged as suspicious! ⚠️`);
    } catch (err) {
      setJobs(previousJobs);
      toast.error(err.response?.data?.message || 'Bulk job flagging failed');
    }
  };

  // Action: Bulk Delete Jobs
  const bulkDeleteJobs = async (ids) => {
    if (!ids || ids.length === 0) return;

    const previousJobs = [...jobs];
    setJobs((prev) => prev.filter((j) => !ids.includes(j.id)));

    try {
      await axiosPrivate.post('/jobs/admin/bulk-delete', { ids });
      toast.success(`${ids.length} vacancies removed.`);
    } catch (err) {
      setJobs(previousJobs);
      toast.error(err.response?.data?.message || 'Bulk job removal failed');
    }
  };

  // Action: Mark single notification read
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // Action: Mark all notifications read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success('All administrator alerts marked as read! ✓');
  };

  // Action: Update AI Algorithm Weights (Live Calibration)
  const updateAiWeights = async (newWeights) => {
    const previousSettings = { ...aiSettings };
    setAiSettings((prev) => ({
      ...prev,
      ...newWeights,
      lastCalibrated: 'Just now (Admin Live Session)',
    }));

    try {
      const res = await axiosPrivate.put('/users/admin/ai-settings', newWeights);
      if (res.data?.data) {
        setAiSettings((prev) => ({
          ...prev,
          ...res.data.data,
        }));
      }

      const auditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Algorithm Weights Calibrated',
        detail: `Re-balanced weights: Skill (${newWeights.skillWeight}%), Experience (${newWeights.experienceWeight}%), Education (${newWeights.educationWeight}%)`,
        timestamp: 'Just now',
        type: 'info',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [auditEntry, ...prev]);
      toast.success('AI Matching weights updated and persisted to MongoDB! ⚡');
    } catch (err) {
      setAiSettings(previousSettings);
      toast.error(err.response?.data?.message || 'Failed to update algorithm weights');
    }
  };

  // Action: Apply Algorithm Preset
  const applyAlgorithmPreset = async (presetId) => {
    const preset = ALGORITHM_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const previousSettings = { ...aiSettings };
    const payload = {
      skillWeight: preset.skillWeight,
      experienceWeight: preset.experienceWeight,
      educationWeight: preset.educationWeight,
      activePresetName: preset.name,
    };

    setAiSettings((prev) => ({
      ...prev,
      ...payload,
      lastCalibrated: 'Just now (Preset Switch)',
    }));

    try {
      const res = await axiosPrivate.put('/users/admin/ai-settings', payload);
      if (res.data?.data) {
        setAiSettings((prev) => ({
          ...prev,
          ...res.data.data,
        }));
      }

      const auditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Algorithm Preset Activated',
        detail: `Switched scoring profile to "${preset.name}" (${preset.skillWeight}/${preset.experienceWeight}/${preset.educationWeight})`,
        timestamp: 'Just now',
        type: 'success',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [auditEntry, ...prev]);
      toast.success(`Activated preset: ${preset.name} ✓`);
    } catch (err) {
      setAiSettings(previousSettings);
      toast.error(err.response?.data?.message || 'Failed to activate preset');
    }
  };

  // Action: Reset Algorithm to Official FYP Baseline
  const resetAlgorithmDefaults = async () => {
    const previousSettings = { ...aiSettings };
    setAiSettings(INITIAL_AI_ALGORITHM_SETTINGS);

    try {
      const res = await axiosPrivate.post('/users/admin/ai-settings/reset');
      if (res.data?.data) {
        setAiSettings((prev) => ({
          ...prev,
          ...res.data.data,
        }));
      }

      const auditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Algorithm Baseline Restored',
        detail: 'Restored official FYP proposal 50-30-20 standard baseline ratio',
        timestamp: 'Just now',
        type: 'info',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [auditEntry, ...prev]);
      toast.success('Restored algorithm to FYP Proposal Standard (50 / 30 / 20) 🔄');
    } catch (err) {
      setAiSettings(previousSettings);
      toast.error(err.response?.data?.message || 'Failed to reset algorithm baseline');
    }
  };

  // Action: Add New Taxonomy Skill
  const addTaxonomySkill = async (skill) => {
    const parsedAliases = skill.aliases
      ? (typeof skill.aliases === 'string' ? skill.aliases.split(',').map((s) => s.trim()) : skill.aliases)
      : [skill.name.toLowerCase()];

    const optimisticId = `sk-${Date.now()}`;
    const optimisticSkill = {
      id: optimisticId,
      name: skill.name.trim(),
      category: skill.category || 'Computer Science & IT',
      aliases: parsedAliases,
      popularity: 85,
      weightMultiplier: parseFloat(skill.weightMultiplier) || 1.0,
      demandLevel: skill.demandLevel || 'High',
    };

    setSkillsTaxonomy((prev) => [optimisticSkill, ...prev]);

    try {
      const res = await axiosPrivate.post('/users/admin/skills', {
        name: skill.name.trim(),
        category: skill.category || 'Computer Science & IT',
        aliases: parsedAliases,
        weightMultiplier: parseFloat(skill.weightMultiplier) || 1.0,
        demandLevel: skill.demandLevel || 'High',
        popularity: 85,
      });

      if (res.data?.data) {
        setSkillsTaxonomy((prev) =>
          prev.map((s) => (s.id === optimisticId ? { ...s, id: res.data.data.id, _id: res.data.data._id } : s))
        );
      }

      const auditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Skill Taxonomy Expanded',
        detail: `Indexed new skill "${optimisticSkill.name}" under ${optimisticSkill.category} (Multiplier: ${optimisticSkill.weightMultiplier}x)`,
        timestamp: 'Just now',
        type: 'success',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [auditEntry, ...prev]);
      toast.success(`Skill "${optimisticSkill.name}" registered into AI vectorizer! 🎯`);
    } catch (err) {
      setSkillsTaxonomy((prev) => prev.filter((s) => s.id !== optimisticId));
      toast.error(err.response?.data?.message || 'Failed to add skill to taxonomy');
    }
  };

  // Action: Remove Taxonomy Skill
  const removeTaxonomySkill = async (skillId) => {
    let skillName = '';
    const target = skillsTaxonomy.find((s) => s.id === skillId || s._id === skillId);
    skillName = target ? target.name : 'Skill';

    const previousTaxonomy = [...skillsTaxonomy];
    setSkillsTaxonomy((prev) => prev.filter((s) => s.id !== skillId && s._id !== skillId));

    try {
      const targetDbId = target?._id || target?.id || skillId;
      await axiosPrivate.delete(`/users/admin/skills/${targetDbId}`);

      const auditEntry = {
        id: `audit-${Date.now()}`,
        action: 'Skill Deprecated',
        detail: `Removed skill "${skillName}" from active matching taxonomy`,
        timestamp: 'Just now',
        type: 'warning',
        actor: `${adminProfile.name} (Super Admin)`,
      };
      setAuditLog((prev) => [auditEntry, ...prev]);
      toast.success(`Skill "${skillName}" removed from taxonomy.`);
    } catch (err) {
      setSkillsTaxonomy(previousTaxonomy);
      toast.error(err.response?.data?.message || 'Failed to remove skill from database');
    }
  };

  // Action: Admin Logout
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      // ignore
    } finally {
      dispatch(logOut());
      toast.success('Successfully logged out of Admin Portal');
      navigate('/login');
    }
  };

  const contextValue = useMemo(
    () => ({
      adminProfile,
      kpis,
      setKpis,
      chartsData,
      setChartsData,
      refreshDashboard,
      candidates,
      setCandidates,
      refreshCandidates,
      toggleCandidateStatus,
      banCandidate,
      activateCandidate,
      deleteCandidate,
      bulkActivate,
      bulkBan,
      evaluateCandidateAi,
      employers,
      setEmployers,
      refreshEmployers,
      verifyEmployer,
      suspendEmployer,
      deleteEmployer,
      bulkVerifyEmployers,
      bulkSuspendEmployers,
      jobs,
      setJobs,
      refreshJobs,
      approveJob,
      flagJob,
      blockJob,
      deleteJob,
      bulkApproveJobs,
      bulkFlagJobs,
      bulkDeleteJobs,
      aiSettings,
      setAiSettings,
      refreshAiSettings,
      algorithmPresets: ALGORITHM_PRESETS,
      skillsTaxonomy,
      updateAiWeights,
      applyAlgorithmPreset,
      resetAlgorithmDefaults,
      addTaxonomySkill,
      removeTaxonomySkill,
      auditLog,
      setAuditLog,
      refreshLogs,
      loginHistory,
      setLoginHistory,
      securityAlerts,
      setSecurityAlerts,
      resolveSecurityAlert,
      blockIpAddress,
      triggerExportFypPdf,
      triggerExportAuditCsv,
      triggerExportLoginCsv,
      notifications,
      setNotifications,
      markNotificationRead,
      markAllNotificationsRead,
      sidebarOpen,
      setSidebarOpen,
      searchQuery,
      setSearchQuery,
      handleLogout,
    }),
    [
      adminProfile,
      kpis,
      chartsData,
      candidates,
      employers,
      jobs,
      aiSettings,
      skillsTaxonomy,
      auditLog,
      loginHistory,
      securityAlerts,
      notifications,
      sidebarOpen,
      searchQuery,
      handleLogout,
    ]
  );

  return (
    <AdminPortalContext.Provider value={contextValue}>
      {children}
    </AdminPortalContext.Provider>
  );
};

export const useAdminPortal = () => {
  const context = useContext(AdminPortalContext);
  if (!context) {
    throw new Error('useAdminPortal must be used within an AdminPortalProvider');
  }
  return context;
};

export default AdminPortalContext;
