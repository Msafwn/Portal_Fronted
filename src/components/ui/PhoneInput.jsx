import React, { forwardRef, useState, useMemo } from 'react';

export const COUNTRIES = [
  { code: '+92', flag: '🇵🇰', name: 'Pakistan', placeholder: '300 1234567' },
  { code: '+971', flag: '🇦🇪', name: 'UAE', placeholder: '50 123 4567' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia', placeholder: '50 123 4567' },
  { code: '+1', flag: '🇺🇸', name: 'USA / Canada', placeholder: '555 123 4567' },
  { code: '+44', flag: '🇬🇧', name: 'UK', placeholder: '7911 123456' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar', placeholder: '3312 3456' },
  { code: '+968', flag: '🇴🇲', name: 'Oman', placeholder: '9123 4567' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait', placeholder: '9123 4567' },
  { code: '+49', flag: '🇩🇪', name: 'Germany', placeholder: '151 12345678' },
  { code: '+61', flag: '🇦🇺', name: 'Australia', placeholder: '412 345 678' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey', placeholder: '532 123 4567' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia', placeholder: '12 345 6789' },
  { code: '+91', flag: '🇮🇳', name: 'India', placeholder: '98765 43210' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh', placeholder: '1712 345678' },
];

export const PhoneInput = forwardRef(
  (
    {
      countryCode = '+92',
      onCountryCodeChange,
      label = 'Phone Number',
      required = false,
      registration,
      error,
      className = '',
      ...props
    },
    ref
  ) => {
    const selectedCountry = useMemo(() => {
      return COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];
    }, [countryCode]);

    return (
      <div className={`space-y-0.5 ${className}`}>
        {label && (
          <label className="block text-[10px] 2xl:text-xs 3xl:text-sm font-semibold uppercase tracking-wider text-slate-600 mb-0.5 2xl:mb-1.5">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}

        <div
          className={`flex rounded-lg 2xl:rounded-xl border bg-white transition-colors focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 overflow-hidden ${
            error ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-300'
          }`}
        >
          {/* Country Dial Code Dropdown */}
          <select
            value={countryCode}
            onChange={(e) => onCountryCodeChange && onCountryCodeChange(e.target.value)}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold px-2 sm:px-2.5 border-r border-slate-200 focus:outline-none cursor-pointer transition-colors shrink-0 py-1.5 sm:py-2 2xl:py-2.5"
            aria-label="Select Country Code"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code + c.name} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>

          {/* National Number Input */}
          <input
            ref={ref}
            type="tel"
            placeholder={selectedCountry.placeholder}
            {...registration}
            {...props}
            className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 px-2.5 sm:px-3 py-1.5 sm:py-2 2xl:py-2.5 focus:outline-none bg-transparent"
          />
        </div>

        {error && (
          <p className="text-[10px] 2xl:text-xs 3xl:text-sm text-rose-500 font-medium leading-tight mt-0.5 2xl:mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
