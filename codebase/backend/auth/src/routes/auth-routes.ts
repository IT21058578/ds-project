import { Router } from "express";

import { checkSchema } from "express-validator";

import { AuthController } from "../controllers/auth-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";
import { rateLimit } from "../middleware/rate-limit";

const router = Router();

router.post(
	"/login",
	...checkSchemaAndHandleErrors({
		email: { in: ["body"], isEmail: true, trim: true },
		password: { in: ["body"], isString: true, exists: true, trim: true },
		ip: { in: ["body"], isIP: true, trim: true },
	}),
	rateLimit,
	AuthController.loginUser
);

router.post(
	"/register",
	checkSchema({
		email: { in: ["body"], isEmail: true },
		firstName: {
			in: ["body"],
			isAlpha: true,
			trim: true,
		},
		lastName: {
			in: ["body"],
			isAlpha: true,
			trim: true,
		},
		password: { in: ["body"], isString: true, trim: true },
		isSubscribed: {
			in: ["body"],
			toBoolean: true,
			default: true,
		},
	}),
	AuthController.registerUser
);

router.post(
	"/register/resend",
	checkSchema({
		email: { in: ["body"], isEmail: true, trim: true },
	}),
	AuthController.resendRegisterEmail
);

router.patch(
	"/authorize",
	checkSchema({
		authorizationToken: { in: ["body"], isUUID: true, trim: true },
	}),
	AuthController.authorizeUser
);

router.post(
	"/refresh",
	checkSchema({
		refreshToken: { in: ["body"], isJWT: true, exists: true },
	}),
	AuthController.refreshTokens
);

//Routes used in forgot password flow
router.patch(
	"/forgot/send-email",
	checkSchema({
		email: { in: ["body"], isEmail: true, trim: true },
	}),
	AuthController.sendForgotPasswordEmail
);

router.patch(
	"/forgot/reset-password",
	checkSchema({
		resetToken: { in: ["body"], isUUID: true, trim: true },
		password: { in: ["body"], isString: true, trim: true },
	}),
	AuthController.resetPassword
);

//Routes used in change password flow
router.patch(
	"/change-password",
	checkSchema({
		id: { in: ["body"], isMongoId: true, trim: true },
		oldPassword: { in: ["body"], isString: true, trim: true },
		password: { in: ["body"], isString: true, trim: true },
	}),
	AuthController.changePassword
);

export default router;
