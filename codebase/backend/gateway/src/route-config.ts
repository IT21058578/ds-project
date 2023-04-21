import {
	AUTH_HOST,
	CART_HOST,
	ITEM_REVIEW_HOST,
	ORDER_PAYMENT_HOST,
} from "./constants";
import { Route } from "./types";

export const routesConfig: Route[] = [
	{
		path: "/",
		proxyHost: AUTH_HOST || "",
	},
	{
		path: "/",
		proxyHost: ITEM_REVIEW_HOST || "",
	},
	{
		path: "/",
		proxyHost: CART_HOST || "",
	},
	{
		path: "/",
		proxyHost: ORDER_PAYMENT_HOST || "",
	},
];
