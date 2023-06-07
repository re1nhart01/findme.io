import React, { useCallback, useEffect, useState } from 'react';
import { AllUsersScreenPresenter, allUsersScreenPresenterProps } from '@screens/AllUsersScreen/view';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { usersAction } from '@redux/slices/users/users_slice';
import { RequestForge } from '@core/http/RequestForge';
import { useTypedSelector } from '@reacts/hooks/useRedux';

export type allUsersScreenContainerProps = {};
type allUsersScreenContainerState = {
  isRefreshing: boolean;
};

const AllUsersScreenContainer: React.FC<allUsersScreenContainerProps> = ({}) => {
  const { reduxCaller } = useSafeHTTP();
  const { all_users, error, isLoading } = useTypedSelector((state) => state.user_reducer);
  const [getState, setState] = useState<allUsersScreenContainerState>({
    isRefreshing: false,
  });

  const onRefresh = useCallback(async () => {
    setState((prev) => ({ ...prev, isRefreshing: true }));
    await fetchData();
    setState((prev) => ({ ...prev, isRefreshing: false }));
  }, []);

  useEffect(() => {
    fetchData().then();
  }, []);

  const fetchData = useCallback(async() => {
    await reduxCaller(usersAction, RequestForge.getUsers, null, usersAction.loadSuccess);
  }, []);

  const ViewProps: allUsersScreenPresenterProps = {
    isRefreshing: getState.isRefreshing,
    onRefresh,
    all_users,
    isLoading,
  };

  return (
    <AllUsersScreenPresenter {...ViewProps} />
  );
};

export { AllUsersScreenContainer };
