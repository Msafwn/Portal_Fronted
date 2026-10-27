import React, { useState, useEffect, useRef, useActionState, useCallback } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  BookOpen,
  RotateCcw,
  FileText,
  Eye,
  EyeOff,
} from 'lucide-react';

const InterviewAnswerBox = ({
  question,
  savedAnswer = '',
  onSubmitAnswer,
  isEvaluating = false,
  feedback = null,
}) => {
  const [answer, setAnswer] = useState(savedAnswer || '');
  const [isListening, setIsListening] = useState(false);
  const [showIdealAnswer, setShowIdealAnswer] = useState(false);
  const recognitionRef = useRef(null);

  // React 19: useActionState for interview answer submission action
  const [submissionState, submitAction, isSubmittingAction] = useActionState(
    async (_prevState) => {
      if (!answer.trim()) return { success: false, error: 'Answer is empty' };
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      await onSubmitAnswer(answer);
      return { success: true, error: null };
    },
    { success: false, error: null }
  );

  // Sync when question changes
  useEffect(() => {
    setAnswer(savedAnswer || '');
    setShowIdealAnswer(false);
  }, [question?.id, savedAnswer]);

  // Speech Recognition setup if supported by browser
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeech = () => {
    if (!recognitionRef.current) {
      alert('Speech-to-text is not supported by your current browser. You can type your answer directly in the box.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  const insertTemplate = () => {
    if (question.type === 'Behavioral') {
      const template = `Situation: At my previous project...\nTask: My responsibility was to...\nAction: I took the lead to...\nResult: Consequently, the project delivered...`;
      setAnswer((prev) => (prev ? `${prev}\n\n${template}` : template));
    } else {
      const template = `1. Core Definition:\n2. Architectural Workflow:\n3. Key Trade-offs / Performance Impact:`;
      setAnswer((prev) => (prev ? `${prev}\n\n${template}` : template));
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!answer.trim() || isEvaluating || isSubmittingAction) return;
    submitAction();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          Your Response / Solution
        </label>

        <div className="flex items-center gap-2">
          {/* STAR / Structure Template insert button */}
          <button
            type="button"
            onClick={insertTemplate}
            className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/70 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>+ Insert {question.type === 'Behavioral' ? 'STAR' : 'Structure'} Outline</span>
          </button>

          {/* Voice dictation button */}
          <button
            type="button"
            onClick={toggleSpeech}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-3.5 h-3.5" />
                <span>Listening...</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 text-blue-600" />
                <span>Voice Answer</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Answer Text Area */}
      <div className="relative">
        <textarea
          rows={7}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={`Type or dictate your answer for Question ${question.id}... Be clear, mention specific engineering mechanisms, and support with concrete examples.`}
          className="w-full text-sm text-slate-800 p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-slate-50/50 hover:bg-white focus:bg-white transition-all resize-y leading-relaxed"
        />

        {/* Word count pill */}
        <div className="absolute right-3 bottom-3 text-[11px] font-medium text-slate-400 bg-white/90 px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs pointer-events-none">
          {wordCount} words {wordCount < 20 ? '(aim for 30+)' : '✓'}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        {/* Toggle Ideal Answer */}
        <button
          type="button"
          onClick={() => setShowIdealAnswer(!showIdealAnswer)}
          className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 cursor-pointer py-1"
        >
          {showIdealAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showIdealAnswer ? 'Hide Ideal AI Answer' : 'View Ideal AI Answer'}</span>
        </button>

        {/* Submit Button */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {feedback && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isEvaluating}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-grade</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!answer.trim() || isEvaluating || isSubmittingAction}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isEvaluating || isSubmittingAction ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>AI Scoring in Progress...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>{feedback ? 'Update & Re-Evaluate' : 'Submit for AI Scoring'}</span>
                <Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Model Answer Preview Accordion */}
      {showIdealAnswer && question.idealAnswer && (
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-purple-50/70 to-indigo-50/70 border border-purple-200/80 text-purple-950 space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-800">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Benchmark Ideal Answer (Staff Engineer Standard)</span>
          </div>
          <p className="text-xs text-purple-900/90 leading-relaxed font-sans">
            {question.idealAnswer}
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewAnswerBox;
