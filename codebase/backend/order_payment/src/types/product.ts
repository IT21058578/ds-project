import { Model, Document } from "mongoose";

/**
 * Represents a product
 */
export interface Product {
  productName: string;
  productDescription: string;
  image: string[];
  price: number;
  rating: number;
  review: string;
  countInStock: number;
  brand: string;
  categery: string;
}

/**
 * Represents a product review
 */
export interface Review {
  user: string;
  productName: string;
  rating: number;
  review: string;
}

/**
 * Represents a product w/ reviews
 */
interface ProductInDatabase extends Product {
  user: string;
  reviews: Review[];
}

export interface ProductDocument extends ProductInDatabase, Document {}

export interface ProductModel extends Model<ProductDocument> {}
