import React, { useState } from 'react';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib/TextField';
import { ThemeProvider } from '@fluentui/react/lib/Theme';
import { AzureThemeLight } from '@fluentui/azure-themes';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { ControlledTextField } from './components/controlledTextField';
import { ControlledDropdown } from './components/controlledDropdown';
import { ControlledCheckbox } from './components/controlledCheckbox';
import { occupationDropdownOptions } from './models/occupationDropdownOptions';
import { textFieldStyles } from './public/textFieldStyles';
import { dropdownStyles } from './public/dropdownStyles';

initializeIcons();

const stackTokens: IStackTokens = { childrenGap: 15, padding: 30 };

let renderCount = 0;

type formInputs = {
  firstName: string;
  lastName?: string;
  email: string;
  website: string;
  id: string;
  occupation: string;
  isCryptoHolder?: boolean;
};

const formSchema: SchemaOf<formInputs> = yup.object().shape({
  firstName: yup.string().required('Please provide a first name'),
  lastName: yup.string(),
  email: yup.string().email().required('Please provide an email'),
  website: yup.string().url().required('Please provide a website'),
  id: yup.string().uuid().required('Please provide an id'),
  occupation: yup.string().required('Please select an occupation'),
  isCryptoHolder: yup.boolean(),
});

const defaultValues: formInputs = {
  firstName: 'Mat',
  lastName: 'Fraser',
  email: 'hwpo@crossfit.com',
  website: 'https://www.hwpo.com',
  id: '048dc551-234e-4d42-9492-c5bb7f9537f0',
  occupation: 'Athlete',
  isCryptoHolder: true,
};

export const App: React.FunctionComponent = () => {
  renderCount++;
  const [exampleText, setExampleText] = useState('');
  const methods = useForm<formInputs>({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const onSubmit = (data: any) => console.log(data);
  const onResetClick = (): void => methods.reset();
  const onTextFieldChange = (e: any, newValue?: string): void =>
    setExampleText(newValue || '');

  return (
    <ThemeProvider theme={AzureThemeLight}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Stack
            horizontalAlign="center"
            verticalAlign="center"
            verticalFill
            tokens={stackTokens}
          >
            <ControlledTextField
              name="firstName"
              label="First Name"
              isRequired
              styles={textFieldStyles}
            />
            <Controller
              name="lastName"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  label="Last Name"
                  value={value}
                  onChange={onChange}
                  styles={textFieldStyles}
                  errorMessage={error && error.message}
                />
              )}
            />
            <ControlledTextField
              name="email"
              label="Email"
              isRequired
              styles={textFieldStyles}
            />
            <ControlledTextField
              name="website"
              label="Website"
              isRequired
              styles={textFieldStyles}
            />
            <ControlledTextField
              name="id"
              label="ID"
              isRequired
              styles={textFieldStyles}
            />
            <ControlledDropdown
              name="occupation"
              label="Occupation"
              options={occupationDropdownOptions}
              isRequired
              styles={dropdownStyles}
            />
            <ControlledCheckbox
              name="isCryptoHolder"
              label="Do you hold any cryptocurrencies?"
            />
            <DefaultButton text="Reset" onClick={onResetClick} />
            <PrimaryButton type="submit" text="Submit" />
            <TextField
              label="Example Controlled Component"
              value={exampleText}
              onChange={onTextFieldChange}
            />
            <Text variant="xLarge" block>{`Renders: ${renderCount}`}</Text>
          </Stack>
        </form>
      </FormProvider>
    </ThemeProvider>
  );
};

// const NestedInput: React.FunctionComponent = () => {
//   return <></>;
// };
