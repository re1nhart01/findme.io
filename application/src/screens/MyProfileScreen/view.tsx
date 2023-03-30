import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';

export type myProfileScreenPresenterProps = {};

const MyProfileScreenPresenter: React.FC<myProfileScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>Discover</Text>
    </ScreenLayoutView>
  );
};

export { MyProfileScreenPresenter };
