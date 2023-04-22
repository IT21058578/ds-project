import {
	AUTH_HOST,
	CART_HOST,
	ITEM_REVIEW_HOST,
	ORDER_PAYMENT_HOST,
} from "./constants";
import { Route } from "./types";

export const routesConfig: Route[] = [
	{
		paths: ["/api/users", "/api/auth"],
		proxyHost: AUTH_HOST || "",
	},
	{
		paths: ["/api/products", "/api/reviews"],
		proxyHost: ITEM_REVIEW_HOST || "",
	},
	{
		paths: ["/api/carts"],
		proxyHost: CART_HOST || "",
	},
	{
		paths: ["/api/orders"],
		proxyHost: ORDER_PAYMENT_HOST || "",
	},
];
