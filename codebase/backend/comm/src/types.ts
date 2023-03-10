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

export enum EmailErrorMessage {
	
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

/**
 * An interface for a family of tokens per user.
 * This is saved to redis when a user logs in and removed when the log out
 */
export interface ITokenFamily {
	latestAccessToken: string;
	latestRefreshToken: string;
	expiredAccessTokens: Set<string>;
	expiredRefreshTokens: Set<string>;
}

/**
 * An interface to manage the blacklist in redis. For each IP an array of {email, count} is kept. This allows to quickly
 * check the number of times any email or ip has been hit.
 */
export interface IBlacklistUnit {
	emailList: { email: string; count: number }[];
}

/**
 * An interface for the user object retained in the database.
 */
export interface IUser {
	firstName: string;
	lastName: string;
	resetToken?: string;
	mobile: string;
	email: string;
	password: string;
	createdAt: Date;
	authorizationToken?: string;
	lastLoggedAt?: Date;
	roles: Role[];
	isSubscribed: boolean;
	isAuthorized: boolean;
}

export interface IUserSearchOptions {
	pageNum: number;
	pageSize: number;
	firstName?: string;
	lastName?: string;
	email?: string;
	createdAt?: Date;
	createdBefore?: Date;
	createdAfter?: Date;
	lastLoggedAt?: Date;
	lastLoggedAfter?: Date;
	lastLoggedBefore?: Date;
	mobile?: string;
	isAuthorized?: string;
	isSubscribed?: string;
	hasRoles: Role[];
}

export interface IPage<T> {
	isLast: boolean;
	isFirst: boolean;
	totalPages: number;
	totalElements: number;
	pageNum: number;
	pageSize: number;
	content: T[];
}
