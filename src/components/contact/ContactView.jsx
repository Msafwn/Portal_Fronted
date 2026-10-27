import React from 'react';
import { ContactNavbar } from './ContactNavbar';
import { ContactHeader } from './ContactHeader';
import { ContactInfoPanel } from './ContactInfoPanel';
import { ContactForm } from './ContactForm';
import { ContactFooter } from './ContactFooter';

export const ContactView = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 ${className}`}>
      {children}
    </div>
  );
};

ContactView.Navbar = ContactNavbar;
ContactView.Header = ContactHeader;
ContactView.InfoPanel = ContactInfoPanel;
ContactView.Form = ContactForm;
ContactView.Footer = ContactFooter;

export {
  ContactNavbar,
  ContactHeader,
  ContactInfoPanel,
  ContactForm,
  ContactFooter,
};

export default ContactView;
