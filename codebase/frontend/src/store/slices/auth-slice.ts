import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUser } from "../../types";

const initialState: IAuthState = {
	user: {
		firstName: "",
		lastName: "",
		email: "",
		id: "",
		isAuthorized: true,
		isSubscribed: true,
		mobile: "",
		roles: [],
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (
			auth,
			{
				payload,
			}: PayloadAction<{
				accessToken: string;
				refreshToken: string;
				user: IUser;
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
export const { removeAuth, setAuth } = authSlice.actions;
//Exporting reducer
export const authReducer = authSlice.reducer;
