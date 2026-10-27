import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { useJobFeed } from './JobFeedContext';
import { JobFeedCard } from './JobFeedCard';
import { Pagination } from '../common/Pagination';

export const JobFeedGrid = ({ children, className = '' }) => {
  const { jobs } = useJobFeed();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(jobs.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [jobs.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedJobs = jobs.slice(startIndex, startIndex + pageSize);

  if (jobs.length === 0) {
    return (
      <div className={`p-12 2xl:p-16 text-center bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200 ${className}`}>
        <Filter className="w-8 h-8 2xl:w-12 2xl:h-12 text-slate-300 mx-auto mb-2 2xl:mb-3" />
        <h3 className="text-sm 2xl:text-lg font-bold text-slate-800">
          No positions found
        </h3>
        <p className="text-xs 2xl:text-base text-slate-500 mt-1 2xl:mt-2">
          Try adjusting your search query, sector, or work mode filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 2xl:space-y-8">
      <div className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4k:grid-cols-5 gap-4 2xl:gap-6 3xl:gap-8 ${className}`}>
        {children || paginatedJobs.map((job) => <JobFeedCard key={job.id} job={job} />)}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={jobs.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[6, 12, 24]}
        itemLabel="positions"
        className="rounded-2xl border border-slate-200/90 shadow-2xs"
      />
    </div>
  );
};

export default JobFeedGrid;
