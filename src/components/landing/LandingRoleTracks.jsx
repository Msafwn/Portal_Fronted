import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { ROLE_TRACKS } from '../../constants';
import { useUserPortal } from '../../hooks/useUserPortal';

export const LandingRoleTracks = ({ className = '' }) => {
  const { isAuthenticated, portalPath } = useUserPortal();
  return (
    <section id="roles" className={`py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-24 3xl:py-32 bg-white scroll-mt-16 ${className}`}>
      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1920px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="text-center max-w-2xl md:max-w-xl lg:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 2xl:mb-16">
          <div className="inline-flex items-center gap-1 text-[11px] md:text-xs 2xl:text-xs 3xl:text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Layers className="w-3 h-3 md:w-3.5 md:h-3.5 2xl:w-4 2xl:h-4" />
            <span>Tailored Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-4xl 3xl:text-5xl 4k:text-6xl font-extrabold text-slate-900 tracking-tight">
            4 Distinct Role Portals
          </h2>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base 3xl:text-lg text-slate-500 mt-1 md:mt-1.5 2xl:mt-2">
            One platform with dedicated experiences whether you are an intern, a graduate, an engineer, or a hiring manager.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-5 lg:gap-6 2xl:gap-7 3xl:gap-9">
          {ROLE_TRACKS.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.role}
                className="rounded-2xl md:rounded-2xl 2xl:rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 md:p-5 lg:p-6 2xl:p-7 3xl:p-9 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 md:mb-4 2xl:mb-5">
                    <div className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 rounded-xl 2xl:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7" />
                    </div>
                    <span className="text-[10px] md:text-[11px] 2xl:text-xs 3xl:text-sm font-bold px-2 py-0.5 md:px-2.5 md:py-0.5 2xl:px-3 2xl:py-1 rounded-full bg-slate-100 text-slate-600">
                      {t.badge}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg lg:text-xl 2xl:text-xl 3xl:text-2xl font-bold text-slate-900 mb-1 md:mb-1.5 2xl:mb-2">{t.title}</h3>
                  <p className="text-xs md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base text-slate-500 leading-relaxed mb-3 sm:mb-4 md:mb-5 2xl:mb-6">{t.desc}</p>

                  <ul className="space-y-1.5 md:space-y-2 2xl:space-y-2.5 mb-4 sm:mb-5 md:mb-6 2xl:mb-8">
                    {t.features.map((f, i) => (
                      <li key={i} className="text-[11px] md:text-xs lg:text-sm text-slate-600 flex items-center gap-1.5 md:gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={isAuthenticated ? portalPath : '/register'}
                  className="w-full inline-flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 lg:py-3 2xl:py-3 3xl:py-3.5 rounded-lg md:rounded-xl 2xl:rounded-xl text-xs md:text-xs lg:text-sm 2xl:text-sm 3xl:text-base font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <span>{isAuthenticated ? 'Go to Portal' : `Join as ${t.role}`}</span>
                  <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingRoleTracks;
