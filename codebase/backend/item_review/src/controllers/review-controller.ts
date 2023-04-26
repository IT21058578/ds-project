import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { Product, Review } from "../models/product-model";
import { IPage, IReviewPageRequest, Role } from "../types";
import { IReview } from "../types/product";
import { ReviewService } from "../services/review-service";

const createReview = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to create review");
		const { comment, productId, rating } = req.body as Partial<IReview>;
		const authorizedUserId = req.headers["user-id"] as string | undefined;
		if (!authorizedUserId) throw Error("User is not authorized");

		const savedReview = await ReviewService.createReview({
			comment,
			productId,
			rating,
			userId: authorizedUserId,
		});
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
		const review = await ReviewService.getReview(id);
		return res.status(HttpStatusCode.Ok).send(review);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const searchReviews = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to search review");
		const reviewsSearchOptions = req.body as IReviewPageRequest;
		const reviewPage = await ReviewService.searchReviews(reviewsSearchOptions);
		return res.status(HttpStatusCode.Ok).send(reviewPage);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const updateReview = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to update review");
		const { comment, rating } = req.body as Partial<IReview>;
		const authorizedUserId = req.headers["user-id"] as string | undefined;
		const authorizedUserRoles = req.headers["user-id"] as Role[] | undefined;

		if (!authorizedUserId || !authorizedUserRoles)
			throw Error("User is not authorized");

		const updatedReview = await ReviewService.updateReview(
			{
				comment,
				rating,
			},
			{ id: authorizedUserId, roles: authorizedUserRoles }
		);
		return res.status(HttpStatusCode.Ok).json(updatedReview);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const deleteReview = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to delete review");
		const { id } = req.params as { id: string };
		await ReviewService.deleteReview(id);
		return res.status(HttpStatusCode.Ok).send();
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

export const ReviewController = {
	deleteReview,
	createReview,
	getReview,
	searchReviews,
	updateReview,
};
