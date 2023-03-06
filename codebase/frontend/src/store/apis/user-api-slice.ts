import { baseApi } from "./base-api";

const USER_API_URI: string = import.meta.env.VITE_USER_API_URI || "";

const UserEndpoints = {
	getUser: {
		url: `${USER_API_URI}`,
	},
};

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query({
			query: (id: string) => `${UserEndpoints.getUser.url}/?id=${id}`,
		}),
	}),
});

export const { useLazyGetUserQuery } = userApi;
