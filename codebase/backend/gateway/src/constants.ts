import dotenv from "dotenv";
dotenv.config();

// Essentials
export const { MONGO_URI, REDIS_URI, PORT, SERVICE, ORIGINS } = process.env;

// API Keys
export const { INTERNAL_API_KEY } = process.env;

// ** All API Routes **
// Comm Service routes
export const {
	AUTH_HOST,
	TOKEN_HOST,
	COMM_HOST,
	PAYMENT_HOST,
	CART_HOST,
	ITEM_HOST,
	REVIEW_HOST,
	ORDER_HOST,
} = process.env;
export const DECODE_ACCCESS_TOKEN_ENDPOINT = `${TOKEN_HOST}/api/token/decode-access-token`;
export const DECODE_REFRESH_TOKEN_ENDPOINT = `${TOKEN_HOST}/api/token/decode-refresh-token`;
export const GENERATE_ACCESS_TOKEN_ENDPOINT = `${TOKEN_HOST}/api/token/generate-access-token`;
export const GENERATE_REFRESH_TOKEN_ENDPOINT = `${TOKEN_HOST}/api/token/generate-refresh-token`;
