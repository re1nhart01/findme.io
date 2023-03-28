import React, { useCallback } from 'react';
import { GestureResponderEvent, Insets, TouchableOpacity } from 'react-native';
import { TextView } from '@components/TextView';

type primaryButtonViewProps = {
    text: string;
    styles?: {
        outline?: {};
        text?: {};
    }
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    activeOpacity?: number;
    delayLongPress?: number;
    hitSlop?: Insets;
    numberOfLines?: number;
};

const PrimaryButtonView: React.FC<primaryButtonViewProps> = ({
  delayLongPress,
  onLongPress,
  onPress,
  hitSlop,
  activeOpacity,
  styles,
  text,
  numberOfLines }) => {

  const handleOnPress = useCallback((event: GestureResponderEvent) => {
    onPress && onPress(event);
  }, [onPress]);

  const handleOnLongPress = useCallback((event: GestureResponderEvent) => {
    onLongPress && onLongPress(event);
  }, [onLongPress]);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={handleOnPress}
      onLongPress={handleOnLongPress}
      hitSlop={hitSlop}
      delayLongPress={delayLongPress}
      style={styles?.outline}
    >
      <TextView text={text} styles={styles?.text} numberOfLines={numberOfLines} />
    </TouchableOpacity>
  );
};

export { PrimaryButtonView };
