import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { EmailService } from "../services/email-service";

import initializeLogger from "../logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

const sendRegisterEmail = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to send register email");
		const { firstName, email, authorizationToken } = req.body;
		await EmailService.sendRegisterEmail(firstName, email, authorizationToken);
		log.info("Sent register email succesfully");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		log.error("Failed to send register email", error);
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

const sendPasswordResetEmail = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to send password reset email");
		const { firstName, email, resetToken } = req.body;
		await EmailService.sendPasswordResetEmail(firstName, email, resetToken);
		log.info("Sent password reset email succesfully");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		log.error("Failed to send password reset email", error);
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

const sendPasswordChangedEmail = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to send password changed email");
		const { firstName, email } = req.body;
		await EmailService.sendPasswordChangedEmail(firstName, email);
		log.info("Sent password changed email succesfully");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		log.error("Failed to send password changed email", error);
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

const sendOrderConfirmationEmail = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to send order confirmation email");
		const { firstName, email, orderId } = req.body;
		await EmailService.sendOrderConfirmationEmail(email, firstName, orderId);
		log.info("Sent order confirmation email succesfully");
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		log.error("Failed to send order confirmation email", error);
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

export const EmailController = {
	sendRegisterEmail,
	sendPasswordResetEmail,
	sendPasswordChangedEmail,
	sendOrderConfirmationEmail,
};
