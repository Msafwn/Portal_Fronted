import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Trash2, Sparkles, CornerDownLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCareerChat } from '../../context/CareerChatContext';
import { ChatSuggestionChips } from './ChatSuggestionChips';

export const ChatInputBar = () => {
  const { sendMessage, isThinking, clearCurrentChat } = useCareerChat();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  // Cleanup speech recognition on unmount to prevent audio leaks
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const handleSend = () => {
    if (!inputText.trim() || isThinking) return;
    sendMessage(inputText);
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectPrompt = (prompt) => {
    setInputText(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Voice Dictation with useRef management
  const handleToggleVoice = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      toast.success('Voice dictation ended.');
      return;
    }

    // Check if Web Speech API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
          toast('Listening... Speak now 🎙️', { icon: '🎙️' });
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          toast.error('Voice input not recognized. Please type manually.');
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (e) {
        // Fallback
      }
    }

    // Friendly fallback
    toast('Voice input simulation: "Recommend top software engineer vacancies for me"', { icon: '🎙️' });
    setInputText('Recommend top software engineer vacancies for me');
  };

  return (
    <div className="bg-white border-t border-slate-200/90 p-3 sm:p-4 rounded-b-2xl shadow-2xs space-y-2.5">
      {/* Quick Prompts Carousel */}
      <ChatSuggestionChips onSelectPrompt={handleSelectPrompt} disabled={isThinking} />

      {/* Input Form Box */}
      <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200/90 rounded-2xl p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 focus-within:bg-white transition-all">
        {/* Reset Chat Button */}
        <button
          type="button"
          onClick={clearCurrentChat}
          className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          title="Reset current conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about career roadmap, jobs, resume review, or interview questions..."
          className="w-full py-1.5 px-2 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none resize-none leading-relaxed max-h-28 overflow-y-auto no-scrollbar font-normal"
        />

        {/* Voice Dictation Button */}
        <button
          type="button"
          onClick={handleToggleVoice}
          className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
            isListening
              ? 'bg-rose-100 text-rose-600 animate-pulse'
              : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
          }`}
          title={isListening ? 'Stop listening' : 'Voice input'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Send Action */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputText.trim() || isThinking}
          className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none active:scale-95 shrink-0"
          title="Send message (Enter)"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200">Shift+Enter</kbd> for newline</span>
        <span className="flex items-center gap-1 font-semibold text-slate-500">
          <Sparkles className="w-3 h-3 text-blue-500" />
          Smart Career AI Engine
        </span>
      </div>
    </div>
  );
};

export default ChatInputBar;
