import axios, { HttpStatusCode } from "axios";
import { Product } from "../models/product-model";
import { IProduct } from "../types/product";
import { AUTH_HOST } from "../constants";
import { IAuthorizedUser, IPage, IProductPageRequest, Role } from "../types";

const createProduct = async (product: Partial<IProduct>) => {
	console.log("Checking whether brand exists");
	const result = await axios.get(`${AUTH_HOST}/${product.brandId}`);
	if (result.status !== HttpStatusCode.Ok) throw Error("Brand does not exist");

	product.createdOn = new Date();

	console.log("Saving new product");
	const newProduct = new Product(product);
	return (await newProduct.save()).toObject();
};

const getProduct = async (id: string) => {
	console.log("Getting product with id:", id);
	const existingProduct = await Product.findById(id).exec();
	if (existingProduct === null) throw Error("Product does not exist");
	return existingProduct.toObject();
};

const updateProduct = async (
	product: Partial<IProduct>,
	user: IAuthorizedUser
) => {
	console.log("Updating product with id:", product.id);
	const existingProduct = await Product.findById(product.id).exec();
	if (existingProduct === null) throw Error("Product does not exist");

	const { name, price, imageUrl, description, countInStock, category } =
		product;

	console.log("Checking whether user has ownership");
	if (user.id === product.brandId || user.roles?.includes(Role.ADMIN)) {
		throw Error("User does not have access to this product");
	}

	product.name = name || product.name;
	product.price = price || product.price;
	product.imageUrl = imageUrl || product.imageUrl;
	product.description = description || product.description;
	product.countInStock = countInStock || product.countInStock;
	product.category = category || product.category;
	product.lastEditedOn = new Date();

	return (await existingProduct.save()).toObject();
};

const searchProducts = async (productSearchOptions: IProductPageRequest) => {
	const {
		pageSize = 10,
		pageNum = 1,
		sortCol = "_id",
		sortDir = "asc",
		search,
		...searchOptions
	} = productSearchOptions;

	console.log("Building multiple queries");
	const baseQuery = Product.find({
		...(search ? { $text: { $search: search } } : {}),
		...(searchOptions.brandId ? { brandId: searchOptions.brandId } : {}),
		...(searchOptions.category ? { category: searchOptions.category } : {}),
		...(searchOptions.price ? { countInStock: searchOptions.price } : {}),
		...(searchOptions.priceLargerThan
			? { price: { $gt: searchOptions.priceLargerThan } }
			: {}),
		...(searchOptions.priceLessThen
			? { price: { $lt: searchOptions.priceLessThen } }
			: {}),
		...(searchOptions.countInStock
			? { countInStock: searchOptions.countInStock }
			: {}),
		...(searchOptions.countInStockLargerThan
			? { countInStock: { $gt: searchOptions.countInStockLargerThan } }
			: {}),
		...(searchOptions.countInStockLessThen
			? { countInStock: { $lt: searchOptions.countInStockLessThen } }
			: {}),
		...(searchOptions.description
			? { description: searchOptions.description }
			: {}),
		...(searchOptions.name ? { name: searchOptions.name } : {}),
		...(searchOptions.createdOn ? { createdOn: searchOptions.createdOn } : {}),
		...(searchOptions.createdBefore
			? { createdOn: { $lt: searchOptions.createdBefore } }
			: {}),
		...(searchOptions.createdAfter
			? { createdOn: { $gt: searchOptions.createdAfter } }
			: {}),
		...(searchOptions.lastEditedOn
			? { lastEditedOn: searchOptions.lastEditedOn }
			: {}),
		...(searchOptions.lastEditedBefore
			? { lastEditedOn: { $lt: searchOptions.lastEditedBefore } }
			: {}),
		...(searchOptions.lastEditedAfter
			? { lastEditedOn: { $gt: searchOptions.lastEditedAfter } }
			: {}),
	});
	const pageQuery = baseQuery
		.sort({ [sortCol]: sortDir })
		.skip(pageSize * (pageNum - 1))
		.limit(pageSize);

	console.log("Executing multiple queries");
	const totalElementsPromise = baseQuery.clone().count().exec();
	const totalPagesPromise = pageQuery.clone().count().exec();
	const productsPromise = pageQuery.clone().exec();
	const [totalElements, totalPages, products] = await Promise.all([
		totalElementsPromise,
		totalPagesPromise,
		productsPromise,
	]);

	console.log("Building page");
	const page: IPage = {
		content: products,
		isFirst: pageNum === 1,
		isLast: pageNum === Math.ceil(totalElements / pageSize),
		pageNum,
		pageSize,
		totalElements,
		totalPages,
		sort: {
			sortDir,
			sortCol,
		},
		searchOptions,
	};

	return page;
};

const deleteProduct = async (id: string) => {
	await Product.findByIdAndDelete(id).exec();
	return;
};

export const ProductService = {
	createProduct,
	getProduct,
	updateProduct,
	searchProducts,
	deleteProduct,
};
