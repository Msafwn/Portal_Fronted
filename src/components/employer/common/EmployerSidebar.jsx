import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Users,
  Building2,
  X,
  Sparkles,
  LogOut,
  ShieldCheck,
  ArrowRightLeft,
  Home,
} from 'lucide-react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';

export const EmployerSidebar = ({ isDrawer = false }) => {
  const {
    company,
    recruiter,
    sidebarOpen,
    setSidebarOpen,
    handleLogout,
  } = useEmployerPortal();

  const hideTextClass = isDrawer
    ? 'ml-3 opacity-100 max-w-none translate-x-0'
    : 'opacity-0 max-w-0 pointer-events-none lg:ml-3 lg:opacity-100 lg:max-w-none lg:translate-x-0 lg:pointer-events-auto';

  const hideHeaderClass = isDrawer
    ? 'opacity-100 max-h-6 mb-2'
    : 'opacity-0 max-h-0 -my-1 pointer-events-none lg:opacity-100 lg:max-h-6 lg:mb-2';

  const navItems = [
    {
      to: '/employer/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 'Live',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    {
      to: '/employer/post-job',
      label: 'Post a New Job',
      icon: PlusCircle,
      badge: 'Smart Creator',
      badgeColor: 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30',
    },
    {
      to: '/employer/jobs',
      label: 'Manage Jobs',
      icon: Briefcase,
      badge: '4 Active',
      badgeColor: 'bg-blue-500/20 text-blue-200 border border-blue-500/30',
    },
    {
      to: '/employer/applicants',
      label: 'Candidate Review',
      icon: Users,
      badge: 'AI Ranked',
      badgeColor: 'bg-amber-500/20 text-amber-200 border border-amber-500/30',
    },
    {
      to: '/employer/company',
      label: 'Company Profile',
      icon: Building2,
      badge: null,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar justify-between">
      <div>
        {/* Brand Header */}
        <div className={`h-16 2xl:h-20 3xl:h-24 shrink-0 border-b border-[#1e3a7a]/60 flex items-center overflow-hidden ${
          isDrawer ? 'px-4 justify-between' : 'px-1.5 lg:px-3.5 2xl:px-5 justify-center lg:justify-between'
        }`}>
          <Link to="/employer/dashboard" title="Smart Career AI Employer Suite" className="flex items-center group overflow-hidden">
            <div className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 shrink-0 flex items-center justify-center">
              <img loading="lazy" decoding="async"
                src="/logo.png"
                alt="Smart Career AI Logo"
                className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-lg 2xl:rounded-xl object-contain bg-white/10 p-1 border border-white/20 shadow-sm group-hover:scale-105 transition-transform"
              />
            </div>
            <div className={`flex flex-col transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
              <div className="flex items-center gap-1.5">
                <span className="text-sm 2xl:text-lg 3xl:text-xl font-extrabold tracking-tight text-white leading-none">
                  Smart Career <span className="text-blue-400">AI</span>
                </span>
              </div>
              <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-cyan-300 font-semibold tracking-wide mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Employer Suite
              </span>
            </div>
          </Link>

          {sidebarOpen && isDrawer && (
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-xl text-blue-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Company Identity Mini Card (Visible on desktop & mobile drawer) */}
        <div className={`p-3 2xl:p-4 mx-2.5 2xl:mx-4 mt-3 2xl:mt-4 rounded-xl 2xl:rounded-2xl bg-white/[0.06] border border-white/10 items-center gap-2.5 2xl:gap-3.5 transition-all overflow-hidden ${
          isDrawer ? 'flex' : 'hidden lg:flex'
        }`}>
          <div className="w-8 h-8 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs 2xl:text-base shadow-sm shrink-0">
            {company?.logoInitials || (company?.name ? company.name.slice(0, 2).toUpperCase() : 'CO')}
          </div>
          <div className="overflow-hidden min-w-0">
            <div className="text-xs 2xl:text-base font-bold text-white truncate flex items-center gap-1">
              <span>{company?.name || 'Employer Portal'}</span>
              <ShieldCheck className="w-3 h-3 2xl:w-4 2xl:h-4 text-cyan-400 shrink-0" />
            </div>
            <div className="text-[10px] 2xl:text-xs text-blue-200/70 truncate">
              {company?.location}
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className={`mt-4 2xl:mt-6 space-y-1 2xl:space-y-2 ${isDrawer ? 'px-3' : 'px-1.5 lg:px-2.5 2xl:px-4'}`}>
          <span className={`px-2.5 2xl:px-3 text-[10px] 2xl:text-xs 3xl:text-sm font-bold uppercase tracking-wider text-blue-300/70 block transition-all overflow-hidden ${hideHeaderClass}`}>
            Recruitment Command
          </span>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/employer/dashboard'}
                title={item.label}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `relative w-full flex items-center ${
                    isDrawer ? 'justify-start h-10 2xl:h-13 3xl:h-14 px-3 2xl:px-4' : 'justify-center lg:justify-start h-9 lg:h-10 2xl:h-13 3xl:h-14 px-0 lg:px-2.5 2xl:px-4'
                  } rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base 3xl:text-lg font-semibold transition-all duration-200 overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-white/[0.22] via-blue-400/[0.18] to-white/[0.08] backdrop-blur-md text-white font-bold border border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_20px_-4px_rgba(30,58,138,0.5),0_2px_6px_rgba(0,0,0,0.2)]'
                      : 'text-blue-100/75 hover:bg-white/[0.08] hover:text-white hover:backdrop-blur-xs'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Liquid Glass Left Accent Glow */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 2xl:w-1.5 rounded-r-full bg-gradient-to-b from-cyan-300 to-blue-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
                    )}
                    {/* Liquid Light Sheen Bubble */}
                    {isActive && (
                      <span className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none blur-sm" />
                    )}
                    <div className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 shrink-0 flex items-center justify-center relative z-10">
                      <Icon
                        className={`w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 shrink-0 transition-transform ${
                          isActive
                            ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] scale-105'
                            : 'text-blue-200/70 group-hover:scale-110'
                        }`}
                      />
                    </div>

                    <div className={`flex items-center justify-between flex-1 min-w-0 relative z-10 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
                      <span className={isActive ? 'text-white drop-shadow-xs truncate' : 'truncate'}>{item.label}</span>
                      {item.badge && (
                        <span
                          className={`ml-2 px-1.5 2xl:px-2.5 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold shrink-0 whitespace-nowrap ${
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
        <div className={`mt-5 2xl:mt-7 space-y-1 2xl:space-y-2 ${isDrawer ? 'px-3' : 'px-1.5 lg:px-2.5 2xl:px-4'}`}>
          <span className={`px-2.5 2xl:px-3 text-[10px] 2xl:text-xs 3xl:text-sm font-bold uppercase tracking-wider text-blue-300/70 block transition-all overflow-hidden ${hideHeaderClass}`}>
            System
          </span>
          <Link
            to="/"
            title="Back to Home"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center ${
              isDrawer ? 'justify-start h-10 2xl:h-13 3xl:h-14 px-3 2xl:px-4' : 'justify-center lg:justify-start h-9 lg:h-10 2xl:h-13 3xl:h-14 px-0 lg:px-2.5 2xl:px-4'
            } rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base 3xl:text-lg font-medium text-blue-200/80 hover:bg-[#142c63] hover:text-white transition-colors overflow-hidden group`}
          >
            <div className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 shrink-0 flex items-center justify-center">
              <Home className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 text-blue-300 group-hover:scale-110 transition-transform" />
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
              <span className="truncate">Back to Home</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Recruiter Profile Footer */}
      <div className={`border-t border-[#1e3a7a]/60 mt-auto bg-[#071536]/60 shrink-0 ${isDrawer ? 'p-3' : 'p-1.5 lg:p-3 2xl:p-4 3xl:p-5'}`}>
        <div className={`flex items-center p-1.5 lg:p-2 2xl:p-3 rounded-xl 2xl:rounded-2xl bg-white/[0.05] border border-white/10 mb-2 2xl:mb-3 overflow-hidden ${
          isDrawer ? 'justify-start' : 'justify-center lg:justify-start'
        }`}>
          <div className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-full shrink-0 flex items-center justify-center">
            {recruiter?.avatar ? (
              <img loading="lazy" decoding="async"
                src={recruiter.avatar}
                alt={recruiter.name}
                className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-full object-cover ring-2 ring-cyan-400/50"
              />
            ) : (
              <div className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs 2xl:text-base flex items-center justify-center ring-2 ring-cyan-400/50">
                {recruiter?.name?.charAt(0)?.toUpperCase() || 'R'}
              </div>
            )}
          </div>
          <div className={`flex flex-col min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
            <div className="font-semibold text-xs 2xl:text-base text-white truncate">{recruiter?.name}</div>
            <div className="text-[10px] 2xl:text-xs 3xl:text-sm text-cyan-300/90 truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              {recruiter?.status || 'Active Hiring'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          title="Sign Out"
          className={`w-full flex items-center ${
            isDrawer ? 'justify-start h-10 2xl:h-13 3xl:h-14 px-3 2xl:px-4' : 'justify-center lg:justify-start h-9 lg:h-10 2xl:h-13 3xl:h-14 px-0 lg:px-2.5 2xl:px-4'
          } rounded-xl 2xl:rounded-2xl text-xs 2xl:text-base 3xl:text-lg font-semibold text-rose-300 hover:bg-rose-500/15 transition-colors cursor-pointer overflow-hidden group`}
        >
          <div className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 shrink-0 flex items-center justify-center">
            <LogOut className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 text-rose-300 group-hover:scale-110 transition-transform" />
          </div>
          <div className={`flex items-center justify-between flex-1 min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
            <span className="truncate">Sign Out</span>
            <span className="text-[10px] 2xl:text-xs 3xl:text-sm text-blue-300/60 ml-2">Exit</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EmployerSidebar;
