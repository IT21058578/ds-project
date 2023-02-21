import { redis } from "..";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { axios } from "../utils";
import { User } from "../models/user-model";
import { TokenService } from "./token-service";

import { ITokenFamily, IUser, UserErrorMessage } from "../types";
import {
	SEND_FORGOT_PASSWORD_EMAIL_ENDPOINT,
	SEND_PASSWORD_CHANGED_NOTICE_EMAIL_ENDPOINT,
	SEND_REGISTER_EMAIL_ENDPOINT,
} from "../constants";

const loginUser = async (email: string, password: string) => {
	console.log("Verifying credentials");
	const user = (await User.find({ email }).exec()).at(0);

	if (user === undefined) {
		throw Error(UserErrorMessage.INVALID_CREDENTIALS);
	}

	const encryptedPassword = await bcrypt.hash(password, 10);
	if (user.password !== encryptedPassword) {
		throw Error(UserErrorMessage.INVALID_CREDENTIALS);
	}

	console.log("Saving token family in redis");
	const tokenFamily: ITokenFamily = {
		latestAccessToken: await TokenService.generateAccessToken(
			user.roles,
			user.id
		),
		latestRefreshToken: await TokenService.generateRefreshToken(user.id),
		expiredAccessTokens: new Set<string>(),
		expiredRefreshTokens: new Set<string>(),
	};

	await redis
		.call("JSON.SET", user.id, JSON.stringify(tokenFamily))
		.catch((err) => {
			throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
		});

	return {
		accessToken: tokenFamily.latestAccessToken,
		refreshToken: tokenFamily.latestRefreshToken,
	};
};

const logoutUser = async (id: string) => {
	console.log("Deleting token family");
	await redis.call("JSON.DEL", id).catch((err) => {
		throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
	});
};

const registerUser = async (user: IUser) => {
	console.log("Verifying credentials");
	const existingUser = (await User.find({ email: user.email }).exec()).at(0);

	if (existingUser !== undefined) {
		throw Error(UserErrorMessage.USER_EXISTS);
	}

	user.authorizationToken = randomUUID();
	user.password = await bcrypt.hash(user.password, 10);
	user.isAuthorized = false;
	user.createdAt = new Date();

	console.log("Requesting comm service to send an email");
	await axios.post(SEND_REGISTER_EMAIL_ENDPOINT, { user }).catch((err) => {
		throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
	});

	console.log("Saving new user");
	const newUser = new User(user);
	await newUser.save();
};

const resendRegisterEmail = async (email: string) => {
	console.log("Verifying credentials");
	const user = (await User.find({ email }).exec()).at(0);

	if (user === undefined) {
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	if (user.isAuthorized === true) {
		throw Error(UserErrorMessage.USER_CONFLICT);
	}

	console.log("Requesting comm service to send an email");
	await axios.post(SEND_REGISTER_EMAIL_ENDPOINT, { user }).catch((err) => {
		throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
	});
};

const authorizeUser = async (authorizationToken: string) => {
	console.log("Verifying credentials");
	const user = (await User.find({ authorizationToken }).exec()).at(0);

	if (user === undefined) {
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	if (user.isAuthorized === true) {
		throw Error(UserErrorMessage.USER_CONFLICT);
	}

	user.isAuthorized = true;

	console.log("Saving updated user");
	await user.save();
};

const refreshTokens = async (refreshToken: string) => {
	console.log("Verifying credentials");
	const { sub: id } = jwt.verify(refreshToken, "") as jwt.JwtPayload;

	if (id === undefined) {
		console.error("Refresh token with no id received");
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	const tokenFamily = (await redis.call("JSON.GET", id)) as ITokenFamily | null;

	console.log(tokenFamily); //TODO: Delete

	if (tokenFamily === null) {
		console.error("User tried to refresh when not logged in");
		throw Error(UserErrorMessage.USER_CONFLICT);
	}

	const user = await User.findById(id).exec();

	if (user === null) {
		console.error("Non-existant user tried to refresh");
		throw Error(UserErrorMessage.USER_CONFLICT);
	}

	if (tokenFamily.expiredRefreshTokens?.has(refreshToken)) {
		console.error("Old refresh token detected");
		await redis.call("JSON.DEL", id);
		throw Error(UserErrorMessage.USER_CONFLICT);
	}

	if (tokenFamily.latestRefreshToken !== refreshToken) {
		console.error("Refresh token does not match any token");
		throw Error(UserErrorMessage.USER_CONFLICT);
	}

	tokenFamily.expiredAccessTokens.add(tokenFamily.latestAccessToken);
	tokenFamily.expiredRefreshTokens.add(tokenFamily.latestRefreshToken);
	tokenFamily.latestAccessToken = await TokenService.generateAccessToken(
		user.roles,
		user.id
	);
	tokenFamily.latestRefreshToken = await TokenService.generateRefreshToken(
		user.id
	);

	console.log("Saving token family in redis");
	await redis.call("JSON.SET", id, JSON.stringify(tokenFamily)).catch((err) => {
		throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
	});

	return {
		accessToken: tokenFamily.latestAccessToken,
		refreshToken: tokenFamily.latestRefreshToken,
	};
};

const sendForgotPasswordEmail = async (email: string) => {
	console.log("Verifying credentials");
	const user = (await User.find({ email }).exec()).at(0);

	if (user === undefined) {
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	user.resetToken = randomUUID();

	console.log("Requesting comm service to send email");
	await axios
		.post(SEND_FORGOT_PASSWORD_EMAIL_ENDPOINT, { user })
		.catch((err) => {
			throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
		});

	console.log("Saving updated user");
	user.save();
};

const resetPassword = async (resetToken: string, password: string) => {
	console.log("Verifying credentials");
	const user = (await User.find({ resetToken }).exec()).at(0);

	if (user === undefined) {
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	user.password = await bcrypt.hash(password, 10);

	console.log("Requesting comm service to send email");
	await axios
		.post(SEND_PASSWORD_CHANGED_NOTICE_EMAIL_ENDPOINT, { user })
		.catch((err) => {
			throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
		});

	console.log("Saving updated user");
	user.save();
};

const changePassword = async (
	id: string,
	oldPassword: string,
	password: string
) => {
	console.log("Verifying credentials");
	const user = await User.findById(id).exec();

	if (user === null) {
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	const encryptedOldPassword = await bcrypt.hash(oldPassword, 10);
	if (user.password !== encryptedOldPassword) {
		throw Error(UserErrorMessage.INVALID_CREDENTIALS);
	}

	user.password = await bcrypt.hash(password, 10);

	console.log("Requesting comm service to send email");
	await axios
		.post(SEND_PASSWORD_CHANGED_NOTICE_EMAIL_ENDPOINT, { user })
		.catch((err) => {
			throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
		});

	console.log("Saving updated user");
	user.save();
};

export const AuthService = {
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
