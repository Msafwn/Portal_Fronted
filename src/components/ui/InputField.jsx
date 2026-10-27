import React, { createContext, useContext, useState, forwardRef, useRef, useImperativeHandle, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputContext = createContext(null);

export const InputField = ({ children, className = '' }) => {
  return (
    <InputContext.Provider value={{}}>
      <div className={`space-y-0.5 ${className}`}>
        {children}
      </div>
    </InputContext.Provider>
  );
};

const Label = ({ children, required = false, className = '' }) => {
  return (
    <label className={`block text-[10px] 2xl:text-xs 3xl:text-sm font-semibold uppercase tracking-wider text-slate-600 mb-0.5 2xl:mb-1.5 ${className}`}>
      {children} {required && <span className="text-rose-500">*</span>}
    </label>
  );
};

const Control = forwardRef(
  (
    {
      icon: Icon,
      type = 'text',
      placeholder,
      registration,
      error,
      autoComplete,
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const internalInputRef = useRef(null);

    // forwardRef: Parent component can directly access the DOM input element (e.g. .focus())
    useImperativeHandle(ref, () => internalInputRef.current);

    // useCallback: Memoized toggle handler for password visibility button
    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    // React Hook Form ref interoperability
    const { ref: regRef, ...restRegistration } = registration || {};

    return (
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-2.5 2xl:pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 3xl:w-5 3xl:h-5" />
          </div>
        )}
        <input
          ref={(element) => {
            internalInputRef.current = element;
            if (typeof regRef === 'function') {
              regRef(element);
            }
          }}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...restRegistration}
          {...props}
          className={`w-full bg-white border rounded-lg 2xl:rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            Icon ? 'pl-8 sm:pl-9 2xl:pl-10' : 'pl-2.5 sm:pl-3 2xl:pl-4'
          } ${isPassword ? 'pr-8 sm:pr-9 2xl:pr-10' : 'pr-2.5 sm:pr-3 2xl:pr-4'} py-1.5 sm:py-2 2xl:py-2.5 ${
            error ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-300'
          } ${className}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-2.5 2xl:pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <Eye className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 3xl:w-5 3xl:h-5" />
            ) : (
              <EyeOff className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 3xl:w-5 3xl:h-5" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Control.displayName = 'InputField.Control';

const Error = ({ message }) => {
  if (!message) return null;
  return <p className="text-[10px] 2xl:text-xs 3xl:text-sm text-rose-500 font-medium leading-tight mt-0.5 2xl:mt-1">{message}</p>;
};

InputField.Label = Label;
InputField.Control = Control;
InputField.Error = Error;

export default InputField;
