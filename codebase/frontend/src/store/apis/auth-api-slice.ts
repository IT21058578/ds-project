import { ILoginRequest, IRegisterRequest } from "../../types";
import { baseApi } from "./base-api";

const AUTH_API_URI: string = import.meta.env.VITE_AUTH_API_URI || "";


const AuthEndpoints = {
	login: {
		method: "post",
		url: `${AUTH_API_URI}/login`,
	},
	logout: {
		method: "post",
		url: `${AUTH_API_URI}/logout`,
	},
	register: {
		method: "post",
		url: `${AUTH_API_URI}/register`,
	},
};

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		userLogin: build.mutation<any, ILoginRequest>({
			query: (body) => ({
				...AuthEndpoints.login,
				body,
			}),
		}),
		userLogout: build.mutation({
			query: (body: { id: string }) => ({
				...AuthEndpoints.logout,
				body,
			}),
		}),
		userRegister: build.mutation({
			query: (body: IRegisterRequest) => ({ ...AuthEndpoints.register, body }),
		}),
	}),
});

export const {
	useUserLoginMutation,
	useUserLogoutMutation,
	useUserRegisterMutation,
} = authApi;
