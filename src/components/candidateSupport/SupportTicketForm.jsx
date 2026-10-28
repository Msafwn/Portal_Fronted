import React from 'react';
import { useSelector } from 'react-redux';
import { MessageSquare, Send } from 'lucide-react';
import { useSupport } from './SupportContext';
import { selectCurrentUser } from '../../store/slices/authSlice';

export const SupportTicketForm = ({ className = '' }) => {
  const currentUser = useSelector(selectCurrentUser);
  const {
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
    handleSubmit,
  } = useSupport();

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6 ${className}`}>
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>Create New Support Ticket</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Your inquiry will be directly routed to our AI technical matching specialists.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Candidate Name
            </label>
            <input
              type="text"
              disabled
              value={profile?.name || currentUser?.name || ''}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-semibold cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Registered Email
            </label>
            <input
              type="email"
              disabled
              value={profile?.email || currentUser?.email || ''}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-semibold cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Inquiry Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="match_score">AI Role Matching & Score Inquiries</option>
              <option value="missing_skills">Missing Skills & Gap Roadmap</option>
              <option value="resume">Resume Parsing & Verification</option>
              <option value="application">Application & Interview Status</option>
              <option value="technical">Account & Technical Assistance</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="normal">Normal (Response within 4 hours)</option>
              <option value="high">High (Urgent Application Deadline)</option>
              <option value="critical">Critical (Account / Submission Issue)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Subject / Issue Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Discrepancy in 50-30-20 score for Senior MERN Role"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Detailed Message / Query *
          </label>
          <textarea
            rows={4}
            required
            placeholder="Please describe your query in detail so our technical team can resolve it efficiently..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none leading-relaxed"
          />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            🔒 Protected by Smart Career Data Privacy Standards
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-600/30 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Support Ticket'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupportTicketForm;
