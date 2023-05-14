import React from 'react';
import { Text } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { DraggableItemView } from '@components/draggable/DraggableItemView';

export type matchesScreenPresenterProps = {};

const MatchesScreenPresenter: React.FC<matchesScreenPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView>
      <DraggableItemView />
      <DraggableItemView />
      <DraggableItemView />
      <DraggableItemView />
      <DraggableItemView />
    </ScreenLayoutView>
  );
};

export { MatchesScreenPresenter };
