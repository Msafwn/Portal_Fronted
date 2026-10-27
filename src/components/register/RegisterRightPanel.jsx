import React from 'react';

export const RegisterRightPanel = ({ children, className = '' }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 lg:px-8 lg:py-2 xl:px-10 xl:py-3 2xl:px-14 2xl:py-6 bg-white h-full overflow-y-auto lg:overflow-hidden">
      <div className={`w-full max-w-lg lg:max-w-2xl xl:max-w-2xl 2xl:max-w-3xl my-auto ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default RegisterRightPanel;
