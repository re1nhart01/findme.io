import React from 'react';
import { AllUsersScreenPresenter, allUsersScreenPresenterProps } from "@screens/AllUsersScreen/view";

export type allUsersScreenContainerProps = {};

const AllUsersScreenContainer: React.FC<allUsersScreenContainerProps> = ({}) => {
  const ViewProps: allUsersScreenPresenterProps = {};

  return (
    <AllUsersScreenPresenter {...ViewProps} />
  );
};

export { AllUsersScreenContainer };
