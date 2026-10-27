import React from 'react';

export const Footer = ({ children, className = '' }) => {
  return (
    <footer className={`bg-white border-t border-slate-200 px-4 sm:px-6 py-3 text-xs text-slate-500 ${className}`}>
      {children || <Footer.Default />}
    </footer>
  );
};

const Default = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full px-2 sm:px-4 2xl:px-8">
      <div className="flex items-center gap-2 text-[11px]">
        <span className="font-semibold text-slate-800">Smart Career AI</span>
        <span>•</span>
        <span>Role Match & Recommendation System</span>
      </div>
      <div className="text-[11px] text-slate-400">
        © 2026 Smart Career Role Match AI System. All rights reserved.
      </div>
    </div>
  );
};

const Copyright = ({ text = '© 2026 Smart Career Role Match AI System' }) => {
  return <p className="text-[11px] text-slate-400">{text}</p>;
};

const Links = ({ children }) => {
  return <div className="flex items-center gap-3 text-[11px]">{children}</div>;
};

Footer.Default = Default;
Footer.Copyright = Copyright;
Footer.Links = Links;

export default Footer;
