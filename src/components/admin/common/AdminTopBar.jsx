import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ArrowRightLeft,
  ChevronDown,
  LogOut,
  Building2,
  Cpu,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useAdminPortal } from '../../../context/AdminPortalContext';

export const AdminTopBar = () => {
  const {
    adminProfile,
    kpis,
    notifications,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    handleLogout,
  } = useAdminPortal();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-2.5 sm:px-6 lg:px-8 2xl:px-12 3xl:px-14 h-16 2xl:h-20 3xl:h-24 shadow-2xs">
      <div className="w-full h-full flex items-center justify-between gap-1.5 sm:gap-3 2xl:gap-5">
        {/* Left: Mobile Toggle & Global Audit Search */}
        <div className="flex items-center gap-1.5 sm:gap-3 2xl:gap-4 min-w-0 flex-1 sm:flex-initial">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Admin Search Bar */}
          <div className="relative min-w-0 w-full sm:w-56 lg:w-60 xl:w-80 2xl:w-[460px] 3xl:w-[560px] max-w-[130px] xs:max-w-[180px] sm:max-w-none">
            <Search className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-slate-400 absolute left-2.5 2xl:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Audit search candidates, jobs, employers, logs..."
              className="w-full bg-slate-100/80 hover:bg-slate-100 border border-slate-200 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base text-slate-800 pl-7 2xl:pl-10 pr-2 sm:pr-11 2xl:pr-14 py-1.5 2xl:py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all shadow-2xs font-medium"
            />
            <span className="hidden sm:inline-block absolute right-2.5 2xl:right-3.5 top-1/2 -translate-y-1/2 text-[10px] 2xl:text-xs font-bold text-slate-400 bg-white px-1.5 2xl:px-2 py-0.5 rounded border border-slate-200 shadow-2xs pointer-events-none">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right: System Health Pill, Notifications, & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 2xl:gap-4 shrink-0">
          {/* System Health Status (Visible on wide screens) */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-2.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full bg-emerald-50 text-emerald-800 text-xs 2xl:text-sm 3xl:text-base font-semibold border border-emerald-200 shadow-2xs whitespace-nowrap">
            <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>System Health: <strong className="text-emerald-700 font-bold">{kpis.systemUptime} Uptime</strong></span>
          </div>

          {/* Candidate View Switcher */}
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 2xl:gap-2 p-1.5 sm:px-3 sm:py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-slate-700 hover:text-blue-600 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 transition-all shadow-2xs whitespace-nowrap shrink-0"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-600" />
            <span className="hidden sm:inline whitespace-nowrap">Candidate Portal</span>
          </Link>

          {/* Admin Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 2xl:p-2.5 rounded-xl 2xl:rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200 relative"
              title="System Notifications"
            >
              <Bell className="w-4 h-4 2xl:w-5 2xl:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 2xl:w-2.5 2xl:h-2.5 bg-blue-600 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Simple Dropdown Flyout */}
            {notifOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotifOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 sm:w-80 2xl:w-96 rounded-2xl 2xl:rounded-3xl bg-white border border-slate-200 shadow-xl p-3 2xl:p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2 2xl:space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 2xl:pb-3">
                    <span className="text-xs 2xl:text-sm font-bold text-slate-900">Admin Sentinel Alerts</span>
                    <span className="text-[10px] 2xl:text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full">
                      {unreadCount} New
                    </span>
                  </div>
                  <div className="space-y-1.5 2xl:space-y-2 text-xs 2xl:text-sm max-h-64 2xl:max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2 2xl:p-3 rounded-xl 2xl:rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 transition-colors"
                      >
                        <p className="font-semibold text-slate-900 text-xs 2xl:text-sm">{n.title}</p>
                        <p className="text-[11px] 2xl:text-xs text-slate-500 mt-0.5 leading-snug">{n.message}</p>
                        <span className="text-[10px] 2xl:text-xs text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Administrator Profile Pill & Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 2xl:gap-2.5 pl-2 py-1 pr-2 2xl:pl-3 2xl:py-1.5 2xl:pr-3 rounded-xl 2xl:rounded-2xl bg-blue-50/80 hover:bg-blue-100/70 border border-blue-200/70 shadow-2xs shrink-0 cursor-pointer transition-all group"
              aria-label="Admin Account Menu"
            >
              <div className="relative shrink-0">
                {adminProfile.avatar ? (
                  <img
                    src={adminProfile.avatar}
                    alt={adminProfile.name}
                    className="w-7 h-7 2xl:w-9 2xl:h-9 rounded-lg 2xl:rounded-xl object-cover shadow-xs border border-white"
                  />
                ) : (
                  <div className="w-7 h-7 2xl:w-9 2xl:h-9 rounded-lg 2xl:rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xs 2xl:text-sm flex items-center justify-center shadow-xs">
                    {adminProfile.initials || 'SA'}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight pr-0.5 max-w-[120px] 2xl:max-w-[180px]">
                <span className="text-xs 2xl:text-sm font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                  {adminProfile.name}
                </span>
                <span className="text-[10px] 2xl:text-xs text-blue-600 font-semibold truncate">
                  {adminProfile.roleLabel || 'Super Admin'}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden sm:block ${
                  userDropdownOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            {/* Admin User Account Flyout Dropdown */}
            {userDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 2xl:w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Header Profile Info */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs 2xl:text-sm font-bold text-slate-900 truncate">{adminProfile.name}</p>
                    <p className="text-[11px] 2xl:text-xs text-slate-500 truncate">{adminProfile.email}</p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] 2xl:text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span>{adminProfile.accessLevel || 'Root Access'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="py-1">
                    <Link
                      to="/employer/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>Inspect Employer Portal</span>
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                      <span>Inspect Candidate Portal</span>
                    </Link>

                    <Link
                      to="/admin/ai-settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <Cpu className="w-4 h-4 text-slate-400" />
                      <span>AI Engine & Weights</span>
                    </Link>

                    <Link
                      to="/admin/logs"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 text-slate-400" />
                      <span>Security & Audit Logs</span>
                    </Link>
                  </div>

                  {/* Sign Out Action */}
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs 2xl:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Exit Admin Console</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
