import React, { useState, useMemo } from 'react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';
import { axiosPrivate } from '../../../services/apiClient';
import { EmployerJobsHeader } from './EmployerJobsHeader';
import { EmployerJobsStats } from './EmployerJobsStats';
import { EmployerJobsFilterBar } from './EmployerJobsFilterBar';
import { EmployerJobsCardList } from './EmployerJobsCardList';
import { EmployerJobEditModal } from './EmployerJobEditModal';

export const EmployerJobsView = () => {
  const {
    jobs,
    setJobs,
    handleUpdateJobStatus,
    handleDeleteJob,
  } = useEmployerPortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [roleTargetFilter, setRoleTargetFilter] = useState('All');
  const [editingJob, setEditingJob] = useState(null);

  // Filtered jobs memo
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = job.title?.toLowerCase().includes(query);
        const deptMatch = job.department?.toLowerCase().includes(query);
        const locationMatch = job.location?.toLowerCase().includes(query);
        const skillsMatch = job.skillsRequired?.some((s) =>
          s.toLowerCase().includes(query)
        );

        if (!titleMatch && !deptMatch && !locationMatch && !skillsMatch) {
          return false;
        }
      }

      // 2. Status Filter
      if (statusFilter !== 'All') {
        if (job.status !== statusFilter) return false;
      }

      // 3. Department / Sector Filter
      if (departmentFilter !== 'All') {
        // Sector fuzzy / exact match
        if (departmentFilter === 'Computer Science & IT') {
          const itKeywords = ['computer', 'it', 'software', 'tech', 'full stack', 'intelligence', 'mobile', 'cloud'];
          const match = itKeywords.some((k) =>
            job.department?.toLowerCase().includes(k)
          );
          if (!match && job.department !== departmentFilter) return false;
        } else {
          if (!job.department?.toLowerCase().includes(departmentFilter.toLowerCase())) {
            return false;
          }
        }
      }

      // 4. Role Target Filter
      if (roleTargetFilter !== 'All') {
        if (job.roleTarget !== roleTargetFilter) return false;
      }

      return true;
    });
  }, [jobs, searchQuery, statusFilter, departmentFilter, roleTargetFilter]);

  const activeJobsCount = jobs.filter((j) => j.status === 'Active').length;

  const handleSaveJobEdit = async (jobId, updatedData) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId || job._id === jobId) {
          return {
            ...job,
            ...updatedData,
          };
        }
        return job;
      })
    );

    const target = jobs.find((j) => j.id === jobId || j._id === jobId);
    const realId = target?._id || jobId;
    if (realId && String(realId).length === 24) {
      try {
        await axiosPrivate.put(`/jobs/${realId}`, updatedData);
      } catch (e) {
        console.warn('Backend job edit sync note:', e.message);
      }
    }
  };

  return (
    <div className="space-y-6 2xl:space-y-8 3xl:space-y-10 animate-in fade-in duration-200">
      {/* 1. Header with Breadcrumbs & Action CTA */}
      <EmployerJobsHeader
        totalJobs={jobs.length}
        activeJobs={activeJobsCount}
      />

      {/* 2. Key Metrics Overview (KPIs) */}
      <EmployerJobsStats jobs={jobs} />

      {/* 3. Multi-Filter & Search Bar */}
      <EmployerJobsFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        roleTargetFilter={roleTargetFilter}
        setRoleTargetFilter={setRoleTargetFilter}
        jobsCount={filteredJobs.length}
        totalJobsCount={jobs.length}
      />

      {/* 4. Jobs Portfolio Card List */}
      <EmployerJobsCardList
        jobs={filteredJobs}
        onUpdateStatus={handleUpdateJobStatus}
        onDeleteJob={handleDeleteJob}
        onEditJob={(job) => setEditingJob(job)}
      />

      {/* 5. Quick Edit Modal */}
      <EmployerJobEditModal
        isOpen={Boolean(editingJob)}
        job={editingJob}
        onClose={() => setEditingJob(null)}
        onSave={handleSaveJobEdit}
      />
    </div>
  );
};

export default EmployerJobsView;
