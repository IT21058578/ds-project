// ** All API Routes **
// Comm Service routes
export const COMM_HOST = "localhost";
export const COMM_PORT = 3002;
export const COMM_API_URI = `http://${COMM_HOST}:${COMM_PORT}/api`;
export const SEND_REGISTER_EMAIL_ENDPOINT = `${COMM_API_URI}/email/sendregistermail`;
export const SEND_FORGOT_PASSWORD_EMAIL_ENDPOINT = `${COMM_API_URI}/email/sendforgotpasswordmail`;
export const SEND_PASSWORD_CHANGED_NOTICE_EMAIL_ENDPOINT = `${COMM_API_URI}/email/sendpasswordchangedmail`;
