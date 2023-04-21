import dotenv from "dotenv";
dotenv.config();

// Essentials
export const { PORT, SERVICE, ORIGINS, ENVIRONMENT } = process.env;

// API Keys
export const { INTERNAL_API_KEY } = process.env;

// ** All API Routes **
// Comm Service routes
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

export const DECODE_ACCCESS_TOKEN_ENDPOINT = `${AUTH_HOST}/api/token/decode-access-token`;
export { AUTH_HOST, CART_HOST, ITEM_REVIEW_HOST, ORDER_PAYMENT_HOST };
