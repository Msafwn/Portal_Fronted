import React from 'react';

export const RoleSelector = ({ children, className = '' }) => {
  return (
    <div className={`mb-2 2xl:mb-3 ${className}`}>
      {children}
    </div>
  );
};

const Label = ({ children = 'Select Your Role', className = '' }) => {
  return (
    <label className={`block text-[10px] 2xl:text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 ${className}`}>
      {children}
    </label>
  );
};

const Group = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 ${className}`}>
      {children}
    </div>
  );
};

const Item = ({ isSelected, onClick, icon: Icon, label, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-bold'
          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 font-medium'
      } ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
      <span className="text-[11px] sm:text-xs leading-none">{label}</span>
    </button>
  );
};

RoleSelector.Label = Label;
RoleSelector.Group = Group;
RoleSelector.Item = Item;

export default RoleSelector;
