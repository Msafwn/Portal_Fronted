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
      className={`w-full mt-1 2xl:mt-4 py-2 2xl:py-3.5 3xl:py-4 text-xs 2xl:text-base 3xl:text-lg rounded-lg 2xl:rounded-xl font-semibold ${className}`}
    >
      {text}
    </Button>
  );
};

export const RegisterFooter = ({ children, className = '' }) => {
  return (
    <div className={`mt-3 2xl:mt-6 pt-2 2xl:pt-4 border-t border-slate-200 text-center text-[11px] 2xl:text-sm 3xl:text-base text-slate-500 flex items-center justify-center gap-1 2xl:gap-2 ${className}`}>
      {children}
    </div>
  );
};

export default RegisterSubmit;
