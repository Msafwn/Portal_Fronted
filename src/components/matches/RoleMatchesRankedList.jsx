import React, { useState, useEffect } from 'react';
import { useRoleMatches } from './RoleMatchesContext';
import { RoleMatchesSectionHeader } from './RoleMatchesSectionHeader';
import { RoleMatchesCard } from './RoleMatchesCard';
import { Pagination } from '../common/Pagination';

export const RoleMatchesRankedList = ({ children, className = '' }) => {
  const { jobs } = useRoleMatches();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(jobs.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [jobs.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedJobs = jobs.slice(startIndex, startIndex + pageSize);

  return (
    <div className={`space-y-4 ${className}`}>
      <RoleMatchesSectionHeader />
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 2xl:gap-6">
        {children ||
          paginatedJobs.map((job, idx) => (
            <RoleMatchesCard key={job.id} job={job} idx={startIndex + idx} />
          ))}
      </div>

      {jobs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={jobs.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[5, 10, 20]}
          itemLabel="matches"
          className="rounded-2xl border border-slate-200/90 shadow-2xs"
        />
      )}
    </div>
  );
};

export default RoleMatchesRankedList;
