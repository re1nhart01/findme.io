import React from 'react';
import { Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';
import { colors } from '@utils/colors';
import { StatelessButtonMatrixView } from '@components/ButtonMatrixView';
import EraseIcon from '@assets/svg/erase.svg';

export type verifyScreenPresenterProps = {};

const VerifyScreenPresenter: React.FC<verifyScreenPresenterProps> = ({}) => {
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
      <View>
        <StatelessButtonMatrixView
          onNumberButtonPress={() => {}}
          eraseButton={{
            icon: <EraseIcon />,
            disabled: false,
            onPress: () => {} }}
        />
      </View>
    </ScreenLayoutView>
  );
};

export { VerifyScreenPresenter };
