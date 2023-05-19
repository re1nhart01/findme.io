import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';

export type myProfileScreenPresenterProps = {};

const MyProfileScreenPresenter: React.FC<myProfileScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView backgroundColor={colors.whiteFF} styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}>
      <Text>Discover</Text>
    </ScreenLayoutView>
  );
};

export { MyProfileScreenPresenter };
