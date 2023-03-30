import React, { PropsWithChildren, useRef } from 'react';
import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { UserRouter } from '@core/Navigation/UserRouter';
import { Navigator } from '@core/Navigator';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';

export type mainNavigationPresenterProps = PropsWithChildren<{}>;

const MainStack = createStackNavigator();
const MainNavigationPresenter: React.FC<mainNavigationPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView backgroundColor="white">
      <MainStack.Navigator>
        {
          Navigator.StackScreens.auth.length < 0 ? (
            <MainStack.Group>
              {Navigator.StackScreens.auth.map(({ component, name, options }) => {
                return <MainStack.Screen name={name} component={component} options={options as StackNavigationOptions} key={name} />;
              })}
            </MainStack.Group>
          )
            : (
              <MainStack.Screen name="UserRouter" component={UserRouter} options={{ headerShown: false }} />
            )
}
      </MainStack.Navigator>
    </ScreenLayoutView>
  );
};

export { MainNavigationPresenter };
