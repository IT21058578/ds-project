import { HttpStatusCode } from "axios";
import { CartService } from "./cart-service";
import { Request, Response } from "express";
import { ICart } from "./types";

const getCart = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to get cart");
		const { userId } = req.params;
		const cart = await CartService.getCart(userId);
		console.log("Successfully got cart");
		return res.status(HttpStatusCode.Ok).send({ ...cart });
	} catch (err) {
		console.error(err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const editCart = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to edit cart");
		const { userId } = req.params as { userId: string };
		const { products } = req.body as Partial<ICart>;
		const cart = await CartService.editCart(userId, products);
		console.log("Successfully edited cart");
		return res.status(HttpStatusCode.Ok).send({ ...cart });
	} catch (err) {
		console.error(err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const deleteCart = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to delete cart");
		const { userId } = req.params as { userId: string };
		await CartService.deleteCart(userId);
		console.log("Successfully deleted cart");
		return res.status(HttpStatusCode.Ok).send();
	} catch (err) {
		console.error(err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

export const CartController = {
	getCart,
	editCart,
	deleteCart,
};
