import {
	IForgotPasswordRequest,
	ILoginRequest,
	IRegisterRequest,
	IResetPasswordRequest,
} from "../../types";
import { baseApi } from "./base-api";

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		userLogin: build.mutation<any, ILoginRequest>({
			query: (body) => ({
				method: "post",
				url: `/auth/login`,
				body,
			}),
		}),
		userLogout: build.mutation({
			query: (body: { id: string }) => ({
				method: "post",
				url: `/auth/logout`,
				body,
			}),
		}),
		userRegister: build.mutation({
			query: (body: IRegisterRequest) => ({
				method: "post",
				url: `/auth/register`,
				body,
			}),
		}),
		forgotPassword: build.mutation({
			query: (body: IForgotPasswordRequest) => ({
				url: `/auth/forgot-password`,
				method: "PATCH",
				body,
			}),
		}),
		resetPassword: build.mutation({
			query: (body: IResetPasswordRequest) => ({
				url: `/auth/reset-password`,
				method: "PATCH",
				body,
			}),
		}),
	}),
});

export const {
	useUserLoginMutation,
	useUserLogoutMutation,
	useUserRegisterMutation,
	useResetPasswordMutation,
	useForgotPasswordMutation,
} = authApi;
