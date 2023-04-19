import { API_URI } from "../../constants/constants";
import { baseApi } from "./base-api";
import {
	IDeleteUserRequestData,
	IEditUserRequestData,
	IGetUserRequestData,
	ISearchUsersRequestData,
} from "./types/request-types";
import {
	IDeleteUserResponseData,
	IEditUserResponseData,
	IGetUserResponseData,
	ISearchUsersResponseData,
} from "./types/response-types";

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query<IGetUserResponseData, IGetUserRequestData>({
			query: ({ userId }) => `${API_URI}/users/${userId}`,
		}),
		searchUsers: build.mutation<
			ISearchUsersResponseData,
			ISearchUsersRequestData
		>({
			query: (body) => ({
				url: `${API_URI}/users/search`,
				method: "POST",
				body,
			}),
		}),
		deleteUser: build.mutation<IDeleteUserResponseData, IDeleteUserRequestData>(
			{
				query: ({ userId }) => ({
					url: `${API_URI}/users/${userId}`,
					method: "DELETE",
				}),
			}
		),
		editUser: build.mutation<IEditUserResponseData, IEditUserRequestData>({
			query: ({ userId, ...body }) => ({
				url: `${API_URI}/users/${userId}`,
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
