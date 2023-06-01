import React, { useCallback } from 'react';
import { SelectTagsScreenPresenter, selectTagsScreenPresenterProps } from '@screens/SelectTagsScreen/view';
import { useTypedDispatch, useTypedSelector } from '@reacts/hooks/useRedux';
import { typeOfOptions } from '@components/OptionsInputView';
import { tagsAction } from '@redux/slices/tags/tags.slice';

export type selectTagsScreenContainerProps = {};

const SelectTagsScreenContainer: React.FC<selectTagsScreenContainerProps> = ({}) => {
  const dispatch = useTypedDispatch();
  const state = useTypedSelector((state) => state.tags_reducer);

  const handleAddNewTag = useCallback((v: string) => {
    dispatch(tagsAction.addOrRemoveToSelected({ label: v, value: `cl_${state.selectedTags.length + 1}` }));
  }, [dispatch, state.selectedTags.length]);

  const handleAddExistsTag = useCallback((item: typeOfOptions) => {
    dispatch(tagsAction.addOrRemoveToSelected(item));
  }, [dispatch]);

  const removeFromSelected = useCallback((id: string | number) => {
    dispatch(tagsAction.removeFromSelected(id));
  }, [dispatch]);

  const handleSaveTags = useCallback(() => {

  }, []);

  const ViewProps: selectTagsScreenPresenterProps = {
    handleAddNewTag,
    handleAddExistsTag,
    removeFromSelected,
    handleSaveTags,
    storedTags: state.usedTags,
    selectedTags: state.selectedTags,
  };

  return (
    <SelectTagsScreenPresenter {...ViewProps} />
  );
};

export { SelectTagsScreenContainer };
