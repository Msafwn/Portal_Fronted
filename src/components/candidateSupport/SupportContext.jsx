import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const SupportContext = createContext(null);

export const useSupport = () => {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error('Support subcomponents must be used within CandidateSupportView / SupportProvider');
  }
  return context;
};

export const SupportProvider = ({ profile, children }) => {
  const [category, setCategory] = useState('match_score');
  const [priority, setPriority] = useState('normal');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const [tickets, setTickets] = useState([
    {
      id: 'TICK-8402',
      category: 'AI Role Matching',
      subject: 'Query regarding missing skills weight on Senior React Role',
      status: 'In Review',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      date: 'Yesterday at 3:45 PM',
      response: 'Our AI engineers are verifying the skill ontology mapping for your profile.',
    },
    {
      id: 'TICK-7911',
      category: 'Resume Upload',
      subject: 'Updated resume formatting check',
      status: 'Resolved',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      date: 'Sep 28, 2026',
      response: 'Your resume was successfully parsed with 7 technical competencies extracted.',
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error('Please enter a subject and detailed message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newTicket = {
        id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
        category:
          category === 'match_score'
            ? 'AI Role Matching'
            : category === 'resume'
            ? 'Resume & Parsing'
            : category === 'application'
            ? 'Application Query'
            : 'Technical Support',
        subject: subject.trim(),
        status: 'Open',
        statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
        date: 'Just now',
        response: 'Ticket received. A technical advisor will reply within 2 hours.',
      };

      setTickets([newTicket, ...tickets]);
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
      toast.success(`Support Ticket #${newTicket.id} created successfully! Our team will respond shortly.`);
    }, 900);
  };

  return (
    <SupportContext.Provider
      value={{
        profile,
        category,
        setCategory,
        priority,
        setPriority,
        subject,
        setSubject,
        message,
        setMessage,
        isSubmitting,
        activeFaq,
        setActiveFaq,
        tickets,
        handleSubmit,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export default SupportContext;
