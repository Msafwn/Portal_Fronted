import React from 'react';

export const NotFoundTitle = ({ children = 'Lost in Career Orbit?', className = '' }) => {
  return (
    <h1 className={`text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug ${className}`}>
      {children}
    </h1>
  );
};

export const NotFoundDescription = ({
  children = "The link you followed may be broken, or the page may have been moved. Let's guide you back to exploring matched career opportunities.",
  className = '',
}) => {
  return (
    <p className={`text-xs text-slate-500 max-w-sm mx-auto leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

export default NotFoundTitle;
