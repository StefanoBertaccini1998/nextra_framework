import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './slices/clientsSlice';
import authReducer from './slices/authSlice';
import propertiesReducer from './slices/propertiesSlice';
import appointmentsReducer from './slices/appointmentsSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    auth: authReducer,
    properties: propertiesReducer,
    appointments: appointmentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
