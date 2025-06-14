import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import apiReducer from './slices/apiSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        api: apiReducer,
        modal: modalReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
