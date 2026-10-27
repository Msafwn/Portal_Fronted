import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bot,
  X,
  Maximize2,
  Send,
  Sparkles,
  MessageSquare,
  Minimize2,
} from 'lucide-react';
import { useCareerChat } from '../../context/CareerChatContext';
import { useCandidatePortal } from '../../context/CandidatePortalContext';
import { ChatMessageItem } from './ChatMessageItem';

export const FloatingCareerChatWidget = () => {
  const { sidebarOpen } = useCandidatePortal() || {};
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const { messages, sendMessage, isThinking } = useCareerChat();
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isThinking]);

  // If mobile drawer is open or already on /career-chat, don't show the floating widget
  if (sidebarOpen || location.pathname === '/career-chat') return null;

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isThinking) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleOpenFullScreen = () => {
    setIsOpen(false);
    navigate('/career-chat');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-2rem)]">
      {/* Floating Widget Modal */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] max-h-[80vh] bg-white border border-slate-200/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white">Career AI Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-slate-400">Online • Ready to assist</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleOpenFullScreen}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/60 transition-colors cursor-pointer"
                title="Expand to full screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/60 transition-colors cursor-pointer"
                title="Minimize chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages feed */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50/60 text-xs">
            {messages.slice(-8).map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} />
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-500">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                </div>
                <span>Analyzing your query...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Input Bar */}
          <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200/80 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about jobs, skills..."
              className="flex-1 py-1.5 px-3 bg-slate-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isThinking}
              className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all cursor-pointer active:scale-95 group"
      >
        <div className="relative">
          <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse border border-slate-900" />
        </div>
        <span>{isOpen ? 'Minimize Chat' : 'Ask AI Advisor'}</span>
      </button>
    </div>
  );
};

export default FloatingCareerChatWidget;
