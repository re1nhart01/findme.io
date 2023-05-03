import { IUserRegisterSlice } from '@type/models/user';
import { ISliceBaseModel } from '@type/models';
import { Global } from '@type/models/global';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Boundary } from '@core/http/Boundary';

const initialState: Global = {
  fatalModal: {
    show: false,
    boundary: null,
  },
  toast: {
    show: false,
    callback: null,
  },
};

const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openFatalModal(state, { payload: { show, boundary } }: PayloadAction<{show: boolean, boundary: Boundary}>) {
      state.fatalModal = { show, boundary };
    },
    closeFatalModal(state) {
      state.fatalModal = {
        show: false,
        boundary: null,
      };
    },
  },
});

const actions = GlobalSlice.actions;
const reducer = GlobalSlice.reducer;

export { actions as globalActions, reducer as globalReducer };
