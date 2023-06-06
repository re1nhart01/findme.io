import React, { useCallback } from 'react';
import { EditProfileScreenPresenter, editProfileScreenPresenterProps } from '@screens/EditProfileScreen/view';
import { useUserStorage } from '@reacts/hooks/useUserStorage';
import { FormadjoAsyncSubmitFn } from '@core/Validators/FormadjoForm';
import { IEditProfileForm } from '@utils/forms';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';
import { Alert } from 'react-native';

export type editProfileScreenContainerProps = {};

const EditProfileScreenContainer: React.FC<editProfileScreenContainerProps> = ({}) => {
  const { userState } = useUserStorage();
  const { httpCaller, loading } = useSafeHTTP();

  const handleOnSave: FormadjoAsyncSubmitFn<IEditProfileForm> = useCallback(async (values, addExtendedError) => {
    const updatedValues = {
      details: values.details,
      country: values.country,
      city: values.city,
      birthday: new Date(values.birthday).toISOString().split('T')[0],
      full_name: `${values.firstName} ${values.lastName}`,
    };
    const response = await httpCaller(RequestForge.updateUserFields, updatedValues as unknown as IEditProfileForm);
    if (!response || response.statusCode !== 200) {
      Alert.alert('Warning', 'Something went wrong on updating user');
    }
  }, [httpCaller]);

  const ViewProps: editProfileScreenPresenterProps = {
    userState,
    handleOnSave,
    loading,
  };

  return (
    <EditProfileScreenPresenter {...ViewProps} />
  );
};

export { EditProfileScreenContainer };
