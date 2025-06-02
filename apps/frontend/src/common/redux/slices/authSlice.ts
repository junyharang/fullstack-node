import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {GoogleOauthResponse} from "../../Type.ts";

interface AuthState {
    googleOauthResponse: GoogleOauthResponse | null;
}

const stored: string | null = localStorage.getItem("googleOauthResponseValue");

const initialState: AuthState = {
    googleOauthResponse: stored ? JSON.parse(stored) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ googleOauthResponseValue: GoogleOauthResponse }>) => {
            state.googleOauthResponse = action.payload.googleOauthResponseValue;

            localStorage.setItem('googleOauthResponseValue', JSON.stringify(state.googleOauthResponse));
        },

        logout: (state) => {
            state.googleOauthResponse = null;

            localStorage.removeItem('googleOauthResponseValue');
        }
    },
});

export const {login, logout} = authSlice.actions;

// 리듀서를 내보낸 뒤 store에 등록
export default authSlice.reducer;
