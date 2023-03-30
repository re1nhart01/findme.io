import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';

export type signupScreenPresenterProps = {};

const SignupScreenPresenter: React.FC<signupScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>sdasdasdas</Text>
    </ScreenLayoutView>
  );
};

export { SignupScreenPresenter };
