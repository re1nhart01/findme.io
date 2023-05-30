import React, { useCallback } from 'react';
import { SelectInterestsScreenPresenter, selectInterestsScreenPresenterProps } from '@screens/SelectInterestsScreen/view';
import { FormadjoAsyncSubmitFn } from '@core/Validators/FormadjoForm';
import { IInterestsFormTemplate } from '@utils/forms';

export type selectInterestsScreenContainerProps = {};

const SelectInterestsScreenContainer: React.FC<selectInterestsScreenContainerProps> = ({}) => {
  const handleOnSave: FormadjoAsyncSubmitFn<IInterestsFormTemplate> = useCallback(async (values, addExtendedError) => {

  }, []);

  const ViewProps: selectInterestsScreenPresenterProps = {
    handleOnSave,
  };

  return (
    <SelectInterestsScreenPresenter {...ViewProps} />
  );
};

export { SelectInterestsScreenContainer };
