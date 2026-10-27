import React, { forwardRef } from 'react';
import { PhoneInput } from '../ui/PhoneInput';

export const RegisterPhoneField = forwardRef(
  (
    {
      countryCode,
      onCountryCodeChange,
      label = 'Phone Number',
      required = false,
      registration,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <PhoneInput
        ref={ref}
        countryCode={countryCode}
        onCountryCodeChange={onCountryCodeChange}
        label={label}
        required={required}
        registration={registration}
        error={error}
        {...props}
      />
    );
  }
);

RegisterPhoneField.displayName = 'RegisterPhoneField';

export default RegisterPhoneField;
