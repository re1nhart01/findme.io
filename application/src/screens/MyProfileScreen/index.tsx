import React from 'react';
import { MyProfileScreenPresenter, myProfileScreenPresenterProps } from '@screens/MyProfileScreen/view';

export type myProfileScreenContainerProps = {};

const MyProfileScreenContainer: React.FC<myProfileScreenContainerProps> = ({}) => {
  const ViewProps: myProfileScreenPresenterProps = {};

  return (
    <MyProfileScreenPresenter {...ViewProps} />
  );
};

export { MyProfileScreenContainer };
