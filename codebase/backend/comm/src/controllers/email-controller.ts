// TODO: Implement email controller functions

import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { EmailService } from "../services/email-service";

const sendRegisterEmail = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to send register email");
		const { firstName, email, authorizationToken } = req.body;
		await EmailService.sendRegisterEmail(firstName, email, authorizationToken);
		console.log("Sent register email succesfully");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("Failed to send register email", error);
		if (error instanceof Error) {
			const msg = error.message;
			switch (msg) {
				default:
					return res.status(HttpStatusCode.InternalServerError).send();
			}
		} else {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const sendPasswordResetEmail = async () => {};

const sendPasswordChangedEmail = async () => {};

const sendOrderConfirmationEmail = async () => {};

export const EmailController = {
	sendRegisterEmail,
	sendPasswordResetEmail,
	sendPasswordChangedEmail,
	sendOrderConfirmationEmail,
};
