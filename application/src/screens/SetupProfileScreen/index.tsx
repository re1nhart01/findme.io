import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SetupProfileScreenPresenter, setupProfileScreenPresenterProps } from '@screens/SetupProfileScreen/view';
import { useTypedDispatch, useTypedSelector } from '@reacts/hooks/useRedux';
import { IAdditionalUserRegisterInfo, IBasicUserRegisterInfo, ILocationUserRegisterInfo } from '@type/models/user';
import { userRegisterActions } from '@redux/slices/auth/user-register.slice';
import { ScrollView } from 'react-native';
import { DEVICE_WIDTH } from '@utils/scaling';
import { forceNavigator } from '@core/Navigator';
import { userRegisterThunk } from '@redux/slices/auth/user-register.thunk';

export type setupProfileScreenContainerProps = {};

const SetupProfileScreenContainer: React.FC<setupProfileScreenContainerProps> = ({}) => {
  const [currentActiveSlide, setCurrentActiveSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const dispatch = useTypedDispatch();
  const state = useTypedSelector((state) => state.user_register);

  const _onScrollView = useCallback((idx: number) => {
    const nextSlide = DEVICE_WIDTH * idx;
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: nextSlide,
        animated: true,
      });
      setCurrentActiveSlide((prev) => prev + 1);
    }
  }, [scrollRef]);

  const onGoBack = useCallback(() => {
    if (currentActiveSlide === 0) {
      forceNavigator.erase(true);
      forceNavigator.navigate('WelcomeScreen', {});
      return;
    }
    const prevSlide = DEVICE_WIDTH * (currentActiveSlide - 1);
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: prevSlide,
        animated: true,
      });
    }
    setCurrentActiveSlide((prev) => prev - 1);
  }, [currentActiveSlide, scrollRef]);

  const onInitialSetupPress = useCallback((values: IBasicUserRegisterInfo) => {
    dispatch(userRegisterActions.updateBasicInformationData(values));
    _onScrollView(1);
  }, [dispatch, _onScrollView]);

  const onUserSetupPress = useCallback((values: IAdditionalUserRegisterInfo) => {
    dispatch(userRegisterActions.updateUserInformationData(values));
    _onScrollView(2);
  }, [dispatch, _onScrollView]);

  const onFinish = useCallback(async (values: ILocationUserRegisterInfo) => {
    dispatch(userRegisterActions.updateLocationInformationData(values));
    await dispatch(userRegisterThunk(state));
  }, [dispatch]);

  const ViewProps: setupProfileScreenPresenterProps = {
    scrollRef,
    onInitialSetupPress,
    onUserSetupPress,
    onFinish,
    onGoBack,
    state,
  };

  return (
    <SetupProfileScreenPresenter {...ViewProps} />
  );
};

export { SetupProfileScreenContainer };
