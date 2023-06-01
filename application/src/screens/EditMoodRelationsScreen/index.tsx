import React from 'react';
import { EditMoodRelationsScreenPresenter, editMoodRelationsPresenterProps } from '@screens/EditMoodRelationsScreen/view';

export type editMoodRelationsContainerProps = {};

const EditMoodRelationsContainer: React.FC<editMoodRelationsContainerProps> = ({}) => {
  const ViewProps: editMoodRelationsPresenterProps = {};
  return (
    <EditMoodRelationsScreenPresenter {...ViewProps} />
  );
};

export { EditMoodRelationsContainer };
