import React from 'react';
import { useController } from 'react-hook-form';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

type ControlledCheckboxProps = {
  name: string;
  label: string;
  defaultValue?: boolean;
};

export const ControlledCheckbox: React.FunctionComponent<ControlledCheckboxProps> =
  ({ name, label, defaultValue }) => {
    const {
      field: { value, onChange },
    } = useController({
      name,
      defaultValue,
    });

    return (
      <Checkbox
        label={label}
        checked={value}
        onChange={onChange}
      />
    );
  };
