import React, { useState, useEffect } from 'react';
import { useApplications } from './ApplicationsContext';
import { ApplicationsItem } from './ApplicationsItem';
import { ApplicationsEmptyState } from './ApplicationsEmptyState';
import { Pagination } from '../common/Pagination';

export const ApplicationsList = ({ children, className = '' }) => {
  const { filteredApps } = useApplications();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredApps.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [filteredApps.length, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedApps = filteredApps.slice(startIndex, startIndex + pageSize);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
        {children ||
          (filteredApps.length === 0 ? (
            <ApplicationsEmptyState />
          ) : (
            paginatedApps.map((app) => <ApplicationsItem key={app.id} app={app} />)
          ))}
      </div>

      {filteredApps.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredApps.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[5, 10, 20]}
          itemLabel="applications"
          className="rounded-2xl border border-slate-200/90 shadow-2xs"
        />
      )}
    </div>
  );
};

export default ApplicationsList;
