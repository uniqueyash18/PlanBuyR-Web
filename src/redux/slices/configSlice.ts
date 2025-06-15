import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  firebaseToken: string | null;
  notificationPermission: 'granted' | 'denied' | 'default';
  loading: boolean;
  error: string | null;
}

const initialState: ConfigState = {
  firebaseToken: null,
  notificationPermission: 'default',
  loading: false,
  error: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setFirebaseToken: (state, action: PayloadAction<string | null>) => {
      state.firebaseToken = action.payload;
      state.loading = false;
      state.error = null;
    },
    setNotificationPermission: (state, action: PayloadAction<'granted' | 'denied' | 'default'>) => {
      state.notificationPermission = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearConfig: (state) => {
      state.firebaseToken = null;
      state.notificationPermission = 'default';
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setFirebaseToken,
  setNotificationPermission,
  setLoading,
  setError,
  clearConfig,
} = configSlice.actions;

export default configSlice.reducer; 