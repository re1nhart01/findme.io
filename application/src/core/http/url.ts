export const AUTH_ROUTE = 'auth';
export const USERS_ROUTE = 'users';
export const INTERESTS_TAGS = 'interests-tags';
export const FILES = 'files';
export const MATCHES = 'matches';
export const URL_PATH = {
  REGISTER: `/${AUTH_ROUTE}/register`,
  LOGIN: `/${AUTH_ROUTE}/login`,
  CHECK_EMAIL_OR_PHONE: `/${AUTH_ROUTE}/checkEmailOrPhone`,
  REFRESH: `/${AUTH_ROUTE}/refresh`,
  UPDATE_GEO: `/${USERS_ROUTE}/geolocation/update`,
  ME: `${USERS_ROUTE}/me`,
  INTERESTS_UPDATE: `/${INTERESTS_TAGS}/interests/update`,
  TAGS_ADD_OR_REMOVE: `/${INTERESTS_TAGS}/tags/add-or-remove`,
  UPLOAD_PHOTO: `/${FILES}/add-image`,
  ATTACH_PHOTO: `/${USERS_ROUTE}/photos/attach`,
  REMOVE_PHOTO: `/${USERS_ROUTE}/photos/remove`,
  USERS_LIST: `/${USERS_ROUTE}/list`,
  MATCHES_SWIPES: `/${MATCHES}/get-users`,
  MATCH_SWIPE: `/${MATCHES}/match`,
  MATCH_LISTS: `/${MATCHES}/get`,
  PHOTOS: `/${USERS_ROUTE}/photos`,
  SETTINGS: `/${USERS_ROUTE}/settings`,
};
