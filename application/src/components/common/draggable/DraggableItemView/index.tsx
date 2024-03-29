import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  GestureResponderEvent,
  Image, NativeScrollEvent, NativeSyntheticEvent,
  PanResponder,
  Text,
  View,
} from 'react-native';
import { DEVICE_WIDTH, hDP, wDP } from '@utils/scaling';
import { UserDistanceView } from '@components/UserDistanceView';
import { StepDotsView } from '@components/StepDotsView';
import { Styles } from '@src/styles/load';
import { IUserDiscoverModelShort } from '@type/models/user';
import { panAndSkewAnimation } from '@utils/helpers';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';
import {firebase_base_url} from "@utils/constants/strings";

type draggableItemViewProps = {
  index: number;
  model: IUserDiscoverModelShort;
  handleSwipePress: (user_hash: string, op: ('LIKE' | 'DISLIKE')) => Promise<boolean>
};
type draggableItemViewState = {
  activeImage: number;
  photos: string[],
};

const DraggableItemView: React.FC<draggableItemViewProps> = ({ index, model, handleSwipePress }) => {
  const [getState, setState] = useState<draggableItemViewState>({
    activeImage: 0,
    photos: [],
  });
  const { httpCaller } = useSafeHTTP();
  const pan = useRef(new Animated.ValueXY({ x: wDP(0), y: 0 })).current;
  const skewValue = useRef(new Animated.Value(0)).current;
  const calculatedDistance = useMemo(() => {
    return Math.round(Math.random() * 10);
  }, []);

  const fetchPhotos = useCallback(async () => {
    const response = await httpCaller(RequestForge.getPhotos, model.user_hash);
    if (response && response?.data) {
      setState({ ...getState, photos: response.data });
    }
  }, [getState, httpCaller, model.user_hash]);

  useEffect(() => {
    fetchPhotos().then();
  }, []);

  const getURI = (photo_bucket: string) => {
    if (photo_bucket) {
      return { uri: `${firebase_base_url(photo_bucket)}` };
    }
    return require('@assets/img/photo.png');
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { dx } = gestureState;
        skewValue.flattenOffset();
        skewValue.setValue(dx);
        Animated.event([null, {
          dx: pan.x,
        }], { useNativeDriver: false })(e, gestureState);
      },
      onPanResponderRelease: (event: GestureResponderEvent) => {
        console.log(event.nativeEvent);
        const { pageX } = event.nativeEvent;
        if (pageX <= 30 || pageX >= DEVICE_WIDTH - 30) {
          if (pageX <= 30) {
            handleSwipePress(model.user_hash, 'DISLIKE').then((res) => {
              if (res) {
                panAndSkewAnimation(pan, skewValue, -999, -999);
              }
            });
          }
          if (pageX >= DEVICE_WIDTH - 30) {
            handleSwipePress(model.user_hash, 'LIKE').then((res) => {
              if (res) {
                panAndSkewAnimation(pan, skewValue, 999, 999);
              }
            });
          }
        } else {
          pan.flattenOffset();
          skewValue.flattenOffset();
          panAndSkewAnimation(pan, skewValue);
        }
      },
    }),
  ).current;

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSize = event.nativeEvent.layoutMeasurement.height;
    const contentOffset = event.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffset / viewSize);
    if (currentIndex !== getState.activeImage) {
      setState((prev) => ({ ...prev, activeImage: currentIndex }));
    }
  }, [getState]);

  const renderImageList = ({ item, index }: {item: string; index: number}) => {
    return (
      <Image
        style={[
          Styles.Layout.w100,
          Styles.Layout.borderR15,
          Styles.Layout.h480,
          Styles.Layout.cover,
        ]}
        source={getURI(item)}
      />
    );
  };

  return (
    <Animated.View
      renderToHardwareTextureAndroid
      style={[Styles.Layout.absolute,
        Styles.Layout.w100,
        { backgroundColor: 'white' },
        Styles.Layout.borderR15, {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { skewY: skewValue.interpolate({
              inputRange: [0, DEVICE_WIDTH],
              outputRange: ['0deg', '30deg'],
            }),
            }],
        }]}
      {...panResponder.panHandlers}
    >
      <View style={[Styles.Layout.w100, Styles.Layout.h480]}>
        <View style={Styles.Container.mapLayout}>
          <UserDistanceView distance={`${calculatedDistance} km`} />
        </View>
        <View style={Styles.Container.dotsLayout}>
          <StepDotsView activeIndex={getState.activeImage} count={getState.photos?.length || 0} />
        </View>
        <View style={[Styles.Container.discoverCardInfo, Styles.MarginPadding.ph15]}>
          <Text numberOfLines={2} style={Styles.Text.mediumText24White}>
            {model.full_name}
            ,
            {' '}
            {model.age}
          </Text>
          <Text numberOfLines={4} style={Styles.Text.smallText16White}>{model.details}</Text>
        </View>
        <View>
          <FlatList
            onScroll={handleOnScroll}
            data={getState.photos.length <= 0 ? [null] : getState.photos}
            renderItem={renderImageList}
            keyExtractor={(item, index) => `${item}${index}`}
            disableScrollViewPanResponder
            decelerationRate="fast"
            pagingEnabled
            horizontal={false}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export { DraggableItemView };
