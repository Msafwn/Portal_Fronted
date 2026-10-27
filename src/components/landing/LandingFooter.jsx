import React from 'react';
import { Link } from 'react-router-dom';
import { useUserPortal } from '../../hooks/useUserPortal';

export const LandingFooter = ({ className = '' }) => {
  const { isAuthenticated, portalPath, portalLabel } = useUserPortal();

  return (
    <footer className={`bg-white border-t border-slate-200/90 py-8 sm:py-10 md:py-12 lg:py-14 2xl:py-16 3xl:py-20 text-xs md:text-xs lg:text-sm 2xl:text-base text-slate-600 ${className}`}>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 pb-5 md:pb-6 2xl:pb-8 border-b border-slate-200/80">
          {/* Brand Identity */}
          <div className="flex items-center gap-2.5 md:gap-3 2xl:gap-4">
            <img
              src="/logo.png"
              alt="Smart Career Logo"
              className="w-8 h-8 md:w-9 md:h-9 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 rounded-lg 2xl:rounded-xl object-contain shadow-2xs border border-slate-200/60"
            />
            <div>
              <span className="font-extrabold text-slate-900 text-sm md:text-sm lg:text-base 2xl:text-lg tracking-tight">
                Smart Career <span className="text-blue-600">AI</span>
              </span>
              <p className="text-[10px] md:text-[11px] lg:text-xs 2xl:text-sm text-slate-500 font-medium">
                Role Match & Recommendation System
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-5 lg:gap-8 2xl:gap-10 text-xs md:text-xs lg:text-sm 2xl:text-base font-semibold">
            {isAuthenticated ? (
              <Link
                to={portalPath}
                className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
              >
                Go to Portal
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
            <Link
              to="/contact"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="#roles"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Role Tracks
            </a>
            <a
              href="#algorithm"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Algorithm
            </a>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-5 md:pt-6 2xl:pt-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs md:text-xs lg:text-sm text-slate-500 font-medium text-center sm:text-left">
          <p>© 2026 Smart Career Role Match AI System. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-500 justify-center">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Intelligent Career Discovery & Role Matching Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
