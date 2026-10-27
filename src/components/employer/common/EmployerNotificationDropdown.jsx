import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Check,
  CheckCheck,
  X,
  Sparkles,
  Calendar,
  ShieldAlert,
  Briefcase,
  ExternalLink,
  Clock,
  Inbox,
} from 'lucide-react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';

export const EmployerNotificationDropdown = ({ isOpen, onClose }) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
  } = useEmployerPortal();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread'

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const displayedNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return n.unread;
    return true;
  });

  const getNotificationIcon = (title = '', category = '') => {
    const text = (title + ' ' + category).toLowerCase();
    if (text.includes('match') || text.includes('applicant') || text.includes('candidate')) {
      return {
        icon: Sparkles,
        bgColor: 'bg-amber-50 text-amber-600 border-amber-200',
        actionTo: '/employer/applicants',
        actionLabel: 'Review Candidate',
      };
    }
    if (text.includes('interview') || text.includes('schedule')) {
      return {
        icon: Calendar,
        bgColor: 'bg-indigo-50 text-indigo-600 border-indigo-200',
        actionTo: '/employer/applicants',
        actionLabel: 'View Schedule',
      };
    }
    if (text.includes('quota') || text.includes('seat')) {
      return {
        icon: ShieldAlert,
        bgColor: 'bg-rose-50 text-rose-600 border-rose-200',
        actionTo: '/employer/jobs',
        actionLabel: 'Check Quota',
      };
    }
    return {
      icon: Briefcase,
      bgColor: 'bg-blue-50 text-blue-600 border-blue-200',
      actionTo: '/employer/jobs',
      actionLabel: 'View Job',
    };
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Flyout Panel */}
      <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-tight">
                Recruitment Alerts
              </h3>
              <p className="text-[10px] text-slate-500">Live candidate & hiring updates</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                title="Mark all as read"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer border border-blue-200/60"
              >
                <CheckCheck className="w-3 h-3" />
                <span>Mark all read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
              activeTab === 'unread'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-3 space-y-2 overflow-y-auto flex-1 max-h-[360px]">
          {displayedNotifications.length > 0 ? (
            displayedNotifications.map((notif) => {
              const meta = getNotificationIcon(notif.title, notif.category);
              const Icon = meta.icon;

              return (
                <div
                  key={notif.id}
                  onClick={() => notif.unread && markNotificationAsRead(notif.id)}
                  className={`p-3 rounded-xl border transition-all text-xs relative group ${
                    notif.unread
                      ? 'bg-blue-50/40 border-blue-200/80 hover:bg-blue-50/70 shadow-2xs'
                      : 'bg-white border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Category Icon */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${meta.bgColor}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-slate-900 leading-snug">
                            {notif.title}
                          </h4>
                          {notif.unread && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {notif.time}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {notif.message}
                      </p>

                      {/* Action Links & Buttons */}
                      <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-200/50">
                        <Link
                          to={meta.actionTo}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            onClose();
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          <span>{meta.actionLabel}</span>
                          <span className="text-[10px]">→</span>
                        </Link>

                        <div className="flex items-center gap-1">
                          {notif.unread && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                markNotificationAsRead(notif.id);
                              }}
                              title="Mark as read"
                              className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notif.id);
                            }}
                            title="Dismiss notification"
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 px-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                <Inbox className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-700">All caught up!</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {activeTab === 'unread'
                  ? 'No unread notifications right now.'
                  : 'No notification alerts in your inbox.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 text-center">
          <Link
            to="/employer/applicants"
            onClick={onClose}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>View All Applicants Pipeline</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmployerNotificationDropdown;
