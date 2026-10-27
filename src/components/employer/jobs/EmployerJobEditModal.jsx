import React, { useState, useEffect } from 'react';
import { X, Save, Briefcase, MapPin, DollarSign, Calendar, Users, Building2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const EmployerJobEditModal = ({ isOpen, onClose, job, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: 'Computer Science & IT',
    roleTarget: 'Entry-Level',
    totalSeats: 2,
    location: '',
    salary: '',
    deadline: '',
    status: 'Active',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        department: job.department || 'Computer Science & IT',
        roleTarget: job.roleTarget || 'Entry-Level',
        totalSeats: job.totalSeats || 2,
        location: job.location || '',
        salary: job.salary || '',
        deadline: job.deadline || '',
        status: job.status || 'Active',
      });
    }
  }, [job]);

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Job Title is required');
      return;
    }

    onSave(job.id, {
      ...formData,
      totalSeats: Number(formData.totalSeats) || 1,
    });
    toast.success(`Job "${formData.title}" updated successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl rounded-2xl 2xl:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 2xl:px-8 2xl:py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5 2xl:gap-3.5">
            <div className="w-8 h-8 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60">
              <Briefcase className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base 2xl:text-xl 3xl:text-2xl">
                Edit Vacancy Details
              </h3>
              <p className="text-xs 2xl:text-sm text-slate-500">ID: {job.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 2xl:p-2 rounded-lg 2xl:rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 2xl:w-6 2xl:h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 2xl:p-8 space-y-4 2xl:space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm 2xl:text-base">
          {/* Job Title */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 2xl:mb-1.5">
              Job Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 2xl:px-4 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6">
            {/* Department */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 2xl:mb-1.5 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                Department / Sector
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2 2xl:px-4 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
              >
                <option value="Computer Science & IT">Computer Science & IT</option>
                <option value="Medical & Healthcare">Medical & Healthcare</option>
                <option value="Engineering & Construction">Engineering & Construction</option>
                <option value="Business & Finance">Business & Finance</option>
              </select>
            </div>

            {/* Role Target */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 2xl:mb-1.5">
                Career Level
              </label>
              <select
                value={formData.roleTarget}
                onChange={(e) => setFormData({ ...formData, roleTarget: e.target.value })}
                className="w-full px-3.5 py-2 2xl:px-4 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
              >
                <option value="Internship">🎓 Internship</option>
                <option value="Entry-Level">🚀 Entry-Level</option>
                <option value="Experienced">💼 Experienced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6">
            {/* Total Seats */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 2xl:mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                Total Seats / Openings
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.totalSeats}
                onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                className="w-full px-3.5 py-2 2xl:px-4 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 2xl:mb-1.5">
                Recruitment Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2 2xl:px-4 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 cursor-pointer"
              >
                <option value="Active">🟢 Active (Accepting)</option>
                <option value="Paused">🟡 Paused (On Hold)</option>
                <option value="Closed">🔴 Closed (Filled/Archived)</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 2xl:mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
              Location & Workplace Type
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Hybrid • Islamabad HQ or Onsite"
              className="w-full px-3.5 py-2 2xl:px-4 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6">
            {/* Salary */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 2xl:mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                Salary Range
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g. PKR 90,000 - 130,000 / mo"
                className="w-full px-3.5 py-2 2xl:px-4 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 2xl:mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-400" />
                Application Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3.5 py-2 2xl:px-4 2xl:py-3 rounded-xl 2xl:rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 2xl:pt-6 border-t border-slate-100 flex items-center justify-end gap-3 2xl:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 2xl:px-6 2xl:py-3 rounded-xl 2xl:rounded-2xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 2xl:gap-2.5 px-5 py-2 2xl:px-6 2xl:py-3 rounded-xl 2xl:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Save className="w-4 h-4 2xl:w-5 2xl:h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerJobEditModal;
