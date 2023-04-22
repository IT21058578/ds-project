export interface Route {
	paths: string[];
	proxyHost: string;
	roles?: Role[];
}

/**
 * An enum for errors thrown within the auth, token and user apis
 */
export enum UserErrorMessage {
	USER_EXISTS = "User already exists",
	USER_NOT_FOUND = "User not found",
	INVALID_CREDENTIALS = "Invalid credentials",
	INTERNAL_SERVER_ERROR = "Internal server error",
	USER_CONFLICT = "User detail conflict",
}

/**
 * An enum for all the roles within the system
 */
export enum Role {
	BUYER = "BUYER",
	SELLER = "SELLER",
	ADMIN = "ADMIN",
	SYSTEM = "SYSTEM",
}
