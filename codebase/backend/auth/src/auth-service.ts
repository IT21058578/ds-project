import { redis, mongoose } from ".";

export const loginUser = () => {
	//Destroy existing token family if exists
	//Create new token family
	//Generate and return JWT with appropriate role
};

export const registerUser = () => {
	//Check if user exists? continue : error
	//Create details and send an email to the user
};

export const resendRegisterEmail = () => {
	//Check if user exists? continue : error
	//Check if user is authorized? error : continue
	//Resend register email to the user
};

export const authorizeUser = () => {
	//Check if user exists? continue : error
	//Check if user is authorized? error : continue;
	//Change the user to authorized
};

export const refreshTokens = () => {
	//Check if refresh token is old? continue : destroy it
	//Check if refresh token is current? continue : ignore
	//Create new refresh token and access token
	//Add old access tokens to list
	//Return new access token
};

export const sendForgotPasswordEmail = () => {
	//Check if user exists? continue : error
	//Send an email to the user with a reset token
	//If success ? change the reset token of the user : error
};

export const resetPassword = () => {
	//Check if reset token exists within the system? continue : error
	//Send and email to the user mentioning password change
	//If success ? Change the users's password to given password and save : error
};

export const changepassword = () => {
	//Check if password is same for logged in user? continue : error
	//Change password to given password
};
