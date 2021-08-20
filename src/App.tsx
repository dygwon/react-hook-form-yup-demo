import React, { useState } from 'react';
import { Stack, IStackTokens, IStackStyles } from '@fluentui/react/lib/Stack';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { useForm, FormProvider } from 'react-hook-form';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ControlledTextField } from './components/controlledTextField';
import { ControlledDropdown } from './components/controlledDropdown';
import { ControlledCheckbox } from './components/controlledChoiceGroup';
import { occupationDropdownOptions } from './models/occupationDropdownOptions';
import { preferredCryptoOptions } from './models/preferredCryptoOptions';
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
 * 2. control with FormProvider
 * 3. 
 */

type Inputs = {
  firstName: string,
  lastName: string,
  email: string,
  website: string,
  id: string,
  occupation: string,
  isCryptoHolder: boolean
}

const schema = yup.object().shape({
  firstName: yup.string().required('Please provide a first name'),
  lastName: yup.string(),
  email: yup.string().email(),
  website: yup.string().required(),
  id: yup.string().uuid().required(),
  occupation: yup.string().required(),
  isCryptoHolder: yup.boolean()
});

export const App: React.FunctionComponent = () => {
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });
  const [result, setResult] = useState("");
  const onSubmit = (data: any) => setResult(JSON.stringify(data));
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
          <NestedInput />

          <PrimaryButton type="submit" text="Submit" />
          <p>{result}</p>
        </Stack>
      </form>
    </FormProvider>
  );
};

const NestedInput: React.FunctionComponent = () => {
  return (
    <>
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
    </>
  );
}