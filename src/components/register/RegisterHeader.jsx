import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const RegisterHeader = ({
  title = 'Create your account',
  subtitle = 'Select your role and start your AI-powered career journey',
  className = '',
}) => {
  return (
    <div className={`mb-1 ${className}`}>
      {/* Brand Bar when left banner is hidden (< lg: tablets & phones) */}
      <div className="flex items-center justify-between mb-1.5 lg:hidden">
        <Link to="/" className="flex items-center gap-1.5 group">
          <img loading="lazy" decoding="async"
            src="/logo.png"
            alt="Smart Career AI Logo"
            className="w-5 h-5 rounded-md object-contain shadow-xs"
          />
          <div className="flex flex-col">
            <span className="text-xs font-extrabold text-slate-900 leading-tight">
              Smart Career <span className="text-blue-600">AI</span>
            </span>
          </div>
        </Link>
        <Link
          to="/"
          className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-100"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Home</span>
        </Link>
      </div>

      <h2 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[10.5px] text-slate-500 mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default RegisterHeader;
