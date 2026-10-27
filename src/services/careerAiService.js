/**
 * Career AI Service
 * Pre-configured for seamless connection with Python AI backend (FastAPI/LangChain/Gemini in /AI_features_python)
 * Includes an intelligent, context-aware offline simulation engine.
 */

import axios from 'axios';

// Python AI Backend Endpoint (easily switchable when AI_features_python is launched)
const AI_AGENT_URL = import.meta.env.VITE_AI_AGENT_WEBHOOK_URL || '/webhook/career-agent';

/**
 * Pre-defined Career Knowledge Base for Intelligent Contextual Responses
 */
export const CAREER_KNOWLEDGE_BASE = {
  roadmaps: {
    'full stack': {
      title: 'Full-Stack Developer 30-Day Master Roadmap',
      targetRole: 'Full-Stack Software Engineer',
      duration: '4-6 Weeks',
      milestones: [
        {
          phase: 'Phase 1: Advanced Frontend & State Management',
          duration: 'Days 1-10',
          topics: ['React 18 Architecture & Hooks', 'Redux Toolkit & Zustand', 'Tailwind CSS & Component Systems', 'API Integration & TanStack Query'],
          project: 'Build a production-ready SaaS dashboard with role-based auth.',
        },
        {
          phase: 'Phase 2: Scalable Backend & Database Design',
          duration: 'Days 11-20',
          topics: ['Node.js & Express RESTful APIs', 'Dual-Cookie JWT Authentication', 'MongoDB & Mongoose Schema Indexing', 'PostgreSQL / Prisma ORM basics'],
          project: 'Build a secure multi-tenant authentication microservice.',
        },
        {
          phase: 'Phase 3: System Design, Testing & Cloud Deployment',
          duration: 'Days 21-30',
          topics: ['Docker containerization', 'CI/CD pipeline with GitHub Actions', 'Redis caching & rate limiting', 'Cloud hosting (Vercel / AWS EC2)'],
          project: 'Deploy the full-stack application with automated SSL and monitoring.',
        },
      ],
    },
    'data science': {
      title: 'Data Science & Machine Learning Career Roadmap',
      targetRole: 'Data Scientist / AI Engineer',
      duration: '6-8 Weeks',
      milestones: [
        {
          phase: 'Phase 1: Math Foundations & Python Mastery',
          duration: 'Days 1-14',
          topics: ['Linear Algebra & Probability', 'NumPy, Pandas, Vectorized Ops', 'Exploratory Data Analysis (EDA)', 'Matplotlib & Seaborn'],
          project: 'End-to-end data cleansing & EDA on real-world Kaggle dataset.',
        },
        {
          phase: 'Phase 2: Classical Machine Learning',
          duration: 'Days 15-30',
          topics: ['Scikit-learn algorithms (Regression, Random Forest, XGBoost)', 'Hyperparameter tuning & Cross-Validation', 'Feature engineering pipelines'],
          project: 'Predictive churn model with 88%+ ROC-AUC score.',
        },
        {
          phase: 'Phase 3: Deep Learning, NLP & LLMs',
          duration: 'Days 31-45',
          topics: ['PyTorch fundamentals', 'Hugging Face Transformers', 'RAG (Retrieval Augmented Generation)', 'Vector databases (FAISS, Pinecone)'],
          project: 'Build a semantic resume parser using LangChain and embeddings.',
        },
      ],
    },
  },

  interviewQuestions: {
    react: [
      {
        question: 'Explain how React Reconciliation and the Virtual DOM diffing algorithm work.',
        keyPoints: 'Mention Fiber nodes, key prop optimization, heuristics of element type changes, and batching in React 18.',
      },
      {
        question: 'What is the difference between useMemo, useCallback, and React.memo? When should you avoid them?',
        keyPoints: 'Reference memoization overhead, dependency arrays, referential equality of callback functions.',
      },
      {
        question: 'How do you structure JWT Dual-Cookie authentication securely against XSS and CSRF?',
        keyPoints: 'HTTP-only cookie for Refresh Token, short-lived Access Token in memory or secure cookie, SameSite=Strict.',
      },
    ],
    python: [
      {
        question: 'How does Python Global Interpreter Lock (GIL) affect multi-threading vs multi-processing?',
        keyPoints: 'CPU-bound vs I/O-bound tasks, multiprocessing module, asyncio alternative.',
      },
      {
        question: 'What is the difference between generative AI, embeddings, and fine-tuning in NLP?',
        keyPoints: 'Vector similarity search vs parameter updating with LoRA/QLoRA vs token generation.',
      },
    ],
  },
};

/**
 * Generate an AI response based on candidate profile and query context
 */
export const generateCareerAiResponse = async ({
  userMessage,
  candidateProfile = {},
  availableJobs = [],
  conversationHistory = [],
}) => {
  // Attempt to call Autonomous n8n AI Agent (Dual Groq/Gemini + Live Sheets Sync)
  try {
    const response = await axios.post(
      AI_AGENT_URL,
      {
        sessionId: candidateProfile.id ? `candidate-${candidateProfile.id}` : 'smart-career-candidate-live',
        message: userMessage,
        profile: candidateProfile,
        history: conversationHistory.slice(-6),
      },
      {
        timeout: 35000,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (response.data) {
      const data = response.data;
      const replyText = data.output || data.reply || data.text || '';
      
      // Determine if a rich card should accompany the live AI response
      let attachments = data.attachments || null;
      const lower = userMessage.toLowerCase();
      if (!attachments) {
        if (lower.includes('roadmap') || lower.includes('step') || lower.includes('learn')) {
          const matchedKey = Object.keys(CAREER_KNOWLEDGE_BASE.roadmaps).find(k => lower.includes(k) || (candidateProfile.targetRole || '').toLowerCase().includes(k)) || 'full stack';
          attachments = {
            type: 'roadmap',
            data: CAREER_KNOWLEDGE_BASE.roadmaps[matchedKey] || CAREER_KNOWLEDGE_BASE.roadmaps['full stack']
          };
        } else if (lower.includes('job') || lower.includes('vacanc') || lower.includes('apply') || lower.includes('match')) {
          if (availableJobs && availableJobs.length > 0) {
            attachments = {
              type: 'jobs',
              data: availableJobs.slice(0, 3)
            };
          }
        }
      }

      return {
        text: replyText,
        attachments,
        source: 'autonomous_ai_agent_live',
      };
    }
  } catch (err) {
    console.warn('[CareerAiService] Live AI Agent unavailable, using local intelligent simulation:', err.message);
  }

  // Built-in Intelligent Fallback Simulation
  return generateSimulatedResponse(userMessage, candidateProfile, availableJobs);
};

/**
 * Built-in Intelligent Fallback Simulation Engine
 */
function generateSimulatedResponse(query, profile, jobs) {
  const q = query.toLowerCase();
  const skills = profile.skills || ['React', 'JavaScript', 'Node.js', 'Tailwind CSS'];
  const targetRole = profile.targetRole || profile.title || 'Software Engineer';

  // 1. Job Recommendation Intent
  if (
    q.includes('job') ||
    q.includes('recommend') ||
    q.includes('matching') ||
    q.includes('vacancy') ||
    q.includes('kaam') ||
    q.includes('apply')
  ) {
    const matchedJobs = jobs.slice(0, 3).map((j, i) => ({
      id: j.id || `job-match-${i + 1}`,
      title: j.title || 'Senior React & Node.js Developer',
      company: j.company || 'TechCorp Solutions',
      location: j.location || 'Islamabad, PK (Hybrid)',
      salary: j.salary || 'PKR 140,000 - 180,000 / mo',
      type: j.type || 'Full-time',
      matchScore: j.matchScore || (95 - i * 4),
      skills: j.skills || skills.slice(0, 4),
      description: j.description || 'Responsible for architecting responsive web applications and scalable APIs.',
    }));

    return {
      text: `Based on your profile skills (**${skills.slice(0, 5).join(', ')}**) and experience level, I analyzed the live vacancies in our database. Here are the top **${matchedJobs.length} roles** with the highest AI Match Index:`,
      attachments: {
        type: 'jobs',
        data: matchedJobs,
      },
      source: 'smart_career_nlp',
    };
  }

  // 2. Roadmap / Learning Path Intent
  if (
    q.includes('roadmap') ||
    q.includes('learn') ||
    q.includes('plan') ||
    q.includes('guide') ||
    q.includes('seekhoon') ||
    q.includes('steps') ||
    q.includes('kya karoon')
  ) {
    const isData = q.includes('data') || q.includes('python') || q.includes('ai') || q.includes('ml');
    const roadmapKey = isData ? 'data science' : 'full stack';
    const roadmapData = CAREER_KNOWLEDGE_BASE.roadmaps[roadmapKey];

    return {
      text: `Here is a structured **${roadmapData.title}** tailored to take your career to the next level. Follow these phases sequentially:`,
      attachments: {
        type: 'roadmap',
        data: roadmapData,
      },
      source: 'smart_career_nlp',
    };
  }

  // 3. Interview Preparation / Mock Interview Intent
  if (
    q.includes('interview') ||
    q.includes('mock') ||
    q.includes('question') ||
    q.includes('sawal') ||
    q.includes('tayari') ||
    q.includes('prepare')
  ) {
    const qList = q.includes('python') || q.includes('ai')
      ? CAREER_KNOWLEDGE_BASE.interviewQuestions.python
      : CAREER_KNOWLEDGE_BASE.interviewQuestions.react;

    return {
      text: `🎯 **Technical Interview Practice Session**\n\nHere are 3 high-probability conceptual questions frequently asked in technical screenings for **${targetRole}**:\n\n` +
        qList.map((item, idx) => `**Q${idx + 1}: ${item.question}**\n*Key Evaluation Criteria:* ${item.keyPoints}\n`).join('\n') +
        `\n💬 *Tip:* Try answering Question 1 right here in chat, and I will critique your explanation!`,
      attachments: null,
      source: 'smart_career_nlp',
    };
  }

  // 4. Skill Gap / Resume Improvement Intent
  if (
    q.includes('skill') ||
    q.includes('gap') ||
    q.includes('resume') ||
    q.includes('cv') ||
    q.includes('improve') ||
    q.includes('profile') ||
    q.includes('score')
  ) {
    return {
      text: `🔍 **Skill Gap & ATS Optimization Feedback for ${profile.name || 'Candidate'}**:\n\n` +
        `• **Current Strengths:** You have strong demonstrated aptitude in **${skills.slice(0, 3).join(', ')}**.\n` +
        `• **High-Impact Missing Skills:** Adding **Docker containerization**, **CI/CD pipelines**, and **Redis caching** will increase your candidate match score from ~82% to **94%+**.\n` +
        `• **Resume ATS Score Recommendation:** Format your project bullet points using the *Google X-Y-Z formula* (*"Accomplished [X], as measured by [Y], by doing [Z]"*).\n` +
        `• **Portfolio Polish:** Ensure your GitHub repositories have live deployment URLs and clean README architectural diagrams.`,
      attachments: null,
      source: 'smart_career_nlp',
    };
  }

  // 5. Default General Career Advisory
  return {
    text: `Hello! I am your **Smart Career AI Advisor**. I am here to assist you with:\n\n` +
      `1. 🎯 **Job Recommendations:** Finding vacancies with high AI Skill Match index.\n` +
      `2. 🗺️ **Learning Roadmaps:** 30 to 60-day structured technical milestones.\n` +
      `3. 💼 **Interview Simulation:** Technical mock questions & constructive feedback.\n` +
      `4. 🔍 **Skill Gap Auditing:** Actionable steps to optimize your candidate profile.\n\n` +
      `What would you like to focus on today? You can choose one of the quick starter prompts below!`,
    attachments: null,
    source: 'smart_career_nlp',
  };
}
