import dotenv from "dotenv";
dotenv.config();

// ** All API Routes **
// Essentials
export const { MONGO_URI, REDIS_URI, PORT, SERVICE } = process.env;

// API Keys
export const { INTERNAL_API_KEY } = process.env;

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
