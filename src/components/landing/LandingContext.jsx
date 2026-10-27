import React, { createContext, useContext, useState, useEffect } from 'react';

const LandingContext = createContext({
  activeSection: 'demo',
  setActiveSection: () => {},
});

export const useLanding = () => useContext(LandingContext);

export const LandingProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('demo');

  useEffect(() => {
    const sectionIds = ['demo', 'roles', 'algorithm', 'employers'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-90px 0px -50% 0px',
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <LandingContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </LandingContext.Provider>
  );
};

export default LandingContext;
