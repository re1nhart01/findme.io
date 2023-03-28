import React from 'react';
import { WelcomeScreenPresenter, welcomeScreenPresenterProps } from '@screens/WelcomeScreen/view';

type welcomeScreenContainerProps = {};
const WelcomeScreenContainer = ({}) => {
  const ViewProps: welcomeScreenPresenterProps = {};
  return (
    <WelcomeScreenPresenter />
  );
};

export { WelcomeScreenContainer };
