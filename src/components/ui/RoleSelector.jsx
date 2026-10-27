import React from 'react';

export const RoleSelector = ({ children, className = '' }) => {
  return (
    <div className={`mb-1.5 sm:mb-2 ${className}`}>
      {children}
    </div>
  );
};

const Label = ({ children = 'Select Your Role', className = '' }) => {
  return (
    <label className={`block text-[9.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 ${className}`}>
      {children}
    </label>
  );
};

const Group = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-4 gap-1.5 sm:gap-2 ${className}`}>
      {children}
    </div>
  );
};

const Item = ({ isSelected, onClick, icon: Icon, label, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-lg border text-center transition-all cursor-pointer ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
      } ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 mb-0.5" />}
      <span className="text-[10px] sm:text-[11px] font-bold leading-tight">{label}</span>
    </button>
  );
};

RoleSelector.Label = Label;
RoleSelector.Group = Group;
RoleSelector.Item = Item;

export default RoleSelector;
