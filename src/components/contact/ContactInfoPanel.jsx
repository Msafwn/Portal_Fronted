import React from 'react';
import { Mail, MapPin, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { CONTACT_CHANNELS, PRIORITY_NOTICE } from '../../constants';

const CHANNEL_ICONS = {
  email: Mail,
  location: MapPin,
  hours: Clock,
};

const CHANNEL_COLORS = {
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
};

export const ContactInfoPanel = ({ className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
          Direct Channels
        </h2>
        <p className="text-xs text-slate-500">
          Reach our dedicated support and institutional teams directly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {CONTACT_CHANNELS.map((ch) => {
          const Icon = CHANNEL_ICONS[ch.id] || Mail;
          const colorClass = CHANNEL_COLORS[ch.color] || CHANNEL_COLORS.blue;
          return (
            <div key={ch.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
              <div className={`p-2.5 rounded-lg border shrink-0 ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-900">{ch.title}</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-slate-100 text-slate-600">
                    {ch.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{ch.subtitle}</p>
                {ch.href ? (
                  <a
                    href={ch.href}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors mt-1 inline-block"
                  >
                    {ch.contact}
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-slate-800 mt-1 inline-block">
                    {ch.contact}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Highlights */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white space-y-2 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>{PRIORITY_NOTICE.title}</span>
        </div>
        <p className="text-[11px] text-blue-100 leading-relaxed">
          {PRIORITY_NOTICE.description}
        </p>
        <div className="pt-1 flex flex-wrap gap-2 text-[10px] text-cyan-200">
          {PRIORITY_NOTICE.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-cyan-400" /> {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoPanel;
