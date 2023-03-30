import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions } from '@react-navigation/stack';

import { FC } from 'react';

export interface IStackScreen {
    name: string;
    component: FC<any>;
    options: BottomTabNavigationOptions | StackNavigationOptions;
}

export type MultipleStackScreen = {
    [key in 'user' | 'auth']: Array<IStackScreen>;
};

export type SVGImageSourcePropTypes = any;
export interface INavigateOptions {
    path: string;
    props: any;
}

export interface IFlatListRender<T> {
    item: T;
    index: number;
}
