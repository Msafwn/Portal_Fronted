import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
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

      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200 p-12 text-center text-slate-500 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
            <Briefcase className="w-7 h-7" />
          </div>
          <h4 className="text-base 2xl:text-lg font-bold text-slate-900">
            No Active Job Vacancies Available Yet
          </h4>
          <p className="text-xs 2xl:text-sm text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
            When employers publish vacancies on the platform, our AI weighted matching engine will automatically score and rank compatibility with your profile.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 2xl:gap-6">
          {children ||
            paginatedJobs.map((job, idx) => (
              <RoleMatchesCard key={job.id} job={job} idx={startIndex + idx} />
            ))}
        </div>
      )}

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