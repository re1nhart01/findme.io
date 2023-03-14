import {combineReducers, configureStore} from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from "redux-persist";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}


const rootReducer = combineReducers({
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
})

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch