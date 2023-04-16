import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import DiscoverIcon from '@assets/svg/bottom/heart.svg';
import MatchIcon from '@assets/svg/bottom/matches.svg';
import AllUsersIcon from '@assets/svg/bottom/discover.svg';
import ChatsIcon from '@assets/svg/bottom/message.svg';
import ProfileIcon from '@assets/svg/bottom/profile.svg';
import { forceNavigator } from '@core/Navigator';
import { colors } from '@utils/colors';
import { RootStackParamList } from '@core/NavigatorScreens';
import styles from './styles';

type bottomNavigationProps = {

} & BottomTabBarProps;
const BottomNavigation: React.FC<bottomNavigationProps> = ({ navigation, insets, state, descriptors }) => {
  const [getSelectedRoute, setSelectedRoute] = useState(1);

  const onPressSelectRoute = useCallback((currentRoute: keyof RootStackParamList, index: number) => () => {
    forceNavigator.navigate(currentRoute, {});
    setSelectedRoute(index);
  }, [getSelectedRoute]);

  const getColorByIndex = (index: number) => (getSelectedRoute === index ? colors.redE9 : colors.grayAD);
  const getBorderByIndex = (index: number) => (getSelectedRoute === index ? styles.borderTop : {});

  return (
    <View style={[styles.bgColor, styles.dims]}>
      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(0)]} onPress={onPressSelectRoute('AllUsersScreen', 0)}>
        <AllUsersIcon color={getColorByIndex(0)} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(1)]} onPress={onPressSelectRoute('MatchesScreen', 1)}>
        <MatchIcon color={getColorByIndex(1)} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(2)]} onPress={onPressSelectRoute('DiscoverScreen', 2)}>
        <DiscoverIcon color={getColorByIndex(2)} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(3)]} onPress={onPressSelectRoute('ChatsScreen', 3)}>
        <ChatsIcon color={getColorByIndex(3)} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonStyles, getBorderByIndex(4)]} onPress={onPressSelectRoute('UserProfileScreen', 4)}>
        <ProfileIcon color={getColorByIndex(4)} />
      </TouchableOpacity>
    </View>
  );
};

export { BottomNavigation };
