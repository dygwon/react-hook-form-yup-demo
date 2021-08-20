import React from 'react';
import { Stack, IStackTokens, IStackStyles } from '@fluentui/react/lib/Stack';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { useForm, FormProvider } from 'react-hook-form';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ControlledTextField } from './components/controlledTextField';
import { ControlledDropdown } from './components/controlledDropdown';
import { ControlledChoiceGroup } from './components/controlledChoiceGroup';
import { Header } from './components/Header';
import { IChoiceGroupOption, IDropdownOption } from '@fluentui/react';

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

const occupationDropdownOptions: IDropdownOption[] = [
  { key: 'Software Engineer', text: 'Software Engineer' },
  { key: 'Software Engineering Manager', text: 'Software Engineering Manager' },
  { key: 'Data Scientist', text: 'Data Scientist' },
  { key: 'Product Designer', text: 'Product Designer' },
  { key: 'Program Manager', text: 'Program Manager' },
  { key: 'Technical Program Manager', text: 'Technical Program Manager' },
];

const preferredCryptoOptions: IChoiceGroupOption[] = [
  { key: 'BTC', text: 'BTC' },
  { key: 'ETH', text: 'ETH' },
  { key: 'ADA', text: 'ADA' },
  { key: 'BNB', text: 'BNB' },
];

/**
 * 1. useForm - custom hook
 * 2. register
 * 3. handleSubmit - validate inputs prior to invoking onSubmit
 */

type Inputs = {
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: number,
  id: string,
  occupation: string,
  preferredCrypto: string
}

export const App: React.FunctionComponent = () => {

  const methods = useForm<Inputs>();
  const onSubmit = (data: any) => console.log(data);
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Header />
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
          <ControlledTextField
            name="firstName"
            label="First Name"
            isRequired
          />
          <ControlledTextField
            name="lastName"
            label="Last Name"
          />
          <ControlledTextField
            name="email"
            label="Email"
            isRequired
          />
          <ControlledTextField
            name="mobileNumber"
            label="Mobile Number"
            isRequired
          />
          <ControlledTextField
            name="id"
            label="ID"
            isRequired
          />
          <ControlledDropdown
            name="Occupation"
            options={occupationDropdownOptions}
            isRequired
          />
          <ControlledChoiceGroup
            name="preferredCrypto"
            label="Preferred Cryptocurrency"
            options={preferredCryptoOptions}
          />

          <PrimaryButton type="submit" text="Submit" />
        </Stack>
      </form>
    </FormProvider>
  );
};
