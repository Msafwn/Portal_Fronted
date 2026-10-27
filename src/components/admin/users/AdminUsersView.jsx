import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useAdminPortal } from '../../../context/AdminPortalContext';
import { AdminUsersHeader } from './AdminUsersHeader';
import { AdminUsersKpiCards } from './AdminUsersKpiCards';
import { AdminUsersFilters } from './AdminUsersFilters';
import { AdminUsersTable } from './AdminUsersTable';
import { AdminCandidateDossierModal } from './AdminCandidateDossierModal';

export const AdminUsersView = () => {
  const {
    candidates,
    refreshCandidates,
    toggleCandidateStatus,
    deleteCandidate,
    bulkActivate,
    bulkBan,
  } = useAdminPortal();

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [selectedFaculty, setSelectedFaculty] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('AI_MATCH');

  // Dossier Modal State
  const [dossierCandidate, setDossierCandidate] = useState(null);

  // Filter and Sort Pipeline
  const filteredCandidates = useMemo(() => {
    return candidates
      .filter((c) => {
        // Text Search (Name, Email, Institution, Target Role, Skills)
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = c.name?.toLowerCase().includes(q);
          const matchEmail = c.email?.toLowerCase().includes(q);
          const matchInst = c.institution?.toLowerCase().includes(q);
          const matchRole = c.targetRole?.toLowerCase().includes(q);
          const matchSkills = c.skills?.some((s) => s.toLowerCase().includes(q));
          if (!matchName && !matchEmail && !matchInst && !matchRole && !matchSkills) {
            return false;
          }
        }

        // Role Filter
        if (selectedRole !== 'ALL' && c.role !== selectedRole) {
          return false;
        }

        // Faculty Filter
        if (selectedFaculty !== 'ALL' && c.discipline !== selectedFaculty) {
          return false;
        }

        // Status Filter
        if (selectedStatus !== 'ALL' && c.status !== selectedStatus) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'AI_MATCH') {
          return (b.matchScore || 0) - (a.matchScore || 0);
        }
        if (sortBy === 'APPLICATIONS') {
          return (b.applicationsCount || 0) - (a.applicationsCount || 0);
        }
        if (sortBy === 'NAME') {
          return a.name.localeCompare(b.name);
        }
        // NEWEST default fallback
        return (b.id || '').localeCompare(a.id || '');
      });
  }, [candidates, search, selectedRole, selectedFaculty, selectedStatus, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedRole('ALL');
    setSelectedFaculty('ALL');
    setSelectedStatus('ALL');
    setSortBy('AI_MATCH');
    toast.success('All candidate filters reset! 🔄');
  };

  const handleRefresh = async () => {
    try {
      if (refreshCandidates) {
        await refreshCandidates();
      }
      toast.success('Candidate roster and live statuses re-synced! 🔄');
    } catch {
      toast.error('Could not refresh candidate roster');
    }
  };

  return (
    <div className="space-y-6 2xl:space-y-8 3xl:space-y-10 animate-in fade-in duration-300">
      {/* 1. Header with Export & Live Count */}
      <AdminUsersHeader
        totalCount={candidates.length}
        onRefresh={handleRefresh}
      />

      {/* 2. Candidate KPIs Breakdown */}
      <AdminUsersKpiCards candidates={candidates} />

      {/* 3. Filter & Sort Bar */}
      <AdminUsersFilters
        search={search}
        setSearch={setSearch}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedFaculty={selectedFaculty}
        setSelectedFaculty={setSelectedFaculty}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleResetFilters}
      />

      {/* 4. Interactive Candidate Table */}
      <AdminUsersTable
        candidates={filteredCandidates}
        onViewDossier={(cand) => setDossierCandidate(cand)}
        onToggleStatus={toggleCandidateStatus}
        onBulkActivate={bulkActivate}
        onBulkBan={bulkBan}
        onResetFilters={handleResetFilters}
      />

      {/* 5. Detailed Candidate Dossier Modal */}
      <AdminCandidateDossierModal
        candidate={dossierCandidate}
        isOpen={Boolean(dossierCandidate)}
        onClose={() => setDossierCandidate(null)}
        onToggleStatus={toggleCandidateStatus}
        onDelete={deleteCandidate}
      />
    </div>
  );
};

export default AdminUsersView;
