import dotenv from "dotenv";
dotenv.config();

// Essentials
export const { PORT, SERVICE, ORIGINS } = process.env;

// API Keys
export const { INTERNAL_API_KEY } = process.env;

// ** All API Routes **
// Comm Service routes
export const { AUTH_HOST, CART_HOST, ITEM_REVIEW_HOST, ORDER_PAYMENT_HOST } =
	process.env;
export const DECODE_ACCCESS_TOKEN_ENDPOINT = `${AUTH_HOST}/api/token/decode-access-token`;
