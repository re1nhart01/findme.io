import React from 'react';
import { VerifyScreenPresenter, verifyScreenPresenterProps } from '@screens/VerifyPhoneScreen/view';

export type verifyScreenContainerProps = {};

const VerifyScreenContainer: React.FC<verifyScreenContainerProps> = ({}) => {
  const ViewProps: verifyScreenPresenterProps = {};

  return (
    <VerifyScreenPresenter {...ViewProps} />
  );
};

export { VerifyScreenContainer };
