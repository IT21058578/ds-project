import { Router } from "express";
import { CartController } from "./cart-controller";

const router = Router();

router.get("/:id", CartController.getCart);
router.put("/:id", CartController.editCart);
router.delete("/:id", CartController.deleteCart);

export default router;
