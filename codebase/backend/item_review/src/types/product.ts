import { Model, Document } from "mongoose";

/**
 * Represents a product
 */
export interface IProduct {
	id: string;
	brandId: string;
	brandName: string;
	name: string;
	price: number;
	imageUrl: string[];
	description: string;
	countInStock: number;
	category: string;
	createdOn: Date;
	lastEditedOn: Date;
}

/**
 * Represents a product review
 */
export interface IReview {
	id: string;
	userId: string;
	productId: string;
	productName: string;
	createdBy: string;
	createdOn: Date;
	comment: string;
	lastEditedOn: Date;
	rating: number;
}
