import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./apis/base-api";
import { authReducer } from "./slices/auth-slice";
import { productReducer } from "./slices/product-slice";
import { cartReducer } from "./slices/cart-slice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		cart: cartReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (defaults) => defaults().concat(baseApi.middleware),
});

setupListeners(store.dispatch);



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

