import React from 'react';

export const RoleSelector = ({ children, className = '' }) => {
  return (
    <div className={`mb-2.5 2xl:mb-4 ${className}`}>
      {children}
    </div>
  );
};

const Label = ({ children = 'Select Your Role', className = '' }) => {
  return (
    <label className={`block text-[10px] 2xl:text-xs 3xl:text-sm font-semibold uppercase tracking-wider text-slate-600 mb-1 2xl:mb-2 ${className}`}>
      {children}
    </label>
  );
};

const Group = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2 md:gap-2.5 2xl:gap-3 ${className}`}>
      {children}
    </div>
  );
};

const Item = ({ isSelected, onClick, icon: Icon, label, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 sm:p-2.5 md:p-2.5 2xl:p-3 rounded-lg md:rounded-xl 2xl:rounded-xl border text-center transition-all cursor-pointer ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/30'
          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
      } ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 2xl:w-5 2xl:h-5 mb-0.5 md:mb-1 2xl:mb-1.5" />}
      <span className="text-[10px] sm:text-xs md:text-xs 2xl:text-xs 3xl:text-sm font-semibold leading-tight">{label}</span>
    </button>
  );
};

RoleSelector.Label = Label;
RoleSelector.Group = Group;
RoleSelector.Item = Item;

export default RoleSelector;
