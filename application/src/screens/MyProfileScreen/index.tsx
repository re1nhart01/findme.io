import React, { useCallback, useRef } from 'react';
import { MyProfileScreenPresenter, myProfileScreenPresenterProps } from '@screens/MyProfileScreen/view';
import { CONSTANTS } from '@utils/constants/strings';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { forceNavigator } from '@core/Navigator';
import { imageCarouselModalForward } from '@components/common/modals/ImageCarouselModal';
import { MOCK_CAROUSEL_IMAGES } from '@utils/__remove__/mocks/images';

export type myProfileScreenContainerProps = {};

const MyProfileScreenContainer: React.FC<myProfileScreenContainerProps> = ({}) => {
  const carouselModalRef = useRef<imageCarouselModalForward>(null);
  const headerImageAnim = useRef(new Animated.Value(1)).current;

  const handleSettingsPress = useCallback(() => {
    forceNavigator.navigate('SettingsScreen', {});
  }, []);

  const handleEditBasicInformation = useCallback(() => {
    forceNavigator.navigate('EditProfileScreen', {});
  }, []);

  const handleSelectGendersPress = useCallback(() => {
    forceNavigator.navigate('SelectGenderScreen', {});
  }, []);

  const handleSelectInterestsPress = useCallback(() => {
    forceNavigator.navigate('SelectInterestsScreen', {});
  }, []);

  const handleSelectTagsPress = useCallback(() => {
    forceNavigator.navigate('SelectTagsScreen', {});
  }, []);

  const handleEditMood = useCallback(() => {
    forceNavigator.navigate('EditMoodRelationsScreen', {});
  }, []);

  const handleEditImages = useCallback(() => {
    forceNavigator.navigate('EditImagesScreen', {});
  }, []);

  const openFullScreenCarousel = useCallback(() => {
    if (carouselModalRef && carouselModalRef.current) {
      console.log()
      carouselModalRef.current.onOpen(MOCK_CAROUSEL_IMAGES);
    }
  }, []);

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = event.nativeEvent;
    const currentPercent = (y / CONSTANTS.headerMaxValue) * 100;
    headerImageAnim.flattenOffset();
    headerImageAnim.setValue(currentPercent);
  }, [headerImageAnim]);

  const ViewProps: myProfileScreenPresenterProps = {
    handleOnScroll,
    headerImageAnim,
    handleSettingsPress,
    carouselModalRef,
    openFullScreenCarousel,
    handleSelectGendersPress,
    handleSelectInterestsPress,
    handleSelectTagsPress,
    handleEditBasicInformation,
    handleEditMood,
    handleEditImages,
  };

  return (
    <MyProfileScreenPresenter {...ViewProps} />
  );
};

export { MyProfileScreenContainer };
