import React from 'react';

export const RegisterRightPanel = ({ children, className = '' }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-2.5 sm:p-4 lg:p-4 2xl:p-6 bg-white h-full overflow-y-auto lg:overflow-hidden select-none">
      <div className={`w-full max-w-lg lg:max-w-xl ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default RegisterRightPanel;
