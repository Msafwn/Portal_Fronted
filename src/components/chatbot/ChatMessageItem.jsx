import React, { useState } from 'react';
import { Bot, User, Copy, Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { ChatJobAttachment } from './ChatJobAttachment';
import { ChatRoadmapAttachment } from './ChatRoadmapAttachment';

export const ChatMessageItem = React.memo(({ message }) => {
  const [copied, setCopied] = useState(false);
  const isAi = message.sender === 'ai';

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(message.text || '');
    setCopied(true);
    toast.success('Message copied to clipboard! 📋');
    setTimeout(() => setCopied(false), 2000);
  }, [message.text]);

  // Simple Markdown & Formatter renderer
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;

    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Bold text formatting **word**
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div
            key={idx}
            className="flex items-start gap-2 my-1 text-slate-700 leading-relaxed pl-1"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }

      // Empty line / paragraph break
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p
          key={idx}
          className="my-0.5 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <div className={`flex gap-3 my-4 group ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
          isAi
            ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-500/20'
            : 'bg-slate-800 text-slate-100'
        }`}
      >
        {isAi ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>

      {/* Message Body */}
      <div
        className={`max-w-[85%] sm:max-w-[78%] min-w-0 rounded-2xl p-4 shadow-2xs transition-all relative ${
          isAi
            ? 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-sm'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-blue-600/10'
        }`}
      >
        {/* Header row for AI */}
        {isAi && (
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900">Smart Career AI</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-blue-600" />
                Advisor
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-slate-100 cursor-pointer"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}

        {/* Text Content */}
        <div className={`text-xs sm:text-[13px] break-words ${isAi ? 'text-slate-700' : 'text-blue-50'}`}>
          {renderFormattedText(message.text)}
        </div>

        {/* Attachments if any */}
        {message.attachments?.type === 'jobs' && (
          <ChatJobAttachment jobs={message.attachments.data} />
        )}
        {message.attachments?.type === 'roadmap' && (
          <ChatRoadmapAttachment roadmap={message.attachments.data} />
        )}

        {/* Timestamp */}
        <div
          className={`text-[10px] mt-2 font-medium flex items-center gap-2 ${
            isAi ? 'text-slate-400' : 'text-blue-200 justify-end'
          }`}
        >
          <span>{message.timestamp}</span>
          {isAi && message.source && (
            <span className="text-[9.5px] uppercase tracking-wider text-slate-400">
              • {message.source === 'python_backend' ? 'Python API' : 'Neural Rule'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default ChatMessageItem;
