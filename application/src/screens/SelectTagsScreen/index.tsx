import React, { useCallback, useEffect, useMemo } from 'react';
import { SelectTagsScreenPresenter, selectTagsScreenPresenterProps } from '@screens/SelectTagsScreen/view';
import { useTypedDispatch, useTypedSelector } from '@reacts/hooks/useRedux';
import { typeOfOptions } from '@components/OptionsInputView';
import { tagsAction } from '@redux/slices/tags/tags.slice';
import { useUserStorage } from '@reacts/hooks/useUserStorage';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';
import { useFocus } from '@reacts/hooks/useNavigations';
import { Alert } from 'react-native';
import { ITags } from '@type/models/tags';

export type selectTagsScreenContainerProps = {};

const SelectTagsScreenContainer: React.FC<selectTagsScreenContainerProps> = ({}) => {
  const dispatch = useTypedDispatch();
  const { httpCaller } = useSafeHTTP();
  const { userState } = useUserStorage();
  const state = useTypedSelector((state) => state.tags_reducer);

  const handleAddNewTag = useCallback((v: string) => {
    dispatch(tagsAction.addOrRemoveToSelected({ tag_label: v, user_hash_id: userState.user.user_hash }));
  }, [dispatch, userState.user.user_hash]);

  const handleAddExistsTag = useCallback((item: typeOfOptions) => {
    dispatch(tagsAction.addOrRemoveToSelected(item));
  }, [dispatch]);

  useFocus(() => {
    if (Array.isArray(userState.user.tags)) {
      dispatch(tagsAction.addManyToSelected([...userState.user.tags]));
    }
  }, []);

  const removeFromSelected = useCallback((id: string | number) => {
    dispatch(tagsAction.removeFromSelected(id));
  }, [dispatch]);

  const handleSaveTags = useCallback(async () => {
    const selectedTags = state.selectedTags;
    if (userState.user.tags) {
      const serverTags = userState.user.tags;
      const removedFromSaved = serverTags.filter((el) => !selectedTags.includes(el));
      if (removedFromSaved.length > 0) {
        await callChangingWithFallback(removedFromSaved, 'remove');
      }
      const newTags = selectedTags.filter((el) => {
        return !serverTags.includes(el);
      });
      if (newTags.length > 0) {
        await callChangingWithFallback(newTags, 'add');
      }
    } else {
      await callChangingWithFallback(selectedTags, 'add');
    }
  }, [httpCaller, state.selectedTags]);

  const callChangingWithFallback = useCallback(async (selectedTags: ITags, operation: 'add' | 'remove') => {
    const response = await httpCaller(RequestForge.addOrRemoveTags, {
      tag_list: selectedTags,
      operation,
    });
    if (!response || response.statusCode !== 200) {
      Alert.alert('Warning', 'Something went wrong on updating user');
    }
  }, [httpCaller]);

  const ViewProps: selectTagsScreenPresenterProps = {
    handleAddNewTag,
    handleAddExistsTag,
    removeFromSelected,
    handleSaveTags,
    storedTags: state.usedTags,
    selectedTags: state.selectedTags,
    userState,
  };

  return (
    <SelectTagsScreenPresenter {...ViewProps} />
  );
};

export { SelectTagsScreenContainer };
