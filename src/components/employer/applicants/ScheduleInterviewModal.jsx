import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Video, MapPin, Send, User, Briefcase, FileText, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export const ScheduleInterviewModal = ({
  isOpen,
  onClose,
  applicant,
  onSchedule,
}) => {
  const [formData, setFormData] = useState({
    candidateEmail: '',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '11:00 AM',
    mode: 'Google Meet (Video Call)',
    linkOrRoom: 'https://meet.google.com/xyz-recruiter-session',
    agenda: 'Technical Competency & Cultural Fit Screening (Round 1)',
  });

  useEffect(() => {
    if (applicant) {
      setFormData((prev) => ({
        ...prev,
        candidateEmail: applicant.email || 'safwanarshad782@gmail.com',
      }));
    }
  }, [applicant]);

  if (!isOpen || !applicant) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      toast.error('Please specify both interview date and time');
      return;
    }
    if (!formData.candidateEmail) {
      toast.error('Please provide candidate email for interview invitation');
      return;
    }

    onSchedule(applicant.id, {
      ...formData,
      candidateEmail: formData.candidateEmail,
      candidateName: applicant.name,
      jobTitle: applicant.appliedJobTitle,
      company: applicant.company || 'Hiring Company',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg 2xl:max-w-2xl 3xl:max-w-3xl rounded-2xl 2xl:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 2xl:px-8 2xl:py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5 2xl:gap-3.5">
            <div className="w-8 h-8 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200/60">
              <Calendar className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base 2xl:text-xl 3xl:text-2xl">
                Schedule Candidate Interview
              </h3>
              <p className="text-xs 2xl:text-sm text-slate-500">
                1-Click Calendar Sync & Notification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 2xl:w-6 2xl:h-6" />
          </button>
        </div>

        {/* Candidate Context Pill */}
        <div className="px-6 py-3 2xl:px-8 2xl:py-4 bg-blue-50/60 border-b border-blue-100/60 flex items-center justify-between text-xs 2xl:text-sm">
          <div className="flex items-center gap-3">
            <img
              src={applicant.avatar}
              alt={applicant.name}
              className="w-9 h-9 rounded-full object-cover border border-blue-200"
            />
            <div>
              <h4 className="text-xs font-bold text-slate-900">{applicant.name}</h4>
              <p className="text-[11px] text-slate-600">{applicant.appliedJobTitle}</p>
            </div>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
            ⭐ {applicant.matchScore}% Match
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
          {/* Candidate Email Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Candidate Email Address</span>
                <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Gmail SMTP Active
              </span>
            </div>
            <input
              type="email"
              required
              placeholder="candidate@example.com"
              value={formData.candidateEmail}
              onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Official interview invitation letter with calendar details and meeting link will be dispatched to this email.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Interview Date */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Interview Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>

            {/* Interview Time */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Interview Time <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 11:30 AM PKT"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Interview Mode */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-blue-600" />
              Interview Mode
            </label>
            <select
              value={formData.mode}
              onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
            >
              <option value="Google Meet (Video Call)">🎥 Google Meet (Online Video Call)</option>
              <option value="Zoom Meeting">💻 Zoom Meeting</option>
              <option value="Onsite HQ (In-Person)">🏢 Onsite HQ (In-Person Interview)</option>
              <option value="Telephone Screening">📞 Phone Screen</option>
            </select>
          </div>

          {/* Meeting Link or Room Details */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Meeting Link or Office Room
            </label>
            <input
              type="text"
              value={formData.linkOrRoom}
              onChange={(e) => setFormData({ ...formData, linkOrRoom: e.target.value })}
              placeholder="e.g. https://meet.google.com/... or Conference Room B, 4th Floor"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
            />
          </div>

          {/* Agenda / Notes for Candidate */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Interview Agenda / Instructions
            </label>
            <textarea
              rows={2}
              value={formData.agenda}
              onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 resize-none"
            />
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Send Invite</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
