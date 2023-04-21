import { HttpStatusCode } from "axios";
import { CartService } from "./cart-service";
import { Request, Response } from "express";

const getCart = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to get cart");
		const { id } = req.params as { id: string };
		const { userId } = req.body;
		const cart = await CartService.getCart(id, userId);
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
		const { id } = req.params as { id: string };
		const { products } = req.body;
		const cart = await CartService.editCart({ id, products } as any);
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
		const { id } = req.params as { id: string };
		await CartService.deleteCart(id);
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
