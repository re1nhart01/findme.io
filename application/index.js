import {AppRegistry} from 'react-native';
import RootComponent from './App';
import {name as appName} from './app.json';
import {Provider} from "react-redux";
import {persistedStore, store} from "./src/redux/store/store";
import {PersistGate} from "redux-persist/integration/react";
import {__app__} from "./src/core/MainActivity";


const RootApp = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistedStore}>
                <RootComponent />
            </PersistGate>
        </Provider>
    )
}
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
