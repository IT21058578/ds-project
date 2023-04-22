import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { Product, Review } from "../models/productModel";

const createProduct = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to create product");
		const {
			brandId,
			brandName,
			name,
			price,
			imageUrl,
			description,
			countInStock,
			category,
		} = req.body as {
			brandId: string;
			brandName: string;
			name: string;
			price: number;
			imageUrl: string[];
			description: string;
			countInStock: number;
			category: string;
		};

		const product = new Product({
			brandId,
			brandName,
			category,
			countInStock,
			description,
			imageUrl,
			name,
			price,
			createdOn: new Date(),
			lastEditedOn: new Date(),
		});

		const savedProduct = await product.save();
		return res.status(HttpStatusCode.Created).json(savedProduct);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const getProduct = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to get product");
		const { id } = req.params as { id: string };
		const product = await Product.findById(id).exec();
		if (product === null) throw Error("Product not found");
		else {
			return res.status(HttpStatusCode.Ok).json(product);
		}
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const searchProducts = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to search product");
		const {
			pageSize = 10,
			pageNum = 1,
			sortCol = "_id",
			sortDir = "asc",
			search,
		} = req.body;

		const products = await Product.find({
			...(search ? { $text: { $search: search } } : {}),
		})
			.sort({ [sortCol]: sortDir })
			.skip(pageSize * (pageNum - 1))
			.limit(pageSize)
			.exec();

		return res.status(HttpStatusCode.Ok).send(products);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to update product");
		const { id } = req.params as { id: string };
		const { name, price, imageUrl, description, countInStock, category } =
			req.body as {
				name?: string;
				price?: number;
				imageUrl?: string[];
				description?: string;
				countInStock?: number;
				category?: string;
			};

		const product = await Product.findById(id).exec();
		if (product === null) throw Error("Product not found");
		else {
			product.name = name || product.name;
			product.price = price || product.price;
			product.imageUrl = imageUrl || product.imageUrl;
			product.description = description || product.description;
			product.countInStock = countInStock || product.countInStock;
			product.category = category || product.category;
			product.lastEditedOn = new Date();
		}

		const savedProduct = await product.save();
		return res.status(HttpStatusCode.Created).json(savedProduct);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to delete product");
		const { id } = req.params as { id: string };
		const product = await Product.findByIdAndDelete(id).exec();
		if (product === null) throw Error("Product not found");
		else {
			return res.status(HttpStatusCode.NoContent);
		}
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const createReview = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to create review");
		const { comment, productId, productName, rating, userId, createdBy } =
			req.body as {
				userId: string;
				productId: string;
				productName: string;
				comment: string;
				rating: number;
				createdBy: string;
			};

		const review = new Review({
			comment,
			createdBy,
			productId,
			productName,
			rating,
			userId,
			createdOn: new Date(),
			lastEditedOn: new Date(),
		});

		const savedReview = await review.save();
		return res.status(HttpStatusCode.Created).json(savedReview);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const getReview = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to get review");
		const { id } = req.params as { id: string };
		const review = await Review.findById(id).exec();
		if (review === null) throw Error("Review not found");
		else {
			return res.status(HttpStatusCode.Ok).json(review);
		}
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const searchReviews = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to search review");
		const {
			pageSize = 10,
			pageNum = 1,
			sortCol = "_id",
			sortDir = "asc",
			search,
		} = req.body;

		const reviews = await Review.find({
			...(search ? { $text: { $search: search } } : {}),
		})
			.sort({ [sortCol]: sortDir })
			.skip(pageSize * (pageNum - 1))
			.limit(pageSize)
			.exec();

		return res.status(HttpStatusCode.Ok).send(reviews);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const updateReview = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to update review");
		const { id } = req.params as { id: string };
		const { rating, comment } = req.body as {
			rating?: number;
			comment?: string;
		};

		const review = await Review.findById(id).exec();
		if (review === null) throw Error("Review not found");
		else {
			review.rating = rating || review.rating;
			review.comment = comment || review.comment;
			review.lastEditedOn = new Date();
		}

		const savedReview = await review.save();
		return res.status(HttpStatusCode.Created).json(savedReview);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const deleteReview = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to delete review");
		const { id } = req.params as { id: string };
		const review = await Review.findByIdAndDelete(id).exec();
		if (review === null) throw Error("Review not found");
		else {
			return res.status(HttpStatusCode.NoContent);
		}
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const searchAllUserReviews = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to search reviews by user");
		const { userId } = req.params as { userId: string };
		const {
			pageSize = 10,
			pageNum = 1,
			sortCol = "_id",
			sortDir = "asc",
			search,
		} = req.body;

		const reviews = await Review.find({
			userId,
		})
			.sort({ [sortCol]: sortDir })
			.skip(pageSize * (pageNum - 1))
			.limit(pageSize)
			.exec();

		return res.status(HttpStatusCode.Ok).send(reviews);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const searchAllProductReviews = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to search reviews by product");
		const { productId } = req.params as { productId: string };
		const {
			pageSize = 10,
			pageNum = 1,
			sortCol = "_id",
			sortDir = "asc",
			search,
		} = req.body;

		const reviews = await Review.find({
			productId,
		})
			.sort({ [sortCol]: sortDir })
			.skip(pageSize * (pageNum - 1))
			.limit(pageSize)
			.exec();

		return res.status(HttpStatusCode.Ok).send(reviews);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const searchAllBrandProducts = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to search products by brand");
		const { brandId } = req.params as { brandId: string };
		const {
			pageSize = 10,
			pageNum = 1,
			sortCol = "_id",
			sortDir = "asc",
			search,
		} = req.body;

		const products = await Product.find({
			brandId,
		})
			.sort({ [sortCol]: sortDir })
			.skip(pageSize * (pageNum - 1))
			.limit(pageSize)
			.exec();

		return res.status(HttpStatusCode.Ok).send(products);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

export const ProductController = {
	deleteProduct,
	deleteReview,
	createProduct,
	createReview,
	getProduct,
	getReview,
	searchProducts,
	searchReviews,
	updateProduct,
	updateReview,
	searchAllProductReviews,
	searchAllUserReviews,
	searchAllBrandProducts,
};
