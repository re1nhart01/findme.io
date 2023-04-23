import React from 'react';
import { Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { TextView } from '@components/TextView';
import { AnimatedTextInputView } from '@components/AnimatedTextInputView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { SelectBirthdayView } from '@components/SelectBirthdayView';

export type setupProfileScreenPresenterProps = {};

const SetupProfileScreenPresenter: React.FC<setupProfileScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
    >
      <MainHeaderView
        headerText="configure"
        subHeaderText="account"
        LeftButton={{ hide: true }}
        rightButton={(
          <PrimaryButtonView
            styles={{
              outline: [Styles.Layout.flexCenter, Styles.Layout.jc_fe, Styles.Layout.h60],
              text: [Styles.Text.textCenter, Styles.Text.smallText14Black] }}
            text="next"
          />
      )}
      />
      <View style={Styles.MarginPadding.mt10}>
        <View style={[Styles.MarginPadding.ml8]}>
          <TextView text="basic_info" styles={Styles.Text.smallTextBold18} />
        </View>
        <AnimatedTextInputView
          placeholderColor={colors.black00_40}
          placeholder="Email"
          onChange={() => {}}
          styles={{ outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10], input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
        />
        <AnimatedTextInputView
          placeholderColor={colors.black00_40}
          placeholder="Username"
          onChange={() => {}}
          styles={{ outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10], input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
        />
        <AnimatedTextInputView
          placeholderColor={colors.black00_40}
          placeholder="Password"
          onChange={() => {}}
          styles={{ outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10], input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
        />
        <AnimatedTextInputView
          placeholderColor={colors.black00_40}
          placeholder="Re-Password"
          onChange={() => {}}
          styles={{ outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10], input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
        />
      </View>
      <View style={Styles.MarginPadding.mt20}>
        <View style={[Styles.MarginPadding.ml8]}>
          <TextView text="some_info_about_you" styles={Styles.Text.smallTextBold18} />
        </View>
        <AnimatedTextInputView
          placeholderColor={colors.black00_40}
          placeholder="First Name"
          onChange={() => {}}
          styles={{ outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10], input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
        />
        <AnimatedTextInputView
          placeholderColor={colors.black00_40}
          placeholder="Last Name"
          onChange={() => {}}
          styles={{ outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10], input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
        />
        <AnimatedTextInputView
          multiline
          placeholderColor={colors.black00_40}
          placeholder="Provide some details about you"
          onChange={() => {}}
          styles={{ outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10], input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
        />
      </View>
      <View>
        <SelectBirthdayView />
      </View>
    </ScreenLayoutView>
  );
};

export { SetupProfileScreenPresenter };
