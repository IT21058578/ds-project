import express from "express";
import { ProductController } from "../controllers/productController";
import { checkSchemaAndHandleErrors } from "../middleware/check-schema";

const router = express.Router();

router.route("/brands/:brandId/search").post(
	...checkSchemaAndHandleErrors({
		brandId: { in: ["params"], isMongoId: true },
	}),
	ProductController.searchAllBrandProducts
);
router.route("/search").post(ProductController.searchProducts);
router
	.route("/:id")
	.get(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		ProductController.getProduct
	)
	.put(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		ProductController.updateProduct
	)
	.delete(
		...checkSchemaAndHandleErrors({ id: { in: ["params"], isMongoId: true } }),
		ProductController.deleteProduct
	);
router.route("/").post(ProductController.createProduct);

export default router;
