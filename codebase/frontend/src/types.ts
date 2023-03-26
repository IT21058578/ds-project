import { store } from "./store/store";

/* UI */
export type NavLinkItem = { label: string; link?: string };
export type NavLinkItemWithIcon = NavLinkItem & { icon?: React.ReactNode };

/* Store */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ApiRole = "ADMIN" | "SELLER" | "BUYER";

export interface IAuthState {
	user?: IUser;
	accessToken?: string;
	refreshToken?: string;
}

export interface IUser {
	firstName: string;
	lastName: string;
	roles: ApiRole[];
	email: string;
	mobile: string;
	id: string;
	isSubscribed: boolean;
	isAuthorized: boolean;
}

export interface IEndpoint {
	url: string;
	method: "post" | "delete" | "put" | "get" | "patch";
}

/* Api Responses and Requests */
export interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
}

export interface IRegisterRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobile: string;
	dateOfBirth: string;
	isSubscribed: boolean;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IForgotPasswordRequest {
	email: string;
}

export interface IResetPasswordRequest {
	resetToken: string;
	password: string;
}
