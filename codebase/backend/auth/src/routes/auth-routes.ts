import { Router } from "express";

import { AuthController } from "../controllers/auth-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

const router = Router();

router.post(
	"/login",
	...checkSchemaAndHandleErrors({
		email: { in: ["body"], isEmail: true, trim: true },
		password: { in: ["body"], isString: true, exists: true, trim: true },
	}),
	AuthController.loginUser
);

router.post(
	"/logout",
	...checkSchemaAndHandleErrors({
		id: { in: ["body"], isMongoId: true },
	}),
	AuthController.logoutUser
);

router.post(
	"/register",
	...checkSchemaAndHandleErrors({
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
		mobile: {
			in: ["body"],
			isMobilePhone: true,
		},
	}),
	AuthController.registerUser
);

router.post(
	"/register/resend",
	...checkSchemaAndHandleErrors({
		email: { in: ["body"], isEmail: true, trim: true },
	}),
	AuthController.resendRegisterEmail
);

router.patch(
	"/authorize",
	...checkSchemaAndHandleErrors({
		authorizationToken: { in: ["body"], isUUID: true, trim: true },
	}),
	AuthController.authorizeUser
);

router.post(
	"/refresh",
	...checkSchemaAndHandleErrors({
		refreshToken: { in: ["body"], isJWT: true, exists: true },
	}),
	AuthController.refreshTokens
);

//Routes used in forgot password flow
router.patch(
	"/forgot-password",
	...checkSchemaAndHandleErrors({
		email: { in: ["body"], isEmail: true, trim: true },
	}),
	AuthController.sendForgotPasswordEmail
);

router.patch(
	"/reset-password",
	...checkSchemaAndHandleErrors({
		resetToken: { in: ["body"], isUUID: true, trim: true },
		password: { in: ["body"], isString: true, trim: true },
	}),
	AuthController.resetPassword
);

router.patch(
	"/change-password",
	...checkSchemaAndHandleErrors({
		id: { in: ["body"], isMongoId: true, trim: true },
		oldPassword: { in: ["body"], isString: true, trim: true },
		password: { in: ["body"], isString: true, trim: true },
	}),
	AuthController.changePassword
);

//Eliminate and add roles
router.patch("/change-perms");

//Change emails
router.patch("/change-email");

router.patch("/change-email/resend");

export default router;
