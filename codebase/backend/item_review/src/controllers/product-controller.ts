import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { Product, Review } from "../models/product-model";
import { IPage, IProductPageRequest, Role } from "../types";
import { IProduct, IReview } from "../types/product";
import { ProductService } from "../services/product-service";

const createProduct = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to create product");
		const authorizedUserId = req.headers["user-id"] as string | undefined;
		if (!authorizedUserId) throw Error("User is not authorized");

		const { name, price, imageUrl, description, countInStock, category } =
			req.body as Partial<IProduct>;

		const savedProduct = await ProductService.createProduct({
			brandId: authorizedUserId,
			name,
			price,
			imageUrl,
			description,
			countInStock,
			category,
		});

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
		const product = await ProductService.getProduct(id);
		return res.status(HttpStatusCode.Ok).send(product);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const searchProducts = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to search product");
		const productSearchOptions = req.body as IProductPageRequest;
		const productPage = await ProductService.searchProducts(
			productSearchOptions
		);
		return res.status(HttpStatusCode.Ok).send(productPage);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to update product");
		const { category, countInStock, description, imageUrl, name, price } =
			(await req.body) as Partial<IProduct>;
		const authorizedUserId = req.headers["user-id"] as string | undefined;
		const authorizedUserRoles = req.headers["user-id"] as Role[] | undefined;

		if (!authorizedUserId || !authorizedUserRoles)
			throw Error("User is not authorized");

		const updatedProduct = await ProductService.updateProduct(
			{
				category,
				countInStock,
				description,
				imageUrl,
				name,
				price,
			},
			{
				id: authorizedUserId,
				roles: authorizedUserRoles,
			}
		);
		return res.status(HttpStatusCode.Ok).json(updatedProduct);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to delete product");
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

export const ProductController = {
	deleteProduct,
	createProduct,
	getProduct,
	searchProducts,
	updateProduct,
};
