import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { TextView } from '@components/TextView';
import { AnimatedTextInputView } from '@components/AnimatedTextInputView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { SelectBirthdayView } from '@components/SelectBirthdayView';
import { FormadjoForm } from '@core/Validators/FormadjoForm';
import {
  IBasicInformationFormTemplate,
  IPersonalInformationFormTemplate,
  basicInformationFormTemplate, personalInformationFormTemplate,
} from '@utils/forms';
import { wDP } from '@utils/scaling';
import { ImageButtonView } from '@components/ImageButtonView';

import RightArrowIcon from '@assets/svg/rightArrow.svg';

export type setupProfileScreenPresenterProps = {};

const SetupProfileScreenPresenter: React.FC<setupProfileScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader]}
    >
      <View style={[Styles.Container.screenLayout]}>
        <MainHeaderView
          headerText="configure"
          subHeaderText="account"
          LeftButton={{ hide: true }}
        />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
      >
        {/* BASIC INFORMATION */}
        <FormadjoForm<IBasicInformationFormTemplate>
          initialProps={{ email: '', password: '', rePassword: '', username: '' }}
          onFinishSubmit={(v) => { console.log(v); }}
          form={basicInformationFormTemplate}
        >
          {({ values,
            updateFormState,
            updateManyFormState,
            onSubmit,
            errorsList,
          }) => {
            return (
              <View style={[Styles.Container.screenLayout, Styles.MarginPadding.mt50, Styles.Layout.w_device]}>
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
                <View style={[Styles.Layout.w100, Styles.Layout.flexRow, Styles.Layout.jc_fe, Styles.MarginPadding.mt75pc]}>
                  <ImageButtonView
                    styles={[
                      Styles.Container.redBorder3,
                      Styles.Layout.wh65_px,
                      Styles.Layout.fullRad,
                      Styles.Layout.flexCenter,
                    ]}
                    width={wDP(25)}
                    height={wDP(25)}
                    Icon={RightArrowIcon}
                  />
                </View>
              </View>
            );
          }}
        </FormadjoForm>

        {/* ADVANCED INFORMATION */}
        <FormadjoForm<IPersonalInformationFormTemplate>
          initialProps={{ firstName: '', lastName: '', birthday: Date.now(), details: '' }}
          onFinishSubmit={(v) => { console.log(v); }}
          form={personalInformationFormTemplate}
        >
          {({ values,
            updateFormState,
            updateManyFormState,
            onSubmit,
            errorsList,
          }) => {
            return (
              <View style={[Styles.Container.screenLayout, Styles.Layout.w_device]}>
                <View style={Styles.MarginPadding.mt50}>
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
                <View style={[Styles.MarginPadding.mt10]}>
                  <SelectBirthdayView />
                </View>
                <View style={[Styles.Layout.w100, Styles.Layout.flexRow, Styles.Layout.jc_fe, Styles.MarginPadding.mt75pc]}>
                  <ImageButtonView
                    styles={[
                      Styles.Container.redBorder3,
                      Styles.Layout.wh65_px,
                      Styles.Layout.fullRad,
                      Styles.Layout.flexCenter,
                    ]}
                    width={wDP(25)}
                    height={wDP(25)}
                    Icon={RightArrowIcon}
                  />
                </View>
              </View>
            );
          }}
        </FormadjoForm>
      </ScrollView>
    </ScreenLayoutView>
  );
};

export { SetupProfileScreenPresenter };
