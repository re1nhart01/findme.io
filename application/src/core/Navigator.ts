import { NavigationContainerRefWithCurrent, createNavigationContainerRef } from '@react-navigation/native';
import { INavigateOptions, IStackScreen, MultipleStackScreen } from '@type/service';
import { RootStackParamList, StackScreens } from '@core/NavigatorScreens';
import { BackHandler } from 'react-native';

export class Navigator {
  public static readonly StackScreens: MultipleStackScreen = StackScreens;

  private readonly _stackScreens: Array<IStackScreen>;

  private _navigationStack: Array<INavigateOptions<void>> = [];

  private readonly _navigation = createNavigationContainerRef<RootStackParamList>();

  private _currentScreen: INavigateOptions<void>;

  private _serviceScreens: Array<string>;

  public constructor() {
    this._currentScreen = {
      path: '',
      props: {},
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

  public get stackScreens(): Array<IStackScreen> {
    return this._stackScreens;
  }

  public navigate = <T extends keyof RootStackParamList>(path: T, props: RootStackParamList[T]) => {
    if (!this.navigation || this._currentScreen.path === path) {
      if (this._navigationStack.length === 1 && this._currentScreen.path === path) {
        this._navigation.navigate(path as never, props as never);
      }
      return;
    }
    if (this._navigation.isReady()) {
      this._navigationStack.push({ path, props });
      this._currentScreen = { path, props } as const;
      this._navigation.navigate(path as never, props as never);
    }
  };

  public erase = (can: boolean = false) => {
    if (can) {
      this._navigationStack = [];
      this._currentScreen = { path: '', props: {} };
    }
  };

  public onBackPress = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack();
      return true;
    });
  };

  public goBack = () => {
    try {
      const l = this.navigationStack.length;
      if (!this.navigation || l < 2) {
        if (l !== 0) {
          this._navigationStack.pop();
          this._currentScreen = { path: '', props: {} };
          this.navigation.goBack();
        }
        return;
      }
      const { props, path } = this._navigationStack[l - 2];
      this._currentScreen = { path, props };
      this._navigationStack.pop();
      this._navigation.navigate(path as never, props as never);
    } catch (e) {
      console.log(e);
    }
  };
}

export const forceNavigator = new Navigator();
