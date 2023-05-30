import React from 'react';
import { Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { colors } from '@utils/colors';

export type chatsScreenPresenterProps = {};

const ChatsScreenPresenter: React.FC<chatsScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView
      useKeyboardAvoid={false}
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader]}
    >
      <View style={Styles.Container.screenLayout}>
        <MainHeaderView
          LeftButton={{ hide: true }}
          headerText="direct"
          subHeaderText="chat_list"
        />
      </View>
      <View style={[]} />
    </ScreenLayoutView>
  );
};

export { ChatsScreenPresenter };
