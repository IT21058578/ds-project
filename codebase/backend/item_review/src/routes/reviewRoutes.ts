import express from "express";
import { ProductController } from "../controllers/productController";
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
		productId: { isMongoId: true, optional: true },
	}),
	ProductController.searchReviews
);

router
	.route("/:id")
	.get(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		ProductController.getReview
	)
	.put(
		...checkSchemaAndHandleErrors({
			id: { in: ["params"], isMongoId: true },
			comment: { isString: true, optional: true },
			rating: { isNumeric: true, optional: true },
		}),
		ProductController.updateReview
	)
	.delete(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		ProductController.deleteReview
	);

router.route("/").post(
	...checkSchemaAndHandleErrors({
		userId: { isMongoId: true, optional: true },
		productId: { isMongoId: true, optional: true },
		productName: { isString: true, optional: true },
		comment: { isString: true, optional: true },
		createdBy: { isString: true, optional: true },
		rating: { isNumeric: true, optional: true },
	}),
	ProductController.createReview
);

export default router;
