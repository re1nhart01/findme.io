class Settings {
  private readonly _API_URL: string;
  private readonly _protocol: string;
  private readonly _ENVIRONMENT: string;

  constructor() {
    this._API_URL = '';
    this._ENVIRONMENT = '';
    this._protocol = '';
  }
}

export const apiSettings = new Settings();
