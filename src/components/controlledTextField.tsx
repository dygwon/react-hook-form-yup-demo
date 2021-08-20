import React from 'react';
import { useController } from 'react-hook-form';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';

type ControlledTextFieldProps = {
  name: string;
  label: string;
  defaultValue?: string;
  isRequired?: boolean;
  isMultiline?: boolean;
  isAutoAdjustHeight?: boolean;
  styles?: Partial<ITextFieldStyles>;
};

export const ControlledTextField: React.FunctionComponent<ControlledTextFieldProps> =
  ({
    name,
    defaultValue,
    label,
    isRequired,
    isMultiline,
    isAutoAdjustHeight,
    styles,
  }) => {
    const {
      field: { value, onChange },
      fieldState: { error },
    } = useController({
      name,
      defaultValue: defaultValue || '',
    });

    return (
      <TextField
        value={value}
        label={label}
        required={isRequired}
        onChange={onChange}
        multiline={isMultiline}
        autoAdjustHeight={isAutoAdjustHeight}
        styles={styles}
        errorMessage={error && error.message}
      />
    );
  };
