import React from 'react';
import { SetupProfileScreenPresenter, setupProfileScreenPresenterProps } from '@screens/SetupProfileScreen/view';

export type setupProfileScreenContainerProps = {};

const SetupProfileScreenContainer: React.FC<setupProfileScreenContainerProps> = ({}) => {
  const ViewProps: setupProfileScreenPresenterProps = {};

  return (
    <SetupProfileScreenPresenter {...ViewProps} />
  );
};

export { SetupProfileScreenContainer };
