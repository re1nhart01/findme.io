import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '@utils/colors';

type defaultLoaderViewProps = {
  show: boolean;
  style?: {};
  color: string;
  size: number;
};
const DefaultLoaderView: React.FC<defaultLoaderViewProps> = ({ size, color, style, show }) => {
  if (!show) {
    return null;
  }

  return (
    <View style={style}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

export { DefaultLoaderView };
