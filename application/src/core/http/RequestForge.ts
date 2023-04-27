import { IRResponse, requester } from '@core/http/Requester';

export class RequestForge {
  public static async Register(): Promise<IRResponse<{}> | null> {
    return requester<{}, {}>({ body: {}, method: 'POST', retries: 0, url: "", withAccess: false });
  }
}
