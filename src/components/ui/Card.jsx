import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const Header = ({ children, className = '' }) => {
  return (
    <div className={`p-4 sm:p-5 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
};

const Title = ({ children, className = '' }) => {
  return (
    <h3 className={`text-base font-bold text-slate-900 leading-tight ${className}`}>
      {children}
    </h3>
  );
};

const Subtitle = ({ children, className = '' }) => {
  return (
    <p className={`text-xs text-slate-500 mt-0.5 ${className}`}>
      {children}
    </p>
  );
};

const Body = ({ children, className = '' }) => {
  return (
    <div className={`p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  );
};

const Footer = ({ children, className = '' }) => {
  return (
    <div className={`p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 rounded-b-xl ${className}`}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
