import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  ShieldCheck,
  Briefcase,
  LogOut,
  ArrowRightLeft,
  X,
  ShieldAlert,
  Cpu,
} from 'lucide-react';
import { useAdminPortal } from '../../../context/AdminPortalContext';

export const AdminSidebar = ({ isDrawer = false }) => {
  const { adminProfile, sidebarOpen, setSidebarOpen, handleLogout } = useAdminPortal();

  const hideTextClass = isDrawer
    ? 'ml-3 opacity-100 max-w-none translate-x-0'
    : 'opacity-0 max-w-0 pointer-events-none lg:ml-3 lg:opacity-100 lg:max-w-none lg:translate-x-0 lg:pointer-events-auto';

  const hideHeaderClass = isDrawer
    ? 'opacity-100 max-h-6 mb-2'
    : 'opacity-0 max-h-0 -my-1 pointer-events-none lg:opacity-100 lg:max-h-6 lg:mb-2 2xl:mb-3';

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'System Analytics',
      icon: LayoutDashboard,
      badge: 'Live',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    {
      to: '/admin/users',
      label: 'Candidate Control',
      icon: Users,
      badge: '1.2k',
      badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    },
    {
      to: '/admin/employers',
      label: 'Employer Verification',
      icon: Building2,
      badge: '8 Pending',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
    {
      to: '/admin/jobs',
      label: 'Job Moderation',
      icon: ShieldCheck,
      badge: '142 Active',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    },
    {
      to: '/admin/ai-settings',
      label: 'AI Engine & Weights',
      icon: Cpu,
      badge: '50-30-20',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    },
    {
      to: '/admin/logs',
      label: 'Audit Logs & Reports',
      icon: ShieldAlert,
      badge: 'FYP Audit',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full overflow-y-auto no-scrollbar selection:bg-blue-500/30">
      <div>
        {/* Brand Header */}
        <div className={`h-16 2xl:h-20 3xl:h-24 shrink-0 border-b border-[#1e3a7a]/60 flex items-center overflow-hidden ${
          isDrawer ? 'px-4 justify-between' : 'px-1.5 lg:px-3.5 2xl:px-5 justify-center lg:justify-between'
        }`}>
          <Link to="/admin/dashboard" title="Smart Career AI Super Admin" className="flex items-center group overflow-hidden">
            <div className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-13 3xl:h-13 shrink-0 flex items-center justify-center">
              <img loading="lazy" decoding="async"
                src="/logo.png"
                alt="Smart Career AI Logo"
                className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-13 3xl:h-13 rounded-lg 2xl:rounded-xl object-contain bg-white/10 p-1 border border-white/20 shadow-sm group-hover:scale-105 transition-transform"
              />
            </div>
            <div className={`flex flex-col transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
              <div className="flex items-center gap-1.5 2xl:gap-2">
                <span className="text-sm 2xl:text-base 3xl:text-lg font-extrabold tracking-tight text-white leading-none">
                  Smart Career <span className="text-blue-400">AI</span>
                </span>
                <span className="text-[10px] 2xl:text-xs font-bold px-1.5 py-0.2 2xl:px-2 2xl:py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  ROOT
                </span>
              </div>
              <span className="text-[10px] 2xl:text-xs text-blue-300/80 font-medium">Admin Control Console</span>
            </div>
          </Link>

          {/* Mobile Close Button */}
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

        {/* Navigation Section */}
        <div className={`mt-2 2xl:mt-4 space-y-1 2xl:space-y-1.5 ${isDrawer ? 'px-3' : 'p-1.5 lg:p-2 2xl:p-3'}`}>
          <span className={`px-2.5 2xl:px-3 text-[10px] 2xl:text-xs font-bold uppercase tracking-wider text-blue-300/70 block transition-all overflow-hidden ${hideHeaderClass}`}>
            System Modules
          </span>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                title={item.label}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `relative w-full flex items-center ${
                    isDrawer ? 'justify-start h-10 px-3' : 'justify-center lg:justify-start h-9 lg:h-10 2xl:h-13 3xl:h-14 px-0 lg:px-2.5 2xl:px-3.5'
                  } rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-semibold transition-all duration-200 overflow-hidden ${
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
                      <span className="absolute left-0 top-1.5 bottom-1.5 2xl:top-2 2xl:bottom-2 w-1 2xl:w-1.5 rounded-r-full bg-gradient-to-b from-cyan-300 to-blue-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
                    )}
                    {/* Liquid Light Sheen Bubble */}
                    {isActive && (
                      <span className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none blur-sm" />
                    )}
                    <div className="w-5 h-5 2xl:w-6 2xl:h-6 shrink-0 flex items-center justify-center relative z-10">
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
                          className={`ml-2 px-1.5 py-0.5 2xl:px-2.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs font-bold shrink-0 whitespace-nowrap ${
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
        </div>

        {/* Cross Portal Quick Switchers */}
        <div className={`mt-4 2xl:mt-6 space-y-1 2xl:space-y-1.5 ${isDrawer ? 'px-3' : 'px-1.5 lg:px-2 2xl:px-3'}`}>
          <span className={`px-2.5 2xl:px-3 text-[10px] 2xl:text-xs font-bold uppercase tracking-wider text-blue-300/70 block transition-all overflow-hidden ${hideHeaderClass}`}>
            Live Portal Previews
          </span>

          <Link
            to="/employer/dashboard"
            title="Employer Portal View"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center ${
              isDrawer ? 'justify-start h-10 px-3' : 'justify-center lg:justify-start h-9 lg:h-10 2xl:h-13 3xl:h-14 px-0 lg:px-2.5 2xl:px-3.5'
            } rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-medium text-blue-200/80 hover:bg-[#142c63] hover:text-white transition-colors group overflow-hidden`}
          >
            <div className="w-5 h-5 2xl:w-6 2xl:h-6 shrink-0 flex items-center justify-center">
              <Briefcase className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-300 group-hover:text-cyan-300 transition-colors" />
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
              <span className="truncate">Employer Portal View</span>
            </div>
          </Link>

          <Link
            to="/dashboard"
            title="Candidate Portal View"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center ${
              isDrawer ? 'justify-start h-10 px-3' : 'justify-center lg:justify-start h-9 lg:h-10 2xl:h-13 3xl:h-14 px-0 lg:px-2.5 2xl:px-3.5'
            } rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-medium text-blue-200/80 hover:bg-[#142c63] hover:text-white transition-colors group overflow-hidden`}
          >
            <div className="w-5 h-5 2xl:w-6 2xl:h-6 shrink-0 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-300 group-hover:text-cyan-300 transition-colors" />
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
              <span className="truncate">Candidate Portal View</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Administrator Profile & Logout */}
      <div className={`border-t border-[#1e3a7a]/60 mt-auto bg-[#071536]/60 shrink-0 space-y-2 2xl:space-y-3 ${isDrawer ? 'p-3' : 'p-1.5 lg:p-3 2xl:p-4'}`}>
        <div className={`flex items-center p-1.5 lg:p-2 2xl:p-3 rounded-xl 2xl:rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden ${
          isDrawer ? 'justify-start' : 'justify-center lg:justify-start'
        }`}>
          {adminProfile.avatar ? (
            <img loading="lazy" decoding="async"
              src={adminProfile.avatar}
              alt={adminProfile.name}
              className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-13 3xl:h-13 rounded-lg 2xl:rounded-xl object-cover shadow-xs shrink-0"
            />
          ) : (
            <div className="w-8 h-8 2xl:w-11 2xl:h-11 3xl:w-13 3xl:h-13 rounded-lg 2xl:rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-xs 2xl:text-sm 3xl:text-base shadow-xs shrink-0">
              {adminProfile.initials || 'SA'}
            </div>
          )}
          <div className={`flex flex-col min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
            <h4 className="text-xs 2xl:text-sm 3xl:text-base font-bold text-white truncate">
              {adminProfile.name}
            </h4>
            <p className="text-[10px] 2xl:text-xs text-cyan-300 truncate font-medium">
              {adminProfile.roleLabel || 'Super Administrator'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          title="Exit Admin Console"
          className={`w-full flex items-center ${
            isDrawer ? 'justify-start h-10 px-3' : 'justify-center lg:justify-start h-9 lg:h-10 2xl:h-12 3xl:h-13 px-0 lg:px-2.5 2xl:px-3.5'
          } rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm 3xl:text-base font-semibold text-rose-300 hover:bg-rose-500/15 transition-colors cursor-pointer overflow-hidden group`}
        >
          <div className="w-5 h-5 2xl:w-6 2xl:h-6 shrink-0 flex items-center justify-center">
            <LogOut className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-rose-300 group-hover:scale-110 transition-transform" />
          </div>
          <div className={`flex items-center justify-between flex-1 min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${hideTextClass}`}>
            <span className="truncate">Exit Admin Console</span>
            <span className="text-[10px] 2xl:text-xs text-blue-300/60 ml-2">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
