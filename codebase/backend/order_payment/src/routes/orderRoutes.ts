import express from "express";
import { OrderController } from "../controllers/orderController";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

const router = express.Router();

router.route("/search").post(OrderController.searchOrders);
router
	.route("/:id")
	.get(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		OrderController.getOrder
	)
	.put(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		OrderController.updateOrder
	)
	.delete(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		OrderController.deleteOrder
	);
router.route("/").post(OrderController.createOrder);

export default router;
