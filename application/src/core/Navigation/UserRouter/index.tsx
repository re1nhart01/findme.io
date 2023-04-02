import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from '@core/Navigation/BottomNavigation';
import { Navigator } from '@core/Navigator';

type userRouterProps = {};

const Tab = createBottomTabNavigator();
const UserRouter: React.FC<userRouterProps> = ({}) => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
      {Navigator.StackScreens.user.map(({ component, name, options }) => {
        return <Tab.Screen name={name} component={component} options={options as BottomTabNavigationOptions} key={name} />;
      })}
    </Tab.Navigator>
  );
};

export { UserRouter };
