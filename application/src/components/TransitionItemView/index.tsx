import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, ImageSourcePropType } from "react-native";

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
        toValue: 1,
      }).start();
    } else {
      Animated.timing(transitionY, {
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
        toValue: 0.8,
      }).start();
    }
  }, [currentIndex, activeIndex]);

  return (
    <Animated.View style={{ width: 235, height: 360, backgroundColor: 'red', transform: [{ scale: transitionY }], borderRadius: 15 }}>
      <Image source={uri as ImageSourcePropType} style={[styles, { width: '100%', height: '100%', borderRadius: 15}]} />
    </Animated.View>
  );
};

export { TransitionCarouselItemView };
