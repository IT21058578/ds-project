import dotenv from "dotenv";
import { Role } from "./types";
dotenv.config();

// Essentials
export const { MONGO_URI, REDIS_URI, PORT, SERVICE, ENVIRONMENT } = process.env;

// API Keys
export const { INTERNAL_API_KEY } = process.env;
export const { SENDGRID_API_KEY } = process.env;
export const VERIFIED_SENDER = "gunasekera.development@gmail.com";
export const { SMTP_USER, SMTP_PASS } = process.env;

export const MAX_IP_LOGIN_ATTEMPTS = 100;
export const MAX_IP_EMAIL_LOGIN_ATTEMPTS = 10;
export const API_ROLES = [Role.ADMIN, Role.BUYER, Role.SELLER];

// ** All API Routes **
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
