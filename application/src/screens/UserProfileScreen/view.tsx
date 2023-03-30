import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';

export type userProfileScreenPresenterProps = {};

const UserProfileScreenPresenter: React.FC<userProfileScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>UserProfile</Text>
    </ScreenLayoutView>
  );
};

export { UserProfileScreenPresenter };
