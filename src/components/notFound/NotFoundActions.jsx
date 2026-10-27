import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundActions = ({
  isAuth = false,
  userRole = 'student',
  className = '',
}) => {
  const navigate = useNavigate();

  const role = userRole?.toLowerCase?.() || 'student';
  const dashboardTarget =
    role === 'admin' || role === 'super_admin'
      ? '/admin/dashboard'
      : role === 'employer'
      ? '/employer/dashboard'
      : '/dashboard';

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 ${className}`}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
      >
        <ArrowLeft className="w-3 h-3" />
        <span>Go Back</span>
      </button>

      <Link
        to={isAuth ? dashboardTarget : '/'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm shadow-blue-600/30 transition-all hover:shadow-md hover:shadow-blue-600/40"
      >
        <Home className="w-3 h-3" />
        <span>{isAuth ? 'Go to Dashboard' : 'Return to Home'}</span>
      </Link>
    </div>
  );
};

export const NotFoundQuickLinks = ({
  isAuth = false,
  userRole = 'student',
  className = '',
}) => {
  const role = userRole?.toLowerCase?.() || 'student';
  const dashboardTarget =
    role === 'admin' || role === 'super_admin'
      ? '/admin/dashboard'
      : role === 'employer'
      ? '/employer/dashboard'
      : '/dashboard';

  return (
    <div className={`pt-2 border-t border-slate-100 max-w-sm mx-auto ${className}`}>
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
        Helpful Shortcuts
      </span>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {isAuth ? (
          <>
            <Link
              to={dashboardTarget}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              My Dashboard
            </Link>
            {userRole !== 'employer' && userRole !== 'admin' && (
              <>
                <Link
                  to="/jobs"
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors"
                >
                  Job Feed
                </Link>
                <Link
                  to="/matches"
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors"
                >
                  Role Matches
                </Link>
              </>
            )}
            <Link
              to="/contact"
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors"
            >
              Contact Support
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/contact"
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="/#roles"
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors"
            >
              Role Tracks
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFoundActions;
