import React, { useCallback } from 'react';
import { WelcomeScreenPresenter, welcomeScreenPresenterProps } from '@screens/WelcomeScreen/view';
import { forceNavigator } from '@core/Navigator';

type welcomeScreenContainerProps = {};
const WelcomeScreenContainer = ({}) => {

  const onGoToAuthPress = useCallback(() => {
    // forceNavigator.navigate('SignInScreen', {});
    // forceNavigator.navigate('PhoneScreen', {});
    forceNavigator.navigate('SetupProfileScreen', {});
  }, [forceNavigator]);

  const onCreateAccountPress = useCallback(() => {
    forceNavigator.navigate('SignupScreen', {});
  }, [forceNavigator]);

  const ViewProps: welcomeScreenPresenterProps = {
    onCreateAccountPress,
    onGoToAuthPress,
  };

  return (
    <WelcomeScreenPresenter {...ViewProps} />
  );
};

export { WelcomeScreenContainer };
