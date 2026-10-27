import React from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { useCareerChat } from '../../context/CareerChatContext';

export const ChatSidebarHistory = ({ onCloseMobile }) => {
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
    <div className="w-full h-full bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 p-3 sm:p-4 select-none">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white tracking-tight">Chat History</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 font-semibold">
          {sessions?.length || 0}
        </span>
      </div>

      <div className="pt-3 pb-2">
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
      </div>

      <div className="flex-1 flex flex-col min-h-0 pt-2">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
          Conversations
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto no-scrollbar pr-1">
          {(sessions || []).map((session) => {
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
  );
};

export default ChatSidebarHistory;
