import {
	AUTH_HOST,
	CART_HOST,
	ITEM_REVIEW_HOST,
	ORDER_PAYMENT_HOST,
} from "./constants";
import { IRouteConfig, Role } from "./types";

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
			["/api/users/", "PUT", [Role.ADMIN, Role.BUYER, Role.ADMIN]],
			["/api/users"],
		],
		host: AUTH_HOST || "",
	},
	{
		endpoints: [
			["/api/products", "POST", [Role.ADMIN, Role.SELLER]],
			["/api/products", "PUT", [Role.ADMIN, Role.SELLER]],
			["/api/products", "DELETE", [Role.ADMIN, Role.SELLER]],
			["/api/products"],
			["/api/reviews", "POST", [Role.BUYER]],
			["/api/reviews", "PUT", [Role.BUYER]],
			["/api/reviews", "DELETE", [Role.BUYER, Role.ADMIN, Role.SELLER]],
			["/api/reviews"],
		],
		host: ITEM_REVIEW_HOST || "",
	},
	{
		endpoints: [
			["/api/carts", "GET", [Role.BUYER]],
			["/api/carts", "PUT", [Role.BUYER]],
			["/api/carts", "DELETE", [Role.BUYER]],
			["/api/carts"],
		],
		host: CART_HOST || "",
	},
	{
		endpoints: [
			["/api/orders", "GET", [Role.SELLER, Role.ADMIN, Role.BUYER]],
			["/api/orders", "PUT", [Role.SELLER, Role.ADMIN, Role.BUYER]],
			["/api/orders", "DELETE", [Role.SELLER, Role.ADMIN, Role.BUYER]],
			["/api/orders"],
			["/api/paypal"],
		],
		host: ORDER_PAYMENT_HOST || "",
	},
];
