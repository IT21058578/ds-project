import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import {
	MAX_IP_EMAIL_LOGIN_ATTEMPTS,
	MAX_IP_LOGIN_ATTEMPTS,
} from "../constants";
import { IBlacklistUnit } from "../types";

/**
 * A middleware function made specifically for the login endpoint. This function blacklists and IP
 * based on the number of times they have signed in. IP and email data is taken from the request.
 * @param req
 * @param res
 * @param next
 */
export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
	const { ip, email }: { ip?: string; email?: string } = req.body;
	if (!ip || !email) {
		return res.status(HttpStatusCode.Unauthorized).send();
	}

	//Check if ip is in redis. If it is ? Increment counter : Add it
	const { emailList }: IBlacklistUnit = {} as any; //TODO: Redis call

	const totalHitCount = emailList
		.map((o) => o.count)
		.reduce((prev, crnt) => prev + crnt);

	if (totalHitCount > MAX_IP_LOGIN_ATTEMPTS) {
		return res
			.status(HttpStatusCode.Unauthorized)
			.send("Too many attempts from this IP. You are blacklisted");
	}

	if (
		emailList.find((o) => o.email === email)?.count ||
		0 > MAX_IP_EMAIL_LOGIN_ATTEMPTS
	) {
		return res
			.status(HttpStatusCode.Unauthorized)
			.send(
				"Too many attempts from this IP for this email. You are blacklisted"
			);
	}

	next();
};
