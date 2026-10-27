import React from 'react';
import { LoginLeftBanner } from './LoginLeftBanner';
import { LoginRightPanel } from './LoginRightPanel';
import { LoginHeader } from './LoginHeader';
import { LoginField } from './LoginField';
import { LoginSubmit, LoginFooter } from './LoginSubmit';

export const LoginForm = ({ children, className = '' }) => {
  return (
    <div className={`h-screen max-h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-slate-50 text-slate-800 ${className}`}>
      {children}
    </div>
  );
};

LoginForm.LeftBanner = LoginLeftBanner;
LoginForm.RightPanel = LoginRightPanel;
LoginForm.Header = LoginHeader;
LoginForm.Field = LoginField;
LoginForm.Submit = LoginSubmit;
LoginForm.Footer = LoginFooter;

export {
  LoginLeftBanner,
  LoginRightPanel,
  LoginHeader,
  LoginField,
  LoginSubmit,
  LoginFooter,
};

export default LoginForm;
