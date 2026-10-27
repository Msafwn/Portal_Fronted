import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useAdminPortal } from '../../../context/AdminPortalContext';
import { AdminJobsHeader } from './AdminJobsHeader';
import { AdminJobsKpiCards } from './AdminJobsKpiCards';
import { AdminJobsFilters } from './AdminJobsFilters';
import { AdminJobsTable } from './AdminJobsTable';
import { AdminJobDossierModal } from './AdminJobDossierModal';

export const AdminJobsView = () => {
  const {
    jobs,
    refreshJobs,
    approveJob,
    flagJob,
    blockJob,
    deleteJob,
    bulkApproveJobs,
    bulkFlagJobs,
    bulkDeleteJobs,
  } = useAdminPortal();

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDiscipline, setSelectedDiscipline] = useState('ALL');
  const [selectedJobType, setSelectedJobType] = useState('ALL');
  const [sortBy, setSortBy] = useState('SCAM_AND_PENDING_FIRST');

  // Dossier Modal State
  const [dossierJob, setDossierJob] = useState(null);

  // Filter and Sort Pipeline
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((j) => {
        // Text Search
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = j.title?.toLowerCase().includes(q);
          const matchCompany = j.company?.toLowerCase().includes(q);
          const matchLocation = j.location?.toLowerCase().includes(q);
          const matchRole = j.targetRole?.toLowerCase().includes(q);
          const matchSkills = j.skills?.some((s) => s.toLowerCase().includes(q));
          if (!matchTitle && !matchCompany && !matchLocation && !matchRole && !matchSkills) {
            return false;
          }
        }

        // Status Filter
        if (selectedStatus !== 'ALL' && j.moderationStatus !== selectedStatus) {
          return false;
        }

        // Discipline Filter
        if (selectedDiscipline !== 'ALL' && j.discipline !== selectedDiscipline) {
          return false;
        }

        // Job Type Filter
        if (selectedJobType !== 'ALL' && j.jobType !== selectedJobType) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'SCAM_AND_PENDING_FIRST') {
          // Flagged scams first, then pending
          const rank = (status) => {
            if (status === 'flagged') return 1;
            if (status === 'pending') return 2;
            if (status === 'approved') return 3;
            return 4;
          };
          const rankDiff = rank(a.moderationStatus) - rank(b.moderationStatus);
          if (rankDiff !== 0) return rankDiff;
          return (b.id || '').localeCompare(a.id || '');
        }
        if (sortBy === 'MOST_APPLICANTS') {
          return (b.applicantsCount || 0) - (a.applicantsCount || 0);
        }
        if (sortBy === 'TITLE_AZ') {
          return a.title.localeCompare(b.title);
        }
        // NEWEST
        return (b.id || '').localeCompare(a.id || '');
      });
  }, [jobs, search, selectedStatus, selectedDiscipline, selectedJobType, sortBy]);

  const pendingCount = jobs.filter((j) => j.moderationStatus === 'pending').length;
  const flaggedCount = jobs.filter((j) => j.moderationStatus === 'flagged').length;

  const handleResetFilters = () => {
    setSearch('');
    setSelectedStatus('ALL');
    setSelectedDiscipline('ALL');
    setSelectedJobType('ALL');
    setSortBy('SCAM_AND_PENDING_FIRST');
    toast.success('All job moderation filters reset! 🔄');
  };

  const handleRefresh = async () => {
    try {
      if (refreshJobs) {
        await refreshJobs();
      }
      toast.success('Live vacancy moderation feed synchronized! 🔄');
    } catch {
      toast.error('Could not refresh vacancy feed');
    }
  };

  return (
    <div className="space-y-6 2xl:space-y-8 3xl:space-y-10 animate-in fade-in duration-300">
      {/* 1. Header with Pending/Flagged badges & PDF Export */}
      <AdminJobsHeader
        totalCount={jobs.length}
        pendingCount={pendingCount}
        flaggedCount={flaggedCount}
        onRefresh={handleRefresh}
      />

      {/* 2. Key Metrics Cards */}
      <AdminJobsKpiCards jobs={jobs} />

      {/* 3. Filters & Search Control */}
      <AdminJobsFilters
        search={search}
        setSearch={setSearch}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedDiscipline={selectedDiscipline}
        setSelectedDiscipline={setSelectedDiscipline}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleResetFilters}
      />

      {/* 4. Interactive Moderation Table (No horizontal scrollbar!) */}
      <AdminJobsTable
        jobs={filteredJobs}
        onViewDossier={(j) => setDossierJob(j)}
        onApprove={approveJob}
        onFlag={flagJob}
        onBlock={blockJob}
        onBulkApprove={bulkApproveJobs}
        onBulkFlag={bulkFlagJobs}
        onBulkDelete={bulkDeleteJobs}
        onResetFilters={handleResetFilters}
      />

      {/* 5. Detailed Job Audit Dossier Modal */}
      <AdminJobDossierModal
        job={dossierJob}
        isOpen={Boolean(dossierJob)}
        onClose={() => setDossierJob(null)}
        onApprove={approveJob}
        onFlag={flagJob}
        onBlock={blockJob}
        onDelete={deleteJob}
      />
    </div>
  );
};

export default AdminJobsView;
