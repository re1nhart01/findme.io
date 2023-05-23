import React from 'react';
import { Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { Styles } from '@src/styles/load';
import { colors } from '@utils/colors';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { ImageButtonView } from '@components/ImageButtonView';

export type discoverScreenPresenterProps = {};

const DiscoverScreenPresenter: React.FC<discoverScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView
      useKeyboardAvoid={false}
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader]}
    >
      <View style={Styles.Container.screenLayout}>
        <MainHeaderView
          headerText="matches"
        />
      </View>
      <View />
    </ScreenLayoutView>
  );
};

export { DiscoverScreenPresenter };
