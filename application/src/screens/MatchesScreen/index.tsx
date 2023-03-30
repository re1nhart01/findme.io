import React from 'react';
import { MatchesScreenPresenter, matchesScreenPresenterProps } from '@screens/MatchesScreen/view';

export type matchesScreenContainerProps = {};

const MatchesScreenContainer: React.FC<matchesScreenContainerProps> = ({}) => {

  const ViewProps: matchesScreenPresenterProps = {};

  return (
    <MatchesScreenPresenter {...ViewProps} />
  );
};

export { MatchesScreenContainer };
