import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { INQUIRY_CATEGORIES } from '../../constants';

export const ContactForm = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'candidate',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Your message has been received! We will reply shortly.');
    }, 700);
  };

  if (submitted) {
    return (
      <div className={`p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-4 ${className}`}>
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
          <p className="text-xs text-slate-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
            Thank you for contacting Smart Career AI. Our support team has received your inquiry and will respond to <strong>{formData.email}</strong> within 24 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              inquiryType: 'candidate',
              subject: '',
              message: '',
            });
          }}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors pt-2 cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm ${className}`}>
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Send Us a Message
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill out the form below and our team will get back to you promptly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ali Ahmed"
              className="w-full bg-white border border-slate-300 rounded-lg text-xs text-slate-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full bg-white border border-slate-300 rounded-lg text-xs text-slate-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Inquiry Category
            </label>
            <select
              value={formData.inquiryType}
              onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg text-xs text-slate-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors cursor-pointer"
            >
              {INQUIRY_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief summary of your query"
              className="w-full bg-white border border-slate-300 rounded-lg text-xs text-slate-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us more about what you need assistance with..."
            className="w-full bg-white border border-slate-300 rounded-lg text-xs text-slate-800 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md shadow-blue-600/25 transition-all cursor-pointer"
        >
          {submitting ? (
            <span>Sending Message...</span>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
