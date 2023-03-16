/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { __app__ } from '@core/MainActivity';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore, store } from '@redux/store/store';
import { name as appName } from './app.json';
import RootComponent from './App';

const RootApp = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerRunnable(appName, async (initialState) => {
  try {
    await __app__.onCreate(initialState);
    AppRegistry.registerComponent(appName, () => RootApp);
    AppRegistry.runApplication(appName, initialState);
  } catch (e) {
    await __app__.onFallbackCreate(initialState);
    AppRegistry.registerComponent(appName, () => RootApp);
    AppRegistry.runApplication(appName, initialState);
  }
});
