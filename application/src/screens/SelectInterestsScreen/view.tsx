import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';

export type selectInterestsScreenPresenterProps = {};

const SelectInterestsScreenPresenter: React.FC<selectInterestsScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>Discover</Text>
    </ScreenLayoutView>
  );
};

export { SelectInterestsScreenPresenter };
