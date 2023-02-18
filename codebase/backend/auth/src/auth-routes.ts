import { Router } from "express";

import {
	authorizeUser,
	changepassword,
	loginUser,
	refreshTokens,
	registerUser,
	resendRegisterEmail,
	resetPassword,
	sendForgotPasswordEmail,
} from "./auth-controller";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/register/resend", resendRegisterEmail);
router.patch("/authorize", authorizeUser);
router.post("/refresh", refreshTokens);

//Routes used in forgot password flow
router.post("/forgot/sendemail", sendForgotPasswordEmail);
router.post("/forgot/resetpassword", resetPassword);

//Routes used in change password flow
router.post("/forgot/changepassword", changepassword);

export default router;
