import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';
import { EmployerApplicantsHeader } from './EmployerApplicantsHeader';
import { EmployerApplicantsStats } from './EmployerApplicantsStats';
import { EmployerApplicantsFilterBar } from './EmployerApplicantsFilterBar';
import { EmployerApplicantCard } from './EmployerApplicantCard';
import { ScheduleInterviewModal } from './ScheduleInterviewModal';
import { ApplicantProfileModal } from './ApplicantProfileModal';
import { Users, Sparkles, Filter } from 'lucide-react';
import { Pagination } from '../../common/Pagination';

export const EmployerApplicantsView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialJobId = searchParams.get('jobId') || 'All';

  const {
    company,
    applicants,
    jobs,
    handleUpdateApplicantStatus,
    handleScheduleInterview,
    handleRunAiAtsEvaluation,
  } = useEmployerPortal();

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(initialJobId);
  const [statusFilter, setStatusFilter] = useState('All');
  const [minMatchFilter, setMinMatchFilter] = useState(0);
  const [sortBy, setSortBy] = useState('match_desc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modals state
  const [scheduleApplicant, setScheduleApplicant] = useState(null);
  const [profileApplicant, setProfileApplicant] = useState(null);

  // Sync if query param changes
  useEffect(() => {
    const paramJobId = searchParams.get('jobId');
    if (paramJobId) {
      setSelectedJobId(paramJobId);
    }
  }, [searchParams]);

  const activeJob = jobs.find((j) => j.id === selectedJobId);

  const handleClearJobFilter = () => {
    setSelectedJobId('All');
    setSearchParams({});
  };

  // Filter and Sort Logic
  const filteredAndSortedApplicants = useMemo(() => {
    let result = applicants.filter((app) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = app.name?.toLowerCase().includes(q);
        const roleMatch = app.appliedJobTitle?.toLowerCase().includes(q);
        const eduMatch = app.education?.toLowerCase().includes(q);
        const skillsMatch = app.matchedSkills?.some((s) => s.toLowerCase().includes(q));

        if (!nameMatch && !roleMatch && !eduMatch && !skillsMatch) return false;
      }

      // 2. Job Filter
      if (selectedJobId !== 'All') {
        if (app.appliedJobId !== selectedJobId) return false;
      }

      // 3. Status Filter
      if (statusFilter !== 'All') {
        if (app.status !== statusFilter) return false;
      }

      // 4. Match Score Filter
      if (minMatchFilter > 0) {
        if ((app.matchScore || 0) < minMatchFilter) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'match_desc') {
        return (b.matchScore || 0) - (a.matchScore || 0); // Highest match on top!
      }
      if (sortBy === 'name_asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'newest') {
        return (b.id || '').localeCompare(a.id || '');
      }
      return (b.matchScore || 0) - (a.matchScore || 0);
    });

    return result;
  }, [applicants, searchQuery, selectedJobId, statusFilter, minMatchFilter, sortBy]);

  const handleToggleShortlist = (applicantId) => {
    const target = applicants.find((a) => a.id === applicantId);
    if (!target) return;
    const nextStatus = target.status === 'Shortlisted' ? 'Under Review' : 'Shortlisted';
    handleUpdateApplicantStatus(applicantId, nextStatus);
  };

  const handleRejectApplicant = (applicantId) => {
    handleUpdateApplicantStatus(applicantId, 'Rejected');
  };

  // Clamp pagination when filters change
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredAndSortedApplicants.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [filteredAndSortedApplicants.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedApplicants = filteredAndSortedApplicants.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="space-y-6 2xl:space-y-8 3xl:space-y-10 animate-in fade-in duration-200">
      {/* 1. Header with Breadcrumbs & Action CTAs */}
      <EmployerApplicantsHeader
        totalApplicants={applicants.length}
        highMatchCount={applicants.filter((a) => (a.matchScore || 0) >= 80).length}
        activeJobFilterTitle={activeJob?.title || null}
        onClearJobFilter={handleClearJobFilter}
        applicants={filteredAndSortedApplicants}
        company={company}
      />

      {/* 2. Key Metrics Overview */}
      <EmployerApplicantsStats applicants={applicants} />

      {/* 3. Search, Filter Bar & Sort Controls */}
      <EmployerApplicantsFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedJobId={selectedJobId}
        setSelectedJobId={setSelectedJobId}
        jobs={jobs}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        minMatchFilter={minMatchFilter}
        setMinMatchFilter={setMinMatchFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredCount={filteredAndSortedApplicants.length}
        totalCount={applicants.length}
      />

      {/* 4. Ranked Applicants Cards List (Main USP) */}
      {filteredAndSortedApplicants.length > 0 ? (
        <div className="space-y-4 2xl:space-y-6 3xl:space-y-8">
          {paginatedApplicants.map((applicant, index) => (
            <EmployerApplicantCard
              key={applicant.id}
              applicant={applicant}
              rank={startIndex + index + 1}
              onShortlist={handleToggleShortlist}
              onSchedule={(app) => setScheduleApplicant(app)}
              onReject={handleRejectApplicant}
              onViewProfile={(app) => setProfileApplicant(app)}
            />
          ))}

          {/* Unique Reusable Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredAndSortedApplicants.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[5, 10, 20]}
            itemLabel="applicants"
            className="rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs mt-4 2xl:mt-6"
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-100">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
            No Candidates Match Your Filters
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
            We couldn't find any applicants matching your selected vacancy, status, or AI compatibility threshold.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedJobId('All');
              setStatusFilter('All');
              setMinMatchFilter(0);
              setSearchParams({});
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* 5. Schedule Interview Modal */}
      <ScheduleInterviewModal
        isOpen={Boolean(scheduleApplicant)}
        applicant={scheduleApplicant}
        onClose={() => setScheduleApplicant(null)}
        onSchedule={(id, details) => handleScheduleInterview(id, details)}
      />

      {/* 6. Candidate Deep-Dive Profile Modal */}
      <ApplicantProfileModal
        isOpen={Boolean(profileApplicant)}
        applicant={profileApplicant}
        onClose={() => setProfileApplicant(null)}
        onShortlist={handleToggleShortlist}
        onScheduleClick={(app) => setScheduleApplicant(app)}
        onReject={handleRejectApplicant}
        onRunAiAudit={async (id) => {
          if (handleRunAiAtsEvaluation) {
            await handleRunAiAtsEvaluation(id);
            setProfileApplicant((prev) => {
              if (!prev) return prev;
              const updated = applicants.find((a) => a.id === id);
              return updated || prev;
            });
          }
        }}
      />
    </div>
  );
};

export default EmployerApplicantsView;
