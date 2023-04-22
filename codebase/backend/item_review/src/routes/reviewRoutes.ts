import express from "express";
import { ProductController } from "../controllers/productController";

const router = express.Router();

router.route("/search").post(ProductController.searchReviews);
router
	.route("/:id")
	.get(ProductController.getReview)
	.put(ProductController.updateReview)
	.delete(ProductController.deleteReview);
router.route("/").post(ProductController.createReview);

export default router;
