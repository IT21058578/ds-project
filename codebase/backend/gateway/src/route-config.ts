import {
	AUTH_HOST,
	COMM_HOST,
	TOKEN_HOST,
	ORDER_HOST,
	PAYMENT_HOST,
	ITEM_HOST,
	REVIEW_HOST,
} from "./constants";
import { Route } from "./types";

export const routesConfig: Route[] = [
	{
		path: "/",
		proxyHost: AUTH_HOST || "",
	},
	{
		path: "/",
		proxyHost: TOKEN_HOST || "",
	},
	{
		path: "/",
		proxyHost: COMM_HOST || "",
	},
	{
		path: "/",
		proxyHost: PAYMENT_HOST || "",
	},
	{
		path: "/",
		proxyHost: ITEM_HOST || "",
	},
	{
		path: "/",
		proxyHost: REVIEW_HOST || "",
	},
	{
		path: "/",
		proxyHost: ORDER_HOST || "",
	},
];
