export enum Role {
	BUYER = "BUYER",
	SELLER = "SELLER",
	ADMIN = "ADMIN",
}

export interface TokenFamily {
	latestAccessToken: string;
	latestRefreshToken: string;
	expiredAccessTokens: Set<string>;
	expiredRefreshTokens: Set<string>;
}

export interface BasicUser {
	firstName: string;
	lastName: string;
	resetToken: string;
	email: string;
	password: string;
	createdAt: Date;
	lastLoggedAt: Date;
}
