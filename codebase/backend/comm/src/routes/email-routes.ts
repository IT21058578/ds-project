import { Router } from "express";

const router = Router();

// TODO: Implement email route middleware

router.post("/send-register-email");

router.post("/send-order-confirmation-email");

router.post("/send-password-reset-email");

router.post("/send-password-changed-email");

export default router;
