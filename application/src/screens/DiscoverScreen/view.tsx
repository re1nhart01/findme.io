import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';

export type discoverScreenPresenterProps = {};

const DiscoverScreenPresenter: React.FC<discoverScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>Discover</Text>
    </ScreenLayoutView>
  );
};

export { DiscoverScreenPresenter };
