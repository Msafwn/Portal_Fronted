import React from 'react';
import { useCandidatePortal } from '../context/CandidatePortalContext';
import { CandidateSupportView } from '../components/candidateSupport/CandidateSupportView';

export const CandidateSupport = () => {
  const { profile } = useCandidatePortal();

  return (
    <CandidateSupportView profile={profile}>
      <CandidateSupportView.Header />
      <CandidateSupportView.ContactCards />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <CandidateSupportView.TicketForm className="lg:col-span-7" />
        <div className="lg:col-span-5 space-y-6">
          <CandidateSupportView.TicketList />
          <CandidateSupportView.FaqSection />
        </div>
      </div>
    </CandidateSupportView>
  );
};

export default CandidateSupport;
