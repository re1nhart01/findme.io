import { createNavigationContainerRef } from '@react-navigation/native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { INavigateOptions, IStackScreen } from '@type/service';

export class Navigator {
  private readonly _stackScreens: Array<IStackScreen>;

  private _navigationStack: Array<INavigateOptions> = [];

  private readonly _navigation: any = createNavigationContainerRef();

  private _currentScreen: INavigateOptions;

  private _serviceScreens: Array<string>;

  public constructor() {
    this._currentScreen = {
      path: '',
      props: '',
    };
    this._serviceScreens = [];
    this._stackScreens = [];
  }

  public get navigationStack() {
    return this._navigationStack;
  }

  public get navigation() {
    return this._navigation;
  }

  public get stackScreens(): Array<{ name: string; component: JSX.Element; options: BottomTabNavigationOptions }> {
    return this._stackScreens;
  }

  public navigate = (path: string, props: any = {}) => {
    if (this._navigation === void 0 || this._navigation === null || this._currentScreen.path === path) {
      return;
    }
    if (this._navigation.isReady()) {
      this._navigationStack.push({ path, props });
      this._currentScreen = { path, props };
      this._navigation.navigate(path, props);
    }
  };

  public erase = (can: boolean = false) => {
    if (can) {
      this._navigationStack = [];
      this._currentScreen = { path: '', props: '' };
    }
  };

  public goBack = () => {
    try {
      if (this._navigationStack.length === 0) {
        return;
      }
      const lastPath = this._navigationStack[this._navigationStack.length - 2];
      if (
        this._serviceScreens.includes(lastPath.path) ||
                this._serviceScreens.includes(this._currentScreen.path)
      ) {
        return;
      }
      this._navigation.navigate(lastPath.path, lastPath.props);
      this._navigationStack.pop();
      this._currentScreen = lastPath;
    } catch (e) {
      console.log(e);
    }
  };
}

export const forceNavigator = new Navigator();
