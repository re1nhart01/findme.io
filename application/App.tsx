import React, { useEffect } from 'react';
import { Alert, Platform, SafeAreaView, UIManager } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigationContainer } from '@core/Navigation/MainNavigationScreen';
import { FindStatusBar } from '@core/StatusBar';
import { forceNavigator } from '@core/Navigator';
import { Styles } from '@styles/load';
import { useTypedSelector } from '@reacts/hooks/useRedux';

function RootApplication(): JSX.Element {
  const a = useTypedSelector((state) => state.global.fatalModal);
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  useEffect(() => {
    if (a.show) {
      Alert.alert('warn', a.boundary?.boundaryBody.ms);
      console.log(a);
    }
  }, [a]);

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
