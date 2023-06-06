import React, { useCallback } from 'react';
import { SelectGenderScreenPresenter, selectGenderScreenPresenterProps } from '@screens/SelectGenderScreen/view';
import { FormadjoAsyncSubmitFn } from '@core/Validators/FormadjoForm';
import { IEditMoodRelationsForm, IGenderFormTemplate } from '@utils/forms';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { useUserStorage } from '@reacts/hooks/useUserStorage';
import { RequestForge } from '@core/http/RequestForge';
import { Alert } from 'react-native';

export type selectGenderScreenContainerProps = {};

const SelectGenderScreenContainer: React.FC<selectGenderScreenContainerProps> = ({}) => {
  const { userState } = useUserStorage();
  const { httpCaller, loading } = useSafeHTTP();

  const handleOnSave: FormadjoAsyncSubmitFn<IGenderFormTemplate> = useCallback(async (values, addExtendedError) => {
    const response = await httpCaller(RequestForge.updateUserFields, values);
    if (!response || response.statusCode !== 200) {
      Alert.alert('Warning', 'Something went wrong on updating user');
    }
  }, [httpCaller]);

  const ViewProps: selectGenderScreenPresenterProps = {
    handleOnSave,
    userState,
    loading,
  };

  return (
    <SelectGenderScreenPresenter {...ViewProps} />
  );
};

export { SelectGenderScreenContainer };
