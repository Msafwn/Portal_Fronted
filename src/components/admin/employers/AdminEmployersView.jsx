import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useAdminPortal } from '../../../context/AdminPortalContext';
import { AdminEmployersHeader } from './AdminEmployersHeader';
import { AdminEmployersKpiCards } from './AdminEmployersKpiCards';
import { AdminEmployersFilters } from './AdminEmployersFilters';
import { AdminEmployersTable } from './AdminEmployersTable';
import { AdminEmployerDossierModal } from './AdminEmployerDossierModal';

export const AdminEmployersView = () => {
  const {
    employers,
    refreshEmployers,
    verifyEmployer,
    suspendEmployer,
    deleteEmployer,
    bulkVerifyEmployers,
    bulkSuspendEmployers,
  } = useAdminPortal();

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedIndustry, setSelectedIndustry] = useState('ALL');
  const [sortBy, setSortBy] = useState('PENDING_FIRST');

  // Dossier Modal State
  const [dossierEmployer, setDossierEmployer] = useState(null);

  // Filter and Sort Pipeline
  const filteredEmployers = useMemo(() => {
    return employers
      .filter((emp) => {
        // Text Search (Company Name, NTN, SECP, Recruiter Name/Email, Headquarters)
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = emp.name?.toLowerCase().includes(q);
          const matchNtn = emp.ntnNumber?.toLowerCase().includes(q);
          const matchSecp = emp.secpRegNumber?.toLowerCase().includes(q);
          const matchRecruiter = emp.recruiterName?.toLowerCase().includes(q);
          const matchEmail = emp.recruiterEmail?.toLowerCase().includes(q);
          const matchHq = emp.headquarters?.toLowerCase().includes(q);
          if (
            !matchName &&
            !matchNtn &&
            !matchSecp &&
            !matchRecruiter &&
            !matchEmail &&
            !matchHq
          ) {
            return false;
          }
        }

        // Status Filter
        if (selectedStatus !== 'ALL' && emp.verificationStatus !== selectedStatus) {
          return false;
        }

        // Industry Filter
        if (selectedIndustry !== 'ALL' && emp.industry !== selectedIndustry) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PENDING_FIRST') {
          if (a.verificationStatus === 'pending' && b.verificationStatus !== 'pending') return -1;
          if (b.verificationStatus === 'pending' && a.verificationStatus !== 'pending') return 1;
          return 0;
        }
        if (sortBy === 'MOST_JOBS') {
          return (b.activeJobsCount || 0) - (a.activeJobsCount || 0);
        }
        if (sortBy === 'NAME') {
          return a.name.localeCompare(b.name);
        }
        // NEWEST
        return (b.id || '').localeCompare(a.id || '');
      });
  }, [employers, search, selectedStatus, selectedIndustry, sortBy]);

  const pendingCount = employers.filter(
    (e) => e.verificationStatus === 'pending'
  ).length;

  const handleResetFilters = () => {
    setSearch('');
    setSelectedStatus('ALL');
    setSelectedIndustry('ALL');
    setSortBy('PENDING_FIRST');
    toast.success('All employer filters reset! 🔄');
  };

  const handleRefresh = async () => {
    try {
      if (refreshEmployers) {
        await refreshEmployers();
      }
      toast.success('Corporate verification records re-synchronized! 🔄');
    } catch {
      toast.error('Could not refresh corporate registry');
    }
  };

  return (
    <div className="space-y-6 2xl:space-y-8 3xl:space-y-10 animate-in fade-in duration-300">
      {/* 1. Header with Pending Count & Export */}
      <AdminEmployersHeader
        totalCount={employers.length}
        pendingCount={pendingCount}
        onRefresh={handleRefresh}
      />

      {/* 2. Key Metrics Cards */}
      <AdminEmployersKpiCards employers={employers} />

      {/* 3. Filters & Search Control */}
      <AdminEmployersFilters
        search={search}
        setSearch={setSearch}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleResetFilters}
      />

      {/* 4. Interactive Verification Table */}
      <AdminEmployersTable
        employers={filteredEmployers}
        onViewDossier={(emp) => setDossierEmployer(emp)}
        onVerify={verifyEmployer}
        onSuspend={suspendEmployer}
        onBulkVerify={bulkVerifyEmployers}
        onBulkSuspend={bulkSuspendEmployers}
        onResetFilters={handleResetFilters}
      />

      {/* 5. Detailed Company Verification Dossier Modal */}
      <AdminEmployerDossierModal
        employer={dossierEmployer}
        isOpen={Boolean(dossierEmployer)}
        onClose={() => setDossierEmployer(null)}
        onVerify={verifyEmployer}
        onSuspend={suspendEmployer}
        onDelete={deleteEmployer}
      />
    </div>
  );
};

export default AdminEmployersView;
