import React, { useCallback, useRef } from 'react';
import { MyProfileScreenPresenter, myProfileScreenPresenterProps } from '@screens/MyProfileScreen/view';
import { CONSTANTS } from '@utils/constants/strings';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type myProfileScreenContainerProps = {};

const MyProfileScreenContainer: React.FC<myProfileScreenContainerProps> = ({}) => {
  const headerImageAnim = useRef(new Animated.Value(1)).current;

  const handleSettingsPress = useCallback(() => {

  }, []);

  const handleNameAndBirthdaySettingsPress = useCallback(() => {

  }, []);

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = event.nativeEvent;
    const currentPercent = (y / CONSTANTS.headerMaxValue) * 100;
    if (currentPercent > 100) return;
    headerImageAnim.flattenOffset();
    headerImageAnim.setValue(currentPercent);
  }, [headerImageAnim]);

  const ViewProps: myProfileScreenPresenterProps = {
    handleOnScroll,
    headerImageAnim,
  };

  return (
    <MyProfileScreenPresenter {...ViewProps} />
  );
};

export { MyProfileScreenContainer };
