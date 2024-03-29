// Register
import {IUserDiscoverModelShort, preferences, tokens, userData, UserMatchesListItem} from '@type/models/user';
import { ITags } from '@type/models/tags';
import { MatchesFiltering } from '@type/defaults';

export type RegisterResponse = boolean;

export interface RegisterRequest {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthday: string;
  details?: string;
  city: string;
  country: string;
}

// Has phone or email
export interface HasPhoneOrEmailResponse<T extends object> {
  isEmailExists?: T extends { email: string } ? boolean : void;
  isPhoneExists?: T extends { phone: string } ? boolean : void;
}

export type HasPhoneOrEmailRequest = { phone: string; } | { email: string; } | { phone?: string; email?: string; }

// Login

export interface LoginResponse extends tokens {

}

export interface LoginRequest {
    login: string;
    password: string;
    device_id: string;
}

// Me

export interface MeRequest {}

export interface MeResponse {
    preferences: preferences;
    user: userData;
}

// Update Interests

export type UpInterestsResponse = {};
export interface UpInterestsRequest {
    interests_list: number[]
}

// attach photo

export type AttachPhotoResponse = {};
export interface AttachPhotoRequest {
    bucket_ids: string[]
}

// remove photo

export interface RemovePhotoRequest {
    buckets_ids: string[]
}

export type AddOrRemoveTagsResponse = Array<IUserDiscoverModelShort>;

export type AddOrRemoveTagsRequest = {
    tag_list: ITags;
    operation: 'add' | 'remove';
}

// user

export type GetUserRequest = undefined;

export type GetUserResponse = userData;
// matches swiping

export type GetMatchesRequest = MatchesFiltering;
export type GetMatchesResponse = Array<IUserDiscoverModelShort>

// match swipe
export type SwipeRequest = {
   user_hash_refer: string;
   operation: 'LIKE' | 'DISLIKE'
};
export type SwipeResponse = {}

// lists of matches

export type MatchesListRequest = {
    type: 'mutual' | 'incoming' | 'dislikes';
};
export type MatchesListResponse = Array<UserMatchesListItem>

