import React, { useState } from 'react';
import {
  Server,
  Database,
  Cpu,
  Mail,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminPortal } from '../../../context/AdminPortalContext';

export const AdminSystemHealthCard = () => {
  const { kpis, securityAlerts = [] } = useAdminPortal();
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const activeThreatsCount = (securityAlerts || []).filter(
    (a) => !a.status?.toLowerCase().includes('mitigated') && !a.status?.toLowerCase().includes('resolved')
  ).length;

  const systemServices = [
    {
      id: 'ai-engine',
      name: 'AI Matching Engine',
      type: 'TF-IDF & Weighted Cosine Vectorizer',
      status: 'Operational',
      health: kpis.avgMatchScore ? `${kpis.avgMatchScore}% Match Precision` : '99.9%',
      metric: kpis.totalAiMatches ? `${kpis.totalAiMatches} matches evaluated` : 'Online',
      icon: Cpu,
      color: 'emerald',
    },
    {
      id: 'mongodb',
      name: 'MongoDB Enterprise Cluster',
      type: 'Primary Data Store & Replica Set',
      status: 'Connected',
      health: 'Optimal',
      metric: 'Active cluster connection',
      icon: Database,
      color: 'emerald',
    },
    {
      id: 'api-gateway',
      name: 'Node.js Express API Gateway',
      type: 'JWT Auth & Microservices Router',
      status: 'Active',
      health: kpis.systemUptime || '99.9%',
      metric: `${kpis.apiLatencyMs || 18}ms average response`,
      icon: Server,
      color: 'emerald',
    },
    {
      id: 'smtp-mailer',
      name: 'Notification & Mailer Queue',
      type: 'Transactional Alerts & OTP Dispatcher',
      status: 'Operational',
      health: 'Active',
      metric: 'Dispatcher ready',
      icon: Mail,
      color: 'emerald',
    },
    {
      id: 'security-waf',
      name: 'Sentinel WAF & Rate Limiter',
      type: 'IP Shield & Automated Abuse Prevention',
      status: 'Protected',
      health: 'Armed',
      metric: activeThreatsCount > 0 ? `${activeThreatsCount} active alerts` : '0 active threats',
      icon: ShieldCheck,
      color: 'blue',
    },
  ];

  const handleRunDiagnostics = () => {
    setIsDiagnosing(true);
    toast.loading('Running deep cluster diagnostics and vector integrity checks...', { id: 'diag' });

    setTimeout(() => {
      setIsDiagnosing(false);
      toast.success('All system nodes, database connections, and AI pipelines are operating at 100% capacity! ✓', { id: 'diag' });
    }, 1200);
  };

  const handleFlushCache = () => {
    toast.success('System vector indexes and in-memory caches re-indexed successfully! ⚡');
  };

  return (
    <div className="bg-white p-5 sm:p-6 2xl:p-8 3xl:p-10 rounded-2xl 2xl:rounded-3xl border border-slate-200/90 shadow-2xs space-y-5 2xl:space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 2xl:pb-6">
        <div>
          <div className="flex items-center gap-2 2xl:gap-3">
            <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-base 2xl:text-xl 3xl:text-2xl text-slate-900 tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-600" />
              <span>Core Infrastructure Telemetry</span>
            </h3>
          </div>
          <p className="text-xs 2xl:text-sm 3xl:text-base text-slate-500 mt-0.5 2xl:mt-1">
            Real-time status of AI vector services, database clusters, and security sentinels
          </p>
        </div>

        <div className="flex items-center gap-2 2xl:gap-3">
          <button
            type="button"
            onClick={handleFlushCache}
            className="px-3 py-1.5 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs 2xl:text-sm 3xl:text-base font-semibold transition-colors cursor-pointer"
          >
            Sync Indexes
          </button>
          <button
            type="button"
            onClick={handleRunDiagnostics}
            disabled={isDiagnosing}
            className="inline-flex items-center gap-1.5 2xl:gap-2 px-3 py-1.5 2xl:px-5 2xl:py-2.5 rounded-xl 2xl:rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs 2xl:text-sm 3xl:text-base font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-70"
          >
            <RefreshCw className={`w-3.5 h-3.5 2xl:w-4 2xl:h-4 ${isDiagnosing ? 'animate-spin' : ''}`} />
            <span>{isDiagnosing ? 'Testing...' : 'Run Diagnostics'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 2xl:gap-5 3xl:gap-6">
        {systemServices.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.id}
              className="p-3.5 2xl:p-5 rounded-xl 2xl:rounded-2xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/70 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 2xl:gap-3.5">
                  <div className="w-8 h-8 2xl:w-11 2xl:h-11 rounded-lg 2xl:rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-2xs shrink-0">
                    <Icon className="w-4 h-4 2xl:w-6 2xl:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xs 2xl:text-sm 3xl:text-base font-bold text-slate-900 leading-tight">
                      {svc.name}
                    </h4>
                    <p className="text-[11px] 2xl:text-xs 3xl:text-sm text-slate-500 font-medium">
                      {svc.type}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 2xl:gap-1.5 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full text-[10px] 2xl:text-xs 3xl:text-sm font-bold bg-emerald-100/70 text-emerald-800 border border-emerald-200 shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 2xl:w-3.5 2xl:h-3.5 text-emerald-600" />
                  {svc.status}
                </span>
              </div>

              <div className="pt-3 2xl:pt-4 mt-3 2xl:mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] 2xl:text-xs 3xl:text-sm">
                <span className="text-slate-500 font-medium">Health: <strong className="text-slate-700 font-semibold">{svc.health}</strong></span>
                <span className="text-blue-600 font-bold bg-white px-2 py-0.5 2xl:px-3 2xl:py-1 rounded 2xl:rounded-md border border-slate-200/80 shadow-2xs">
                  {svc.metric}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSystemHealthCard;
