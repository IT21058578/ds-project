import { Router } from "express";

const router = Router();

router.post("/gen-access-token");
router.post("/gen-refresh-token");
router.post("/decode-access-token");
router.post("/decode-refresh-token");

export default router;
