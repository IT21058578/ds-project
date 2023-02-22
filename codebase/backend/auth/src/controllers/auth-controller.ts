import { HttpStatusCode } from "axios";
import { Request, Response } from "express";

import { AuthService } from "../services/auth-service";

import { IUser, UserErrorMessage } from "../types";

const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		await AuthService.loginUser(email, password);
		return res.status(HttpStatusCode.Ok).send();
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

const logoutUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;
		await AuthService.logoutUser(id);
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
		}
	}
};

const registerUser = async (req: Request, res: Response) => {
	try {
		await AuthService.registerUser(req.body as IUser);
		return res.status(HttpStatusCode.Ok).send();
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

const resendRegisterEmail = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		await AuthService.resendRegisterEmail(email);
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
		}
	}
};

const authorizeUser = async (req: Request, res: Response) => {
	try {
		const { authorizationToken } = req.body;
		await AuthService.authorizeUser(authorizationToken);
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
		}
	}
};

const refreshTokens = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.body;
		await AuthService.refreshTokens(refreshToken);
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
		}
	}
};

const sendForgotPasswordEmail = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		await AuthService.sendForgotPasswordEmail(email);
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
		}
	}
};

const resetPassword = async (req: Request, res: Response) => {
	try {
		const { password, resetToken } = req.body;
		await AuthService.resetPassword(resetToken, password);
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
		}
	}
};

const changePassword = async (req: Request, res: Response) => {
	try {
		const { id, password, oldPassword } = req.body;
		await AuthService.changePassword(id, password, oldPassword);
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
		}
	}
};

export const AuthController = {
	loginUser,
	logoutUser,
	registerUser,
	resendRegisterEmail,
	authorizeUser,
	refreshTokens,
	sendForgotPasswordEmail,
	resetPassword,
	changePassword,
};
