import React, { useCallback, useRef, useState } from 'react';
import { MatchesScreenPresenter, matchesScreenPresenterProps } from '@screens/MatchesScreen/view';
import { calendarModalForward } from '@components/common/modals/CalendarModal';
import { MatchesFiltering } from '@type/defaults';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';
import { useFocus } from '@reacts/hooks/useNavigations';
import { Alert } from 'react-native';
import { IUserDiscoverModelShort } from '@type/models/user';

export type matchesScreenContainerProps = {};

const MatchesScreenContainer: React.FC<matchesScreenContainerProps> = ({}) => {
  const filterModelRef = useRef<calendarModalForward>(null);
  const { httpCaller } = useSafeHTTP();
  const [matchesList, setMatches] = useState<IUserDiscoverModelShort[]>([]);
  const [filterState, setFilterState] = useState<MatchesFiltering>({
    by_interests: false,
    by_tags: false,
    by_coords: false,
    by_birthday: false,
    by_gender: false,
    by_relation: false,
    distance: 0,
    years: 0,
  });
  const handleSettingsPress = useCallback(() => {
    if (filterModelRef && filterModelRef.current) {
      filterModelRef.current.onOpen && filterModelRef.current.onOpen();
    }
  }, []);

  const handleOnSave = useCallback(() => {

  }, []);

  const handleSwipePress = useCallback(async (user_hash: string, op: 'LIKE' | 'DISLIKE', quick: boolean = false): Promise<boolean> => {
    const response = await httpCaller(RequestForge.swipeAction, { user_hash_refer: user_hash, operation: op });
    if (response && response.statusCode === 200) {
      if (quick) {
        deleteItem(user_hash);
      } else {
        setTimeout(() => { deleteItem(user_hash); }, 4000);
      }
      return true;
    }
    return false;
  }, [httpCaller]);

  const deleteItem = useCallback((userHash: string) => {
    setMatches((prev) => prev.filter((el) => (
      el.user_hash !== userHash
    )));
  }, []);

  const fetchMatches = useCallback(async () => {
    const response = await httpCaller(RequestForge.getSwipeableUsers, filterState);
    if (response && response?.data) {
      setMatches(response.data);
    } else if (response && response.statusCode > 204) {
      Alert.alert('Warning', 'Something went wrong on updating user');
    }
  }, [filterState, httpCaller]);

  useFocus(fetchMatches, []);

  const ViewProps: matchesScreenPresenterProps = {
    handleSettingsPress,
    handleSwipePress,
    filterModelRef,
    filterState,
    handleOnSave,
    setFilterState,
    matchesList,
  };

  return (
    <MatchesScreenPresenter {...ViewProps} />
  );
};

export { MatchesScreenContainer };
