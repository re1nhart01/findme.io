import { Text, View } from 'react-native';
import React from 'react';
import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { NumberInputView } from '@components/NumberInputView';
import { colors } from '@utils/colors';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';

export type phoneScreenPresenterProps = {
  onContinuePress(): void;
};
const PhoneScreenPresenter: React.FC<phoneScreenPresenterProps> = ({ onContinuePress }) => {
  return (
    <ScreenLayoutView
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
    >
      <MainHeaderView />
      <View style={[Styles.MarginPadding.mt32]}>
        <TextView text="my_phone" styles={Styles.Text.bigBoldBlack34} />
        <TextView text="my_phone_msg" styles={Styles.Text.smallText13Black} />
      </View>
      <View style={[Styles.Layout.w100, Styles.MarginPadding.mt32]}>
        <NumberInputView
          value=""
          disabled={false}
          onChange={() => {}}
        />
      </View>
      <View style={Styles.MarginPadding.mt18pc}>
        <PrimaryButtonView
          onPress={onContinuePress}
          styles={{ outline: Styles.Button.primaryButton, text: Styles.Text.primaryButtonText }}
          text="continue"
        />
      </View>
    </ScreenLayoutView>
  );
};

export { PhoneScreenPresenter };
