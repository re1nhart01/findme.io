import React, { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import {
  AnimatedTextInputView,
  textInputViewProps,
} from '@components/AnimatedTextInputView';
import { Styles } from '@styles/load';
import I18next from '@src/locale/i18next';

export type typeOfOptions = {
  label: string;
  value: string | number;
  isService?: boolean;
};

type optionsInputViewProps = {
    inputProps: textInputViewProps;
    list: Array<{label: string; value: string | number; isService?: boolean}>
    onPressAdd(v: string): void;
    onPressExist(item: typeOfOptions): void;
};

type optionsInputViewState = {
  isFocused: boolean;
  inputValue: string;
}

const OptionsInputView: React.FC<optionsInputViewProps> = ({ inputProps, list, onPressAdd, onPressExist }) => {
  const [{ inputValue, isFocused }, setState] = useState<optionsInputViewState>({
    inputValue: '',
    isFocused: false,
  });
  const listWithAddFunc = useMemo(() => ([
    { label: I18next.t('❤️‍🔥 Add new Tag'), value: -1, isService: true },
    ...list,
  ]), [list]);

  const onFocus = useCallback(() => {
    setState((prev) => ({ ...prev, isFocused: true }));
  }, []);

  const onBlur = useCallback(() => {
    setState((prev) => ({ ...prev, isFocused: false }));
  }, []);

  const handlePressItem = useCallback((item: typeOfOptions) => {
    if (item?.isService) {
      onPressAdd(inputValue);
      return;
    }
    onPressExist(item);
  }, [inputValue, onPressAdd, onPressExist]);

  return (
    <View>
      <AnimatedTextInputView
        {...inputProps}
        styles={{
          error: [Styles.Container.redBorder1],
          outline: [
            Styles.Container.animatedInputContainer,
            isFocused ? Styles.Container.animatedInputContainer_bottomCorner : {},
            Styles.MarginPadding.mt10,
          ],
          input: [
            Styles.Input.animatedInputText,
            Styles.Text.smallText13Black],
        }}
        value={inputValue}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(v) => setState((prev) => ({ ...prev, inputValue: v }))}
      />
      {isFocused && (
        <TouchableOpacity
          onPress={() => {}}
          style={[
            Styles.Layout.absolute,
            Styles.Container.optionMenuContainer,
            Styles.Container.animatedInputContainer_cornerFull,
            Styles.Layout.zIndex100,
          ]}
        >
          <FlatList
            keyboardShouldPersistTaps="always"
            contentContainerStyle={Styles.Container.animatedInputContainer_cornerFull}
            data={listWithAddFunc}
            keyExtractor={(item, index) => `INPUT_${item.label}_${index}`}
            renderItem={({ item, index }: { item: typeOfOptions; index: number }) => {
              return (
                <TouchableOpacity
                  onPress={() => { handlePressItem(item); }}
                  style={[
                    Styles.Layout.w100,
                    Styles.Layout.flexCenter,
                    Styles.Layout.h35,
                    Styles.Container.whiteF3Border1,
                    item?.isService ? Styles.Container.whiteF3BackgroundColor : Styles.Container.whiteFFBackgroundColor]}
                >
                  <Text style={[Styles.Text.textCenter, Styles.Text.smallTextBold18]}>{item.label}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(OptionsInputView);
