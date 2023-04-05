import React from 'react';
import { SignInScreenPresenter, signInScreenPresenterProps } from '@screens/SignInScreen/view';

type signInScreenContainerProps = {};

const SignInScreenContainer: React.FC<signInScreenContainerProps> = () => {
  const ViewProps: signInScreenPresenterProps = {};

  return (
    <SignInScreenPresenter />
  );
};

export { SignInScreenContainer };
