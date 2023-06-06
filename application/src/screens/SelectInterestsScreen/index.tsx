import React, { useCallback } from 'react';
import { SelectInterestsScreenPresenter, selectInterestsScreenPresenterProps } from '@screens/SelectInterestsScreen/view';
import { FormadjoAsyncSubmitFn } from '@core/Validators/FormadjoForm';
import { IInterestsFormTemplate } from '@utils/forms';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';
import { useUserStorage } from '@reacts/hooks/useUserStorage';
import { refactorIntsToInterests } from '@screens/SelectInterestsScreen/utils';
import {__current_user__} from "@core/CurrentUser";

export type selectInterestsScreenContainerProps = {};

const SelectInterestsScreenContainer: React.FC<selectInterestsScreenContainerProps> = ({}) => {
  const { httpCaller } = useSafeHTTP();
  const { updateUserField, userState } = useUserStorage();

  const handleOnSave: FormadjoAsyncSubmitFn<IInterestsFormTemplate> = useCallback(async (values, addExtendedError) => {
    const response = await httpCaller(RequestForge.updateInterestsCall, values.interests);
    console.log(response);
    if (response && response?.statusCode === 200) {
      updateUserField('interests', refactorIntsToInterests(values.interests, userState.user.user_hash));
      console.log(__current_user__);
    } else {
      addExtendedError('interests', { isError: true, errorMessage: response?.statusMessage || 'Something went wrong' });
    }
  }, [httpCaller, updateUserField]);

  const ViewProps: selectInterestsScreenPresenterProps = {
    handleOnSave,
  };

  return (
    <SelectInterestsScreenPresenter {...ViewProps} />
  );
};

export { SelectInterestsScreenContainer };
