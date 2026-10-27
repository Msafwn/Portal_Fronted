import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { useDashboard } from './DashboardContext';

export const DashboardRecentApplications = ({ className = '' }) => {
  const { recentApplications, nextInterview } = useDashboard();

  return (
    <div className={`bg-white rounded-2xl 2xl:rounded-3xl border border-slate-200 p-6 2xl:p-9 3xl:p-10 space-y-4 2xl:space-y-6 shadow-xs ${className}`}>
      {/* Upcoming Interview Scheduled Card */}
      {nextInterview && (
        <div className="p-4 sm:p-5 2xl:p-6 rounded-xl 2xl:rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 2xl:p-3 rounded-lg 2xl:rounded-xl bg-purple-600 text-white shrink-0 mt-0.5">
              <Calendar className="w-5 h-5 2xl:w-6 2xl:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] 2xl:text-xs font-black uppercase tracking-wider bg-purple-200/90 text-purple-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-700" />
                  Upcoming Interview Scheduled
                </span>
                <span className="text-xs text-purple-700 font-semibold">{nextInterview.mode || 'Online'}</span>
              </div>
              <h4 className="text-sm 2xl:text-lg font-bold text-slate-900 mt-1">
                {nextInterview.jobTitle} at {nextInterview.company}
              </h4>
              <p className="text-xs 2xl:text-base text-slate-600 mt-0.5">
                📅 Date: <strong>{nextInterview.date}</strong> • ⏰ Time: <strong>{nextInterview.time || '10:00 AM'}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            {nextInterview.meetingLink && (
              <a
                href={nextInterview.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 2xl:px-4 py-1.5 2xl:py-2 rounded-lg 2xl:rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs 2xl:text-sm font-bold shadow-xs transition-colors"
              >
                Join Meeting
              </a>
            )}
            <Link
              to="/interview-prep"
              className="px-3.5 2xl:px-4 py-1.5 2xl:py-2 rounded-lg 2xl:rounded-xl bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs 2xl:text-sm font-bold transition-colors inline-flex items-center gap-1"
            >
              <span>AI Prep</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-slate-100 pb-3 2xl:pb-4">
        <div>
          <h2 className="text-sm 2xl:text-lg 3xl:text-xl font-bold uppercase tracking-wider text-slate-800">
            Recent Application Status
          </h2>
          <p className="text-xs 2xl:text-base 3xl:text-lg text-slate-500 mt-0.5">
            Live updates on applications submitted across recruiters.
          </p>
        </div>
        <Link
          to="/applications"
          className="text-xs 2xl:text-base 3xl:text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
        >
          <span>View All Applications</span>
          <ArrowRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {!recentApplications || recentApplications.length === 0 ? (
          <div className="py-6 text-center text-slate-500 text-xs 2xl:text-base">
            No applications submitted yet. Browse recommended roles below to apply!
          </div>
        ) : (
          recentApplications.map((app) => (
            <div key={app.id || app.applicationId} className="py-3 2xl:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 2xl:gap-3">
                  <h3 className="text-sm 2xl:text-lg font-bold text-slate-900">{app.jobTitle}</h3>
                  <span className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-[10px] 2xl:text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {app.matchScore || app.matchPercentage || 80}% Match
                  </span>
                </div>
                <p className="text-xs 2xl:text-base text-slate-500 mt-0.5">
                  {app.company} • Applied on {app.appliedDate}
                </p>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 2xl:px-4 py-1 2xl:py-1.5 rounded-full text-xs 2xl:text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                  {app.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardRecentApplications;
