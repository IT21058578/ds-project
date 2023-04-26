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
		"user-id": { in: ["headers"], isMongoId: true },
	}),
	AuthController.logoutUser
);

router.post(
	"/register",
	...checkSchemaAndHandleErrors({
		email: { isEmail: true },
		firstName: {
			isAlpha: true,
			trim: true,
		},
		lastName: {
			isAlpha: true,
			trim: true,
		},
		password: { isString: true, trim: true },
		isSubscribed: {
			toBoolean: true,
			default: true,
		},
		mobile: {
			isMobilePhone: true,
		},
		profileImageUrl: {
			isURL: true,
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

export default router;
