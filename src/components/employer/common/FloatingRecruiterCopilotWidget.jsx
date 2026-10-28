import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Lock,
  FileText,
  Mail,
  RefreshCw,
  Minus,
} from 'lucide-react';
import { useEmployerPortal } from '../../../context/EmployerPortalContext';

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const FloatingRecruiterCopilotWidget = () => {
  const { company, recruiter, kpiStats, jobs = [], applicants = [], sidebarOpen } = useEmployerPortal() || {};
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      time: getCurrentTime(),
      text: `Hello ${recruiter?.name || 'Recruiter'}! I am your Autonomous Recruiter AI for ${company?.name || 'your organization'}. I actively track your applicants, screen for top skill matches, and monitor your private seats quota. How can I assist your hiring pipeline today?`,
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isThinking]);

  const quickPrompts = [
    {
      id: 'quota',
      icon: Lock,
      label: 'Check Seats Quota',
      query: 'Check our current private seats quota and vacancy status.',
    },
    {
      id: 'shortlist',
      icon: Sparkles,
      label: 'Shortlist Top Candidates',
      query: 'Shortlist the top AI match candidates for active jobs.',
    },
    {
      id: 'draft',
      icon: FileText,
      label: 'Draft Job Description',
      query: 'Draft a quick job description for a Junior Full-Stack Intern.',
    },
    {
      id: 'invites',
      icon: Mail,
      label: 'Draft Interview Invites',
      query: 'Generate a professional interview invitation email template.',
    },
  ];

  const handleSendQuery = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || isThinking) return;

    const userMessage = {
      id: `usr-${messages.length + 1}`,
      sender: 'user',
      time: getCurrentTime(),
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    const AI_AGENT_URL = import.meta.env.VITE_AI_AGENT_WEBHOOK_URL || '/webhook/career-agent';

    try {
      const response = await axios.post(
        AI_AGENT_URL,
        {
          sessionId: 'recruiter-session-mustafa',
          message: `[RECRUITER MODE] ${query}`,
          role: 'recruiter',
        },
        {
          timeout: 35000,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data) {
        const data = response.data;
        const aiReply = data.output || data.text || data.reply || 'Analysis completed.';
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${messages.length + 2}`,
            sender: 'ai',
            time: getCurrentTime(),
            text: aiReply,
          },
        ]);
        setIsThinking(false);
        return;
      }
    } catch (err) {
      console.warn('[RecruiterCopilot] Live agent failed, using intelligent simulation:', err.message);
    }

    setTimeout(() => {
      let aiReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('seat') || lower.includes('quota')) {
        const total = kpiStats?.totalSeats || 0;
        const filled = kpiStats?.filledSeats || 0;
        const open = kpiStats?.openVacancies || 0;
        const util = kpiStats?.utilizationPct || 0;
        aiReply = `🔒 **Internal HR Seats Quota Report (${company?.name || 'Company'}):**\n\n• **Total Allocated Quota:** ${total} Seats\n• **Filled / Onboarded:** ${filled} Seats (${util}% Capacity)\n• **Remaining Openings:** ${open} Open Vacancies\n\n*(Note: Quota metrics are private and visible only to authorized recruitment administrators.)*`;
      } else if (lower.includes('shortlist') || lower.includes('candidate') || lower.includes('top')) {
        if (applicants.length > 0) {
          const topApps = [...applicants].sort((a, b) => (b.matchScore || b.matchPercentage || 0) - (a.matchScore || a.matchPercentage || 0)).slice(0, 3);
          const lines = topApps.map((a, i) => `${i + 1}. **${a.name} (${a.matchScore || a.matchPercentage || 80}% AI Match)** — ${a.jobTitle || 'Applied Role'}\n   • Department: ${a.department || 'General'}\n   • Status: ${a.status || 'Pending Review'}`);
          aiReply = `✨ **Top High-Match Applicants in Pipeline:**\n\n${lines.join('\n\n')}`;
        } else {
          aiReply = `Currently there are no applicants submitted for your vacancies yet. Once candidates apply, the 50-30-20 AI matching engine will rank them here automatically.`;
        }
      } else if (lower.includes('job description') || lower.includes('draft')) {
        aiReply = `✍️ **Drafted Job Specification:**\n\n**Company:** ${company?.name || 'Organization'}\n**Title:** Junior Full-Stack Developer\n**Target Role:** 🎓 Student / Intern / Graduate\n**Core Skills:** React.js, Node.js, MongoDB\n\n**Key Responsibilities:**\n• Build responsive user interfaces and clean components.\n• Integrate REST APIs and database models.\n• Participate in team agile sprints.\n\n*You can post this directly using the Post Job page.*`;
      } else if (lower.includes('interview') || lower.includes('invite')) {
        aiReply = `✉️ **Candidate Interview Invite Template:**\n\n**Subject:** Interview Invitation with ${company?.name || 'Our Team'}\n\n*"Dear [Candidate Name],\n\nCongratulations! Based on your strong AI compatibility score and application credentials, we would like to invite you to an interview for the [Job Title] position at ${company?.name || 'our company'}.\n\nPlease let us know your availability: [Scheduling Link]. We look forward to connecting with you!"*\n\n*— ${recruiter?.name || 'Talent Acquisition Team'}, ${company?.name || 'Company'}*`;
      } else if (lower === 'h' || lower === 'hi' || lower === 'hello' || lower === 'salam' || lower === 'hey' || lower.includes('salam')) {
        aiReply = `Walaikum Assalam! 🌸 Welcome to **${company?.name || 'Company'} Recruiter Copilot**.

Main aapki hiring team ka autonomous AI copilot hoon. Main aapki kya madad kar sakta hoon?

1. 📊 **Live Seats Quota Report** (Remaining seats & active openings check karein)
2. 👥 **Candidate Shortlisting** (Top high-match applicants filter karein)
3. ✉️ **Interview Invite Drafts** (Shortlisted candidates ke liye invite emails generate karein)
4. 📝 **Job Description Builder** (Nayi vacancy ke liye requirements formulate karein)

Bataiye, kis kaam se shuru karein?`;
      } else {
        const activeJobs = jobs.filter((j) => j.status === 'Active' || j.status === 'Open').length;
        const highMatches = applicants.filter((a) => (a.matchScore || a.matchPercentage || 0) >= 80).length;
        aiReply = `Currently, you have **${activeJobs} active vacancies** with **${applicants.length} total candidates**. ${highMatches} candidates meet our high-compatibility threshold (≥80%). You can review all profiles in the **Applicants Desk**.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${messages.length + 2}`,
          sender: 'ai',
          time: getCurrentTime(),
          text: aiReply,
        },
      ]);
      setIsThinking(false);
    }, 800);
  };

  if (sidebarOpen) return null;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-30 pointer-events-auto max-w-[calc(100vw-1.5rem)]">
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 xs:gap-2.5 px-3.5 py-2.5 xs:px-4 xs:py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white font-semibold text-xs shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span>Recruiter AI</span>
          <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] font-bold">HR</span>
        </button>
      )}

      {isOpen && (
        <div className="w-[calc(100vw-1.5rem)] sm:w-[94vw] max-w-[420px] h-[480px] xs:h-[500px] max-h-[calc(100vh-5rem)] bg-white border border-slate-200/90 rounded-2xl shadow-2xl shadow-indigo-950/25 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="px-4 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0 border-b border-indigo-900/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shadow-xs">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white leading-none">Smart Recruiter AI</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 leading-none">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-none">
                  {company?.name || 'Company'} Talent Engine • Quota Watchdog
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Minimize AI Assistant"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close AI Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {quickPrompts.map((p) => {
              const IconComp = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSendQuery(p.query)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/90 shadow-2xs transition-colors cursor-pointer"
                >
                  <IconComp className="w-3 h-3 text-indigo-600" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 min-h-0 p-4 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs whitespace-pre-line'
                  }`}
                >
                  {m.text}
                  <span
                    className={`block text-[9px] mt-1.5 ${
                      m.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                <span>Recruiter AI is analyzing pipeline data...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about applicants, seats quota, or job drafting..."
              className="flex-1 bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isThinking}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-colors cursor-pointer shadow-xs"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingRecruiterCopilotWidget;
