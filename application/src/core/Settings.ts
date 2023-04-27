export class Settings {
  private readonly _API_URL: string;

  private readonly _ENVIRONMENT: string;

  private readonly _API_V2: string;

  constructor() {
    this._API_URL = '';
    this._ENVIRONMENT = '';
    this._API_V2 = '';
  }

  public get API_URL(): string {
    return this._API_URL;
  }

  public get ENVIRONMENT(): string {
    return this._ENVIRONMENT;
  }

  public get API_V2(): string {
    return this._API_V2;
  }
}
