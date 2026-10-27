import React from 'react';

export const RoleSelector = ({ children, className = '' }) => {
  return (
    <div className={`mb-1 sm:mb-1.5 ${className}`}>
      {children}
    </div>
  );
};

const Label = ({ children = 'Select Your Role', className = '' }) => {
  return (
    <label className={`block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 ${className}`}>
      {children}
    </label>
  );
};

const Group = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-4 gap-1 sm:gap-1.5 ${className}`}>
      {children}
    </div>
  );
};

const Item = ({ isSelected, onClick, icon: Icon, label, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-1 px-1 sm:py-1.5 sm:px-1.5 rounded-md border text-center transition-all cursor-pointer ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
      } ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 mb-0.5" />}
      <span className="text-[9.5px] sm:text-[10px] font-bold leading-tight">{label}</span>
    </button>
  );
};

RoleSelector.Label = Label;
RoleSelector.Group = Group;
RoleSelector.Item = Item;

export default RoleSelector;
