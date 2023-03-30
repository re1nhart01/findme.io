import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';

export type allUsersScreenPresenterProps = {};

const AllUsersScreenPresenter: React.FC<allUsersScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <Text>ChatsScreen</Text>
    </ScreenLayoutView>
  );
};

export { AllUsersScreenPresenter };
