import React, { useCallback } from 'react';
import { WelcomeScreenPresenter, welcomeScreenPresenterProps } from '@screens/WelcomeScreen/view';

type welcomeScreenContainerProps = {};
const WelcomeScreenContainer = ({}) => {
  const onGoToAuthPress = useCallback(() => {

  }, []);

  const onCreateAccountPress = useCallback(() => {

  }, []);

  const ViewProps: welcomeScreenPresenterProps = {
    onCreateAccountPress,
    onGoToAuthPress,
  };

  return (
    <WelcomeScreenPresenter {...ViewProps} />
  );
};

export { WelcomeScreenContainer };
