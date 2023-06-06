import { requester } from '@core/http/Requester';
import {
  AttachPhotoRequest,
  AttachPhotoResponse,
  HasPhoneOrEmailRequest,
  HasPhoneOrEmailResponse,
  LoginRequest, LoginResponse, MeRequest, MeResponse,
  RegisterRequest,
  RegisterResponse, RemovePhotoRequest, UpInterestsRequest, UpInterestsResponse,
} from '@core/http/types';
import { URL_PATH } from '@core/http/url';
import { Asset } from 'react-native-image-picker';
import {editMoodRelationsForm, IEditMoodRelationsForm, IEditProfileForm, IGenderFormTemplate} from "@utils/forms";

type TupleUpdateFields = IEditProfileForm | IEditMoodRelationsForm | IGenderFormTemplate;

export class RequestForge {
  public static async loginCall(body: LoginRequest) {
    try {
      return requester<LoginRequest, LoginResponse>({
        data: body,
        method: 'POST',
        retries: 0,
        url: URL_PATH.LOGIN,
        withAccess: false,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: loginCall ex', e);
      return null;
    }
  }

  public static async registerCall(body: RegisterRequest) {
    try {
      return requester<RegisterRequest, RegisterResponse>({
        data: body,
        method: 'POST',
        retries: 0,
        url: URL_PATH.REGISTER,
        withAccess: false,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: registerCall ex', e);
      return null;
    }
  }

  public static async checkIsPhoneExistsCall(body: HasPhoneOrEmailRequest) {
    try {
      return await requester<HasPhoneOrEmailRequest, HasPhoneOrEmailResponse<typeof body>>({
        data: body,
        method: 'POST',
        retries: 0,
        url: URL_PATH.CHECK_EMAIL_OR_PHONE,
        withAccess: false,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: checkIsPhoneExistsCall ex', e);
      return null;
    }
  }

  public static async requestUpdateGeolocationCall(body: { lat: number; long: number }) {
    try {
      return await requester<typeof body, {}>({
        data: body,
        method: 'POST',
        retries: 0,
        url: URL_PATH.UPDATE_GEO,
        withAccess: true,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: checkIsPhoneExistsCall ex', e);
      return null;
    }
  }

  public static async getMeCall() {
    try {
      return await requester<MeRequest, MeResponse>({
        data: undefined,
        method: 'GET',
        retries: 0,
        url: URL_PATH.ME,
        withAccess: true,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: checkIsPhoneExistsCall ex', e);
      return null;
    }
  }

  public static async updateInterestsCall(tagsIds: number[]) {
    try {
      const body = {
        interests_list: tagsIds,
      };
      return await requester<UpInterestsRequest, UpInterestsResponse>({
        data: body,
        method: 'PATCH',
        retries: 0,
        url: URL_PATH.INTERESTS_UPDATE,
        withAccess: true,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: checkIsPhoneExistsCall ex', e);
      return null;
    }
  }

  public static async uploadPhotoCall(file: Asset) {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      });
      return await requester<any, string>({
        data: formData,
        method: 'POST',
        retries: 0,
        url: URL_PATH.UPLOAD_PHOTO,
        withAccess: false,
        isMultipart: true,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: checkIsPhoneExistsCall ex', e);
      return null;
    }
  }

  public static async attachPhotoCall(ids: string[]) {
    try {
      const body = {
        bucket_ids: ids,
      };
      return await requester<AttachPhotoRequest, AttachPhotoResponse>({
        data: body,
        method: 'POST',
        retries: 0,
        url: URL_PATH.ATTACH_PHOTO,
        withAccess: true,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: checkIsPhoneExistsCall ex', e);
      return null;
    }
  }

  public static async removePhotoCall(ids: string[]) {
    try {
      const body = {
        buckets_ids: ids,
      };
      return await requester<RemovePhotoRequest, AttachPhotoResponse>({
        data: body,
        method: 'DELETE',
        retries: 0,
        url: URL_PATH.REMOVE_PHOTO,
        withAccess: true,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: checkIsPhoneExistsCall ex', e);
      return null;
    }
  }

  public static async updateUserFields(fields: TupleUpdateFields) {
    try {
      return await requester<TupleUpdateFields, AttachPhotoResponse>({
        data: fields,
        method: 'PATCH',
        retries: 0,
        url: URL_PATH.ME,
        withAccess: true,
      });
    } catch (e: unknown) {
      console.warn('[FindMe]: checkIsPhoneExistsCall ex', e);
      return null;
    }
  }
}
