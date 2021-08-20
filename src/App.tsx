import React, { useState } from 'react';
import { Stack, IStackTokens, IStackStyles } from '@fluentui/react/lib/Stack';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { useForm, FormProvider } from 'react-hook-form';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { ControlledTextField } from './components/controlledTextField';
import { ControlledDropdown } from './components/controlledDropdown';
import { ControlledCheckbox } from './components/controlledChoiceGroup';
import { occupationDropdownOptions } from './models/occupationDropdownOptions';
import { textFieldStyles } from './public/textFieldStyles';
import { dropdownStyles } from './public/dropdownStyles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

initializeIcons();

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};

/**
 * Packages:
 *   react-hook-form
 *   @hookform/resolvers yup
 *   yup
 *
 * 1. useController
 * 2. control and nesting with FormProvider
 * 3. useFormContext provides same methods as useForm
 * 4. schema-based validation
 */

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
  const methods = useForm<formInputs>({
    resolver: yupResolver(formSchema),
    defaultValues: defaultValues,
  });
  const [result, setResult] = useState('');
  const onSubmit = (data: any) => setResult(JSON.stringify(data));

  const onResetClick = (): void => {
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          verticalFill
          styles={stackStyles}
          tokens={stackTokens}
        >
          <ControlledTextField
            name="firstName"
            label="First Name"
            isRequired
            styles={textFieldStyles}
          />
          <ControlledTextField
            name="lastName"
            label="Last Name"
            styles={textFieldStyles}
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
          <p>{result}</p>
        </Stack>
      </form>
    </FormProvider>
  );
};

// const NestedInput: React.FunctionComponent = () => {
//   return <></>;
// };
