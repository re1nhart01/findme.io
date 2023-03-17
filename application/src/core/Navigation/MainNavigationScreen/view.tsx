import React, { PropsWithChildren, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenLayoutView } from '@components/hoc/ScreenLayout';

export type mainNavigationPresenterProps = PropsWithChildren<{}>;
const MainNavigationPresenter: React.FC<
  mainNavigationPresenterProps
> = ({}) => {
  const Tab = createBottomTabNavigator();
  return (
    <ScreenLayoutView backgroundColor="white" />
  );
};

export { MainNavigationPresenter };
