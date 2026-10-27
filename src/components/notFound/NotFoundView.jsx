import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { NotFoundBadge } from './NotFoundBadge';
import { NotFoundVisual } from './NotFoundVisual';
import { NotFoundTitle, NotFoundDescription } from './NotFoundTitle';
import { NotFoundActions, NotFoundQuickLinks } from './NotFoundActions';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '../../store/slices/authSlice';

export const NotFoundView = ({ children, className = '' }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  const dashboardPath =
    user?.role === 'admin' || user?.role === 'super_admin'
      ? '/admin/dashboard'
      : user?.role === 'employer'
      ? '/employer/dashboard'
      : '/dashboard';

  const homeOrDashboard = isAuthenticated && user ? dashboardPath : '/';

  return (
    <div className={`h-screen max-h-screen w-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/40 text-slate-900 flex flex-col justify-between relative font-sans selection:bg-blue-100 selection:text-blue-900 ${className}`}>
      {/* Subtle Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-60 h-60 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Minimal Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-3 shrink-0 w-full flex items-center justify-between relative z-10">
        <Link to={homeOrDashboard} className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Smart Career AI Logo"
            className="w-7 h-7 rounded-lg object-contain shadow-xs transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-xs font-extrabold tracking-tight text-slate-900 leading-none">
              Smart Career <span className="text-blue-600">AI</span>
            </span>
            <span className="text-[9px] text-slate-400 font-medium">Role Match Portal</span>
          </div>
        </Link>

        <Link
          to={homeOrDashboard}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>{isAuthenticated && user ? 'Go to Dashboard' : 'Return to Home'}</span>
        </Link>
      </header>

      {/* Center Main Content Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-1 relative z-10 overflow-hidden">
        <div className="max-w-md mx-auto text-center space-y-2.5">
          {children}
        </div>
      </main>

      {/* Bottom Minimal Footer */}
      <footer className="px-5 py-2 shrink-0 text-center text-[10px] text-slate-400 border-t border-slate-100 relative z-10">
        <p>© 2026 Smart Career Role Match AI System. All rights reserved.</p>
      </footer>
    </div>
  );
};

NotFoundView.Badge = NotFoundBadge;
NotFoundView.Visual = NotFoundVisual;
NotFoundView.Title = NotFoundTitle;
NotFoundView.Description = NotFoundDescription;
NotFoundView.Actions = NotFoundActions;
NotFoundView.QuickLinks = NotFoundQuickLinks;

export {
  NotFoundBadge,
  NotFoundVisual,
  NotFoundTitle,
  NotFoundDescription,
  NotFoundActions,
  NotFoundQuickLinks,
};

export default NotFoundView;
