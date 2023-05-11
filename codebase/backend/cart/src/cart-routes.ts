import { Router } from "express";
import { CartController } from "./cart-controller";
import { checkSchemaAndHandleErrors } from "./middleware/check-schema";

const router = Router();

router.route("/:userId").get(
	...checkSchemaAndHandleErrors({
		userId: { in: ["params"], isMongoId: true },
	}),
	CartController.getCart
);

router.put(
	"/:userId",
	...checkSchemaAndHandleErrors({
		userId: { in: ["params"], isMongoId: true },
		products: { isArray: true, optional: true },
		"products.*.id": { isMongoId: true, optional: true },
		"products.*.name": { isString: true, optional: true },
		"products.*.price": { isNumeric: true, optional: true },
		"products.*.qty": { isInt: true, optional: true },
	}),
	CartController.editCart
);

router.delete(
	"/:userId",
	...checkSchemaAndHandleErrors({
		userId: { in: ["params"], isMongoId: true },
	}),
	CartController.deleteCart
);

export default router;
