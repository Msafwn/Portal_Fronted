import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useCareerChat } from '../../context/CareerChatContext';
import { useCandidatePortal } from '../../context/CandidatePortalContext';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatInputBar } from './ChatInputBar';
import { ChatSidebarHistory } from './ChatSidebarHistory';

export const CareerChatView = () => {
  const { messages, isThinking } = useCareerChat();
  const { activePersona, setSidebarOpen } = useCandidatePortal() || {};
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  return (
    <div className="h-full w-full min-w-0 bg-white overflow-hidden flex flex-row relative">
      {/* Desktop Chat History Sidebar */}
      <div
        className={`hidden lg:block h-full shrink-0 transition-[width,opacity] duration-300 ease-in-out overflow-hidden ${
          desktopSidebarOpen ? 'w-64 xl:w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-64 xl:w-72 h-full">
          <ChatSidebarHistory />
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-xs flex">
          <div className="w-72 max-w-[85vw] h-full bg-slate-900 animate-in slide-in-from-left duration-200 shadow-2xl flex flex-col">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white">Chat History</span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatSidebarHistory onCloseMobile={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      {/* Main Conversation Stream */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-slate-50/50">
        {/* Header */}
        <div className="p-3 sm:p-4 2xl:p-5 bg-white border-b border-slate-200/90 shrink-0 min-w-0">
          <div className="max-w-5xl 2xl:max-w-6xl 4k:max-w-7xl mx-auto flex items-center justify-between gap-2.5 w-full">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Single toggle button for sidebar */}
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                    setDesktopSidebarOpen(!desktopSidebarOpen);
                  } else {
                    setMobileSidebarOpen(true);
                  }
                }}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer shrink-0"
                title={desktopSidebarOpen ? 'Collapse chat history' : 'Open chat history'}
              >
                {desktopSidebarOpen ? (
                  <PanelLeftClose className="w-4 h-4 hidden lg:block text-slate-700" />
                ) : (
                  <PanelLeftOpen className="w-4 h-4 hidden lg:block text-slate-700" />
                )}
                <Menu className="w-4 h-4 lg:hidden text-slate-700" />
              </button>

              <div className="w-9 h-9 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <h2 className="text-xs sm:text-sm md:text-base 2xl:text-lg font-black text-slate-900 tracking-tight truncate">
                    Smart Career AI Advisor
                  </h2>
                  <span className="text-[10px] 2xl:text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] 2xl:text-xs text-slate-500 font-medium truncate">
                  {activePersona?.title || 'Personalized Career Counselor'} • Tailored to your profile skills
                </p>
              </div>
            </div>

            
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 2xl:p-8 space-y-2">
          <div className="max-w-5xl 2xl:max-w-6xl 4k:max-w-7xl mx-auto space-y-3">
            {messages.map((message) => (
              <ChatMessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <div className="shrink-0 p-3 sm:p-4 2xl:p-6 bg-white border-t border-slate-200/90">
          <div className="max-w-5xl 2xl:max-w-6xl 4k:max-w-7xl mx-auto">
            <ChatInputBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerChatView;
