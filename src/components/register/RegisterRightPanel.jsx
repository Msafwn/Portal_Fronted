import React from 'react';

export const RegisterRightPanel = ({ children, className = '' }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-start lg:justify-center p-4 sm:p-6 md:p-8 lg:p-6 2xl:p-14 3xl:p-20 bg-white h-full overflow-y-auto">
      <div className={`w-full max-w-lg md:max-w-xl lg:max-w-2xl 2xl:max-w-3xl 4k:max-w-4xl py-3 sm:py-5 md:py-6 lg:py-4 2xl:py-8 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default RegisterRightPanel;
