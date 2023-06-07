import React, { useCallback, useRef, useState } from 'react';
import { UserProfileScreenPresenter, userProfileScreenPresenterProps } from '@screens/UserProfileScreen/view';
import { CONSTANTS } from '@utils/constants/strings';
import { Alert, Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { Route, RouteProp, useNavigation } from '@react-navigation/native';
import { useFocus } from '@reacts/hooks/useNavigations';
import { userData } from '@type/models/user';
import { RequestForge } from '@core/http/RequestForge';
import {imageCarouselModalForward} from "@components/common/modals/ImageCarouselModal";

export type userProfileScreenContainerProps = {
  route: RouteProp<{ params: { user_hash: string } }>
};

const UserProfileScreenContainer: React.FC<userProfileScreenContainerProps> = ({ route }) => {
  const userHash = route.params.user_hash;
  const carouselModalRef = useRef<imageCarouselModalForward>(null);
  const [userModel, setUser] = useState<userData>({
    active: false,
    birthday: '',
    city: '',
    country: '',
    details: '',
    email: '',
    full_name: '',
    gender: '',
    id: 0,
    interests: [],
    lat: 0,
    long: 0,
    looking_for: '',
    mood: '',
    phone: '',
    photos: [],
    relations: '',
    tags: [],
    user_hash: '',
  });
  const { httpCaller } = useSafeHTTP();

  const headerImageAnim = useRef(new Animated.Value(1)).current;

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = event.nativeEvent;
    const currentPercent = (y / CONSTANTS.headerMaxValue) * 100;
    if (currentPercent > 100) return;
    headerImageAnim.flattenOffset();
    headerImageAnim.setValue(currentPercent);
  }, [headerImageAnim]);

  const fetchUser = useCallback(async () => {
    const response = await httpCaller(RequestForge.getUserByUserHash, userHash);
    if (response && response?.data) {
      setUser(response.data);
    } else {
      Alert.alert('Warning', 'Something went wrong on getting user');
    }
  }, []);

  const openFullScreenCarousel = useCallback(() => {
    if (carouselModalRef && carouselModalRef.current) {
      carouselModalRef.current.onOpen(userModel.photos || []);
    }
  }, [userModel.photos]);

  const ViewProps: userProfileScreenPresenterProps = {
    handleOnScroll,
    headerImageAnim,
    userModel,
    openFullScreenCarousel,
    carouselModalRef,
  };

  useFocus(fetchUser, []);

  return (
    <UserProfileScreenPresenter {...ViewProps} />
  );
};

export { UserProfileScreenContainer };
