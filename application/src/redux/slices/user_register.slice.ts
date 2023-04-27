import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  IAdditionalUserRegisterInfo,
  IBasicUserRegisterInfo,
  ILocationUserRegisterInfo,
  IUserRegisterSlice,
} from '@type/models/user';
import { ISliceBaseModel } from "@type/models";

const initialState: IUserRegisterSlice & ISliceBaseModel = {
  email: '',
  password: '',
  phone: '',
  rePassword: '',
  firstName: '',
  lastName: '',
  birthday: Date.now(),
  details: '',
  city: '',
  country: '',
  hasInterest: false,
  gender: 'It doesn\'t matter',
  hasTags: false,
  hasSelectedMood: false,
  loading: false,
  error: {
    errorMessage: '',
    isError: false,
  },
};

const UserRegisterSlice = createSlice({
  name: 'user_register',
  initialState,
  reducers: {
    updateBasicInformationData(state, action: PayloadAction<IBasicUserRegisterInfo>) {
      const { email, rePassword, password } = action.payload;
      if (email && rePassword && password) {
        state = { ...state, email, rePassword, password };
      }
    },
    updateUserInformationData(state, action: PayloadAction<IAdditionalUserRegisterInfo>) {
      const { details, firstName, lastName, birthday } = action.payload;
      if (details && firstName && lastName) {
        state = { ...state, details, firstName, lastName, birthday: birthday || Date.now() };
      }
    },
    updateLocationInformationData(state, action: PayloadAction<ILocationUserRegisterInfo>) {
      const { country, city } = action.payload;
      if (country && city) {
        state = { ...state, country, city };
      }
    },


    // register from api:

  },
});

const actions = UserRegisterSlice.actions;
const reducer = UserRegisterSlice.reducer;

export { actions, reducer as UserRegisterReducer };
