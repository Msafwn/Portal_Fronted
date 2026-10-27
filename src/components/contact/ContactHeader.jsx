import React from 'react';
import { Headphones } from 'lucide-react';

export const ContactHeader = ({ className = '' }) => {
  return (
    <section className={`pt-10 pb-8 sm:pt-14 sm:pb-10 bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-50 text-center px-4 sm:px-6 ${className}`}>
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs">
          <Headphones className="w-3.5 h-3.5 text-blue-600" />
          <span>Support & Partnerships Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          How can we help your{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            career or hiring?
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Whether you are a candidate seeking guidance on match scores or an employer looking to recruit top-tier talent, our team is here for you.
        </p>
      </div>
    </section>
  );
};

export default ContactHeader;
