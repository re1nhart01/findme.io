import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image } from 'react-native';

type transitionCarouselItemViewProps = {
    styles?: {};
    uri: string;
    currentIndex: number;
    activeIndex: number;
};

const minValue = 0;
const maxValue = 75;
const TransitionCarouselItemView: React.FC<transitionCarouselItemViewProps> = ({ currentIndex, activeIndex, styles, uri }) => {
  const transitionY = useRef(new Animated.Value(maxValue)).current;

  useEffect(() => {
    if (currentIndex === activeIndex) {
      Animated.timing(transitionY, {
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
        toValue: 0,
      }).start();
    } else {
      Animated.timing(transitionY, {
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
        toValue: 75,
      }).start();
    }
  }, [currentIndex, activeIndex]);

  return (
    <Animated.View style={{ width: 322, height: 400, backgroundColor: 'red', transform: [{ translateY: transitionY }], marginHorizontal: 10 }}>
      <Image source={{ uri }} style={[styles, { width: '100%', height: '100%' }]} />
    </Animated.View>
  );
};

export { TransitionCarouselItemView };
