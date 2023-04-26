import { User } from "../models/user-model";
import {
	IAuthorizedUser,
	IPage,
	IUser,
	IUserSearchOptions,
	UserErrorMessage,
} from "../types";

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
		...searchOptions
	} = userSearchOptions;

	const baseQuery = User.find({
		...(search ? { $text: { $search: search } } : {}),
		...(searchOptions.role ? { roles: searchOptions.role } : {}),
		...(searchOptions.email ? { email: searchOptions.email } : {}),
		...(searchOptions.mobile ? { mobile: searchOptions.mobile } : {}),
		...(searchOptions.createdAt ? { createdAt: searchOptions.createdAt } : {}),
		...(searchOptions.createdBefore
			? { createdAt: { $lt: searchOptions.createdBefore } }
			: {}),
		...(searchOptions.createdAfter
			? { createdAt: { $gt: searchOptions.createdAfter } }
			: {}),
		...(searchOptions.lastLoggedAt
			? { lastLoggedAt: searchOptions.lastLoggedAt }
			: {}),
		...(searchOptions.lastLoggedBefore
			? { lastLoggedAt: { $lt: searchOptions.lastLoggedBefore } }
			: {}),
		...(searchOptions.lastLoggedAfter
			? { lastLoggedAt: { $gt: searchOptions.lastLoggedAfter } }
			: {}),
		...(searchOptions.lastEditedAt
			? { lastEditedAt: searchOptions.lastEditedAt }
			: {}),
		...(searchOptions.lastEditedBefore
			? { lastEditedAt: { $lt: searchOptions.lastEditedBefore } }
			: {}),
		...(searchOptions.lastEditedAfter
			? { lastEditedAt: { $gt: searchOptions.lastEditedAfter } }
			: {}),
		...(searchOptions.isSubscribed
			? { isSubscribed: searchOptions.isSubscribed }
			: {}),
		...(searchOptions.isAuthorized
			? { isAuthorized: searchOptions.isAuthorized }
			: {}),
		...(searchOptions.name
			? {
					$or: [
						{ firstName: searchOptions.name },
						{ lastName: searchOptions.name },
						{ brandName: searchOptions.name },
					],
			  }
			: {}),
	});
	const totalElements = await baseQuery.clone().count().exec();
	const pageQuery = baseQuery
		.sort({ [sortCol]: sortDir })
		.skip(pageSize * (pageNum - 1))
		.limit(pageSize);
	const totalPages = await pageQuery.clone().count().exec();
	const users = await pageQuery.clone().exec();

	const page: IPage = {
		content: users,
		isFirst: pageNum === 1,
		isLast: pageNum === Math.ceil(totalElements / pageSize),
		pageNum,
		pageSize,
		totalElements,
		totalPages,
		searchOptions,
		sort: {
			sortDir,
			sortCol,
		},
	};

	return page;
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
