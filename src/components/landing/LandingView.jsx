import React from 'react';
import { LandingProvider, useLanding } from './LandingContext';
import { LandingNavbar } from './LandingNavbar';
import { LandingHero } from './LandingHero';
import { LandingLiveDemo } from './LandingLiveDemo';
import { LandingRoleTracks } from './LandingRoleTracks';
import { LandingAlgorithm } from './LandingAlgorithm';
import { LandingCTA } from './LandingCTA';
import { LandingFooter } from './LandingFooter';

export const LandingView = ({ children, className = '' }) => {
  return (
    <LandingProvider>
      <div className={`min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans ${className}`}>
        {children}
      </div>
    </LandingProvider>
  );
};

LandingView.Navbar = LandingNavbar;
LandingView.Hero = LandingHero;
LandingView.LiveDemo = LandingLiveDemo;
LandingView.RoleTracks = LandingRoleTracks;
LandingView.Algorithm = LandingAlgorithm;
LandingView.CTA = LandingCTA;
LandingView.Footer = LandingFooter;

export {
  useLanding,
  LandingNavbar,
  LandingHero,
  LandingLiveDemo,
  LandingRoleTracks,
  LandingAlgorithm,
  LandingCTA,
  LandingFooter,
};

export default LandingView;
