import { baseApi } from "./base-api";

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query({
			query: (id: string) => `/user/?id=${id}`,
		}),
	}),
});

export const { useLazyGetUserQuery } = userApi;
