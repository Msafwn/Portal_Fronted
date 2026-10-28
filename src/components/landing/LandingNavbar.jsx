import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Menu, X, LayoutDashboard, Building2, ShieldCheck, GraduationCap } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import { useLanding } from './LandingContext';
import { useUserPortal } from '../../hooks/useUserPortal';

export const LandingNavbar = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSection, setActiveSection } = useLanding();
  const { isAuthenticated, user, portalPath, portalName, PortalIcon, roleBadge } = useUserPortal();

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all shadow-2xs ${className}`}>
      <div className="w-full px-4 sm:px-6 md:px-6 lg:px-10 xl:px-16 2xl:px-20 h-16 md:h-18 2xl:h-20 3xl:h-24 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 md:gap-2.5 2xl:gap-3.5 group shrink-0">
          <img loading="lazy" decoding="async"
            src="/logo.png"
            alt="Smart Career AI Logo"
            className="w-8 h-8 md:w-9 md:h-9 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 rounded-lg 2xl:rounded-xl object-contain shadow-xs transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-sm md:text-sm lg:text-base 2xl:text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              Smart Career <span className="text-blue-600">AI</span>
            </span>
            <span className="hidden sm:block md:hidden lg:block text-[10px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium mt-0.5">
              Role Match & Recommendation
            </span>
          </div>
        </Link>

        {/* Dynamic Active Navigation Links - Tablet & Desktop Optimized */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 2xl:gap-3 text-xs md:text-[11px] lg:text-sm 2xl:text-base font-semibold">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`px-2 py-1 md:px-2.5 md:py-1.5 lg:px-3.5 lg:py-2 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons: Dynamically adapts whether guest or authenticated */}
        <div className="flex items-center gap-2 md:gap-2.5 lg:gap-3 2xl:gap-4 shrink-0">
          {isAuthenticated ? (
            <>
              {/* Authenticated User Status Pill (Compact on tablet, full on desktop) */}
              <Link
                to={portalPath}
                className="hidden sm:flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs lg:text-sm font-semibold transition-all border border-slate-200/90 shadow-2xs"
                title="View your account"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="truncate max-w-[90px] md:max-w-[110px] lg:max-w-[150px] 2xl:max-w-[180px] font-bold text-slate-900">
                  {user?.name || 'My Account'}
                </span>
                <span className="text-[10px] lg:text-xs font-extrabold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 whitespace-nowrap">
                  {roleBadge}
                </span>
              </Link>

              {/* Primary Go to Portal CTA */}
              <Link
                to={portalPath}
                className="inline-flex items-center gap-1.5 md:gap-1.5 lg:gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-xs lg:text-sm 2xl:text-base font-semibold px-3 py-1.5 sm:px-3.5 sm:py-2 md:px-3.5 md:py-2 lg:px-5 lg:py-2.5 rounded-lg 2xl:rounded-xl shadow-sm shadow-blue-600/30 transition-all hover:shadow-md hover:shadow-blue-600/40"
              >
                <span>Go to Portal</span>
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs md:text-xs lg:text-sm 2xl:text-base font-semibold text-slate-700 hover:text-blue-600 px-2 py-1 sm:px-3 sm:py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-xs lg:text-sm 2xl:text-base font-semibold px-3 py-1.5 sm:px-3.5 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-lg 2xl:rounded-xl shadow-sm shadow-blue-600/30 transition-all hover:shadow-md hover:shadow-blue-600/40"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              </Link>
            </>
          )}

          {/* Tablet & Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer (< md) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {isAuthenticated && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-sm text-slate-900">{user?.name || 'My Account'}</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">
                {roleBadge}
              </span>
            </div>
          )}

          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </a>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                to={portalPath}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-sm py-2.5 rounded-xl shadow-sm"
              >
                {PortalIcon && <PortalIcon className="w-4 h-4" />}
                <span>Go to {portalName}</span>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
