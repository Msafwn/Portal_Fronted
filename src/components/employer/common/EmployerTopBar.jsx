import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  ArrowRightLeft,
  Building2,
  ChevronDown,
  LogOut,
  Briefcase,
  PlusCircle,
  Users,
  Sparkles,
} from 'lucide-react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';
import { EmployerNotificationDropdown } from './EmployerNotificationDropdown';

export const EmployerTopBar = () => {
  const {
    company,
    recruiter,
    notifications,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    kpiStats,
    handleLogout,
  } = useEmployerPortal();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-2.5 sm:px-6 lg:px-8 2xl:px-10 3xl:px-14 h-16 2xl:h-20 3xl:h-24 shadow-2xs">
      <div className="w-full h-full flex items-center justify-between gap-1.5 sm:gap-3 2xl:gap-5">
        {/* Left: Mobile Toggle + Global Search with ⌘K Badge */}
        <div className="flex items-center gap-1.5 sm:gap-3 2xl:gap-4 min-w-0 flex-1 sm:flex-initial">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search with ⌘K Badge */}
          <div className="relative min-w-0 w-full sm:w-52 lg:w-56 xl:w-72 2xl:w-[460px] 3xl:w-[560px] max-w-[130px] xs:max-w-[180px] sm:max-w-none">
            <Search className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-slate-400 absolute left-2.5 2xl:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidates..."
              className="w-full bg-slate-100/80 hover:bg-slate-100 border border-slate-200/90 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base 3xl:text-lg text-slate-800 pl-7 2xl:pl-11 pr-2 sm:pr-11 2xl:pr-14 py-1.5 2xl:py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all shadow-2xs"
            />
            <span className="hidden sm:inline-block absolute right-2.5 2xl:right-3.5 top-1/2 -translate-y-1/2 text-[10px] 2xl:text-xs 3xl:text-sm font-bold text-slate-400 bg-white px-1.5 2xl:px-2.5 py-0.5 2xl:py-1 rounded border border-slate-200 shadow-2xs pointer-events-none">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right: Actions, Badges & Recruiter Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 2xl:gap-4 shrink-0">
          {/* Company Badge Pill (Visible on wide screens) */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-2.5 px-3 2xl:px-4 py-1.5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl bg-slate-100/90 hover:bg-slate-200/80 text-xs 2xl:text-base font-semibold text-slate-700 border border-slate-200 transition-all shadow-2xs whitespace-nowrap shrink-0">
            <div className="w-5 h-5 2xl:w-6 2xl:h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] 2xl:text-xs font-bold shrink-0">
              {company?.logoInitials || (company?.name ? company.name.slice(0, 2).toUpperCase() : 'CO')}
            </div>
            <span className="font-bold text-slate-800 whitespace-nowrap truncate max-w-[150px]">
              {company?.name || 'Company Portal'}
            </span>
          </div>

          {/* Live Quota Status Pill */}
          <div className="hidden 2xl:flex items-center gap-1.5 2xl:gap-2 px-3 2xl:px-4 py-1.5 2xl:py-2.5 rounded-full bg-emerald-50 text-emerald-800 text-xs 2xl:text-base font-medium border border-emerald-200/80 shadow-2xs whitespace-nowrap shrink-0">
            <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">
              Seats: <strong className="text-emerald-700 font-bold">{kpiStats.filledSeats}/{kpiStats.totalSeats} Filled</strong>
            </span>
          </div>

          {/* Switch Portal Shortcut */}
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 2xl:gap-2 p-1.5 sm:px-3 2xl:px-4 sm:py-1.5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base font-semibold text-slate-700 hover:text-blue-600 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 transition-all shadow-2xs group whitespace-nowrap shrink-0"
            title="Switch to Candidate Portal"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-blue-600 group-hover:rotate-180 transition-transform duration-300 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Candidate View</span>
          </Link>

          {/* Notification Bell with Badge & Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 2xl:p-3 rounded-xl 2xl:rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
              title="Notifications"
            >
              <Bell className="w-4 h-4 2xl:w-6 2xl:h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 2xl:top-2 2xl:right-2 w-2 h-2 2xl:w-2.5 2xl:h-2.5 bg-blue-600 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notifications Flyout Component */}
            <EmployerNotificationDropdown
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
          </div>

          {/* Recruiter Avatar & Profile Dropdown Pill */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 2xl:gap-3 pl-2 2xl:pl-3 py-1 2xl:py-2 pr-2 2xl:pr-3.5 rounded-xl 2xl:rounded-2xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all shrink-0 cursor-pointer group"
              aria-label="Employer Account Menu"
            >
              <div className="relative shrink-0">
                {recruiter?.avatar ? (
                  <img loading="lazy" decoding="async"
                    src={recruiter.avatar}
                    alt={recruiter.name}
                    className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-full object-cover border-2 border-white shadow-2xs group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xs 2xl:text-base flex items-center justify-center shadow-2xs border-2 border-white group-hover:scale-105 transition-transform">
                    {recruiter?.name?.charAt(0)?.toUpperCase() || 'R'}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight max-w-[90px] md:max-w-[120px] xl:max-w-[160px]">
                <span className="text-xs 2xl:text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                  {recruiter?.name}
                </span>
                <span className="text-[10px] 2xl:text-xs text-slate-400 font-medium truncate">
                  {company?.name || recruiter?.email}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden sm:block ${
                  userDropdownOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            {/* User Account Flyout Dropdown */}
            {userDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 2xl:w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Header Profile Info */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs 2xl:text-sm font-bold text-slate-900 truncate">{recruiter?.name}</p>
                    <p className="text-[11px] 2xl:text-xs text-slate-500 truncate">{recruiter?.email}</p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] 2xl:text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span>Enterprise Employer</span>
                      </span>
                      {company?.name && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] 2xl:text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-[140px]">
                          <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{company.name}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="py-1">
                    <Link
                      to="/employer/company"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>Company Profile & HR</span>
                    </Link>

                    <Link
                      to="/employer/jobs"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      <span>Manage Active Jobs</span>
                    </Link>

                    <Link
                      to="/employer/post-job"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-slate-400" />
                      <span>Post New Role</span>
                    </Link>

                    <Link
                      to="/employer/applicants"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>Candidate Applicants</span>
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
                      <span>Sign Out</span>
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

export default EmployerTopBar;
