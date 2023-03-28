import React, { useEffect } from 'react';
import { Platform, SafeAreaView, UIManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigationContainer } from '@core/Navigation/MainNavigationScreen';
import { FindStatusBar } from '@core/StatusBar';
import { forceNavigator } from '@core/Navigator';
import { Styles } from '@styles/load';

function RootApplication(): JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  return (
    <NavigationContainer ref={forceNavigator.navigation}>
      <SafeAreaView style={Styles.Layout.flex1}>
        <FindStatusBar />
        <MainNavigationContainer />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default RootApplication;
