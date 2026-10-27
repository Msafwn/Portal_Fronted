import React from 'react';
import { Mail, Clock, MapPin } from 'lucide-react';

export const SupportContactCards = ({ className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Mail className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">Email Support</h3>
        <p className="text-xs text-slate-500">Direct technical desk response within 2 hours</p>
        <a
          href="mailto:support@smartcareer.ai"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline block pt-1"
        >
          support@smartcareer.ai
        </a>
      </div>

      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Clock className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">Advisory Hours</h3>
        <p className="text-xs text-slate-500">Monday through Saturday (Live Desk)</p>
        <span className="text-xs font-bold text-emerald-700 block pt-1">
          9:00 AM – 7:00 PM PKT
        </span>
      </div>

      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <MapPin className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">Innovation Hub</h3>
        <p className="text-xs text-slate-500">AI Role Match & Analytics Center</p>
        <span className="text-xs font-bold text-indigo-700 block pt-1">
          Islamabad, Pakistan
        </span>
      </div>
    </div>
  );
};

export default SupportContactCards;
