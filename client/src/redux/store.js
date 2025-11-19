import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import schemeReducer from './slices/schemeSlice';
import categoryReducer from './slices/categorySlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    schemes: schemeReducer,
    categories: categoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
