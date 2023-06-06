export const AUTH_ROUTE = 'auth';
export const USERS_ROUTE = 'users';
export const INTERESTS_TAGS = 'interests-tags';
export const FILES = 'files';
export const URL_PATH = {
  REGISTER: `/${AUTH_ROUTE}/register`,
  LOGIN: `/${AUTH_ROUTE}/login`,
  CHECK_EMAIL_OR_PHONE: `/${AUTH_ROUTE}/checkEmailOrPhone`,
  REFRESH: `/${AUTH_ROUTE}/refresh`,
  UPDATE_GEO: `/${USERS_ROUTE}/geolocation/update`,
  ME: `${USERS_ROUTE}/me`,
  INTERESTS_UPDATE: `/${INTERESTS_TAGS}/interests/update`,
  UPLOAD_PHOTO: `/${FILES}/add-image`,
  ATTACH_PHOTO: `/${USERS_ROUTE}/photos/attach`,
  REMOVE_PHOTO: `/${USERS_ROUTE}/photos/remove`,
};
