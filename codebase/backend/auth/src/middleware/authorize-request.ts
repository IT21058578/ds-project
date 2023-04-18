import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "axios";

import { axios } from "../utils";

import {
	DECODE_ACCCESS_TOKEN_ENDPOINT,
	GET_USER_ENDPOINT,
	INTERNAL_API_KEY,
} from "../constants";
import { Role, UserErrorMessage } from "../types";
import initializeLogger from "../logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

/**
 * Middleware used to authorize a route. Simply pass in an array of permitted roles.
 * This function follows the following method.
 * 1. Check if token is same as internal api key ? authorize : continue
 * 2. Check if token exists ? continue : fail
 * 3. Decode token and check if id exists in db ? continue : fail (Calls token-service)
 * 4. Get user and check if any roll is allowed entry ? authorize : fail (Calls user-service)
 * @param roles - Array of permitted roles
 * @returns A middleware function
 */
export const authorizeRequest = (allowedRoles: Role[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const accessToken = req.headers.authorization?.split(" ")[1];
		if (accessToken === undefined) {
			log.info("Access token undefined");
			return res.status(HttpStatusCode.Unauthorized).send();
		} else if (accessToken !== INTERNAL_API_KEY) {
			log.info("External request identified.");
			try {
				const {
					data: { id },
				} = await axios
					.post<{ id: string }>(DECODE_ACCCESS_TOKEN_ENDPOINT, { accessToken })
					.catch(() => {
						throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
					});
				log.info("Token decoded. Finding roles...");
				// We do not directly check the roles present in the JWT token.
				const {
					data: { roles },
				} = await axios
					.get<{ roles: string[] }>(GET_USER_ENDPOINT, { params: { id } })
					.catch(() => {
						throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
					});
				// Checks whether use has a single role that can access this route
				log.info(`User has roles ${roles}. Verifying roles...`);
				const userHasAllowedRoles = allowedRoles.some((role) =>
					roles.includes(role)
				);
				if (!userHasAllowedRoles)
					throw Error(UserErrorMessage.INVALID_CREDENTIALS);
			} catch (err) {
				log.error("An error occured while authorizing", err);
				return res.status(HttpStatusCode.Unauthorized).send();
			}
		}

		next();
	};
};
