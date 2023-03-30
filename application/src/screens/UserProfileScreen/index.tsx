import React from 'react';
import { UserProfileScreenPresenter, userProfileScreenPresenterProps } from '@screens/UserProfileScreen/view';

export type userProfileScreenContainerProps = {};

const UserProfileScreenContainer: React.FC<userProfileScreenContainerProps> = ({}) => {
  const ViewProps: userProfileScreenPresenterProps = {};

  return (
    <UserProfileScreenPresenter {...ViewProps} />
  );
};

export { UserProfileScreenContainer };
