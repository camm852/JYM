import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../slices/CartSlice';
import userReducer from '../slices/UserSlice';

const persistConfig = {
  key: 'root',
  storage
};

const cartPersistor = persistReducer(persistConfig, cartReducer);
const userPersistor = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    cart: cartPersistor,
    user: userPersistor
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
