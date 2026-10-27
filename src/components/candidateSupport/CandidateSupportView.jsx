import React from 'react';
import { SupportProvider, useSupport } from './SupportContext';
import { SupportHeader } from './SupportHeader';
import { SupportContactCards } from './SupportContactCards';
import { SupportTicketForm } from './SupportTicketForm';
import { SupportTicketList } from './SupportTicketList';
import { SupportFaqSection } from './SupportFaqSection';

export const CandidateSupportView = ({ profile, children, className = '' }) => {
  return (
    <SupportProvider profile={profile}>
      <div className={`px-4 sm:px-6 lg:px-8 py-8 max-w-6xl 2xl:max-w-7xl mx-auto space-y-8 2xl:space-y-10 animate-in fade-in duration-200 ${className}`}>
        {children}
      </div>
    </SupportProvider>
  );
};

CandidateSupportView.Header = SupportHeader;
CandidateSupportView.ContactCards = SupportContactCards;
CandidateSupportView.TicketForm = SupportTicketForm;
CandidateSupportView.TicketList = SupportTicketList;
CandidateSupportView.FaqSection = SupportFaqSection;

export {
  useSupport,
  SupportHeader,
  SupportContactCards,
  SupportTicketForm,
  SupportTicketList,
  SupportFaqSection,
};

export default CandidateSupportView;
