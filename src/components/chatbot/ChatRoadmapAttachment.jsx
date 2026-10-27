import React from 'react';
import { Compass, CheckCircle2, Clock, Code2, FolderGit2 } from 'lucide-react';

export const ChatRoadmapAttachment = ({ roadmap }) => {
  if (!roadmap) return null;

  return (
    <div className="mt-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-3.5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              {roadmap.title}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Target: <span className="text-indigo-600 font-semibold">{roadmap.targetRole}</span> • Estimated Duration: {roadmap.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Milestones */}
      <div className="space-y-3">
        {roadmap.milestones?.map((milestone, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                {milestone.phase}
              </span>
              <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                {milestone.duration}
              </span>
            </div>

            {/* Topics checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
              {milestone.topics?.map((topic, tIdx) => (
                <div key={tIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>

            {/* Capstone project */}
            {milestone.project && (
              <div className="mt-1 pt-1.5 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500">
                <FolderGit2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-700">Hands-on Deliverable:</strong> {milestone.project}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoadmapAttachment;
