import React from 'react';
import { Button } from '../ui/Button';

export const RegisterSubmit = ({
  loading = false,
  text = 'Create Account',
  loadingText = 'Creating Account...',
  className = '',
}) => {
  return (
    <Button
      type="submit"
      loading={loading}
      loadingText={loadingText}
      className={`w-full mt-1.5 2xl:mt-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-bold shadow-xs ${className}`}
    >
      {text}
    </Button>
  );
};

export const RegisterFooter = ({ children, className = '' }) => {
  return (
    <div className={`mt-2 2xl:mt-3 pt-1.5 border-t border-slate-100 text-center text-[11px] sm:text-xs text-slate-500 flex items-center justify-center gap-1 ${className}`}>
      {children}
    </div>
  );
};

export default RegisterSubmit;
