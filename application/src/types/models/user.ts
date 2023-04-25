export interface IUserRegisterSlice {
  email: string;
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
  birthday: number;
  details: string;
  city: string;
  country: string;
  hasInterest: boolean;
  gender: string;
  hasTags: boolean;
}

export type IBasicUserRegisterInfo = Omit<IUserRegisterSlice, 'firstName' | 'lastName' | 'birthday' | 'details'>;
export type IAdditionalUserRegisterInfo = Omit<IUserRegisterSlice, 'email' | 'password' | 'rePassword' | 'username'>;
export type ILocationUserRegisterInfo = Pick<IUserRegisterSlice, 'city' | 'country'>;
