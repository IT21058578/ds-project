import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUser } from "../../types";

const initialState: IAuthState = {};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (
			auth,
			{
				payload,
			}: PayloadAction<{
				user: IUser;
				accessToken: string;
				refreshToken: string;
			}>
		) => {
			auth.accessToken = payload.accessToken;
			auth.refreshToken = payload.refreshToken;
			auth.user = payload.user;
		},
		removeAuth: (auth) => {
			auth.accessToken = undefined;
			auth.refreshToken = undefined;
			auth.user = undefined;
		},
	},
});

// Exporting action creators
export const { setAuth, removeAuth } = authSlice.actions;

//Exporting reducer
export const authReducer = authSlice.reducer;
