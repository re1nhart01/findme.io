import { MultipleStackScreen } from '@type/service';
import { SignInScreenContainer } from '@screens/SignInScreen';
import { SignupScreenContainer } from '@screens/SignupScreen';
import { WelcomeScreenContainer } from '@screens/WelcomeScreen';
import { AllUsersScreenContainer } from '@screens/AllUsersScreen';
import { MatchesScreenContainer } from '@screens/MatchesScreen';
import { DiscoverScreenContainer } from '@screens/DiscoverScreen';
import { ChatsScreenContainer } from '@screens/ChatsScreen';
import { UserProfileScreenContainer } from '@screens/UserProfileScreen';

export type RootStackParamList = {
  '': {};
  SignInScreen: {a: string};
  SignupScreen: {b: number};
  WelcomeScreen: {};
  AllUsersScreen: {};
  MatchesScreen: {};
  DiscoverScreen: {};
  ChatsScreen: {};
  UserProfileScreen: {};
};
export const StackScreens: MultipleStackScreen = {
  auth: [
    {
      name: 'SignInScreen',
      component: SignInScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'SignupScreen',
      component: SignupScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'WelcomeScreen',
      component: WelcomeScreenContainer,
      options: {
        headerShown: false,
      },
    },
  ],

  // USER NAVIGATION (ALREADY AUTHORIZED)
  user: [
    {
      name: 'AllUsersScreen',
      component: AllUsersScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'MatchesScreen',
      component: MatchesScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'DiscoverScreen',
      component: DiscoverScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'ChatsScreen',
      component: ChatsScreenContainer,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'UserProfileScreen',
      component: UserProfileScreenContainer,
      options: {
        headerShown: false,
      },
    },
  ],
};
