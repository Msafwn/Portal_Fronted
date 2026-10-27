import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Building2, CheckCircle2, LayoutDashboard, Compass } from 'lucide-react';
import { AuroraBackground } from '../reactbits/AuroraBackground';
import { ParticlesBackground } from '../reactbits/ParticlesBackground';
import { ShinyText } from '../reactbits/ShinyText';
import { DecryptedText } from '../reactbits/DecryptedText';
import { useUserPortal } from '../../hooks/useUserPortal';

export const LandingHero = ({ className = '' }) => {
  const {
    isAuthenticated,
    portalPath,
    portalName,
    PortalIcon,
    portalLabel,
  } = useUserPortal();
  return (
    <AuroraBackground
      colorVariant="clean-blue"
      speed="slow"
      opacity={0.35}
      className={`pt-10 pb-14 sm:pt-14 sm:pb-18 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 2xl:pt-28 2xl:pb-36 3xl:pt-36 3xl:pb-44 bg-gradient-to-b from-slate-50/60 via-white to-white ${className}`}
    >
      {/* Subtle ReactBits Interactive Particle Constellation */}
      <ParticlesBackground
        particleCount={38}
        particleColor="rgba(59, 130, 246, 0.22)"
        lineColor="rgba(148, 163, 184, 0.10)"
        speed={0.35}
        interactive={true}
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1920px] 4k:max-w-[2400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="text-center max-w-3xl md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl 4k:max-w-6xl mx-auto space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-5 2xl:space-y-6 3xl:space-y-8">
          {/* ReactBits Decrypted Text Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 2xl:px-6 2xl:py-2.5 rounded-full text-[11px] sm:text-xs md:text-xs lg:text-sm 2xl:text-base font-bold bg-white border border-blue-200 shadow-2xs text-blue-800">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
            <DecryptedText
              text="Intelligent Job Recommendation & Role Match System"
              speed={28}
              animateOn="mount"
              className="tracking-tight"
            />
          </div>

          {/* Main Title with High-Contrast ShinyText */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl 4k:text-9xl font-extrabold tracking-tight text-slate-900 leading-[1.15] md:leading-[1.12]">
            Stop blind applications.{' '}
            <span className="block mt-1 md:mt-1.5 2xl:mt-2">
              <ShinyText
                text="Match your true career role with AI."
                theme="light"
                speed={4}
                className="font-black"
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl 3xl:text-2xl 4k:text-3xl text-slate-600 max-w-2xl md:max-w-xl lg:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto leading-relaxed">
            Personalized role recommendations tailored for <strong>Students</strong>, <strong>Fresh Graduates</strong>, and <strong>Professionals</strong>. Pre-calculate your exact compatibility score before you apply.
          </p>

          {/* CTA Buttons: Dynamic for Guest vs Authenticated User */}
          <div className="pt-2 sm:pt-3 md:pt-4 2xl:pt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 md:gap-4 2xl:gap-5">
            {isAuthenticated ? (
              <>
                <Link
                  to={portalPath}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-lg px-5 py-2.5 sm:px-6 sm:py-3 md:px-6 md:py-3.5 lg:px-7 lg:py-4 rounded-xl 2xl:rounded-2xl shadow-md shadow-blue-600/25 transition-all hover:shadow-lg hover:shadow-blue-600/35 hover:-translate-y-0.5 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Go to Portal</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>

                <Link
                  to={portalPath}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 font-semibold text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-lg px-5 py-2.5 sm:px-6 sm:py-3 md:px-6 md:py-3.5 lg:px-7 lg:py-4 rounded-xl 2xl:rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  {PortalIcon && <PortalIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />}
                  <span>{portalName}</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-lg px-5 py-2.5 sm:px-6 sm:py-3 md:px-6 md:py-3.5 lg:px-7 lg:py-4 rounded-xl 2xl:rounded-2xl shadow-md shadow-blue-600/25 transition-all hover:shadow-lg hover:shadow-blue-600/35 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>

                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 font-semibold text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-lg px-5 py-2.5 sm:px-6 sm:py-3 md:px-6 md:py-3.5 lg:px-7 lg:py-4 rounded-xl 2xl:rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <span>Employer Portal</span>
                </Link>
              </>
            )}
          </div>

          {/* Trust Highlights */}
          <div className="pt-3 sm:pt-4 md:pt-5 2xl:pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-4 2xl:gap-6 text-slate-500 text-[11px] sm:text-xs md:text-xs lg:text-sm 2xl:text-base font-medium">
            <span className="flex items-center gap-1.5 md:gap-2 bg-white/70 backdrop-blur-xs px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl border border-slate-100 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
              Zero Blind Applications
            </span>
            <span className="flex items-center gap-1.5 md:gap-2 bg-white/70 backdrop-blur-xs px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl border border-slate-100 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
              50-30-20 Weighted Score Algorithm
            </span>
            <span className="flex items-center gap-1.5 md:gap-2 bg-white/70 backdrop-blur-xs px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl border border-slate-100 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
              Localized Career Tracks
            </span>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default LandingHero;
