import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { UserService } from "../services/user-service";

import initializeLogger from "../logger";
import { userInfo } from "os";

const log = initializeLogger(__filename.split("\\").pop() || "");

const getUser = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to find user");
		const { id }: { id: string } = req.query as { id: string };
		const user = await UserService.getUser(id);
		log.info("Successfully found user");
		return res.status(HttpStatusCode.Ok).send({ ...user });
	} catch (err) {
		log.error("Failed to find user", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const searchUsers = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to search users");
		const {
			pageNum,
			pageSize,
			sortCol,
			sortDir,
			search,
		}: {
			pageNum: number;
			pageSize: number;
			sortCol: string;
			sortDir: "asc" | "desc";
			search?: string;
		} = req.body;
		const users = await UserService.searchUsers({
			pageNum,
			pageSize,
			sortCol,
			sortDir,
			search,
		});
		log.info("Created list of users");
		return res.status(HttpStatusCode.Ok).send(users);
	} catch (err) {
		log.error("Failed to search users", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const editUser = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to edit users");
		const {
			firstName,
			brandName,
			lastName,
			profileImageUrl,
		}: {
			firstName?: string;
			lastName?: string;
			brandName?: string;
			profileImageUrl?: string;
		} = req.body;
		const { id } = req.params as { id: string };

		const user = await UserService.editUser({
			id,
			firstName,
			lastName,
			brandName,
			profileImageUrl,
		});
		log.info("Edited user");
		return res.status(HttpStatusCode.Ok).send(user);
	} catch (err) {
		log.error("Failed to edit user", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to delete user");
		const { id } = req.params as { id: string };
		await UserService.deleteUser(id);
		log.info("Deleted user");
		return res.status(HttpStatusCode.Ok).send();
	} catch (err) {
		log.error("Failed to delete user", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

export const UserController = { getUser, searchUsers, editUser, deleteUser };