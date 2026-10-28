import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const LoginHeader = ({
  title = 'Welcome back',
  subtitle = 'Please enter your credentials to sign in',
  className = '',
}) => {
  return (
    <div className={`mb-3.5 md:mb-4 lg:mb-5 2xl:mb-6 ${className}`}>
      {/* Mobile Brand Bar (< md) */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <Link to="/" className="flex items-center gap-2 group">
          <img loading="lazy" decoding="async"
            src="/logo.png"
            alt="Smart Career AI Logo"
            className="w-7 h-7 rounded-lg object-contain shadow-xs"
          />
          <span className="text-sm font-extrabold text-slate-900">
            Smart Career <span className="text-blue-600">AI</span>
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </div>

      <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base 3xl:text-lg text-slate-500 mt-1 2xl:mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default LoginHeader;
