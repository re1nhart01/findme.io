import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {ApiTags, ITag, ITags} from '@type/models/tags';
import { MOCK_TAGS } from '@utils/__remove__/mocks/tags_interests';

type IInitialState = {
    selectedTags: ITags;
    usedTags: ITags;
    isExists: boolean;
    isLoading: boolean;
    error: {
        isError: boolean;
        errorMessage: string;
    };
}

const initialState: IInitialState = {
  selectedTags: [],
  usedTags: [],
  isExists: false,
  isLoading: false,
  error: {
    isError: false,
    errorMessage: '',
  },
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addManyToSelected(state, action: PayloadAction<ITags>) {
      state.selectedTags = action.payload;
    },
    addOrRemoveToSelected(state, action: PayloadAction<ApiTags>) {
      const isAddedIndex = state.selectedTags.findIndex((tag) => tag.tag_label === action.payload.tag_label);
      if (isAddedIndex !== -1) {
        state.selectedTags.splice(isAddedIndex, 1);
        return;
      }
      state.selectedTags.push(action.payload);
    },
    removeFromSelected(state, action: PayloadAction<string | number>) {
      const isAddedIndex = state.selectedTags.findIndex((tag) => tag.tag_label === action.payload);
      if (isAddedIndex !== -1) state.selectedTags.splice(isAddedIndex, 1);
    },
    checkIsExists(state, action: PayloadAction<string | number>) {
      state.isExists = state.selectedTags.findIndex((tag) => tag.tag_label === action.payload) !== -1;
    },
    setExists(state, action: PayloadAction<boolean>) {
      state.isExists = action.payload;
    },
    addManyToUsed(state, action: PayloadAction<ITags>) {
      state.usedTags = action.payload;
    },
    loadStart(state, action: PayloadAction) {
      state.isLoading = true;
      state.error = {
        errorMessage: '',
        isError: true,
      };
    },
    loadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = {
        errorMessage: action.payload,
        isError: true,
      };
    },
  },
});

const tagsAction = tagsSlice.actions;
const tagsReducer = tagsSlice.reducer;

export { tagsAction, tagsReducer };
