import { Router } from "express";

import { checkSchema } from "express-validator";

import {
	authorizeUser,
	changepassword,
	loginUser,
	refreshTokens,
	registerUser,
	resendRegisterEmail,
	resetPassword,
	sendForgotPasswordEmail,
} from "../controllers/auth-controller";

const router = Router();

router.post("/login", loginUser);

router.post(
	"/register",
	checkSchema({
		email: { in: ["body"], isEmail: true },
		firstName: {
			in: ["body"],
			isString: true,
			isAlpha: true,
			normalizeEmail: true,
		},
		lastName: {
			in: ["body"],
			isString: true,
			isAlpha: true,
			exists: true,
			trim: true,
		},
		password: { in: ["body"], isString: true, exists: true, trim: true },
		isSubscribed: {
			in: ["body"],
			isBoolean: true,
			exists: true,
			trim: true,
			toBoolean: true,
		},
	}),
	registerUser
);

router.post("/register/resend", resendRegisterEmail);
router.patch("/authorize", authorizeUser);
router.post("/refresh", refreshTokens);

//Routes used in forgot password flow
router.patch("/forgot/sendemail", sendForgotPasswordEmail);
router.patch("/forgot/resetpassword", resetPassword);

//Routes used in change password flow
router.patch("/forgot/changepassword", changepassword);

export default router;
