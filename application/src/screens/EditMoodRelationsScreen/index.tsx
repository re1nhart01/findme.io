import React, { useCallback } from 'react';
import { EditMoodRelationsScreenPresenter, editMoodRelationsPresenterProps } from '@screens/EditMoodRelationsScreen/view';
import { useUserStorage } from '@reacts/hooks/useUserStorage';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { FormadjoAsyncSubmitFn } from '@core/Validators/FormadjoForm';
import { IEditMoodRelationsForm } from '@utils/forms';
import { RequestForge } from '@core/http/RequestForge';
import { Alert } from 'react-native';

export type editMoodRelationsContainerProps = {};

const EditMoodRelationsContainer: React.FC<editMoodRelationsContainerProps> = ({}) => {
  const { userState } = useUserStorage();
  const { httpCaller, loading } = useSafeHTTP();

  const handleOnSave: FormadjoAsyncSubmitFn<IEditMoodRelationsForm> = useCallback(async (values, addExtendedError) => {
    const response = await httpCaller(RequestForge.updateUserFields, values);
    if (!response || response.statusCode !== 200) {
      Alert.alert('Warning', 'Something went wrong on updating user');
    }
  }, [httpCaller]);
  const ViewProps: editMoodRelationsPresenterProps = {
    userState,
    handleOnSave,
    loading,
  };
  return (
    <EditMoodRelationsScreenPresenter {...ViewProps} />
  );
};

export { EditMoodRelationsContainer };
