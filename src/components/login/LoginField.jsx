import React, { forwardRef } from 'react';
import { InputField } from '../ui/InputField';

export const LoginField = forwardRef(
  (
    {
      label,
      icon,
      type = 'text',
      placeholder,
      registration,
      error,
      required = false,
      autoComplete,
      ...props
    },
    ref
  ) => {
    return (
      <InputField>
        {label && <InputField.Label required={required}>{label}</InputField.Label>}
        <InputField.Control
          ref={ref}
          icon={icon}
          type={type}
          placeholder={placeholder}
          registration={registration}
          error={error}
          autoComplete={autoComplete}
          {...props}
        />
        {error && <InputField.Error message={error} />}
      </InputField>
    );
  }
);

LoginField.displayName = 'LoginField';

export default LoginField;
