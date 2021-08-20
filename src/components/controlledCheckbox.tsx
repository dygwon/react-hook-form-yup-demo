import React from 'react';
import { useController } from 'react-hook-form';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

type ControlledCheckboxProps = {
  name: string;
  label: string;
};

export const ControlledCheckbox: React.FunctionComponent<ControlledCheckboxProps> =
  ({ name, label }) => {
    const {
      field: { value, onChange },
    } = useController({
      name,
    });

    return <Checkbox label={label} checked={value} onChange={onChange} />;
  };
