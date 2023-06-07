import { TextView } from '@components/TextView';
import React, { memo } from 'react';
import { Styles } from '@styles/load';
import { Animated, View } from 'react-native';
import { DEVICE_WIDTH, hDP } from '@utils/scaling';
import { firebase_base_url } from '@utils/constants/strings';

type animatedAvatarViewProps = {
    animationValue: Animated.Value;
    inputValue: Array<number>;
    outputValue: Array<number>;
    avatarUrl: string;
};

const AnimatedAvatarView: React.FC<animatedAvatarViewProps> = ({ animationValue, outputValue, inputValue, avatarUrl }) => {
  const getURI = () => {
    if (avatarUrl) {
      return { uri: `${firebase_base_url(avatarUrl)}&d=${new Date().toString()}` };
    }
    return require('@assets/img/photo.png');
  };
  return (
    <View style={{ backgroundColor: '#000000' }}>
      <Animated.Image
        style={{ width: DEVICE_WIDTH,
          height: hDP(415),
          resizeMode: 'cover',
          opacity: animationValue.interpolate({
            inputRange: inputValue,
            outputRange: outputValue,
            extrapolate: 'clamp',
          }) }}
        source={getURI()}
      />
    </View>
  );
};

export default memo(AnimatedAvatarView);
