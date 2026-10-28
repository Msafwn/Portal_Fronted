import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '../../store/slices/authSlice';

export const ContactFooter = ({ className = '' }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  const dashboardPath =
    user?.role === 'admin' || user?.role === 'super_admin'
      ? '/admin/dashboard'
      : user?.role === 'employer'
      ? '/employer/dashboard'
      : '/dashboard';

  return (
    <footer className={`mt-auto bg-white border-t border-slate-200/90 py-5 sm:py-6 text-xs text-slate-600 shadow-2xs transition-all ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <img loading="lazy" decoding="async" src="/logo.png" alt="Smart Career Logo" className="w-6 h-6 rounded-md object-contain shrink-0 shadow-2xs" />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-xs 2xl:text-sm tracking-tight">
              Smart Career <span className="text-blue-600">AI</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] 2xl:text-xs text-slate-500 font-medium">Support Desk</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2 text-xs font-medium">
          <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          {isAuthenticated && user ? (
            <Link to={dashboardPath} className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="text-slate-600 hover:text-blue-600 transition-colors">
                Register
              </Link>
            </>
          )}
          <a
            href="mailto:support@smartcareer.ai"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            support@smartcareer.ai
          </a>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
