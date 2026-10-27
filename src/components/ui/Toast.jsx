import React from 'react';
import toast, { Toaster as HotToaster } from 'react-hot-toast';

export const notify = {
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 3500,
      ...options,
    });
  },
  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 4000,
      ...options,
    });
  },
  info: (message, options = {}) => {
    return toast(message, {
      duration: 3500,
      icon: 'ℹ️',
      ...options,
    });
  },
  loading: (message, options = {}) => {
    return toast.loading(message, {
      ...options,
    });
  },
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
};

export const AppToaster = () => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: '#0f172a',
          color: '#ffffff',
          border: '1px solid #1e293b',
          borderRadius: '0.75rem',
          fontSize: '0.75rem',
          padding: '10px 14px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        },
        success: {
          iconTheme: {
            primary: '#2563eb',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#f43f5e',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
};

export default AppToaster;
