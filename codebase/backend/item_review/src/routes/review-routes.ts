import express from "express";
import { ReviewController } from "../controllers/review-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

const router = express.Router();

router.route("/search").post(
	...checkSchemaAndHandleErrors({
		pageSize: { isInt: true, optional: true },
		pageNum: { isInt: true, optional: true },
		sortCol: { isString: true, optional: true },
		sortDir: { isString: true, optional: true },
		search: { isString: true, optional: true },
		userId: { isMongoId: true, optional: true },
		productId: { isMongoId: true, optional: true },
	}),
	ReviewController.searchReviews
);

router
	.route("/:id")
	.get(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		ReviewController.getReview
	)
	.put(
		...checkSchemaAndHandleErrors({
			id: { in: ["params"], isMongoId: true },
			comment: { isString: true, optional: true },
			rating: { isNumeric: true, optional: true },
		}),
		ReviewController.updateReview
	)
	.delete(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		ReviewController.deleteReview
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
	ReviewController.createReview
);

export default router;
