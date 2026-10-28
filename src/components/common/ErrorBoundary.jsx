import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronRight, HelpCircle } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('🛑 [ErrorBoundary Caught Exception]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage =
        this.state.error?.message || 'An unexpected rendering error occurred in this view.';

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 select-none">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Top decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-500" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Application Error Boundary
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Something went wrong
                </h1>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              The application encountered an unexpected runtime issue while rendering this section.
              Your data is safe, and you can reload or return to the main dashboard.
            </p>

            {/* Error Message Snippet */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6">
              <p className="text-xs font-mono text-rose-300 break-words line-clamp-3">
                {errorMessage}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              >
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </div>

            {/* Stack trace accordion (for developers/auditing) */}
            {process.env.NODE_ENV !== 'production' && this.state.errorInfo && (
              <details className="mt-6 border-t border-slate-800/80 pt-4 text-xs text-slate-500">
                <summary className="cursor-pointer font-semibold hover:text-slate-400 select-none">
                  Technical Stack Trace (Dev Mode)
                </summary>
                <pre className="mt-2 max-h-48 overflow-auto p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-400">
                  {this.state.error?.stack}
                  {'\n\nComponent Stack:\n'}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

