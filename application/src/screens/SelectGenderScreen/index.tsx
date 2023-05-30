import React, { useCallback } from 'react';
import { SelectGenderScreenPresenter, selectGenderScreenPresenterProps } from '@screens/SelectGenderScreen/view';
import { FormadjoAsyncSubmitFn } from '@core/Validators/FormadjoForm';
import { IGenderFormTemplate } from '@utils/forms';

export type selectGenderScreenContainerProps = {};

const SelectGenderScreenContainer: React.FC<selectGenderScreenContainerProps> = ({}) => {
  const handleOnSave: FormadjoAsyncSubmitFn<IGenderFormTemplate> = useCallback(async (values, addExtendedError) => {

  }, []);

  const ViewProps: selectGenderScreenPresenterProps = {
    handleOnSave,
  };

  return (
    <SelectGenderScreenPresenter {...ViewProps} />
  );
};

export { SelectGenderScreenContainer };
