import {
	AUTH_HOST,
	CART_HOST,
	ITEM_REVIEW_HOST,
	ORDER_PAYMENT_HOST,
} from "./constants";
import { IRouteConfig, Role, Route } from "./types";

export const temp: Route[] = [
	// {
	// 	paths: ["/api/users", "/api/auth"],
	// 	proxyHost: AUTH_HOST || "",
	// },
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

export const routesConfig: IRouteConfig[] = [
	{
		endpoints: [
			["/api/auth/refresh", "POST", [Role.ADMIN, Role.BUYER, Role.SELLER]],
			["/api/auth/logout", "POST", [Role.ADMIN, Role.BUYER, Role.SELLER]],
			[
				"/api/auth/change-password",
				"POST",
				[Role.ADMIN, Role.BUYER, Role.SELLER],
			],
			["/api/auth"],
			["/api/users"],
		],
		host: AUTH_HOST || "",
	},
];
