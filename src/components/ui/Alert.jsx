import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export const Alert = ({
  type = 'error',
  message,
  onClose,
  className = '',
  children,
}) => {
  if (!message && !children) return null;

  const isError = type === 'error';

  return (
    <div
      className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs transition-all ${
        isError
          ? 'bg-rose-50 border-rose-200 text-rose-700'
          : 'bg-emerald-50 border-emerald-200 text-emerald-700'
      } ${className}`}
    >
      {isError ? (
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
      ) : (
        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
      )}
      <div className="flex-1 leading-snug">{message || children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
