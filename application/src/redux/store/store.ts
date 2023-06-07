import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { userRegisterReducer } from '@redux/slices/auth/user-register/user-register.slice';
import { globalReducer } from '@redux/slices/global.slice';
import { tagsReducer } from '@redux/slices/tags/tags.slice';
import { usersReducer } from '@redux/slices/users/users_slice';

const rootReducer = combineReducers({
  user_register: userRegisterReducer,
  global: globalReducer,
  tags_reducer: tagsReducer,
  user_reducer: usersReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['global', 'tags_reducer', 'user_reducer'],
};

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
