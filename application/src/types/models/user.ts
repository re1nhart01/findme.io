import { ISliceBaseModel } from '@type/models/index';

export interface IUserRegisterSlice extends ISliceBaseModel {
  email: string;
  phone: string;
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
  birthday: string;
  details: string;
  city: string;
  country: string;
  hasInterest: boolean;
  gender: string;
  hasTags: boolean;
  hasSelectedMood: boolean;
}
