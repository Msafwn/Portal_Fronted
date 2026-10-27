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
      className={`w-full mt-1 py-1.5 text-xs sm:text-sm rounded-lg font-semibold ${className}`}
    >
      {text}
    </Button>
  );
};

export const RegisterFooter = ({ children, className = '' }) => {
  return (
    <div className={`mt-1.5 pt-1 border-t border-slate-200 text-center text-[10.5px] text-slate-500 flex items-center justify-center gap-1 ${className}`}>
      {children}
    </div>
  );
};

export default RegisterSubmit;
