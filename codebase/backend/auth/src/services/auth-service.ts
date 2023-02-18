import { randomUUID } from "crypto";
import { redis, mongoose } from "..";
import bcrypt from "bcrypt";

import { User } from "../models/user-model";
import { TokenService } from "./token-service";

import { HttpCode, ITokenFamily, IUser, UserErrorMessage } from "../types";

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
		latestAccessToken: TokenService.generateAccessToken(),
		latestRefreshToken: TokenService.generateRefreshToken(),
	};

	await redis
		.call("JSON.SET", user.id, JSON.stringify(tokenFamily))
		.catch((err) => {
			throw Error(UserErrorMessage.INTERNAL_SERVER_ERROR);
		});

	return tokenFamily;
};

const registerUser = async (user: IUser) => {
	console.log("Verifying credentials");
	const existingUser = (await User.find({ email: user.email }).exec()).at(0);

	if (existingUser !== undefined) {
		throw Error(UserErrorMessage.USER_EXISTS);
	}

	user.authorizationToken = randomUUID();
	user.password = await bcrypt.hash(user.password, 10);

	console.log("Requesting comm service to send an email");
	//TODO: Send Email

	console.log("Saving new user");
	const newUser = new User(user);
	await newUser.save();
};

const resendRegisterEmail = () => {
	//Check if user exists? continue : error
	//Check if user is authorized? error : continue
	//Resend register email to the user
};

const authorizeUser = () => {
	//Check if user exists? continue : error
	//Check if user is authorized? error : continue;
	//Change the user to authorized
};

const refreshTokens = () => {
	//Check if refresh token is old? continue : destroy it
	//Check if refresh token is current? continue : ignore
	//Create new refresh token and access token
	//Add old access tokens to list
	//Return new access token
};

const sendForgotPasswordEmail = () => {
	//Check if user exists? continue : error
	//Send an email to the user with a reset token
	//If success ? change the reset token of the user : error
};

const resetPassword = () => {
	//Check if reset token exists within the system? continue : error
	//Send and email to the user mentioning password change
	//If success ? Change the users's password to given password and save : error
};

const changepassword = () => {
	//Check if password is same for logged in user? continue : error
	//Change password to given password
};

export const AuthService = {
	loginUser,
	registerUser,
	resendRegisterEmail,
	authorizeUser,
	refreshTokens,
	sendForgotPasswordEmail,
	resetPassword,
	changepassword,
};
