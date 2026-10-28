import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useOptimistic } from 'react';
import toast from 'react-hot-toast';
import { generateCareerAiResponse } from '../services/careerAiService';
import { axiosPrivate } from '../services/apiClient';
import { useCandidatePortal } from './CandidatePortalContext';

const CareerChatContext = createContext(null);

const INITIAL_WELCOME_MESSAGE = {
  id: 'msg-welcome',
  sender: 'ai',
  text: `👋 Assalam-o-Alaikum! Welcome to your **Smart Career AI Advisor**.\n\nI am your personalized career counselor trained to help you discover the highest-matching vacancies, analyze skill gaps, and prepare for technical interviews.\n\nHow can I help you accelerate your career today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  attachments: null,
};

const DEFAULT_SESSION = {
  id: 'session-default',
  title: 'Career Exploration',
  createdAt: new Date().toISOString(),
  messages: [INITIAL_WELCOME_MESSAGE],
};

export const CareerChatProvider = ({ children }) => {
  const candidateData = useCandidatePortal() || {};

  const {
    activePersona = {},
    candidateSkills = ['React', 'Node.js', 'Python', 'Tailwind CSS'],
    candidateRole = 'fresh_graduate',
    profile = {},
  } = candidateData;

  // In-memory chat sessions initialized with default
  const [sessions, setSessions] = useState([DEFAULT_SESSION]);
  const [activeSessionId, setActiveSessionId] = useState(DEFAULT_SESSION.id);
  const [isThinking, setIsThinking] = useState(false);
  const [typingStatus, setTypingStatus] = useState('');

  // Load chat sessions from MongoDB on initial mount
  useEffect(() => {
    let isMounted = true;
    const fetchSavedChats = async () => {
      try {
        const response = await axiosPrivate.get('/chat/sessions');
        const dbSessions = response.data?.data;
        if (isMounted && Array.isArray(dbSessions) && dbSessions.length > 0) {
          const formatted = dbSessions.map((item) => ({
            id: item.sessionId,
            title: item.title || 'Career Advisory Chat',
            messages: item.messages?.length > 0 ? item.messages : [INITIAL_WELCOME_MESSAGE],
            createdAt: item.createdAt || new Date().toISOString(),
            updatedAt: item.updatedAt,
          }));
          setSessions(formatted);
          setActiveSessionId(formatted[0].id);
        }
      } catch (err) {
        // Not logged in or network issue; use local default silently
      }
    };

    fetchSavedChats();
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to persist session to MongoDB
  const persistSessionToDb = useCallback(async (sessionToSave) => {
    if (!sessionToSave || !sessionToSave.id) return;
    try {
      await axiosPrivate.post('/chat/save', {
        sessionId: sessionToSave.id,
        title: sessionToSave.title,
        messages: sessionToSave.messages,
      });
    } catch (e) {
      console.warn('Failed to persist chat session to database:', e);
    }
  }, []);

  // Current active session
  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0] || DEFAULT_SESSION;
  const messages = currentSession?.messages || [INITIAL_WELCOME_MESSAGE];

  // React 19: useOptimistic for instant chat bubble display
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    (state, newMsg) => [...state, newMsg]
  );

  // Send a new message with useCallback & useOptimistic
  const sendMessage = useCallback(async (text) => {
    if (!text || !text.trim() || isThinking) return;

    const trimmed = text.trim();
    const userMsgId = `msg-user-${Date.now()}`;
    const userMessage = {
      id: userMsgId,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Instant optimistic render of the user message bubble
    setOptimisticMessages(userMessage);

    // Append user message to state
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          const isFirstUserMsg = s.messages.filter((m) => m.sender === 'user').length === 0;
          const newTitle = isFirstUserMsg
            ? trimmed.slice(0, 28) + (trimmed.length > 28 ? '...' : '')
            : s.title;

          return {
            ...s,
            title: newTitle,
            updatedAt: new Date().toISOString(),
            messages: [...s.messages, userMessage],
          };
        }
        return s;
      })
    );

    // AI thinking indicators
    setIsThinking(true);
    setTypingStatus('AI Advisor is evaluating your skills & vacancies...');

    try {
      let aiMessage = null;

      // 1. Call Live Express Backend AI endpoint
      try {
        const response = await axiosPrivate.post('/chat/message', {
          sessionId: activeSessionId,
          message: trimmed,
        });

        if (response.data?.data?.message) {
          aiMessage = response.data.data.message;
        }
      } catch (backendErr) {
        console.warn('Backend chat API offline, switching to built-in AI:', backendErr.message);
      }

      // 2. Fallback to client-side Career AI engine if backend unreachable
      if (!aiMessage) {
        const [aiResult] = await Promise.all([
          generateCareerAiResponse({
            userMessage: trimmed,
            candidateProfile: {
              name: profile?.name || 'Candidate',
              title: profile?.headline || profile?.role || 'Job Seeker',
              skills: candidateSkills,
              role: candidateRole,
              department: profile?.department || '',
            },
            availableJobs: candidateData.allJobs || candidateData.jobs || [],
            conversationHistory: messages,
          }),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);

        aiMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: aiResult.text,
          attachments: aiResult.attachments,
          source: aiResult.source,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSessionId) {
            const updated = {
              ...s,
              updatedAt: new Date().toISOString(),
              messages: [...s.messages, aiMessage],
            };
            persistSessionToDb(updated);
            return updated;
          }
          return s;
        })
      );
    } catch (err) {
      toast.error('AI response failed. Please try again.');
    } finally {
      setIsThinking(false);
      setTypingStatus('');
    }
  }, [
    isThinking,
    activeSessionId,
    setOptimisticMessages,
    profile,
    activePersona,
    candidateSkills,
    candidateRole,
    messages,
    persistSessionToDb,
  ]);

  // Create a brand new session with useCallback
  const createNewSession = useCallback(() => {
    const newSession = {
      id: `session-${Date.now()}`,
      title: 'New Advisory Chat',
      createdAt: new Date().toISOString(),
      messages: [INITIAL_WELCOME_MESSAGE],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    persistSessionToDb(newSession);
    toast.success('Started a fresh career advisory conversation! ✨');
  }, [persistSessionToDb]);

  // Delete a session with useCallback
  const deleteSession = useCallback((sessionId) => {
    // Delete from MongoDB
    try {
      axiosPrivate.delete(`/chat/session/${sessionId}`);
    } catch (err) {
      console.warn('Could not delete chat session from database:', err);
    }

    if (sessions.length <= 1) {
      // Reset the single session instead of deleting
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSessionId) {
            const reset = {
              ...s,
              messages: [INITIAL_WELCOME_MESSAGE],
            };
            persistSessionToDb(reset);
            return reset;
          }
          return s;
        })
      );
      toast.success('Conversation reset.');
      return;
    }

    setSessions((prev) => {
      const remaining = prev.filter((s) => s.id !== sessionId);
      if (activeSessionId === sessionId) {
        setActiveSessionId(remaining[0]?.id || DEFAULT_SESSION.id);
      }
      return remaining;
    });
    toast.success('Chat history thread removed.');
  }, [sessions.length, activeSessionId, persistSessionToDb]);

  // Clear current active chat messages with useCallback
  const clearCurrentChat = useCallback(() => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          const reset = {
            ...s,
            messages: [INITIAL_WELCOME_MESSAGE],
          };
          persistSessionToDb(reset);
          return reset;
        }
        return s;
      })
    );
    toast.success('Conversation reset.');
  }, [activeSessionId, persistSessionToDb]);

  const contextValue = useMemo(() => ({
    sessions,
    activeSessionId,
    currentSession,
    messages: optimisticMessages,
    isThinking,
    typingStatus,
    sendMessage,
    createNewSession,
    selectSession: setActiveSessionId,
    deleteSession,
    clearCurrentChat,
  }), [
    sessions,
    activeSessionId,
    currentSession,
    optimisticMessages,
    isThinking,
    typingStatus,
    sendMessage,
    createNewSession,
    deleteSession,
    clearCurrentChat,
  ]);

  return (
    <CareerChatContext.Provider value={contextValue}>
      {children}
    </CareerChatContext.Provider>
  );
};

export const useCareerChat = () => {
  const context = useContext(CareerChatContext);
  if (!context) {
    throw new Error('useCareerChat must be used within a CareerChatProvider');
  }
  return context;
};

export default CareerChatContext;
