import React, { useCallback } from 'react';
import { PhoneScreenPresenter, phoneScreenPresenterProps } from '@screens/PhoneScreen/view';
import { forceNavigator } from '@core/Navigator';

type phoneScreenContainerProps = {};
const PhoneScreenContainer: React.FC<phoneScreenContainerProps> = ({}) => {
  const onContinuePress = useCallback(() => {
    forceNavigator.navigate('VerifyPhoneScreen', {});
  }, [forceNavigator]);

  const ViewProps: phoneScreenPresenterProps = {
    onContinuePress,
  };

  return (
    <PhoneScreenPresenter {...ViewProps} />
  );
};

export { PhoneScreenContainer };
