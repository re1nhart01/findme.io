import React, { useCallback, useRef, useState } from 'react';
import { Animated, Easing, TextInput, View } from 'react-native';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';
import I18next from '@src/locale/i18next';
import { TextInputAndroidProps } from 'react-native/Libraries/Components/TextInput/TextInput';

export type textInputViewProps = {
  value?: string;
  defaultValue?: string;
  autoComplete?: TextInputAndroidProps['autoComplete'];
  isError?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  placeholder?: string;
  onChange: (v: string) => void;
  mLength?: number;
  styles?: {
    outline?: {};
    input?: {};
    error?: {},
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
  value,
  defaultValue,
  autoComplete,
  isError,
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
    searchValue: defaultValue || '',
    active: false,
  });
  const inputRef = useRef<TextInput>(null);
  const timer = useRef<null | number>(null);
  const translationValueX = useRef(new Animated.Value(defaultValue !== '' ? 20 : 0));
  const translationValueY = useRef(new Animated.Value(defaultValue !== '' ? -30 : 0));

  const handleOnChange = useCallback((value: string) => {
    set({ ...get, searchValue: value });
    if (debounced) {
      if (timer.current !== null) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      timer.current = setTimeout(async () => {
        onChange && onChange(value);
      }, 300);
    } else {
      onChange && onChange(value);
    }
  }, [get.active, set, onChange, timer, debounced]);

  const animatePlaceholder = useCallback((v1: number, v2: number) => {
    Animated.parallel([Animated.timing(translationValueX.current, {
      toValue: v1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }),
    Animated.timing(translationValueY.current, {
      toValue: v2,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    })]).start();
  }, []);

  const handleOnFocus = useCallback(() => {
    animatePlaceholder(20, -30);
    onFocus && onFocus();
  }, [animatePlaceholder, onFocus]);

  const handleOnBlur = useCallback(() => {
    if (!value && !get.searchValue) {
      animatePlaceholder(0, 0);
    }
    onBlur && onBlur();
  }, [animatePlaceholder, get.searchValue, onBlur, value]);

  return (
    <View style={[Styles.Layout.flexRow, Styles.Layout.ai_c, styles?.outline, isError && styles?.error]}>
      {
        placeholder && (
        <Animated.View
          pointerEvents="none"
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
        ref={inputRef}
        autoComplete={autoComplete}
        numberOfLines={1}
        style={[Styles.Layout.w100, styles?.input]}
        onChangeText={handleOnChange}
//        placeholder={get.active ? '' : I18next.t(placeholder as string).toString()}
        maxLength={mLength}
        multiline={multiline}
        returnKeyLabel={returnKeyLabel}
        autoCapitalize={autoCapitalize}
        editable={editable}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        placeholderTextColor={placeholderColor}
        value={value || get.searchValue}
      />
    </View>
  );
};

export { AnimatedTextInputView };
