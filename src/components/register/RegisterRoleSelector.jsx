import React from 'react';
import { RoleSelector } from '../ui/RoleSelector';

export const RegisterRoleSelector = ({ value, onChange, roles = [] }) => {
  return (
    <RoleSelector>
      <RoleSelector.Label>Select Your Role</RoleSelector.Label>
      <RoleSelector.Group>
        {roles.map((r) => (
          <RoleSelector.Item
            key={r.id}
            isSelected={value === r.id}
            onClick={() => onChange(r.id)}
            icon={r.icon}
            label={r.label}
          />
        ))}
      </RoleSelector.Group>
    </RoleSelector>
  );
};

export default RegisterRoleSelector;
