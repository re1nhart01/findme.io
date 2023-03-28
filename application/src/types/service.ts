import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export interface IStackScreen {
    name: string;
    component: JSX.Element;
    options: BottomTabNavigationOptions;
}

export interface INavigateOptions {
    path: string;
    props: any;
}

export interface IFlatListRender<T> {
    item: T;
    index: number;
}
