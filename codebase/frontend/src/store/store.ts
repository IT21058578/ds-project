import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./apis/base-api";
import { authReducer } from "./slices/auth-slice";
<<<<<<< HEAD
import { productReducer } from "./slices/product-slice";
import { cartReducer } from "./slices/cart-slice";

=======
>>>>>>> origin/Dev

export const store = configureStore({
	reducer: {
		auth: authReducer,
<<<<<<< HEAD
		product: productReducer,
		cart: cartReducer,
		[baseApi.reducerPath]: baseApi.reducer,

=======
		[baseApi.reducerPath]: baseApi.reducer,
>>>>>>> origin/Dev
	},
	middleware: (defaults) => defaults().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
<<<<<<< HEAD


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
=======
>>>>>>> origin/Dev
