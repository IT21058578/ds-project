import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { UserService } from "../services/user-service";

import initializeLogger from "../logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

const getUser = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to find user");
		const { id }: { id: string } = req.query as { id: string };
		const user = await UserService.getUser(id);
		log.info("Successfully found user");
		return res.status(HttpStatusCode.Ok).send({ ...user });
	} catch (err) {
		console.error("Failed to generate refresh token", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const getUsers = async (req: Request, res: Response) => {};

const editUser = async (req: Request, res: Response) => {};

const deleteUser = async (req: Request, res: Response) => {};

export const UserController = { getUser, getUsers, editUser, deleteUser };
