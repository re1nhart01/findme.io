import React, { PropsWithChildren, useRef } from 'react';
import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { UserRouter } from '@core/Navigation/UserRouter';
import { Navigator } from '@core/Navigator';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import { FatalApiErrorModal } from '@components/modals/FatalApiErrorModal';
import { __app__ } from '@core/MainActivity';

export type mainNavigationPresenterProps = PropsWithChildren<{
  isAuth: boolean;
}>;

const MainStack = createStackNavigator();
const MainNavigationPresenter: React.FC<mainNavigationPresenterProps> = ({}) => {
  return (
    <ScreenLayoutView backgroundColor="white">
      {!__app__.getCurrentUser.isAuth ? (
        <MainStack.Navigator>
          <MainStack.Group>
            {Navigator.StackScreens.auth.map(({ component, name, options }) => {
              return <MainStack.Screen name={name} component={component} options={options as StackNavigationOptions} key={name} />;
            })}
          </MainStack.Group>
        </MainStack.Navigator>
      )
        :
        <UserRouter />}
      <React.Fragment>
        <FatalApiErrorModal block={false} />
      </React.Fragment>
    </ScreenLayoutView>
  );
};

export { MainNavigationPresenter };
