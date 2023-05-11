import dotenv from "dotenv";
dotenv.config();

// Essentials
export const { MONGO_URI, REDIS_URI, PORT, SERVICE } = process.env;

// API Keys
export const { INTERNAL_API_KEY } = process.env;

// ** All API Routes **
export const { ENVIRONMENT } = process.env;
let AUTH_HOST: string = "";
let CART_HOST: string = "";
let ITEM_REVIEW_HOST: string = "";
let ORDER_PAYMENT_HOST: string = "";

if (ENVIRONMENT === "PROD") {
	AUTH_HOST = process.env["PROD_AUTH_HOST"] || "";
	CART_HOST = process.env["PROD_CART_HOST"] || "";
	ITEM_REVIEW_HOST = process.env["PROD_ITEM_REVIEW_HOST"] || "";
	ORDER_PAYMENT_HOST = process.env["PROD_ORDER_PAYMENT_HOST"] || "";
} else {
	AUTH_HOST = process.env["DEV_AUTH_HOST"] || "";
	CART_HOST = process.env["DEV_CART_HOST"] || "";
	ITEM_REVIEW_HOST = process.env["DEV_ITEM_REVIEW_HOST"] || "";
	ORDER_PAYMENT_HOST = process.env["DEV_ORDER_PAYMENT_HOST"] || "";
}

const ALL_HOSTS = [AUTH_HOST, CART_HOST, ITEM_REVIEW_HOST, ORDER_PAYMENT_HOST];
export {
	AUTH_HOST,
	CART_HOST,
	ITEM_REVIEW_HOST,
	ORDER_PAYMENT_HOST,
	ALL_HOSTS,
};

