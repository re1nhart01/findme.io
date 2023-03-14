import React from 'react';
import { SafeAreaView } from 'react-native';
import {MainNavigationContainer} from "./src/core/Navigation/MainNavigationScreen";
import {FindStatusBar} from "./src/core/StatusBar";
import {NavigationContainer} from "@react-navigation/native";
import { forceNavigator } from "./src/core/Navigator";

function RootApplication(): JSX.Element {
  return (
      <NavigationContainer ref={forceNavigator.navigation}>
          <SafeAreaView>
              <FindStatusBar />
              <MainNavigationContainer />
          </SafeAreaView>
      </NavigationContainer>
  );
}

export default RootApplication;
