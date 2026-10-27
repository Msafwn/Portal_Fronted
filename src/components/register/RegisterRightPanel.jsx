import React from 'react';

export const RegisterRightPanel = ({ children, className = '' }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-3 lg:p-4 bg-white h-full overflow-y-auto select-none">
      <div className={`w-full max-w-lg lg:max-w-xl my-auto ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default RegisterRightPanel;
