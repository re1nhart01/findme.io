import AsyncStorage from '@react-native-async-storage/async-storage';
import { preferences, tokens, userData } from '@type/models/user';

export enum storageKeys {
  UserData = 'UserData',
  Tokens = 'Tokens',
  Preferences = 'Preferences',
}

const emptyUser = {
  active: false,
  birthday: '',
  city: '',
  country: '',
  details: '',
  email: '',
  full_name: '',
  gender: '',
  id: 0,
  interests: null,
  lat: 0,
  long: 0,
  looking_for: '',
  mood: '',
  phone: '',
  photos: null,
  relations: '',
  tags: null,
  user_hash: '',
};

const emptyTokens = {
  access_token: '',
  refresh_token: '',
  expiration_time: 0,
};

const emptyPreferences = {
  emergency_alert: false,
  id: 0,
  lang: '',
  muted: false,
  notification_token: '',
  theme: false,
  user_hash_id: '',
};

export class CurrentUser {
  private _userData: userData;

  private _preferences: preferences;

  private _tokens: tokens;

  constructor() {
    this._userData = emptyUser;
    this._preferences = emptyPreferences;
    this._tokens = emptyTokens;
  }

  public get userData(): userData {
    return this._userData;
  }

  public get preferences(): preferences {
    return this._preferences;
  }

  public get tokens(): tokens {
    return this._tokens;
  }

  public get isAuth(): boolean {
    return Object.values(this._tokens).every((el) => !!el);
  }

  public async restoreUser() {
    try {
      const data = await AsyncStorage.getItem(storageKeys.UserData);
      if (typeof data === 'string') {
        const parsedData = JSON.parse(data);
        this._userData = parsedData;
      }
      const tokens = await AsyncStorage.getItem(storageKeys.Tokens);
      if (typeof tokens === 'string') {
        const parsedTokens = JSON.parse(tokens);
        this._tokens = parsedTokens;
      }
      const preferences = await AsyncStorage.getItem(storageKeys.Preferences);
      if (typeof preferences === 'string') {
        const parsedPreferences = JSON.parse(preferences);
        this._preferences = parsedPreferences;
      }
    } catch (ex) {
      console.warn('restore user ex', ex);
    }
  }

  public async logOut() {
    try {
      this._userData = emptyUser;
      this._tokens = emptyTokens;
      this._preferences = emptyPreferences;
      await this.saveUser();
    } catch (ex) {
      console.warn('log out ex', ex);
    }
  }

  public async saveTokens<T extends tokens>(tokenData: T | null) {
    try {
      if (tokenData) {
        this._tokens = tokenData;
        await this.saveUser();
      }
    } catch (e) {
      console.warn('save tokens ex', e);
    }
  }

  public async updateUser(data: userData) {
    try {
      if (data.user_hash === '') {
        return;
      }
      this._userData = data;
    } catch (e) {
      console.warn('save user ex', e);
    }
  }

  public async saveUser() {
    try {
      const jsonData = JSON.stringify(this._userData);
      const tokensData = JSON.stringify(this._tokens);
      await AsyncStorage.setItem(storageKeys.UserData, jsonData);
      await AsyncStorage.setItem(storageKeys.Tokens, tokensData);
    } catch (e) {
      console.warn('save user ex', e);
    }
  }
}

export const __current_user__ = new CurrentUser();
