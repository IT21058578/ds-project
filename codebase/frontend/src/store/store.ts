import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./apis/base-api";
import { authReducer } from "./slices/auth-slice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (defaults) => defaults().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
