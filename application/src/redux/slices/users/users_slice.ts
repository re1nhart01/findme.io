import { IUserDiscoverModelShort } from '@type/models/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { stat } from 'react-native-fs';

type IInitial_Users = {
    all_users: Array<IUserDiscoverModelShort>;
    isLoading: boolean;
    error: {
    errorMessage: string,
        isError: boolean,
    };
}

const initialState: IInitial_Users = {
  all_users: [],
  error: {
    isError: false,
    errorMessage: '',
  },
  isLoading: false,
};

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    loadSuccess(state, action: PayloadAction<Array<IUserDiscoverModelShort>>) {
      state.all_users = [];
      state.all_users = action.payload;
      state.isLoading = false;
      state.error = {
        errorMessage: '',
        isError: false,
      };
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

const usersAction = usersSlice.actions;
const usersReducer = usersSlice.reducer;

export { usersAction, usersReducer };
