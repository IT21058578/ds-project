import { User } from "../models/user-model";
import { IUser, IUserSearchOptions, UserErrorMessage } from "../types";

import initializeLogger from "../logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

const getUser = async (id: string) => {
	log.info("Finding user", id);
	const user = await User.findById(id).exec();

	if (user === null) {
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	//Removing sensitive information
	user.password = "";
	user.authorizationToken = "";
	user.resetToken = "";

	return user.toObject();
};

const getUsers = async (userSearchOptions: IUserSearchOptions) => {};

const editUser = async (editedUser: IUser) => {};

const deleteUser = async (id: string) => {};

export const UserService = { getUser, getUsers, editUser, deleteUser };
