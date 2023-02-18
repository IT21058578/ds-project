import { Role } from "./types";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware used to authorize a route. Simply pass in an array of permitted roles.
 * @param roles - Array of permitted roles
 * @returns A middleware function
 */
export const authorizeRequest = (roles: Role[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		//TODO: Make authorization logic
		next();
	};
};
