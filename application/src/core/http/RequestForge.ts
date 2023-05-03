import { requester } from '@core/http/Requester';
import { HasPhoneOrEmailRequest, HasPhoneOrEmailResponse, RegisterRequest, RegisterResponse } from '@core/http/types';
import { URL_PATH } from '@core/http/url';

export class RequestForge {
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
}
