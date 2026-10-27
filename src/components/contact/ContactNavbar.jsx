import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, ArrowRight, LayoutDashboard } from 'lucide-react';

export const ContactNavbar = ({ className = '' }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const dashboardPath =
    user?.role === 'admin' || user?.role === 'super_admin'
      ? '/admin/dashboard'
      : user?.role === 'employer'
      ? '/employer/dashboard'
      : '/dashboard';

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 h-16 2xl:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 2xl:gap-3 group shrink-0">
          <img
            src="/logo.png"
            alt="Smart Career AI Logo"
            className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-lg object-contain shadow-xs transition-transform group-hover:scale-105 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm 2xl:text-base font-extrabold tracking-tight text-slate-900 leading-none whitespace-nowrap">
              Smart Career <span className="text-blue-600">AI</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] 2xl:text-xs text-slate-500 font-medium whitespace-nowrap">
              Role Match & Recommendation
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 2xl:gap-4 shrink-0">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs 2xl:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-2.5 sm:px-3 2xl:px-4 py-1.5 2xl:py-2 rounded-lg 2xl:rounded-xl hover:bg-slate-100 whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
          {isAuthenticated && user ? (
            <Link
              to={dashboardPath}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs 2xl:text-sm font-semibold px-3 sm:px-4 2xl:px-5 py-1.5 2xl:py-2 rounded-lg 2xl:rounded-xl shadow-sm shadow-blue-600/25 transition-all whitespace-nowrap shrink-0"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs 2xl:text-sm font-semibold text-slate-700 hover:text-blue-600 px-2.5 sm:px-3 2xl:px-4 py-1.5 2xl:py-2 rounded-lg 2xl:rounded-xl transition-colors whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs 2xl:text-sm font-semibold px-3 sm:px-3.5 2xl:px-5 py-1.5 2xl:py-2 rounded-lg 2xl:rounded-xl shadow-sm shadow-blue-600/25 transition-all whitespace-nowrap shrink-0"
              >
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ContactNavbar;
