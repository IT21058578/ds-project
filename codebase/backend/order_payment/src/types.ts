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

/**
 * An interface for a family of tokens per user. This is saved to redis when a user logs in and removed when the log out
 */
export interface ITokenFamily {
	latestAccessToken: string;
	latestRefreshToken: string;
	expiredAccessTokens: Set<string>;
	expiredRefreshTokens: Set<string>;
}

/**
 * An interface for the user object retained in the database.
 */
export interface IUser {
	firstName: string;
	lastName: string;
	resetToken?: string;
	email: string;
	password: string;
	createdAt: Date;
	authorizationToken?: string;
	lastLoggedAt?: Date;
	roles: Role[];
	isSubscribed: boolean;
	isAuthorized: boolean;
}

export interface IOrder {
	id: string;
	userId: string;
	deliveryStatus: "IN_PROGRESS" | "NOT_STARTED" | "FINISHED";
	paymentStatus: "PAID" | "UNPAID";
	createdOn: Date;
	lastEditedOn: Date;
	items: {
		id: string;
		qty: number;
	}[];
	shippingDetails: {
		firstName: string;
		lastName: string;
		address: {
			firstLine: string;
			secondLine: string;
		};
		city: string;
		state: string;
		postalCode: number;
		country: string;
	};
	paymentDetails: {
		name: string;
		cardNumber: number;
		expDate: string;
		cvv: number;
	};
}

interface IBasicPageRequest<T> {
	pageNum?: number;
	pageSize?: number;
	sortCol?: keyof T;
	sortDir?: "asc" | "desc";
	search?: string;
}

type TPageSearchOptions<T> = {
	[Property in keyof T]?: T[Property];
};

export type TPageRequest<T> = IBasicPageRequest<T> & TPageSearchOptions<T>;

export type IOrderPageRequest = Omit<
	TPageRequest<IOrder>,
	"id" | "shippingDetails" | "paymentDetails"
> & {
	includesItemId?: string;
	excludesItemId?: string;
	createdBefore?: string;
	createdAfter?: string;
	lastEditedBefore?: string;
	lastEditedAfter?: string;
};

export interface IAuthorizedUser {
	id?: string;
	roles?: Role[];
}

export interface IPage {
	isLast: boolean;
	isFirst: boolean;
	totalPages: number;
	totalElements: number;
	pageNum: number;
	pageSize: number;
	content: any[];
	searchOptions?: { [key: string]: any };
	sort?: {
		sortDir: "asc" | "desc";
		sortCol: string;
	};
}
