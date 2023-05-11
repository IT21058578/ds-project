import express from "express";
import { ProductController } from "../controllers/product-controller";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

const router = express.Router();

router.route("/search").post(
	...checkSchemaAndHandleErrors({
		pageSize: { isInt: true, optional: true },
		pageNum: { isInt: true, optional: true },
		sortCol: { isString: true, optional: true },
		sortDir: { isString: true, optional: true },
		search: { isString: true, optional: true },
		brandId: { isMongoId: true, optional: true },
	}),
	ProductController.searchProducts
);

router
	.route("/:id")
	.get(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		ProductController.getProduct
	)
	.put(
		...checkSchemaAndHandleErrors({
			id: { in: ["params"], isMongoId: true },
			name: { isString: true, optional: true },
			description: { isString: true, optional: true },
			category: { isString: true, optional: true },
			price: { isNumeric: true, optional: true },
			imageUrl: { isArray: true, optional: true },
			countInStock: { isInt: true, optional: true },
		}),
		ProductController.updateProduct
	)
	.delete(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		ProductController.deleteProduct
	);

router.route("/").post(
	...checkSchemaAndHandleErrors({
		brandId: { isMongoId: true, optional: true },
		brandName: { isString: true, optional: true },
		name: { isString: true, optional: true },
		countInStock: { isInt: true, optional: true },
		description: { isString: true, optional: true },
		category: { isString: true, optional: true },
		price: { isNumeric: true, optional: true },
		imageUrl: { isArray: true, optional: true },
	}),
	ProductController.createProduct
);

export default router;
