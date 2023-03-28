import React, { useCallback } from 'react';
import { GestureResponderEvent, Insets, Pressable, TouchableOpacity } from 'react-native';
import { TextView } from '@components/TextView';

type pressableTextViewProps = {
    text: string;
    color?: string;
    styles?: {
        text?: {};
        outline?: {};
    };
    hitSlop?: Insets;
    onPress?: (event: GestureResponderEvent) => void;
    numberOfLines?: number;
};
const PressableTextView: React.FC<pressableTextViewProps> = ({ hitSlop, text, styles, color, onPress, numberOfLines }) => {
  const handleOnPress = useCallback((event: GestureResponderEvent) => {
    onPress && onPress(event);
  }, [onPress]);

  return (
    <Pressable
      style={styles?.outline}
      onPress={handleOnPress}
      hitSlop={hitSlop}
    >
      <TextView text={text} styles={styles?.text} numberOfLines={numberOfLines} />
    </Pressable>
  );
};

export { PressableTextView }
