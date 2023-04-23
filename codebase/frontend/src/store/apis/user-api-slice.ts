import { API_URI } from "../../constants/constants";
import { baseApi } from "./base-api";
import { TPageRequest } from "./types/request-types";
import { IPageDTO, IUserDTO } from "./types/response-types";

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query<IUserDTO, { userId: string }>({
			query: ({ userId }) => `/users/${userId}`,
		}),
		searchUsers: build.mutation<IPageDTO<IUserDTO>, TPageRequest<IUserDTO>>({
			query: (body) => ({
				url: `/users/search`,
				method: "POST",
				body,
			}),
		}),
		deleteUser: build.mutation<null, { userId: string }>({
			query: ({ userId }) => ({
				url: `/users/${userId}`,
				method: "DELETE",
			}),
		}),
		editUser: build.mutation<IUserDTO, Partial<IUserDTO>>({
			query: ({ id, ...body }) => ({
				url: `/users/${id}`,
				method: "PUT",
				body,
			}),
		}),
	}),
});

export const {
	useLazyGetUserQuery,
	useEditUserMutation,
	useSearchUsersMutation,
	useDeleteUserMutation,
} = userApi;
