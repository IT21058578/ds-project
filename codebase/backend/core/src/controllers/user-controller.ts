import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { UserService } from "../services/user-service";

import initializeLogger from "../logger";
import { IUserSearchOptions, Role } from "../types";

const log = initializeLogger(__filename.split("\\").pop() || "");

const getUser = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to find user");
		const { id }: { id: string } = req.params as { id: string };
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
		const searchOptions: IUserSearchOptions = req.body;
		const authorizedUserRoles = req.headers["user-roles"] as Role[] | undefined;
		if (
			authorizedUserRoles?.includes(Role.SELLER) ||
			authorizedUserRoles?.includes(Role.BUYER)
		) {
			return res
				.status(HttpStatusCode.Unauthorized)
				.send("Users cannot be searched by Buyers or Sellers");
		}
		const users = await UserService.searchUsers(searchOptions);
		log.info("Created list of users");
		return res.status(HttpStatusCode.Ok).send(users);
	} catch (err) {
		log.error("Failed to search users. ERR:", err);
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
		const authorizedUserId = req.headers["user-id"] as string | undefined;
		const authorizedUserRoles = req.headers["user-roles"] as Role[] | undefined;

		if (authorizedUserId !== id && !authorizedUserRoles?.includes(Role.ADMIN)) {
			return res
				.status(HttpStatusCode.Unauthorized)
				.send("Unauthorized to edit user");
		}

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
		const authorizedUserId = req.headers["user-id"] as string | undefined;
		const authorizedUserRoles = req.headers["user-roles"] as Role[] | undefined;
		if (authorizedUserId !== id && !authorizedUserRoles?.includes(Role.ADMIN)) {
			return res
				.status(HttpStatusCode.Unauthorized)
				.send("Unauthorized to delete user");
		}
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
