import { Router } from "express";

const router = Router();

router.get("/:id");
router.get("/");
router.patch("/:id");
router.delete("/:id");

export default router;
