import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  getInterviewQuestions,
  evaluateCandidateAnswer,
  PRESET_ROLES,
  saveInterviewToDb,
  fetchMyInterviewHistory,
  deleteInterviewFromDb,
} from '../services/interviewPrepService';
import {
  InterviewSetupCard,
  InterviewProgressBar,
  InterviewQuestionCard,
  InterviewAnswerBox,
  InterviewFeedbackCard,
  InterviewSummaryScorecard,
} from '../components/interview';
import { Clock, Trash2, Award, ArrowRight, CheckCircle2, X } from 'lucide-react';

const InterviewPrep = () => {
  const [stage, setStage] = useState('setup'); // 'setup' | 'interview' | 'summary'
  const [selectedRole, setSelectedRole] = useState(PRESET_ROLES[0]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentDbId, setCurrentDbId] = useState(null);
  
  // History state
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Load interview history from MongoDB on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const records = await fetchMyInterviewHistory();
      setHistory(records);
    } catch (e) {
      console.warn('Could not load interview history');
    } finally {
      setLoadingHistory(false);
    }
  };

  // Handle starting the interview
  const handleStartInterview = async (role) => {
    setLoading(true);
    try {
      setSelectedRole(role);
      const generatedQuestions = await getInterviewQuestions(role);
      setQuestions(generatedQuestions);
      setCurrentIndex(0);
      setAnswers({});
      setStage('interview');

      // Auto-save new interview session in MongoDB
      const saved = await saveInterviewToDb({
        role,
        questions: generatedQuestions,
        answers: {},
        status: 'in_progress',
      });
      if (saved?._id) {
        setCurrentDbId(saved._id);
      }

      toast.success(`🚀 Mock Interview started for ${role.title}! 10 Questions loaded.`);
    } catch (err) {
      toast.error('Failed to load interview questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle submitting single answer for AI scoring
  const handleSubmitAnswer = async (answerText) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setIsEvaluating(true);
    try {
      const evaluation = await evaluateCandidateAnswer({
        role: selectedRole.title,
        department: selectedRole.department || 'it',
        question: currentQ,
        answer: answerText,
        category: currentQ.type || 'Technical',
      });

      const updatedAnswers = {
        ...answers,
        [currentQ.id]: {
          answer: answerText,
          score: evaluation.score,
          feedback: evaluation,
          submitted: true,
        },
      };

      setAnswers(updatedAnswers);

      // Persist answer update to MongoDB
      if (currentDbId) {
        saveInterviewToDb({
          sessionId: currentDbId,
          role: selectedRole,
          questions,
          answers: updatedAnswers,
          status: 'in_progress',
        });
      }

      toast.success(`AI Graded: ${evaluation.score}/10 points (${evaluation.verdict})`);
    } catch (err) {
      toast.error('Evaluation encountered an error. Applied standard evaluation.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishAndSave('completed');
    }
  };

  const finishAndSave = async (status = 'completed') => {
    setStage('summary');
    if (currentDbId) {
      await saveInterviewToDb({
        sessionId: currentDbId,
        role: selectedRole,
        questions,
        answers,
        status,
      });
      loadHistory(); // refresh history
    }
    toast.success('🎉 Interview Completed & Saved to your account database!');
  };

  const handleFinishSession = () => {
    finishAndSave('completed');
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setStage('interview');
    toast('Session reset. Good luck!', { icon: '🔄' });
  };

  const handleChangeRole = () => {
    setAnswers({});
    setCurrentIndex(0);
    setQuestions([]);
    setCurrentDbId(null);
    setStage('setup');
  };

  const handleResumePastInterview = (item) => {
    setSelectedRole(item.role || PRESET_ROLES[0]);
    setQuestions(item.questions || []);
    setAnswers(item.answers || {});
    setCurrentDbId(item._id);
    setShowHistory(false);

    if (item.status === 'completed') {
      setStage('summary');
      toast.success(`Loaded completed scorecard for ${item.role?.title}!`);
    } else {
      setStage('interview');
      // Find first unanswered question
      const firstUnanswered = (item.questions || []).findIndex(
        (q) => !item.answers?.[q.id]?.submitted
      );
      setCurrentIndex(firstUnanswered !== -1 ? firstUnanswered : 0);
      toast.success(`Resumed in-progress interview for ${item.role?.title}!`);
    }
  };

  const handleDeleteHistory = async (id, e) => {
    e.stopPropagation();
    const ok = await deleteInterviewFromDb(id);
    if (ok) {
      setHistory((prev) => prev.filter((item) => item._id !== id));
      toast.success('Interview history record removed.');
    }
  };

  const currentQ = questions[currentIndex];
  const currentAnswerData = currentQ ? answers[currentQ.id] : null;

  return (
    <div className="max-w-5xl 2xl:max-w-6xl 4k:max-w-7xl mx-auto space-y-6 2xl:space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Top Header Controls: History Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center text-lg font-bold shrink-0">
            🎯
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              AI Mock Interview Prep
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                10 Questions
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice domain-specific questions with real-time AI scoring & instant feedback.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            loadHistory();
            setShowHistory(true);
          }}
          className="flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-blue-400 transition shrink-0 cursor-pointer shadow-2xs"
        >
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Past Interviews ({history.length})</span>
        </button>
      </div>

      {/* Stage 1: Setup & Role Picking */}
      {stage === 'setup' && (
        <InterviewSetupCard
          onStartInterview={handleStartInterview}
          loading={loading}
        />
      )}

      {/* Stage 2: 10 Questions In-Progress Stepper */}
      {stage === 'interview' && currentQ && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Progress & Stepper Bar */}
          <InterviewProgressBar
            questions={questions}
            currentIndex={currentIndex}
            onSelectIndex={(idx) => setCurrentIndex(idx)}
            answers={answers}
            onFinishSession={handleFinishSession}
            roleTitle={selectedRole?.title}
          />

          {/* Question Prompt Card */}
          <InterviewQuestionCard
            question={currentQ}
            index={currentIndex}
            totalQuestions={questions.length}
          />

          {/* Real-time AI Feedback Result (if already evaluated) */}
          {currentAnswerData?.feedback && (
            <InterviewFeedbackCard
              feedback={currentAnswerData.feedback}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={currentIndex === questions.length - 1}
              onFinishSession={handleFinishSession}
            />
          )}

          {/* Answer Box & Voice Dictation */}
          <InterviewAnswerBox
            question={currentQ}
            savedAnswer={currentAnswerData?.answer || ''}
            onSubmitAnswer={handleSubmitAnswer}
            isEvaluating={isEvaluating}
            feedback={currentAnswerData?.feedback}
          />
        </div>
      )}

      {/* Stage 3: Final Comprehensive Scorecard */}
      {stage === 'summary' && (
        <InterviewSummaryScorecard
          role={selectedRole}
          questions={questions}
          answers={answers}
          onRetake={handleRetake}
          onChangeRole={handleChangeRole}
        />
      )}

      {/* Past Interviews History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    History
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your previous mock interviews & scorecards
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {loadingHistory ? (
                <div className="py-12 text-center text-sm text-slate-400">
                  Loading history...
                </div>
              ) : history.length === 0 ? (
                <div className="py-12 text-center">
                  <span className="text-4xl">📝</span>
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No past mock interviews found.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Start a mock interview today and your scorecards will appear here automatically!
                  </p>
                </div>
              ) : (
                history.map((item) => {
                  const dateStr = item.updatedAt
                    ? new Date(item.updatedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Recent';

                  return (
                    <div
                      key={item._id}
                      onClick={() => handleResumePastInterview(item)}
                      className="group p-4 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/40 transition cursor-pointer flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl">{item.role?.icon || '💼'}</span>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {item.role?.title || 'Mock Interview'}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                            <span>{dateStr}</span>
                            <span>•</span>
                            <span className="capitalize">{item.status || 'completed'}</span>
                            <span>•</span>
                            <span>{item.answeredCount || 0} / {item.totalQuestions || 10} Answered</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-base font-extrabold text-blue-600">
                            {item.averageScore || 0} / 10
                          </div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                            Avg Score
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleDeleteHistory(item._id, e)}
                          title="Delete session"
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                onClick={() => setShowHistory(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer shadow-2xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
