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

	user.password = "";
	user.authorizationToken = "";
	user.resetToken = "";

	return user.toObject();
};

const getUsers = async (userSearchOptions: IUserSearchOptions) => {
	const { pageSize, pageNum, sortCol, sortDir, search } = userSearchOptions;

	const users = await User.find({
		$text: !!search ? { $search: search } : undefined,
	})
		.sort({ [sortCol]: sortDir })
		.skip(pageSize * (pageNum - 1))
		.limit(pageSize)
		.exec();

	const usersDto = users.map((user) => user.toObject());

	return usersDto;
};

const editUser = async (editedUser: IUser) => {};

const deleteUser = async (id: string) => {
	await User.findByIdAndDelete(id).exec();
	return;
};

export const UserService = { getUser, getUsers, editUser, deleteUser };
