import React, { useCallback, useState } from 'react';
import { PhoneScreenPresenter, phoneScreenPresenterProps } from '@screens/PhoneScreen/view';
import { forceNavigator } from '@core/Navigator';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@reacts/hooks/useRedux';
import { userRegisterActions } from '@redux/slices/auth/user-register.slice';

type phoneScreenContainerProps = {};
const PhoneScreenContainer: React.FC<phoneScreenContainerProps> = ({}) => {
  const dispatch = useDispatch();
  const state = useTypedSelector((state) => state.user_register);

  const onUpdatePhone = useCallback(async (value: string) => {
    await dispatch(userRegisterActions.updatePhoneNumber(value));
  }, [dispatch]);

  const onContinuePress = useCallback(async (values: { phone: string }) => {
    await onUpdatePhone(values.phone);

    forceNavigator.navigate('VerifyPhoneScreen', {});
  }, [forceNavigator, onUpdatePhone]);

  const ViewProps: phoneScreenPresenterProps = {
    onContinuePress,
  };

  return (
    <PhoneScreenPresenter {...ViewProps} />
  );
};

export { PhoneScreenContainer };
