import dotenv from "dotenv";
import { Role } from "./types";
dotenv.config();

// Essentials
export const { MONGO_URI, REDIS_URI, PORT, SERVICE } = process.env;

// API Keys
export const { INTERNAL_API_KEY } = process.env;

export const MAX_IP_LOGIN_ATTEMPTS = 100;
export const MAX_IP_EMAIL_LOGIN_ATTEMPTS = 10;
export const API_ROLES = [Role.ADMIN, Role.BUYER, Role.SELLER];

// ** All API Routes **
// Comm Service routes
const { COMM_PORT, COMM_HOST } = process.env;
export const COMM_API_URI = `http://${COMM_HOST}:${COMM_PORT}/api`;
export const SEND_REGISTER_EMAIL_ENDPOINT = `${COMM_API_URI}/email/send-register-mail`;
export const SEND_FORGOT_PASSWORD_EMAIL_ENDPOINT = `${COMM_API_URI}/email/send-forgot-password-mail`;
export const SEND_PASSWORD_CHANGED_NOTICE_EMAIL_ENDPOINT = `${COMM_API_URI}/email/send-password-changed-mail`;

// Auth Service Routes
const { AUTH_PORT, AUTH_HOST } = process.env;
export const AUTH_API_URI = `http://${AUTH_HOST}:${AUTH_PORT}/api`;
export const DECODE_ACCCESS_TOKEN_ENDPOINT = `${AUTH_API_URI}/token/decode-access-token`;
export const DECODE_REFRESH_TOKEN_ENDPOINT = ``;
export const GENERATE_ACCESS_TOKEN_ENDPOINT = ``;
export const GENERATE_REFRESH_TOKEN_ENDPOINT = ``;

export const LOGIN_ENDPOINT = ``;
export const LOGOUT_ENDPOINT = ``;
export const REGISTER_ENDPOINT = ``;
export const RESEND_REGISTER_ENDPOINT = ``;
export const AUTHORIZE_ENDPOINT = ``;
export const FORGOT_PASSWORD_ENDPOINT = ``;
export const CHANGE_PASSWORD_ENDPOINT = ``;
export const RESET_PASSWORD_ENDPOINT = ``;

export const GET_USER_ENDPOINT = ``;
export const GET_USERS_ENDPOINT = ``;
export const DELETE_USER_ENDPOINT = ``;
export const EDIT_USER_ENDPOINT = ``;
