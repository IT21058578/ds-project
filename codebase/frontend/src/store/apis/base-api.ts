import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URI } from "../../constants/constants";
import { RootState } from "../store";

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: API_URI,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.accessToken;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});
