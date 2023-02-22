import { Request, Response, NextFunction } from "express";

import { CustomValidator, validationResult } from "express-validator";
import Axios, { HttpStatusCode } from "axios";

import {
	API_ROLES,
	DECODE_ACCCESS_TOKEN_ENDPOINT,
	INTERNAL_API_KEY,
} from "./constants";
import { Role, UserErrorMessage } from "./types";

/**
 * Middleware used to authorize a route. Simply pass in an array of permitted roles. This function works by searching for
 * first match of role in the roles array. If no matches are found, an error is thrown and a 401 is sent back.
 * @param roles - Array of permitted roles
 * @returns A middleware function
 */
export const authorizeRequest = (allowedRoles: Role[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const accessToken = req.headers.authorization?.split(" ")[1];
		if (accessToken === undefined) {
			return res.status(HttpStatusCode.Unauthorized).send();
		} else if (accessToken === INTERNAL_API_KEY) {
			//Nothing happens
		} else {
			try {
				let hasAllowedRole = false;
				const {
					data: { roles },
				} = await axios
					.post<{ roles: Role[] }>(DECODE_ACCCESS_TOKEN_ENDPOINT, accessToken)
					.catch((err) => {
						throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
					});
				for (const role of roles) {
					if (allowedRoles.includes(role)) {
						break;
					}
				}
				if (!hasAllowedRole) throw Error(UserErrorMessage.INVALID_CREDENTIALS);
			} catch (err) {
				return res.status(HttpStatusCode.Unauthorized).send();
			}
		}

		next();
	};
};

/**
 * The instance of axios that should be used for calling internal apis. Already has the api key configured.
 */
export const axios = Axios.create({
	baseURL: "",
	headers: { Authorization: `Bearer ${INTERNAL_API_KEY}` },
});

export const hasValidRoles: CustomValidator = (value: string[]) => {
	return value?.every((role) => API_ROLES.includes(role.toUpperCase() as Role))
		? Promise.resolve("Roles are valid")
		: Promise.reject("Roles are invalid");
};
