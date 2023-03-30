import React from 'react';
import { Text } from 'react-native';
import { SignupScreenPresenter, signupScreenPresenterProps } from '@screens/SignupScreen/view';

export type signupScreenContainerProps = {};

const SignupScreenContainer: React.FC<signupScreenContainerProps> = ({}) => {

  const ViewProps: signupScreenPresenterProps = {};

  return (
    <SignupScreenPresenter {...ViewProps} />
  );
};

export { SignupScreenContainer };
