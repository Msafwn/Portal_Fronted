import React from 'react';
import { LandingView } from '../components/landing/LandingView';

const Landing = () => {
  return (
    <LandingView>
      <LandingView.Navbar />
      <LandingView.Hero />
      <LandingView.LiveDemo />
      <LandingView.RoleTracks />
      <LandingView.Algorithm />
      <LandingView.CTA />
      <LandingView.Footer />
    </LandingView>
  );
};

export default Landing;
