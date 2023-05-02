import { IRResponse, requester } from '@core/http/Requester';
import { HasPhoneOrEmailRequest, HasPhoneOrEmailResponse, RegisterRequest, RegisterResponse } from '@core/http/types';
import { URL_PATH } from '@core/http/url';
import { AxiosError } from 'axios';
import { Boundary } from '@core/http/Boundary';

export class RequestForge {
  public static async registerMethod(body: RegisterRequest): Promise<RegisterResponse | Boundary['boundaryBody']> {
    try {
      const response = await requester<RegisterRequest, RegisterResponse>({
        body,
        method: 'POST',
        retries: 0,
        url: URL_PATH.REGISTER,
        withAccess: false,
      });
      return response?.statusCode === 200;
    } catch (e: unknown) {
      const error = e as AxiosError<unknown, unknown>;
      return new Boundary(error).boundaryBody;
    }
  }

  public static async checkIsPhoneExistsMethod(body: HasPhoneOrEmailRequest) {
    try {
      const response = await requester<HasPhoneOrEmailRequest, HasPhoneOrEmailResponse<typeof body>>({
        body,
        method: 'POST',
        retries: 0,
        url: URL_PATH.REGISTER,
        withAccess: false,
      });
      return response?.data;
    } catch (e: unknown) {
      const error = e as AxiosError<unknown, unknown>;
      return new Boundary(error).boundaryBody;
    }
  }
}
