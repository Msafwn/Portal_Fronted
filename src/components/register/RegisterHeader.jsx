import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const RegisterHeader = ({
  title = 'Create your account',
  subtitle = 'Select your role and start your AI-powered career journey',
  className = '',
}) => {
  return (
    <div className={`mb-2.5 sm:mb-3 md:mb-4 lg:mb-4 2xl:mb-5 ${className}`}>
      {/* Brand Bar when left banner is hidden (< lg: tablets & phones) */}
      <div className="flex items-center justify-between mb-3 md:mb-4 lg:hidden">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Smart Career AI Logo"
            className="w-7 h-7 md:w-8 md:h-8 rounded-lg object-contain shadow-xs"
          />
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-extrabold text-slate-900 leading-tight">
              Smart Career <span className="text-blue-600">AI</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium hidden sm:block">Role Match & Recommendation</span>
          </div>
        </Link>
        <Link
          to="/"
          className="text-xs md:text-sm font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
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

export default RegisterHeader;
