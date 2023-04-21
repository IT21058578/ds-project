import { Router } from "express";
import { EmailController } from "../controllers/email-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

const router = Router();

// TODO: Implement email route middleware

router.post(
	"/send-register-email",
	...checkSchemaAndHandleErrors({
		firstName: { in: ["body"], isString: true },
		email: { in: ["body"], isEmail: true },
		authorizationToken: { in: ["body"], isUUID: true },
	}),
	EmailController.sendRegisterEmail
);

router.post("/send-order-confirmation-email");

router.post("/send-password-reset-email");

router.post("/send-password-changed-email");

export default router;
