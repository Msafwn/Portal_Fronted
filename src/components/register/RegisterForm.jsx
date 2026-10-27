import React from 'react';
import { RegisterLeftBanner } from './RegisterLeftBanner';
import { RegisterRightPanel } from './RegisterRightPanel';
import { RegisterHeader } from './RegisterHeader';
import { RegisterRoleSelector } from './RegisterRoleSelector';
import { RegisterField } from './RegisterField';
import { RegisterPhoneField } from './RegisterPhoneField';
import { RegisterSubmit, RegisterFooter } from './RegisterSubmit';
import { HeadlineSelect } from '../ui/HeadlineSelect';
import { SkillPicker } from '../ui/SkillPicker';

export const RegisterForm = ({ children, className = '' }) => {
  return (
    <div className={`h-screen max-h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-slate-50 text-slate-800 ${className}`}>
      {children}
    </div>
  );
};

RegisterForm.LeftBanner = RegisterLeftBanner;
RegisterForm.RightPanel = RegisterRightPanel;
RegisterForm.Header = RegisterHeader;
RegisterForm.RoleSelector = RegisterRoleSelector;
RegisterForm.Field = RegisterField;
RegisterForm.PhoneField = RegisterPhoneField;
RegisterForm.HeadlineSelect = HeadlineSelect;
RegisterForm.SkillPicker = SkillPicker;
RegisterForm.Submit = RegisterSubmit;
RegisterForm.Footer = RegisterFooter;

export {
  RegisterLeftBanner,
  RegisterRightPanel,
  RegisterHeader,
  RegisterRoleSelector,
  RegisterField,
  RegisterPhoneField,
  RegisterSubmit,
  RegisterFooter,
};

export default RegisterForm;
