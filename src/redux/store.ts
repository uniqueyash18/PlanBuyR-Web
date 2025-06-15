import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import configReducer from './slices/configSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    config: configReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['user/setUser', 'config/setFirebaseToken'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.user', 'payload.token'],
        // Ignore these paths in the state
        ignoredPaths: ['user.currentUser', 'config.firebaseToken'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 