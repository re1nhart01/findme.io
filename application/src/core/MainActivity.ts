import { Activity } from './base/Activity';
import { NativeModules } from './NativeModules';
import { GeolocationService } from './Geolocation';
import { CurrentUser } from './CurrentUser';

class MainActivity extends Activity {
  private readonly _user: CurrentUser;

  private readonly _native: NativeModules;

  private readonly _geo: GeolocationService;

  public constructor() {
    super();
    this._user = new CurrentUser();
    this._native = new NativeModules();
    this._geo = new GeolocationService();
  }

  public onCreate(initialProps: any): Promise<void> {
    return Promise.resolve(undefined);
  }

  public onUpdate(): Promise<void> {
    return Promise.resolve(undefined);
  }

  public onFallbackCreate(initialProps: any): Promise<void> {
    return Promise.resolve(undefined);
  }

  public get getCurrentUser(): CurrentUser {
    return this._user;
  }

  public get geo(): GeolocationService {
    return this._geo;
  }

  public get getNative(): NativeModules {
    return this._native;
  }
}

export const __app__ = new MainActivity();
