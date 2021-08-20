import React from 'react';
import { useController } from 'react-hook-form';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

type ControlledChoiceGroupProps = {
  name: string;
  label: string;
  options: IChoiceGroupOption[];
  defaultValue?: boolean;
};

export const ControlledChoiceGroup: React.FunctionComponent<ControlledChoiceGroupProps> =
  ({ name, label, options, defaultValue }) => {
    const {
      field: { value, onChange },
    } = useController({
      name,
      defaultValue,
    });

    return (
      <ChoiceGroup
        label={label}
        options={options}
        selectedKey={value}
        onChange={onChange}
      />
    );
  };
