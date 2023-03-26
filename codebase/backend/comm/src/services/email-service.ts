import { SMTP_PASS, SMTP_USER, VERIFIED_SENDER } from "../constants";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

let transporter: Transporter<SMTPTransport.SentMessageInfo> =
	nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});

// TODO: Implement email templates

const sendRegisterEmail = async (
	firstName: string,
	email: string,
	authorizationToken: string
) => {
	console.log("Attempting to send register email...");
	const info = await transporter.sendMail({
		to: email,
		from: VERIFIED_SENDER,
		subject: "Registered succesfully",
		html: `Hey ${firstName}. Welcome to our service! Please click <a href="">${authorizationToken}</a> to authorize your new account`,
	});
	console.log("Email sent", info.messageId);
};

const sendPasswordResetEmail = async (
	firstName: string,
	email: string,
	resetToken: string
) => {
	console.log("Attempting to send password reset email...");
	const info = await transporter.sendMail({
		to: email,
		from: VERIFIED_SENDER,
		subject: "Reset your password",
		html: `Hey ${firstName}. You seem to have forgotten your password. Please click <a href="">${resetToken}</a> to reset your password`,
	});
	console.log("Email sent", info.messageId);
};

const sendPasswordChangedEmail = async (firstName: string, email: string) => {
	console.log("Attempting to send password changed email...");
	const info = await transporter.sendMail({
		to: email,
		from: VERIFIED_SENDER,
		subject: "Password Changed",
		html: `Hey ${firstName}. We are sending this email to notify you that your password has just been changed`,
	});
	console.log("Email sent", info.messageId);
};

const sendOrderConfirmationEmail = async () => {
	// TODO: Implement Order Confirmation Email
};

export const EmailService = {
	sendRegisterEmail,
	sendPasswordResetEmail,
	sendPasswordChangedEmail,
	sendOrderConfirmationEmail,
};
