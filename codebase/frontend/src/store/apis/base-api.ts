import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URI } from "../../constants/constants";

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: API_URI }),
	endpoints: () => ({}),
});
