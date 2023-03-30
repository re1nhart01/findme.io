import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';

export type matchesScreenPresenterProps = {};

const MatchesScreenPresenter: React.FC<matchesScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>Matches</Text>
    </ScreenLayoutView>
  );
};

export { MatchesScreenPresenter };
