import React from 'react';
import { useController } from 'react-hook-form';
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from '@fluentui/react/lib/Dropdown';

type ControlledDropdownProps = {
  name: string;
  options: IDropdownOption[];
  label?: string;
  isRequired?: boolean;
  styles?: Partial<IDropdownStyles>;
};

export const ControlledDropdown: React.FunctionComponent<ControlledDropdownProps> =
  ({ name, options, label, isRequired, styles }) => {
    const {
      field: { value, onChange },
      fieldState: { error },
    } = useController({
      name,
    });

    const onDropdownChange = (e: any, option: any) => onChange(option.key);

    return (
      <Dropdown
        selectedKey={value}
        options={options}
        onChange={onDropdownChange}
        label={label}
        required={isRequired}
        styles={styles}
        errorMessage={error && error.message}
      />
    );
  };
