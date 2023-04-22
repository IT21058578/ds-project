import express from "express";
import { OrderController } from "../controllers/orderController";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

const router = express.Router();

router.route("/search").post(
	...checkSchemaAndHandleErrors({
		pageSize: { isInt: true, optional: true },
		pageNum: { isInt: true, optional: true },
		sortCol: { isString: true, optional: true },
		sortDir: { isIn: { options: ["asc", "desc"] }, optional: true },
		search: { isString: true, optional: true },
		userId: { isMongoId: true, optional: true },
		deliveryStatus: {
			isIn: { options: ["NOT_STARTED", "IN_PROGRESS", "FINISHED"] },
			optional: true,
		},
		paymentStatus: {
			isIn: { options: ["PAID", "UNPAID"] },
			optional: true,
		},
	}),
	OrderController.searchOrders
);

router
	.route("/:id")
	.get(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		OrderController.getOrder
	)
	.put(
		...checkSchemaAndHandleErrors({
			id: { in: ["params"], isMongoId: true },
			userId: { isMongoId: true, optional: true },
			items: { isArray: true, optional: true },
			"items.*.name": { isString: true, optional: true },
			"items.*.imageUrl": { isURL: true, optional: true },
			"items.*.amountPerUnit": { isNumeric: true, optional: true },
			"items.*.qty": { isInt: true, optional: true },
			"paymentDetails.name": { isString: true, optional: true },
			"paymentDetails.expDate": { isString: true, optional: true },
			"paymentDetails.cardNumber": { isInt: true, optional: true },
			"paymentDetails.cvv": { isInt: true, optional: true },
			"shippingDetails.firstName": { isString: true, optional: true },
			"shippingDetails.lastName": { isString: true, optional: true },
			"shippingDetails.city": { isString: true, optional: true },
			"shippingDetails.postalCode": { isNumeric: true, optional: true },
			"shippingDetails.country": { isString: true, optional: true },
			"shippingDetails.state": { isString: true, optional: true },
			"shippingDetails.address.firstLine": { isString: true, optional: true },
			"shippingDetails.address.secondLine": { isString: true, optional: true },
			deliveryStatus: {
				isIn: { options: ["NOT_STARTED", "IN_PROGRESS", "FINISHED"] },
				optional: true,
			},
			paymentStatus: {
				isIn: { options: ["PAID", "UNPAID"] },
				optional: true,
			},
		}),
		...checkSchemaAndHandleErrors({}),
		OrderController.updateOrder
	)
	.delete(OrderController.deleteOrder);

router.route("/").post(
	...checkSchemaAndHandleErrors({
		userId: { isMongoId: true, optional: true },
		items: { isArray: true, optional: true },
		"items.*.name": { isString: true, optional: true },
		"items.*.imageUrl": { isURL: true, optional: true },
		"items.*.amountPerUnit": { isNumeric: true, optional: true },
		"items.*.qty": { isInt: true, optional: true },
		"paymentDetails.name": { isString: true, optional: true },
		"paymentDetails.expDate": { isString: true, optional: true },
		"paymentDetails.cardNumber": { isInt: true, optional: true },
		"paymentDetails.cvv": { isInt: true, optional: true },
		"shippingDetails.firstName": { isString: true, optional: true },
		"shippingDetails.lastName": { isString: true, optional: true },
		"shippingDetails.city": { isString: true, optional: true },
		"shippingDetails.postalCode": { isNumeric: true, optional: true },
		"shippingDetails.country": { isString: true, optional: true },
		"shippingDetails.state": { isString: true, optional: true },
		"shippingDetails.address.firstLine": { isString: true, optional: true },
		"shippingDetails.address.secondLine": { isString: true, optional: true },
		deliveryStatus: {
			isIn: { options: ["NOT_STARTED", "IN_PROGRESS", "FINISHED"] },
			optional: true,
		},
		paymentStatus: {
			isIn: { options: ["PAID", "UNPAID"] },
			optional: true,
		},
	}),
	OrderController.createOrder
);

export default router;
