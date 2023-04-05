import React from 'react';
import { Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { colors } from '@utils/colors';
import { TextView } from '@components/TextView';
import { Styles } from '@styles/load';
import { AnimatedTextInputView } from '@components/AnimatedTextInputView';
import { PrimaryButtonView } from "@components/PrimaryButtonView";

export type signInScreenPresenterProps = {};

const SignInScreenPresenter: React.FC<signInScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView backgroundColor={colors.whiteFF} styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayout]}>
      <View>
        <TextView text="sign_in" styles={Styles.Text.bigBoldBlack34} />
        <TextView text="sign_in_msg" styles={Styles.Text.smallText14Black} />
      </View>
      <View style={Styles.MarginPadding.mt40}>
        <AnimatedTextInputView
          placeholderColor={colors.black00_40}
          placeholder="login"
          onChange={() => {}}
          styles={{ outline: Styles.Container.animatedInputContainer, input: Styles.Input.animatedInputText }}
        />
        <AnimatedTextInputView
          placeholderColor={colors.black00_40}
          placeholder="password"
          onChange={() => {}}
          styles={{ outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10], input: Styles.Input.animatedInputText }}
        />
      </View>
      <View style={Styles.MarginPadding.mt18pc}>
        <PrimaryButtonView
          styles={{ outline: Styles.Button.primaryButton, text: Styles.Text.primaryButtonText }}
          text="log_in"
        />
      </View>
    </ScreenLayoutView>
  );
};

export { SignInScreenPresenter };
