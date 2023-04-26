import axios, { HttpStatusCode } from "axios";
import { IReview } from "../types/product";
import { AUTH_HOST } from "../constants";
import { Product, Review } from "../models/product-model";
import { IAuthorizedUser, IPage, IReviewPageRequest, Role } from "../types";

const createReview = async (review: Partial<IReview>) => {
	console.log("Checking whether user exists");
	const getUserPromise = axios.get(`${AUTH_HOST}/${review.userId}`);
	const getProductPromise = Product.findById(review.productId).exec();

	const results = await Promise.all([getUserPromise, getProductPromise]);
	if (results[0].status !== HttpStatusCode.Ok) throw Error("User not found");
	if (results[1] === null) throw Error("Product not found");

	review.createdOn = new Date();

	console.log("Saving new review");
	const newReview = new Review(review);
	return (await newReview.save()).toObject();
};

const getReview = async (id: string) => {
	console.log("Getting review with id:", id);
	const existingReview = await Product.findById(id).exec();
	if (existingReview === null) throw Error("Review does not exist");
	return existingReview.toObject();
};

const updateReview = async (
	review: Partial<IReview>,
	user: IAuthorizedUser
) => {
	const { rating, comment, id } = review;
	const existingReview = await Review.findById(id).exec();
	if (existingReview === null) throw Error("Review not found");

	console.log("Checking whether user has ownership");
	if (user.id === review.userId || user.roles?.includes(Role.ADMIN)) {
		throw Error("User does not have access to this review");
	}

	existingReview.rating = rating || existingReview.rating;
	existingReview.comment = comment || existingReview.comment;
	existingReview.lastEditedOn = new Date();

	return (await existingReview.save()).toObject;
};

const searchReviews = async (reviewSearchOptions: IReviewPageRequest) => {
	const {
		pageSize = 10,
		pageNum = 1,
		sortCol = "_id",
		sortDir = "asc",
		search,
		...searchOptions
	} = reviewSearchOptions;

	console.log("Building multiple queries");
	const baseQuery = Review.find({
		...(search ? { $text: { $search: search } } : {}),
		...(searchOptions.productId ? { productId: searchOptions.productId } : {}),
		...(searchOptions.userId ? { userId: searchOptions.userId } : {}),
		...(searchOptions.comment ? { name: searchOptions.comment } : {}),
		...(searchOptions.rating ? { rating: searchOptions.rating } : {}),
		...(searchOptions.ratingLessThen
			? { rating: { $lt: searchOptions.ratingLessThen } }
			: {}),
		...(searchOptions.ratingLargerThan
			? { rating: { $gt: searchOptions.ratingLargerThan } }
			: {}),
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
	const reviewsPromise = pageQuery.clone().exec();
	const [totalElements, totalPages, reviews] = await Promise.all([
		totalElementsPromise,
		totalPagesPromise,
		reviewsPromise,
	]);

	console.log("Building page");
	const page: IPage = {
		content: reviews,
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

const deleteReview = async (id: string) => {
	await Review.findByIdAndDelete(id).exec();
	return;
};

export const ReviewService = {
	createReview,
	getReview,
	updateReview,
	searchReviews,
	deleteReview,
};
