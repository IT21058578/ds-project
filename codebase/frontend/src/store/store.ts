import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./apis/base-api";
import { authReducer } from "./slices/auth-slice";
<<<<<<< HEAD
import { productReducer } from "./slices/product-slice";
import { cartReducer } from "./slices/cart-slice";

=======
<<<<<<< HEAD
=======
import { productReducer } from "./slices/product-slice";
import { cartReducer } from "./slices/cart-slice";

>>>>>>> origin/DevDisira
>>>>>>> origin/dev

export const store = configureStore({
	reducer: {
		auth: authReducer,
<<<<<<< HEAD
=======
<<<<<<< HEAD
		[baseApi.reducerPath]: baseApi.reducer,
=======
>>>>>>> origin/dev
		product: productReducer,
		cart: cartReducer,
		[baseApi.reducerPath]: baseApi.reducer,

<<<<<<< HEAD
=======
>>>>>>> origin/DevDisira
>>>>>>> origin/dev
	},
	middleware: (defaults) => defaults().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> origin/dev


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
<<<<<<< HEAD
=======
>>>>>>> origin/DevDisira
>>>>>>> origin/dev
