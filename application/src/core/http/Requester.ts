import { sleep } from '@utils/helpers';
import { __app__ } from '@core/MainActivity';
import { API_PATHS, axiosImpl } from './client';

export interface IRequester<T> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION' | 'PATCH';
  body?: T;
  headers?: {[key: string]: string};
  retries: number;
  withAccess: boolean;
}

export interface IRResponse<T> {
  statusCode: number;
  statusMessage: string;
  data?: T | null
}

export interface BaseRequest {}

export const requester = async <GRequest, GResponse extends BaseRequest>({ url, method, body, headers, retries = 3, withAccess }: IRequester<GRequest>): Promise<IRResponse<GResponse> | null> => {
  try {
    if (retries === 0) {
      console.warn('[NEC]Error! Can not perform request to the server api!');
      return null;
    }
    const { expiration, refresh_token } = __app__.getCurrentUser.tokens;
    const now = Date.now();
    const bufferTimeForRefreshToken = 1000 * 60; // One minute
    if (now + bufferTimeForRefreshToken > +expiration && refresh_token && withAccess) {
      const responseToken = await axiosImpl({
        url: API_PATHS.REFRESH_TOKEN,
        data: { refresh_token },
        method: 'POST',
      });
      if (responseToken.data) {
        await __app__.getCurrentUser.saveTokens(responseToken.data);
      }
      if (responseToken.status < 204) {
        return await axiosImpl({
          url,
          method,
          body,
          headers,
        } as any);
      }
    }
    return await axiosImpl({
      url,
      method,
      body,
      headers,
    } as any);
  } catch (ex) {
    console.warn('requester.ex', ex);
    await sleep(3000);
    const newRetry = retries--;
    await requester({ url, method, body, headers, retries: newRetry, withAccess });
    return null;
  }
};
