import { HttpStatusCode } from "axios";
import { Request, Response } from "express";

import { validationResult } from "express-validator/src/validation-result";

import { AuthService } from "../services/auth-service";

import { IUser, UserErrorMessage } from "../types";

export const loginUser = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty) {
		return res
			.json({ errors: errors.array() })
			.status(HttpStatusCode.BadRequest)
			.send();
	}

	try {
		const { email, password } = req.body;
		await AuthService.loginUser(email, password);
	} catch (error) {
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
			if (
				[
					UserErrorMessage.INVALID_CREDENTIALS,
					UserErrorMessage.INTERNAL_SERVER_ERROR,
				].includes(msg)
			)
				return res
					.status(HttpStatusCode.Unauthorized)
					.send(UserErrorMessage.INVALID_CREDENTIALS);
		}
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty) {
		return res
			.json({ errors: errors.array() })
			.status(HttpStatusCode.BadRequest)
			.send();
	}

	try {
		await AuthService.registerUser(req.body as IUser);
	} catch (error) {
		if (error instanceof Error) {
			const msg = error.message;
			if (msg === UserErrorMessage.USER_EXISTS)
				return res
					.status(HttpStatusCode.Conflict)
					.send(UserErrorMessage.USER_EXISTS);
		}
	}
};

export const resendRegisterEmail = async (req: Request, res: Response) => {};

export const authorizeUser = async (req: Request, res: Response) => {};

export const refreshTokens = async (req: Request, res: Response) => {};

export const sendForgotPasswordEmail = async (
	req: Request,
	res: Response
) => {};

export const resetPassword = async (req: Request, res: Response) => {};

export const changepassword = async (req: Request, res: Response) => {};
