import React, { useCallback, useRef, useState } from 'react';
import { Animated, Easing, ImageSourcePropType, Keyboard, TextInput, View } from "react-native";
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';
import I18next from '@src/locale/i18next';

type textInputViewProps = {
  leftIcon?: any;
  rightIcon?: any;
  placeholder?: string;
  onChange: (v: string) => void;
  mLength?: number;
  styles?: {
    outline?: {};
    input?: {};
  };
  autoCapitalize?: 'none' | 'sentences' | 'words';
  editable?: boolean;
  onFocus?(): void;
  onBlur?(): void;
  placeholderColor?: string;
  activeOpacity?: number;
  debounced?: boolean;
  multiline?: boolean;
  returnKeyLabel?: string;
};

type textInputViewState = Required<{
  searchValue: string;
  active: boolean;
}>;
const AnimatedTextInputView: React.FC<textInputViewProps> = ({
  autoCapitalize,
  debounced,
  editable,
  onBlur,
  placeholderColor,
  onFocus,
  styles,
  mLength,
  placeholder,
  onChange,
  multiline,
  returnKeyLabel }) => {
  const [get, set] = useState<textInputViewState>({
    searchValue: '',
    active: false,
  });
  let timer: null | any = null;
  const translationValueX = useRef(new Animated.Value(0));
  const translationValueY = useRef(new Animated.Value(0));

  const handleOnChange = useCallback((value: string) => {
    set({ ...get, searchValue: value });
    if (debounced) {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(async () => {
        onChange && onChange(value);
      }, 300);
    } else {
      onChange && onChange(value);
    }
  }, [get.active, set, onChange, timer, debounced]);

  const handleOnPressInput = useCallback(() => {
    Animated.parallel([Animated.timing(translationValueX.current, {
      toValue: 20,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(translationValueY.current, {
      toValue: -30,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    })]).start();
    set({ ...get, active: true });
  }, [get]);

  const handleOnFocus = useCallback(() => {
    onFocus && onFocus();
  }, [get, onFocus]);

  const handleOnBlur = useCallback(() => {
    translationValueY.current = new Animated.Value(0);
    translationValueX.current = new Animated.Value(0);
    set({ ...get, active: false });
    onBlur && onBlur();
  }, [get, onBlur]);

  return (
    <View style={[Styles.Layout.flexRow, Styles.Layout.ai_c, styles?.outline]}>
      {
        placeholder && get.active && (
        <Animated.View
          style={[Styles.Container.animatedInputPlaceholder, Styles.Layout.absolute, {
            transform: [
              { translateY: translationValueY.current },
              { translateX: translationValueX.current },
            ],
          }]}
        >
          <TextView
            text={placeholder}
            styles={[Styles.Text.placeholderText]}
          />
        </Animated.View>
        )
}
      <TextInput
        numberOfLines={1}
        style={[Styles.Layout.w100, styles?.input]}
        onChangeText={handleOnChange}
        placeholder={get.active ? '' : I18next.t(placeholder as string).toString()}
        maxLength={mLength}
        multiline={multiline}
        returnKeyLabel={returnKeyLabel}
        autoCapitalize={autoCapitalize}
        editable={editable}
        onFocus={handleOnFocus}
        onPressIn={handleOnPressInput}
        onBlur={handleOnBlur}
        placeholderTextColor={placeholderColor}
        value={get.searchValue}
      />
    </View>
  );
};

export { AnimatedTextInputView };