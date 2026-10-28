import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Briefcase,
  Zap,
  Send,
  User,
  TrendingUp,
  Headphones,
  Home,
  LogOut,
  Building2,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  Check,
  Bot,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { selectCurrentUser, logOut, setCredentials } from '../../store/slices/authSlice';
import {
  useLogoutUserMutation,
  useGetMeQuery,
  useGetCandidateProfileQuery,
} from '../../store/api/authApiSlice';
import {
  CandidatePortalProvider,
  useCandidatePortal,
} from '../../context/CandidatePortalContext';
import { CareerChatProvider } from '../../context/CareerChatContext';
import { FloatingCareerChatWidget } from '../chatbot';
import { axiosPrivate } from '../../services/apiClient';

// Inner Layout Shell
const CandidatePortalShell = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = location.pathname === '/career-chat';

  const {
    profile,
    stats,
    activePersonaKey,
    handleSelectPersona,
    sidebarOpen,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    personaOptions,
    userPrimaryPersonaKey,
    onLogout,
  } = useCandidatePortal();

  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Live Database Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const response = await axiosPrivate.get('/notifications');
      const data = response.data?.data;
      if (data) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch {
      // offline or silent
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 45000); // 45s background sync
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id, link) => {
    try {
      await axiosPrivate.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      if (link) {
        setNotifDropdownOpen(false);
        navigate(link);
      }
    } catch (e) {
      console.warn('Failed to mark notification as read:', e);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axiosPrivate.put('/notifications/mark-all-read');
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (e) {
      console.warn('Failed to mark all as read:', e);
    }
  };

  const currentPersona = personaOptions?.find((p) => p.key === activePersonaKey) || personaOptions?.[0] || {
    icon: '💻',
    label: 'IT / Software',
    short: 'IT',
  };
  const getDepartmentBadge = (deptStr) => {
    const lower = (deptStr || '').toLowerCase();
    if (lower.includes('med') || lower.includes('health') || lower.includes('pharm')) {
      return { icon: '🩺', label: 'Medical & Healthcare' };
    }
    if (lower.includes('eng') || lower.includes('civil') || lower.includes('mech')) {
      return { icon: '🏗️', label: 'Engineering' };
    }
    if (lower.includes('bus') || lower.includes('fin') || lower.includes('bank') || lower.includes('acc')) {
      return { icon: '📊', label: 'Business & Finance' };
    }
    return { icon: '💻', label: 'IT / Software' };
  };

  const userDept = getDepartmentBadge(profile?.department);


  const navLinks = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/career-chat',
      label: 'AI Career Advisor',
      icon: Bot,
      badge: 'AI Chat',
      badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    },
    {
      to: '/interview-prep',
      label: 'AI Interview Prep',
      icon: GraduationCap,
      badge: 'Prep',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    {
      to: '/jobs',
      label: 'Job Feed & Filters',
      icon: Briefcase,
      badge: 'Feed',
    },
    {
      to: '/matches',
      label: 'AI Role Matches',
      icon: Zap,
      badge: `${stats.matchIndex}%`,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    {
      to: '/applications',
      label: 'My Applications',
      icon: Send,
      badge: stats.activeApplications,
      badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    },
    {
      to: '/profile',
      label: 'Candidate Profile',
      icon: User,
      badge: null,
    },
  ];

  const renderSidebarContent = (isDrawer = false) => {
    return (
      <div className="flex flex-col h-full overflow-hidden justify-between">
        {/* Brand Header */}
        <div
          className={`h-16 shrink-0 border-b border-[#1e3a7a]/60 flex items-center overflow-hidden ${
            isDrawer
              ? 'px-4 justify-between'
              : 'px-2 lg:px-3.5 justify-center lg:justify-between'
          }`}
        >
          <Link
            to="/"
            title="Smart Career AI"
            className="flex items-center group overflow-hidden"
            onClick={() => isDrawer && setSidebarOpen(false)}
          >
            <div className="w-8 h-8 shrink-0 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Smart Career AI Logo"
                className="w-8 h-8 rounded-lg object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div
              className={`${
                isDrawer
                  ? 'flex flex-col ml-3'
                  : isChatPage
                  ? 'hidden'
                  : 'hidden lg:flex flex-col ml-3'
              } transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden`}
            >
              <span className="text-sm font-extrabold tracking-tight text-white leading-none">
                Smart Career <span className="text-blue-400">AI</span>
              </span>
              <span className="text-[10px] text-blue-300/80 font-medium mt-1">Candidate Portal</span>
            </div>
          </Link>

          {isDrawer && (
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-blue-300 hover:text-white rounded-lg cursor-pointer"
              aria-label="Close sidebar drawer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Middle Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-2 min-h-0">
          <nav className="px-2 lg:px-3 space-y-1">
            <div
              className={`px-2 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                isDrawer ? 'block my-1.5' : isChatPage ? 'hidden' : 'hidden lg:block lg:my-1.5'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300/70 block">
                Portal Navigation
              </span>
            </div>

            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/dashboard'}
                  title={item.label}
                  onClick={() => isDrawer && setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center h-10 px-2 lg:px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 overflow-hidden group ${
                      !isDrawer && !isChatPage ? 'justify-center lg:justify-start' : isChatPage ? 'justify-center' : 'justify-start'
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-white/[0.22] via-blue-400/[0.18] to-white/[0.08] backdrop-blur-md text-white font-bold border border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_20px_-4px_rgba(30,58,138,0.5),0_2px_6px_rgba(0,0,0,0.2)]'
                        : 'text-blue-100/75 hover:bg-white/[0.08] hover:text-white hover:backdrop-blur-xs'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-gradient-to-b from-cyan-300 to-blue-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
                      )}
                      {isActive && (
                        <span className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none blur-sm" />
                      )}
                      <div className="w-6 h-6 shrink-0 flex items-center justify-center relative z-10">
                        <Icon
                          className={`w-5 h-5 transition-transform ${
                            isActive
                              ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] scale-105'
                              : 'text-blue-200 group-hover:scale-110 group-hover:text-white'
                          }`}
                        />
                      </div>
                      <div
                        className={`${
                          isDrawer
                            ? 'flex items-center justify-between flex-1 min-w-0 ml-3'
                            : isChatPage
                            ? 'hidden'
                            : 'hidden lg:flex items-center justify-between flex-1 min-w-0 ml-3'
                        } relative z-10 whitespace-nowrap overflow-hidden`}
                      >
                        <span className={`truncate min-w-0 flex-1 mr-2 ${isActive ? 'text-white drop-shadow-xs font-bold' : ''}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 whitespace-nowrap leading-tight ${
                              isActive
                                ? 'bg-white/20 text-cyan-200 border border-white/30 backdrop-blur-sm shadow-xs'
                                : item.badgeColor || 'bg-blue-900/80 text-blue-200 border border-blue-700/60'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* System Links */}
          <div className="mt-2 pt-3 border-t border-[#1e3a7a]/60 px-2 lg:px-3 space-y-1">
            <div
              className={`px-2 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                isDrawer ? 'block my-1.5' : isChatPage ? 'hidden' : 'hidden lg:block lg:my-1.5'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300/70 block">
                System
              </span>
            </div>

            <NavLink
              to="/support"
              title="Contact Support"
              onClick={() => isDrawer && setSidebarOpen(false)}
              className={({ isActive }) =>
                `relative flex items-center h-10 px-2 lg:px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 overflow-hidden group ${
                  !isDrawer && !isChatPage ? 'justify-center lg:justify-start' : isChatPage ? 'justify-center' : 'justify-start'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-white/[0.22] via-blue-400/[0.18] to-white/[0.08] backdrop-blur-md text-white font-bold border border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]'
                    : 'text-blue-200/80 hover:bg-[#142c63] hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-gradient-to-b from-cyan-300 to-blue-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
                  )}
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center relative z-10">
                    <Headphones
                      className={`w-5 h-5 transition-transform ${
                        isActive ? 'text-cyan-300 scale-105' : 'text-blue-200 group-hover:scale-110 group-hover:text-white'
                      }`}
                    />
                  </div>
                  <div
                    className={`${
                      isDrawer
                        ? 'flex items-center justify-between flex-1 min-w-0 ml-3'
                        : isChatPage
                        ? 'hidden'
                        : 'hidden lg:flex items-center justify-between flex-1 min-w-0 ml-3'
                    } relative z-10 whitespace-nowrap overflow-hidden`}
                  >
                    <span className="truncate min-w-0 flex-1 mr-2">Contact Support</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold shrink-0 whitespace-nowrap leading-tight">
                      24/7
                    </span>
                  </div>
                </>
              )}
            </NavLink>

            <Link
              to="/"
              title="Back to Home"
              onClick={() => isDrawer && setSidebarOpen(false)}
              className={`flex items-center h-10 px-2 lg:px-2.5 rounded-xl text-xs font-medium text-blue-200/80 hover:bg-[#142c63] hover:text-white transition-colors overflow-hidden group ${
                !isDrawer && !isChatPage ? 'justify-center lg:justify-start' : isChatPage ? 'justify-center' : 'justify-start'
              }`}
            >
              <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                <Home className="w-5 h-5 text-blue-200 group-hover:scale-110 group-hover:text-white transition-transform" />
              </div>
              <div
                className={`${
                  isDrawer
                    ? 'flex-1 min-w-0 ml-3'
                    : isChatPage
                    ? 'hidden'
                    : 'hidden lg:flex flex-1 min-w-0 ml-3'
                } whitespace-nowrap overflow-hidden`}
              >
                <span className="truncate">Back to Home</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar Logout Footer */}
        <div className="shrink-0 border-t border-[#1e3a7a]/60 bg-[#071536]/90 p-2 lg:p-3 overflow-hidden z-10">
          <button
            type="button"
            onClick={onLogout}
            title="Sign Out"
            className={`w-full flex items-center h-10 px-2 lg:px-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/15 transition-colors cursor-pointer overflow-hidden group ${
              !isDrawer && !isChatPage ? 'justify-center lg:justify-start' : isChatPage ? 'justify-center' : 'justify-start'
            }`}
          >
            <div className="w-6 h-6 shrink-0 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
            </div>
            <div
              className={`${
                isDrawer
                  ? 'flex items-center justify-between flex-1 min-w-0 ml-3'
                  : isChatPage
                  ? 'hidden'
                  : 'hidden lg:flex items-center justify-between flex-1 min-w-0 ml-3'
              } whitespace-nowrap overflow-hidden`}
            >
              <span className="truncate">Sign Out</span>
              <span className="text-[10px] text-blue-300/60 ml-2">Exit</span>
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Desktop & Tablet Docked Sidebar:
          - Hidden on phone screens (< 640px)
          - Tablet portrait & landscape (640px - 1023px): sleek w-16 icon rail with clear centered icons
          - Desktop & Laptop (>= 1024px): w-64 full sidebar (or w-16 on /career-chat) */}
      <aside
        className={`hidden sm:flex shrink-0 bg-gradient-to-b from-[#0b1f4c] via-[#091b42] to-[#071536] text-blue-100 flex-col justify-between border-r border-[#1e3a7a]/60 h-screen sticky top-0 z-30 shadow-xl shadow-blue-950/20 overflow-hidden transition-[width] duration-300 ease-in-out will-change-[width] ${
          isChatPage ? 'w-16' : 'w-16 lg:w-64'
        }`}
      >
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile & Tablet Off-Canvas Drawer (< 1024px, lg:hidden, opens on hamburger tap) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        />
        <aside
          className={`relative z-50 w-72 max-w-[85vw] bg-gradient-to-b from-[#0b1f4c] via-[#091b42] to-[#071536] text-blue-100 flex flex-col justify-between h-full border-r border-[#1e3a7a]/60 shadow-2xl transition-transform duration-300 ease-in-out transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {renderSidebarContent(true)}
        </aside>
      </div>

      {/* Main Right Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen max-h-screen overflow-y-auto">
        {/* TopBar with Hamburger + Department Pill + Search + Notifications + Profile (Hidden on AI Ask page per user request) */}
        {!isChatPage && (
          <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-2 xs:px-3 sm:px-6 h-16 flex items-center justify-between gap-1.5 sm:gap-3 shadow-2xs">
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer shrink-0"
                aria-label="Open sidebar drawer"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Global Search with ⌘K Badge */}
              <div className="relative w-28 xs:w-36 sm:w-56 md:w-48 lg:w-72 xl:w-80">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs..."
                  className="w-full bg-slate-100/80 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs text-slate-800 pl-7 xs:pl-8 pr-2 xs:pr-8 sm:pr-12 py-1.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all shadow-2xs"
                />
                <span className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs pointer-events-none">
                  ⌘K
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5">
              {/* Multi-Department Target Field Selector Dropdown Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                  className="flex items-center gap-1.5 xs:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-2xs"
                  title={`Target Discipline: ${currentPersona.label}`}
                >
                  <span className="text-sm leading-none">{currentPersona.icon}</span>
                  <span className="inline-block font-bold text-slate-800 max-w-[130px] truncate">
                    {currentPersona.label}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      deptDropdownOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {deptDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDeptDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 sm:w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Select Target Field
                        </span>
                        {profile?.department && (
                          <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1.5 truncate">
                            <span className="text-slate-400 font-medium">Logged in as:</span>
                            <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[10px] border border-blue-200/60 truncate">
                              {profile.department}
                            </span>
                          </div>
                        )}
                      </div>
                      {personaOptions.map((item) => {
                        const isUserField = item.key === userPrimaryPersonaKey;
                        const isSelected = activePersonaKey === item.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                              handleSelectPersona(item.key);
                              setDeptDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50/80 text-blue-700 font-bold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <span className="text-base">{item.icon}</span>
                              <span className="truncate">{item.label}</span>
                              {isUserField && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                  Your Field
                                </span>
                              )}
                            </span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Notification Bell with Dynamic Database Unread Badge */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setNotifDropdownOpen(false)}
                    />
                    <div className="fixed sm:absolute left-2 right-2 sm:left-auto sm:right-0 mt-2 w-auto sm:w-96 max-w-[calc(100vw-1rem)] sm:max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 px-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">Notifications</span>
                          {unreadCount > 0 && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                              {unreadCount} New
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            type="button"
                            onClick={handleMarkAllAsRead}
                            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition cursor-pointer"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>

                      <div className="max-h-72 overflow-y-auto space-y-1.5 pr-0.5">
                        {notifications.length === 0 ? (
                          <div className="py-8 text-center text-xs text-slate-400">
                            <span className="text-2xl block mb-1.5">🔔</span>
                            No notifications yet.
                          </div>
                        ) : (
                          notifications.map((item) => (
                            <div
                              key={item._id}
                              onClick={() => handleMarkAsRead(item._id, item.link)}
                              className={`p-2.5 rounded-xl border text-xs transition cursor-pointer flex items-start gap-2.5 ${
                                item.read
                                  ? 'bg-slate-50/60 border-slate-100 text-slate-600 hover:bg-slate-100/70'
                                  : 'bg-blue-50/70 border-blue-200/80 text-slate-900 hover:bg-blue-100/70 font-medium'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {item.type === 'job_match' ? (
                                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                                ) : item.type === 'application_status' ? (
                                  <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                                ) : item.type === 'interview_result' ? (
                                  <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 truncate">{item.title}</p>
                                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.message}</p>
                                <span className="text-[9px] text-slate-400 block mt-1">
                                  {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              {!item.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Authenticated User Profile Dropdown Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 py-1 pr-1.5 sm:pr-2.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer group"
                  aria-label="User Account Menu"
                >
                  <div className="relative">
                    {profile.avatar && profile.avatar.trim() !== '' && !profile.avatar.includes('unsplash') ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-2xs group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                        {profile.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <div className="hidden sm:flex flex-col text-left leading-tight max-w-[150px] md:max-w-[190px] lg:max-w-[240px]">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                      {profile.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium truncate">
                      {profile.email || profile.department || 'Candidate'}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden sm:block ${
                      userDropdownOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 sm:w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      {/* Header info */}
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{profile.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{profile.email}</p>
                        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            <Sparkles className="w-3 h-3 text-blue-600" />
                            <span className="capitalize">{profile.role || 'Candidate'}</span>
                          </div>
                          {profile.department && (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              <span>{profile.department}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Navigation Items */}
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>My Profile & Skills</span>
                        </Link>
                        <Link
                          to="/interview-prep"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <GraduationCap className="w-4 h-4 text-slate-400" />
                          <span>Mock Interview Prep</span>
                        </Link>
                        <Link
                          to="/career-chat"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <Bot className="w-4 h-4 text-slate-400" />
                          <span>AI Career Advisor</span>
                        </Link>
                        <Link
                          to="/applications"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <Send className="w-4 h-4 text-slate-400" />
                          <span>My Applications</span>
                        </Link>
                      </div>

                      {/* Divider & Sign Out */}
                      <div className="pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
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
          </header>
        )}

        {/* Page Content Rendered via Nested Routes */}
        <main className={`flex-1 ${isChatPage ? 'h-screen overflow-hidden flex flex-col' : 'pb-10 sm:pb-12'}`}>
          <Outlet />
        </main>

        {/* Portal Footer */}
        {!isChatPage && (
          <footer className="mt-auto bg-white border-t border-slate-200 py-4 px-4 sm:px-6 text-center text-xs text-slate-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>© 2026 Smart Career Role Match AI System.</p>
              <div className="flex items-center gap-4 text-[11px]">
                <Link to="/contact" className="hover:text-blue-600 transition-colors">
                  Support Desk
                </Link>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export const CandidatePortalLayout = () => {
  const reduxUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  // On page refresh / mount, fetch real user profile from cookie session if not already in store
  const { data: meData } = useGetMeQuery(undefined, {
    skip: !!reduxUser,
  });

  const { data: candidateProfileData } = useGetCandidateProfileQuery(undefined, {
    skip: !reduxUser && !meData?.data,
  });

  useEffect(() => {
    if (candidateProfileData?.data?.profile) {
      dispatch(setCredentials({ user: candidateProfileData.data.profile }));
    } else if (meData?.data && !reduxUser) {
      dispatch(setCredentials({ user: meData.data }));
    }
  }, [candidateProfileData, meData, reduxUser, dispatch]);

  const user =
    candidateProfileData?.data?.profile ||
    reduxUser ||
    meData?.data || {
      name: '',
      headline: '',
      role: 'student',
      department: '',
      email: '',
      skills: [],
    };

  const liveStats = candidateProfileData?.data?.stats;

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
    } finally {
      dispatch(logOut());
      navigate('/login');
    }
  };

  return (
    <CandidatePortalProvider initialUser={user} initialStats={liveStats} onLogout={handleLogout}>
      <CareerChatProvider>
        <CandidatePortalShell />
        <FloatingCareerChatWidget />
      </CareerChatProvider>
    </CandidatePortalProvider>
  );
};

export default CandidatePortalLayout;
