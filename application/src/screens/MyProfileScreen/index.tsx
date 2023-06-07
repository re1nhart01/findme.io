import React, { useCallback, useRef } from 'react';
import { MyProfileScreenPresenter, myProfileScreenPresenterProps } from '@screens/MyProfileScreen/view';
import { CONSTANTS } from '@utils/constants/strings';
import { Alert, Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { imageCarouselModalForward } from '@components/common/modals/ImageCarouselModal';
import { useUserStorage } from '@reacts/hooks/useUserStorage';
import { useFocus } from '@reacts/hooks/useNavigations';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';

export type myProfileScreenContainerProps = {};

const MyProfileScreenContainer: React.FC<myProfileScreenContainerProps> = ({}) => {
  const carouselModalRef = useRef<imageCarouselModalForward>(null);
  const { userState, fetchUser, updateUserField, userData, setUserState } = useUserStorage();
  const { httpCaller } = useSafeHTTP();
  const headerImageAnim = useRef(new Animated.Value(1)).current;

  const handleRemovePhotos = useCallback(async (item: string) => {
    Alert.alert('Select action', '', [
      {
        text: 'Remove',
        onPress: async () => {
          const response = await httpCaller(RequestForge.removePhotoCall, [item]);
          if (response && response.statusCode !== 200) {
            Alert.alert('Oops', 'Something went wrong');
          } else if (userData.photos) {
            setUserState((prev: any) => {
              const filtered = prev.user.photos?.filter((el: string) => {
                return el !== item;
              });
              return { ...prev, user: { ...prev.user, photos: filtered } };
            });
          }
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  }, [httpCaller, updateUserField, userData]);

  const openFullScreenCarousel = useCallback(() => {
    if (carouselModalRef && carouselModalRef.current) {
      carouselModalRef.current.onOpen(userState.user.photos || []);
    }
  }, [userState.user.photos]);

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = event.nativeEvent;
    const currentPercent = (y / CONSTANTS.headerMaxValue) * 100;
    headerImageAnim.flattenOffset();
    headerImageAnim.setValue(currentPercent);
  }, [headerImageAnim]);

  useFocus(fetchUser, []);

  const ViewProps: myProfileScreenPresenterProps = {
    handleOnScroll,
    headerImageAnim,
    carouselModalRef,
    openFullScreenCarousel,
    userState,
    handleRemovePhotos,
  };

  return (
    <MyProfileScreenPresenter {...ViewProps} />
  );
};

export { MyProfileScreenContainer };
