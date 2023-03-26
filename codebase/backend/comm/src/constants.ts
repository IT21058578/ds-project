import dotenv from "dotenv";
import { Role } from "./types";
dotenv.config();

// Essentials
export const { MONGO_URI, REDIS_URI, PORT, SERVICE } = process.env;
export const { SMTP_USER, SMTP_PASS } = process.env;

// API Keys
export const { INTERNAL_API_KEY } = process.env;
export const { SENDGRID_API_KEY } = process.env;

export const API_ROLES = [Role.ADMIN, Role.BUYER, Role.SELLER];

//Other constants
export const VERIFIED_SENDER = "gunasekera.development@gmail.com";

// ** All API Routes **
// Comm Service routes
const { COMM_PORT, COMM_HOST } = process.env;
export const COMM_API_URI = `http://${COMM_HOST}:${COMM_PORT}/api`;
export const SEND_REGISTER_EMAIL_ENDPOINT = `${COMM_API_URI}/email/send-register-email`;
export const SEND_FORGOT_PASSWORD_EMAIL_ENDPOINT = `${COMM_API_URI}/email/send-password-reset-email`;
export const SEND_PASSWORD_CHANGED_NOTICE_EMAIL_ENDPOINT = `${COMM_API_URI}/email/send-password-changed-email`;
export const SEND_ORDER_CONFIRMATION_EMAIL_ENDPOINT = `${COMM_API_URI}/email/send-order-confirmation-email`;

// Auth Service Routes
const { AUTH_PORT, AUTH_HOST } = process.env;
export const AUTH_API_URI = `http://${AUTH_HOST}:${AUTH_PORT}/api`;
export const DECODE_ACCCESS_TOKEN_ENDPOINT = `${AUTH_API_URI}/token/decode-access-token`;
export const DECODE_REFRESH_TOKEN_ENDPOINT = `${AUTH_API_URI}/token/decode-refresh-token`;
export const GENERATE_ACCESS_TOKEN_ENDPOINT = `${AUTH_API_URI}/token/generate-access-token`;
export const GENERATE_REFRESH_TOKEN_ENDPOINT = `${AUTH_API_URI}/token/generate-refresh-token`;

export const LOGIN_ENDPOINT = `${AUTH_API_URI}/auth/login`;
export const LOGOUT_ENDPOINT = `${AUTH_API_URI}/auth/logout`;
export const REGISTER_ENDPOINT = `${AUTH_API_URI}/auth/register`;
export const RESEND_REGISTER_ENDPOINT = `${AUTH_API_URI}/auth/register/send`;
export const AUTHORIZE_ENDPOINT = `${AUTH_API_URI}/auth/authorize`;
export const FORGOT_PASSWORD_ENDPOINT = `${AUTH_API_URI}/auth/forgot/send-email`;
export const CHANGE_PASSWORD_ENDPOINT = `${AUTH_API_URI}/auth/forgot/reset-password`;
export const RESET_PASSWORD_ENDPOINT = `${AUTH_API_URI}/auth/change-password`;

export const GET_USER_ENDPOINT = `${AUTH_API_URI}/user/`;
export const GET_USERS_ENDPOINT = `${AUTH_API_URI}/user/`;
export const DELETE_USER_ENDPOINT = `${AUTH_API_URI}/user/`;
export const EDIT_USER_ENDPOINT = `${AUTH_API_URI}/user/`;
