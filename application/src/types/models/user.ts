import { ISliceBaseModel } from '@type/models/index';
import { ApiTags, ITags } from '@type/models/tags';
import { ApiInterests, IInterests } from '@type/models/interests';

export type IUserDiscoverType = 'mutual' | 'incoming' | 'dislikes';
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
  interests: IInterests;
  tags: ITags;
  mood: string | null;
  relations: string | null;
  gender: string;
}

export interface UserMatchesListItem {
  'id': number;
  'user_hash': string;
  'first_user_match': string;
  'second_user_match': string;
  'operation': string;
  'ttl': string;
  'full_name': string;
  'details': string;
  'lat': number;
  'long': number;
  'birthday': string
  'storage_bucket_id': string;
  'photos': string[] | null;
}

export interface IUserDiscoverModelShort {
  full_name: string;
  details: string;
  user_hash: string;
  avatar: string | null;
  photos?: string[]
  birthday: string;
  lat: number;
  long: number;
  age: number;
  created_at?: number;
}

export interface IUserDiscoverModelFull extends IUserDiscoverModelShort {
  gender: 'male' | 'female' | 'another' | 'unknown';
  email: string;
  mood: string;
  active: boolean;
  popularity: number;
  city: string;
  phone: string;
  country: string;
}

// currentUser
export type userData = Required<{
  id: number;
  user_hash: string;
  full_name: string;
  birthday: string;
  details: string;
  gender: string;
  looking_for: string;
  email: string;
  mood: string;
  relations: string;
  active: boolean;
  city: string;
  country: string;
  phone: string;
  lat: number;
  long: number;
  interests: ApiInterests[] | null;
  tags: ApiTags[] | null;
  photos: string[] | null;
}>;

export interface preferences {
  id: number;
  user_hash_id: string;
  theme: boolean;
  lang: string;
  muted: boolean;
  emergency_alert: boolean;
  notification_token: string;
}

export type tokens = {
  access_token: string;
  refresh_token: string;
  expiration_time: number;
}
