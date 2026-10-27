import React from 'react';
import { useSupport } from './SupportContext';

export const SupportTicketList = ({ className = '' }) => {
  const { tickets } = useSupport();

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Your Support Tickets</h3>
          <span className="text-[11px] text-slate-400">Live ticket tracker</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          {tickets.length} Total
        </span>
      </div>

      <div className="space-y-3">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono font-bold text-blue-600">
                {t.id}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.statusColor}`}
              >
                {t.status}
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">
              {t.subject}
            </h4>
            <p className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-100 leading-relaxed">
              {t.response}
            </p>
            <span className="text-[10px] text-slate-400 block">{t.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportTicketList;
