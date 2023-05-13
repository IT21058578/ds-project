

declare global {
	namespace Express {
		export interface Request {
			"user-id"?: string;
			"user-roles"?: string[];
		}
	}
}

export {};
