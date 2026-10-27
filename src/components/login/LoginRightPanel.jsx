import React from 'react';

export const LoginRightPanel = ({ children, className = '' }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-6 lg:p-8 2xl:p-16 3xl:p-24 bg-white h-full overflow-y-auto">
      <div className={`w-full max-w-sm sm:max-w-md 2xl:max-w-lg 3xl:max-w-xl 4k:max-w-2xl my-auto py-4 sm:py-6 md:py-6 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default LoginRightPanel;
