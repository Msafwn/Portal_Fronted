import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutDashboard, Compass } from 'lucide-react';
import { useUserPortal } from '../../hooks/useUserPortal';

export const LandingCTA = ({ className = '' }) => {
  const { isAuthenticated, portalPath, portalLabel, secondaryPath, secondaryLabel } = useUserPortal();

  return (
    <section id="employers" className={`py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-24 3xl:py-32 bg-white text-center scroll-mt-16 ${className}`}>
      <div className="max-w-4xl md:max-w-3xl lg:max-w-4xl 2xl:max-w-[1300px] 3xl:max-w-[1600px] 4k:max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 2xl:px-12">
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 2xl:p-16 3xl:p-20 rounded-2xl md:rounded-3xl 2xl:rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/20">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl font-extrabold tracking-tight mb-2 md:mb-3 2xl:mb-4">
            {isAuthenticated ? 'Ready to accelerate your next career milestone?' : 'Ready to find your true career match?'}
          </h2>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base 3xl:text-xl text-blue-100 max-w-xl md:max-w-xl lg:max-w-2xl 3xl:max-w-3xl mx-auto mb-5 sm:mb-6 md:mb-8 2xl:mb-10">
            {isAuthenticated
              ? 'Jump directly into your portal to view latest algorithm matched opportunities and manage applications.'
              : 'Join candidates and tech recruiters already using Smart Career AI. Free registration with instant match analytics.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 md:gap-4 2xl:gap-5">
            {isAuthenticated ? (
              <>
                <Link
                  to={portalPath}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 2xl:px-9 2xl:py-4 3xl:px-12 3xl:py-5 rounded-xl 2xl:rounded-2xl bg-white text-blue-600 font-bold text-xs sm:text-sm md:text-sm lg:text-base hover:bg-blue-50 transition-colors shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{portalLabel}</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
                <Link
                  to={secondaryPath}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 2xl:px-9 2xl:py-4 3xl:px-12 3xl:py-5 rounded-xl 2xl:rounded-2xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm md:text-sm lg:text-base border border-white/20 transition-colors"
                >
                  <Compass className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{secondaryLabel}</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 2xl:px-9 2xl:py-4 3xl:px-12 3xl:py-5 rounded-xl 2xl:rounded-2xl bg-white text-blue-600 font-bold text-xs sm:text-sm md:text-sm lg:text-base hover:bg-blue-50 transition-colors shadow-sm"
                >
                  Sign Up Now (Free)
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 2xl:px-9 2xl:py-4 3xl:px-12 3xl:py-5 rounded-xl 2xl:rounded-2xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm md:text-sm lg:text-base border border-white/20 transition-colors"
                >
                  Already Registered? Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCTA;

