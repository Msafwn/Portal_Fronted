import React from 'react';
import { Plus, MessageSquare, Trash2, Sparkles, FolderCode, Cpu, PanelLeftClose } from 'lucide-react';
import { useCareerChat } from '../../context/CareerChatContext';

export const ChatSidebarHistory = ({ onCloseMobile, onCollapse }) => {
  const {
    sessions,
    activeSessionId,
    selectSession,
    createNewSession,
    deleteSession,
  } = useCareerChat();

  const handleSelect = (id) => {
    selectSession(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <div className="w-full h-full bg-slate-900 text-slate-100 flex flex-col justify-between border-r border-slate-800 p-3 sm:p-4 select-none">
      <div className="space-y-3.5">
        {/* Header with Title & Optional Collapse Button */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-white tracking-tight">Chat History</span>
          </div>
          {onCollapse && (
            <button
              type="button"
              onClick={onCollapse}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 cursor-pointer hidden lg:block transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* New Chat Button */}
        <button
          type="button"
          onClick={() => {
            createNewSession();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Advisory Chat</span>
        </button>

        {/* Sessions List */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
            <span>Conversations</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
              {sessions.length}
            </span>
          </div>

          <div className="space-y-1 max-h-[calc(100vh-320px)] overflow-y-auto no-scrollbar pr-1">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <div
                  key={session.id}
                  onClick={() => handleSelect(session.id)}
                  className={`flex items-center justify-between group p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-1">
                    <MessageSquare
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                    <span className="truncate">{session.title || 'Advisory Chat'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 rounded transition-opacity cursor-pointer shrink-0"
                    title="Delete thread"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Career Coach Status Card */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-bold text-slate-200">AI Career Coach</span>
            </div>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Your 24/7 personal career counselor for resumes, mock interviews & role matching.
          </p>

          <div className="pt-1.5 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
            <span>Powered by <strong className="text-purple-300">Smart AI</strong></span>
            <span className="text-emerald-400 font-medium">Free & Personalized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebarHistory;
