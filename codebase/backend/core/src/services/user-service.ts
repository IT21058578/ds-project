import { User } from "../models/user-model";
import { IUser, IUserSearchOptions, UserErrorMessage } from "../types";

import initializeLogger from "../logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

const getUser = async (id: string) => {
	log.info("Finding user", id);
	const user = await User.findById(id).select("-password").exec();

	if (user === null) {
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	return user.toObject();
};

const searchUsers = async (userSearchOptions: IUserSearchOptions) => {
	const {
		pageSize = 10,
		pageNum = 1,
		sortCol = "_id",
		sortDir = "asc",
		search,
	} = userSearchOptions;

	const users = await User.find({
		...(search ? { $text: { $search: search } } : {}),
	})
		.sort({ [sortCol]: sortDir })
		.skip(pageSize * (pageNum - 1))
		.limit(pageSize)
		.select("-password")
		.exec();

	const usersDto = users;

	return usersDto;
};

const editUser = async ({
	id,
	brandName,
	firstName,
	lastName,
	profileImageUrl,
}: {
	id: string;
	firstName?: string;
	lastName?: string;
	brandName?: string;
	profileImageUrl?: string;
}) => {
	const user = await User.findById(id).select("-password").exec();

	if (user === null) {
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	user.firstName = firstName || user.firstName;
	user.lastName = lastName || user.lastName;
	user.brandName = brandName || user.brandName;
	user.profileImageUrl = profileImageUrl || user.profileImageUrl;
	user.lastEditedAt = new Date();

	return await user.save();
};

const deleteUser = async (id: string) => {
	await User.findByIdAndDelete(id).exec();
	return;
};

export const UserService = { getUser, searchUsers, editUser, deleteUser };
