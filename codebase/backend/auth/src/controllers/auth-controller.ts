import { HttpStatusCode } from "axios";
import { Request, Response } from "express";

import { AuthService } from "../services/auth-service";

import { IUser, UserErrorMessage } from "../types";

const loginUser = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to login user");
		const { email, password } = req.body;
		const tokens = await AuthService.loginUser(email, password);
		console.log("Login succesful");
		return res.status(HttpStatusCode.Ok).send(tokens);
	} catch (error) {
		console.log("Failed to login", error);
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
			switch (msg) {
				case UserErrorMessage.INVALID_CREDENTIALS:
				case UserErrorMessage.INTERNAL_SERVER_ERROR:
					return res.status(HttpStatusCode.Unauthorized).send();
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const logoutUser = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to logout user");
		const { id } = req.body;
		await AuthService.logoutUser(id);
		console.log("Logout succesful");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("Failed to logout", error);
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
			switch (msg) {
				case UserErrorMessage.INTERNAL_SERVER_ERROR:
					return res.status(HttpStatusCode.InternalServerError).send();
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const registerUser = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to register user");
		const {
			password,
			email,
			firstName,
			lastName,
			mobile,
			isSubscribed,
		}: IUser = req.body;
		await AuthService.registerUser({
			password,
			email,
			firstName,
			lastName,
			mobile,
			isSubscribed,
		} as IUser);
		console.log("Register succesful");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("Failed to register", error);
		if (error instanceof Error) {
			const msg = error.message;
			switch (msg) {
				case UserErrorMessage.INTERNAL_SERVER_ERROR:
					return res.status(HttpStatusCode.InternalServerError).send();
				case UserErrorMessage.USER_EXISTS:
					return res.status(HttpStatusCode.Conflict).send();
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const resendRegisterEmail = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to resend register email");
		const { email } = req.body;
		await AuthService.resendRegisterEmail(email);
		console.log("Resend succesful");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("Failed to resend", error);
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
			switch (msg) {
				case UserErrorMessage.INTERNAL_SERVER_ERROR:
					return res.status(HttpStatusCode.InternalServerError).send();
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const authorizeUser = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to authorize user");
		const { authorizationToken } = req.body;
		await AuthService.authorizeUser(authorizationToken);
		console.log("Authorization succesful");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("Failed to authorize", error);
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
			switch (msg) {
				case UserErrorMessage.INTERNAL_SERVER_ERROR:
					return res.status(HttpStatusCode.InternalServerError).send();
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const refreshTokens = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to refresh user tokens");
		const { refreshToken } = req.body;
		await AuthService.refreshTokens(refreshToken);
		console.log("Refresh succesful");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("Failed to refresh", error);
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
			switch (msg) {
				case UserErrorMessage.INTERNAL_SERVER_ERROR:
					return res.status(HttpStatusCode.InternalServerError).send();
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const sendForgotPasswordEmail = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to send forgot password email");
		const { email } = req.body;
		await AuthService.sendForgotPasswordEmail(email);
		console.log("Send forgot password email succesful");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("Failed to send forgot password email", error);
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
			switch (msg) {
				case UserErrorMessage.INTERNAL_SERVER_ERROR:
					return res.status(HttpStatusCode.InternalServerError).send();
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const resetPassword = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to reset user password");
		const { password, resetToken } = req.body;
		await AuthService.resetPassword(resetToken, password);
		console.log("Reset password succesful");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("Failed to reset password", error);
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
			switch (msg) {
				case UserErrorMessage.INTERNAL_SERVER_ERROR:
					return res.status(HttpStatusCode.InternalServerError).send();
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const changePassword = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to change user password");
		const { id, oldPassword, password } = req.body;
		await AuthService.changePassword(id, oldPassword, password);
		console.log("Change pssword succesful");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("Failed to change password", error);
		if (error instanceof Error) {
			const msg = error.message as UserErrorMessage;
			switch (msg) {
				case UserErrorMessage.INTERNAL_SERVER_ERROR:
					return res.status(HttpStatusCode.InternalServerError).send();
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
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
