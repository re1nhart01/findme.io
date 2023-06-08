import { sleep } from '@utils/helpers';
import { __app__ } from '@core/MainActivity';
import { URL_PATH } from '@core/http/url';
import { Boundary } from '@core/http/Boundary';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosImpl } from './client';

export interface IRequester<T> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION' | 'PATCH';
  data?: T;
  customHeaders?: {[key: string]: string};
  isMultipart?: boolean;
  retries: number;
  withAccess: boolean;
}

export interface IRResponse<T> {
  statusCode: number;
  statusMessage: string;
  data?: T | null
}

export interface BaseRequest {}

export const requester = async <GRequest, GResponse extends BaseRequest>({ url, method, data, customHeaders, retries = 3, withAccess, isMultipart }: IRequester<GRequest>): Promise<IRResponse<GResponse> | Boundary> => {
  try {
    const headers = {
      ...customHeaders,
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    };
    const { expiration_time, refresh_token } = __app__.getCurrentUser.tokens;
    console.log(expiration_time)
    const now = Date.now();
    const bufferTimeForRefreshToken = 1000 * 60; // One minute
    if (now + bufferTimeForRefreshToken > +expiration_time && refresh_token && withAccess) {
      const responseToken = await axiosImpl({
        url: URL_PATH.REFRESH,
        data: { refresh_token },
        method: 'POST',
      });
      if (responseToken?.data) {
        await __app__.getCurrentUser.saveTokens(responseToken.data?.data);
        console.log('responseToken.data', responseToken.data.data);
      }
      if (responseToken?.status < 204) {
        return (await axiosImpl({
          url,
          method,
          data,
          headers,
        } as any))?.data;
      }
    }
    return (await axiosImpl({
      url,
      method,
      data,
      headers,
    } as any))?.data;
  } catch (ex) {
    const error = ex as AxiosError<unknown, unknown>;
    if (error?.request?.status === 500 || error.code === AxiosError.ERR_NETWORK) {
      return new Boundary(error, {
        url: error.config?.url,
        method,
        data,
      });
    }
    return error?.response as unknown as IRResponse<GResponse> | Boundary;
  }
};
