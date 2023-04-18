import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import { SENDGRID_API_KEY, VERIFIED_SENDER } from "../constants";

sendgrid.setApiKey(SENDGRID_API_KEY || "");
// TODO: Implement email service functions
// TODO: Implement email templates

const sendRegisterEmail = async (
	firstName: string,
	email: string,
	authorizationToken: string
) => {
	const message: MailDataRequired = {
		to: email,
		from: VERIFIED_SENDER,
		subject: "Registered succesfully",
		html: `Hey ${firstName}. Welcome to our service! Please click <a href="">${authorizationToken}</a> to authorize your new account`,
	};

	await sendgrid.send(message);
};

const sendPasswordResetEmail = async () => {};

const sendPasswordChangedEmail = async () => {};

const sendOrderConfirmationEmail = async () => {};

export const EmailService = {
	sendRegisterEmail,
	sendPasswordResetEmail,
	sendPasswordChangedEmail,
	sendOrderConfirmationEmail,
};
